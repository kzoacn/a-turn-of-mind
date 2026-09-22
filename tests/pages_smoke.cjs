// Exercise the publicly hosted game without a GitHub session, including its base path.
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const {chromium,expect}=require('../.tools/browser/node_modules/@playwright/test');
const E=require('../web-native/engine.js'),levels=require('../web-native/levels.js');
const root=path.resolve(__dirname,'..');
const base=(process.env.TURN_OF_MIND_URL||'https://kzoacn.github.io/a-turn-of-mind/').replace(/\/?$/,'/');
const out=path.join(root,'test-results/pages');fs.mkdirSync(out,{recursive:true});
const errors=[];let checks=0;
const check=(value,message)=>{checks++;assert.ok(value,message);};

(async()=>{
  const options={headless:true};
  if(process.env.BORROWED_MOVES_CHROMIUM)options.executablePath=process.env.BORROWED_MOVES_CHROMIUM;
  const browser=await chromium.launch(options);
  try{
    const context=await browser.newContext({viewport:{width:1440,height:960},acceptDownloads:true});
    const assets=['index.html','assets/icon.svg','web-native/styles.css','web-native/levels.js','web-native/engine.js','web-native/render.js','web-native/app.js','web-native/assets/WorkshopSans.ttf','web-native/assets/OFL.txt'];
    for(const file of assets){
      const response=await context.request.get(new URL(file,base).href);
      check(response.ok(),`${file} is publicly available`);
      check((await response.body()).equals(fs.readFileSync(path.join(root,file))),`${file} matches the source being published`);
    }
    const page=await context.newPage();
    page.on('pageerror',e=>errors.push(e.message));
    page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
    page.on('requestfailed',r=>errors.push(`${r.url()}: ${r.failure()?.errorText}`));
    page.on('response',r=>{if(r.status()>=400)errors.push(`${r.status()} ${r.url()}`);});
    await page.goto(base);await page.evaluate(()=>document.fonts.ready);
    await expect(page.locator('#level-title')).toHaveText(levels[0].title);
    check((await page.title()).includes('转念之间'),'Chinese game title is live');
    check((await page.locator('.brand small').textContent())==='A TURN OF MIND','English game title is live');
    check(await page.locator('.level-link').count()===100,'all one hundred levels are present');
    check(await page.locator('.collection-tab').count()===10,'all ten collections are present');
    await solve(page,levels[0]);check(await solved(page,levels[0]),'opening level plays online');
    await page.reload();await expect(page.locator('#completion-card')).toBeVisible();
    check(await solved(page,levels[0]),'progress survives a refresh');
    await page.goto(base+'#level=51');await expect(page.locator('#level-title')).toHaveText(levels[50].title);
    await solve(page,levels[50]);check(await solved(page,levels[50]),'new collection deep link plays online');
    await page.goto(base+'#level=100');await expect(page.locator('#level-title')).toHaveText(levels[99].title);
    await page.screenshot({path:path.join(out,'desktop.png'),fullPage:true});
    await page.setViewportSize({width:390,height:844});
    check(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'renamed header and ten collection tabs fit mobile');
    check(await page.locator('#tools .tool').count()===4,'four tools are available in the finale');
    await solve(page,levels[99]);check(await solved(page,levels[99]),'finale plays on a mobile viewport');
    await page.screenshot({path:path.join(out,'mobile.png'),fullPage:true});
    const saved=await page.evaluate(()=>JSON.parse(localStorage.getItem('borrowed-moves.native.v2')));
    check([0,50,99].every(i=>saved.records[levels[i].id]?.done),'original storage key saves all three completed levels');
    const downloading=page.waitForEvent('download');await page.locator('#export-button').click();
    const download=await downloading;await download.saveAs(path.join(out,'playtest.json'));
    check(download.suggestedFilename()==='a-turn-of-mind-playtest.json','record download uses the new title');
    check(JSON.parse(fs.readFileSync(path.join(out,'playtest.json'),'utf8')).game==='A Turn of Mind','record content uses the new title');
    check(errors.length===0,`no network or runtime errors: ${errors.join('; ')}`);
    const result={passed:true,checks,url:base,source_commit:process.env.PAGES_SOURCE_COMMIT||null,verified_at:new Date().toISOString(),level_count:levels.length,played_levels:[1,51,100],assets_match_source:true,anonymous_access:true,mobile:true,save_reload:true,errors};
    fs.writeFileSync(path.join(out,'result.json'),JSON.stringify(result,null,2)+'\n');
    console.log(`PAGES: ${checks} checks passed at ${base}`);
  }finally{await browser.close();}
})().catch(e=>{fs.writeFileSync(path.join(out,'result.json'),JSON.stringify({passed:false,checks,url:base,error:String(e),errors},null,2)+'\n');console.error(e);process.exitCode=1;});

async function solve(page,level){
  for(const move of level.certificate){
    let button=page.locator(`#tools button[data-op="${move.op}"][data-direction="${move.direction}"]`);
    if(await button.count()===0)button=page.locator(`#tools button[data-op="${move.op}"][data-direction="1"]`);
    await expect(button).toBeEnabled();await button.click();
    await expect(page.locator('#stage')).toHaveAttribute('aria-busy','false');
  }
  await expect(page.locator('#completion-card')).toBeVisible();
}
async function solved(page,level){
  const state=await page.locator('#board .piece').evaluateAll(nodes=>nodes.slice().sort((a,b)=>+a.dataset.slot-+b.dataset.slot).map(node=>+node.dataset.token));
  return E.equal(state,level.target);
}
