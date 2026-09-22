/* Exercises the exported game using real browser input and its public report download. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('../.tools/browser/node_modules/playwright');
const root = path.resolve(__dirname, '..');
const levels = JSON.parse(fs.readFileSync(path.join(root, 'data/levels.json'), 'utf8'));
const out = path.join(root, 'test-results');
fs.mkdirSync(out, {recursive: true});
const coordinates = {'A-': [350,681], 'A+': [514,681], 'B-': [692,681], 'B+': [858,681]};
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
// A software WebGL renderer can stall for several frames. Pace actions well past
// the 320 ms transition; disabled controls intentionally ignore clicks mid-turn.
const settleTurn = () => sleep(900);

(async () => {
  const options = {headless:true, args:['--enable-unsafe-swiftshader','--use-angle=swiftshader']};
  if (process.env.BORROWED_MOVES_CHROMIUM) options.executablePath = process.env.BORROWED_MOVES_CHROMIUM;
  const browser = await chromium.launch(options);
  const context = await browser.newContext({viewport:{width:1280,height:800},acceptDownloads:true});
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(String(error)));
  page.on('console', message => {
    if (message.type() === 'error') errors.push(message.text());
  });
  try {
    await page.goto(process.env.BORROWED_MOVES_URL || 'http://127.0.0.1:8765', {waitUntil:'networkidle'});
    await page.locator('#loading').waitFor({state:'detached', timeout:60000});
    await sleep(800);
    await page.screenshot({path:path.join(out,'web-start.png')});
    await page.mouse.click(...coordinates['A+']);
    await settleTurn();
    await page.keyboard.press('z');
    await settleTurn();
    await page.keyboard.press('y');
    await settleTurn();
    for (let index=0; index<levels.length; index++) {
      await page.mouse.click(124,247 + index*52);
      await page.keyboard.press('r');
      await sleep(100);
      if (index===4) {
        await page.keyboard.press('h');
        await page.keyboard.press('h');
        await page.keyboard.press('h');
        await page.mouse.move(692,681);
        await sleep(120);
        await page.screenshot({path:path.join(out,'web-puzzle.png')});
      }
      for (const move of levels[index].certificate) {
        await page.mouse.click(...coordinates[move]);
        await settleTurn();
      }
    }
    await page.screenshot({path:path.join(out,'web-completed.png')});
    const downloadPromise = page.waitForEvent('download');
    await page.mouse.click(132,711);
    const download = await downloadPromise;
    const reportPath = path.join(out,'web-playtest.json');
    await download.saveAs(reportPath);
    const report = JSON.parse(fs.readFileSync(reportPath,'utf8'));
    assert.equal(Object.keys(report.completed).length,8,'all eight puzzles complete via browser buttons');
    for (const level of levels) assert.equal(report.completed[level.id].moves,level.shortest,level.id);
    assert.ok(report.stats.first_click.undos>=1,'browser undo recorded');
    assert.ok(report.stats.first_click.redos>=1,'browser redo recorded');
    assert.ok(report.stats.only_three.hints>=3,'browser layered hints recorded');
    await sleep(1800);
    await page.reload({waitUntil:'networkidle'});
    await page.locator('#loading').waitFor({state:'detached',timeout:60000});
    await sleep(500);
    const reloadDownloadPromise = page.waitForEvent('download');
    await page.mouse.click(132,711);
    const reloadDownload = await reloadDownloadPromise;
    const reloadPath = path.join(out,'web-reloaded.json');
    await reloadDownload.saveAs(reloadPath);
    assert.equal(Object.keys(JSON.parse(fs.readFileSync(reloadPath,'utf8')).completed).length,8,'web progress survives reload');
    await page.mouse.click(1190,53);
    await page.screenshot({path:path.join(out,'web-help.png')});
    await page.keyboard.press('Escape');
    await page.mouse.click(124,455);
    await page.keyboard.press('r');
    await page.setViewportSize({width:960,height:600});
    await sleep(250);
    await page.screenshot({path:path.join(out,'web-small.png')});
    assert.deepEqual(errors, [], 'no browser or Godot errors');
    console.log('WEB TESTS: 8 levels, mouse/keyboard, undo/redo, hints, report export, reload persistence, help and 960×600 rendering passed.');
    fs.writeFileSync(path.join(out,'web-result.json'),JSON.stringify({passed:true,levels:8,errors},null,2));
  } finally {
    await context.close();
    await browser.close();
  }
})().catch(error=>{console.error(error);process.exitCode=1;});
