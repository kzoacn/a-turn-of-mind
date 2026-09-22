const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const {pathToFileURL}=require('node:url');
const {chromium,expect}=require('../.tools/browser/node_modules/@playwright/test');
const E=require('../web-native/engine.js'),levels=require('../web-native/levels.js');
const root=path.resolve(__dirname,'..'),out=path.join(root,'test-results/native');
fs.mkdirSync(out,{recursive:true});fs.rmSync(path.join(out,'browser-result.json'),{force:true});
const url=process.env.BORROWED_MOVES_URL||'http://127.0.0.1:8765';
const errors=[];
let checks=0;
const check=(condition,message)=>{checks++;assert.ok(condition,message);};

(async()=>{
  const options={headless:true};
  if(process.env.BORROWED_MOVES_CHROMIUM)options.executablePath=process.env.BORROWED_MOVES_CHROMIUM;
  const browser=await chromium.launch(options);
  try{
    const context=await browser.newContext({viewport:{width:1440,height:960},acceptDownloads:true});
    const page=await context.newPage();
    page.on('pageerror',error=>errors.push(error.message));
    page.on('console',message=>{if(message.type()==='error')errors.push(message.text());});
    await page.goto(url);await page.evaluate(()=>document.fonts.ready);
    await expect(page.locator('.level-link')).toHaveCount(levels.length);
    await expect(page.locator('.level-link:visible')).toHaveCount(10);
    check((await page.locator('#board .piece').count())===5,'five different colors in opening puzzle');
    await page.locator('[data-op="turn"][data-direction="1"]').hover();
    check(await page.locator('.preview-line').count()===5,'hover previews all affected trajectories');
    await page.locator('#board [data-token="0"]').click();
    check(await page.locator('.piece.tracked').count()===2,'following a color highlights current and target positions');
    await page.keyboard.down('Space');await expect(page.locator('#stage')).toHaveClass(/is-peeking/);await page.keyboard.up('Space');
    await expect(page.locator('#stage')).not.toHaveClass(/is-peeking/);
    await page.keyboard.press('Digit1');await expect(page.locator('#stage')).toHaveAttribute('aria-busy','false');
    const changed=await state(page);check(!E.equal(changed,levels[0].initial),'keyboard moves a real permutation');
    await page.keyboard.press('z');await expect(page.locator('#stage')).toHaveAttribute('aria-busy','false');
    check(E.equal(await state(page),levels[0].initial),'keyboard undo restores initial state');
    await page.keyboard.press('y');await expect(page.locator('#stage')).toHaveAttribute('aria-busy','false');
    check(E.equal(await state(page),changed),'keyboard redo restores change');
    await page.keyboard.press('r');
    await page.screenshot({path:path.join(out,'desktop.png'),fullPage:true});
    // A level change while a whole room is moving must cancel its old animation.
    await select(page,7);await act(page,{op:'exchange',direction:1},false);
    await select(page,8);await expect(page.locator('#stage')).toHaveAttribute('aria-busy','false');
    check(E.equal(await state(page),levels[8].initial),'changing level cancels old animation without changing the new board');
    for(let index=0;index<levels.length;index++){
      const level=levels[index];await select(page,index);
      if(await page.locator('#reset-button').isEnabled())await page.locator('#reset-button').click();
      check(new Set(await state(page)).size===level.points.length,`level ${index+1} uses only distinct colors`);
      await page.locator('#tools button').first().hover();
      await page.screenshot({path:path.join(out,`level-${String(index+1).padStart(2,'0')}.png`),fullPage:true});
      if([12,18,21,22,24,28,34,36,41,43,46,66,68,69,71,72,74,75,79,87,88,94].includes(index)){
        const outline=page.locator(index===28?'#board [data-spin-pivot]':index===21?'#board [data-frame-edge]':[12,24,34,36,41,43,46,66,68,69,79,87,88].includes(index)?'#board [data-edge]':'#board [data-room]').first();
        const attribute=index===28?'transform':'d',beforeOutline=await outline.getAttribute(attribute);
        await act(page,{op:level.ops[index===22||index===43?2:index===28?1:0].id,direction:1},false);
        await expect.poll(()=>outline.getAttribute(attribute)).not.toBe(beforeOutline);
        await expect(page.locator('#stage')).toHaveAttribute('aria-busy','false');
        check(true,`level ${index+1}: structure follows the moving colors`);
        await page.locator('#undo-button').click();await expect(page.locator('#stage')).toHaveAttribute('aria-busy','false');
        check(E.equal(await state(page),level.initial),'animated structure undo restores its exact state');
      }
      if([49,91,92,99].includes(index)){
        await page.keyboard.press('Digit4');await expect(page.locator('#stage')).toHaveAttribute('aria-busy','false');
        check(E.equal(await state(page),E.apply(level.initial,level.ops[3],1)),'fourth tool works from the keyboard');
        await page.keyboard.press('z');await expect(page.locator('#stage')).toHaveAttribute('aria-busy','false');
        await page.keyboard.press('Shift+Digit4');await expect(page.locator('#stage')).toHaveAttribute('aria-busy','false');
        check(E.equal(await state(page),E.apply(level.initial,level.ops[3],-1)),'fourth inverse works from the keyboard');
        await page.keyboard.press('z');await expect(page.locator('#stage')).toHaveAttribute('aria-busy','false');
      }
      if(index===5){
        await page.locator('#hint-button').click();await page.locator('#hint-button').click();await page.locator('#hint-button').click();
        check((await page.locator('#hint-copy').textContent()).includes('试着'),'third hint gives a current-state move');
      }
      for(const command of level.certificate)await act(page,command);
      await expect(page.locator('#completion-card')).toBeVisible();
      check(E.equal(await state(page),level.target),`level ${index+1} completes with browser inputs`);
      await page.locator('#notes-button').click();
      await expect(page.locator('#info-dialog')).toBeVisible();
      check((await page.locator('#dialog-body').textContent()).includes(level.group),`level ${index+1} notes match group`);
      const held=await state(page);await page.keyboard.press('Digit1');check(E.equal(await state(page),held),'modal prevents gameplay behind it');
      await page.keyboard.press('Escape');
    }
    await expect(page.locator('#collection-progress')).toHaveText(`${levels.length} / ${levels.length} 件已点亮`);
    await page.locator('#next-button').click();await expect(page.locator('#dialog-title')).toHaveText('所有机关，都亮起来了。');await page.keyboard.press('Escape');
    const downloadPromise=page.waitForEvent('download');await page.locator('#export-button').click();
    await (await downloadPromise).saveAs(path.join(out,'playtest.json'));
    const report=JSON.parse(fs.readFileSync(path.join(out,'playtest.json')));
    check(report.levels.length===levels.length&&report.levels.every(level=>level.done),'downloaded report contains all completed lessons');
    check(report.levels.every((level,i)=>level.best===levels[i].shortest),'all browser solutions agree with certified minimums');
    await select(page,5);await page.locator('#reset-button').click();await act(page,{op:'turn',direction:1});
    const beforeReload=await state(page);await page.reload();await expect(page.locator('#level-title')).toHaveText(levels[5].title);
    check(E.equal(await state(page),beforeReload),'unfinished position survives reload');
    await expect(page.locator('#collection-progress')).toHaveText(`${levels.length} / ${levels.length} 件已点亮`);
    await page.setViewportSize({width:1280,height:800});await page.screenshot({path:path.join(out,'desktop-1280.png'),fullPage:true});
    await page.setViewportSize({width:390,height:844});await page.screenshot({path:path.join(out,'mobile.png'),fullPage:true});
    check(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'mobile layout has no horizontal overflow');
    await select(page,6);await page.locator('#reset-button').click();
    for(const command of levels[6].certificate)await act(page,command);
    await expect(page.locator('#completion-card')).toBeVisible();
    check(true,'mobile viewport supports complete play');
    await select(page,levels.length-1);
    await page.locator('#reset-button').click();
    for(const command of levels.at(-1).certificate)await act(page,command);
    await expect(page.locator('#completion-card')).toBeVisible();
    check(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'ten collections and four tools fit the mobile viewport');
    await page.screenshot({path:path.join(out,'mobile-collection-ten.png'),fullPage:true});
    for(let i=50;i<levels.length;i++){
      await select(page,i);
      check(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`new level ${i+1} heading and tools fit mobile`);
    }
    await page.setViewportSize({width:1280,height:800});
    // Seed corruption before app startup; pagehide legitimately saves the live game.
    await page.addInitScript(()=>{history.replaceState(null,'','#');localStorage.setItem('borrowed-moves.native.v2','{bad json');});
    await page.reload();await expect(page.locator('#level-title')).toHaveText(levels[0].title);
    check(E.equal(await state(page),levels[0].initial),'malformed local storage recovers to a playable start');
    await context.close();

    const offline=await browser.newContext({viewport:{width:1280,height:800}}),filePage=await offline.newPage();
    filePage.on('pageerror',error=>errors.push(error.message));
    filePage.on('console',message=>{if(message.type()==='error')errors.push(message.text());});
    const external=[];filePage.on('request',request=>{if(/^https?:/.test(request.url()))external.push(request.url());});
    await filePage.goto(pathToFileURL(path.join(root,'index.html')).href+'#level=51');
    await expect(filePage.locator('#level-title')).toHaveText(levels[50].title);
    await expect(filePage.locator('[data-collection="5"]')).toHaveAttribute('aria-selected','true');
    for(const command of levels[50].certificate)await act(filePage,command);
    await expect(filePage.locator('#completion-card')).toBeVisible();
    check(external.length===0,'direct file launch works without a server or external requests');
    await offline.close();

    const legacy=await browser.newContext({viewport:{width:1280,height:800}});
    const previous={version:2,current:49,records:{},events:[],sound:false,reducedMotion:true};
    levels.slice(0,50).forEach((level,i)=>{previous.records[level.id]={revision:1,history:i===49?level.certificate.slice(0,1):level.certificate,done:i<49,best:i<49?level.shortest:null,stats:{moves:1,undos:0,redos:0,restarts:0,hints:0,visits:1,seconds:42}};});
    await legacy.addInitScript(saved=>localStorage.setItem('borrowed-moves.native.v2',JSON.stringify(saved)),previous);
    const returning=await legacy.newPage();await returning.goto(url);
    await expect(returning.locator('#level-title')).toHaveText(levels[49].title);
    await expect(returning.locator('#collection-progress')).toHaveText(`49 / ${levels.length} 件已点亮`);
    const legacyState=new E.Session(levels[49],previous.records[levels[49].id].history).state;
    check(E.equal(await state(returning),legacyState),'unfinished 0.5 save resumes exactly after expansion');
    await returning.locator('[data-collection="5"]').click();await expect(returning.locator('#level-title')).toHaveText(levels[50].title);
    for(const command of levels[50].certificate)await act(returning,command);
    await expect(returning.locator('#collection-progress')).toHaveText(`50 / ${levels.length} 件已点亮`);
    const afterMigration=await returning.evaluate(()=>JSON.parse(localStorage.getItem('borrowed-moves.native.v2')));
    check(levels.slice(0,49).every(level=>afterMigration.records[level.id].done),'old completions remain while new progress is added');
    check(afterMigration.sound===false&&afterMigration.reducedMotion===true,'old preferences remain');
    await legacy.close();
    check(errors.length===0,`no console or runtime errors: ${errors.join('; ')}`);
    fs.writeFileSync(path.join(out,'browser-result.json'),JSON.stringify({passed:true,checks,levels:levels.length,desktop:true,mobile:true,fileLaunch:true,oldSaveMigration:true,errors},null,2));
    console.log(`NATIVE BROWSER: ${checks} checks passed; all ${levels.length} lessons, file launch, desktop/mobile, save migration and export.`);
  }finally{await browser.close();}
})().catch(error=>{fs.writeFileSync(path.join(out,'browser-result.json'),JSON.stringify({passed:false,checks,error:String(error),errors},null,2));console.error(error);process.exitCode=1;});

async function state(page){return page.locator('#board .piece').evaluateAll(nodes=>nodes.slice().sort((a,b)=>+a.dataset.slot-+b.dataset.slot).map(node=>+node.dataset.token));}
async function select(page,index){
  const tab=page.locator(`[data-collection="${Math.floor(index/10)}"]`);
  if(await tab.getAttribute('aria-selected')!=='true')await tab.click();
  await page.locator(`.level-link[data-level="${index}"]`).click();await expect(page.locator('#stage')).toHaveAttribute('data-level',levels[index].id);
}
async function act(page,command,wait=true){
  let button=page.locator(`#tools button[data-op="${command.op}"][data-direction="${command.direction}"]`);
  if(await button.count()===0)button=page.locator(`#tools button[data-op="${command.op}"][data-direction="1"]`);
  await expect(button).toBeEnabled();await button.click();
  if(wait)await expect(page.locator('#stage')).toHaveAttribute('aria-busy','false');
}
