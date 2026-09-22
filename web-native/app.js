(function () {
  'use strict';
  const E = Workshop, R = WorkshopRender, levels = WorkshopLevels;
  const $ = id => document.getElementById(id), esc = R.escape;
  const storageKey = 'borrowed-moves.native.v2';
  const defaults = () => ({ version: 2, current: 0, records: {}, events: [], sound: true, reducedMotion: matchMedia('(prefers-reduced-motion: reduce)').matches });
  let data = defaults(), storageAvailable = true;
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey));
    if (saved?.version === 2 && saved.records && typeof saved.records === 'object' && !Array.isArray(saved.records)) {
      data.current = Number.isInteger(saved.current) ? Math.max(0, Math.min(levels.length - 1, saved.current)) : 0;
      for (const key of ['sound','reducedMotion']) if (typeof saved[key] === 'boolean') data[key] = saved[key];
      for (const level of levels) {
        const record = saved.records[level.id];
        if (!record || record.revision !== level.revision) continue;
        const stats = {};
        for (const key of ['moves','undos','redos','restarts','hints','visits','seconds']) stats[key] = Number.isFinite(record.stats?.[key]) ? Math.max(0, Math.min(1e8, record.stats[key])) : 0;
        data.records[level.id] = { revision:level.revision, history:Array.isArray(record.history)?record.history:[], done:record.done===true, best:Number.isInteger(record.best)&&record.best>0?record.best:null, stats };
      }
      if (Array.isArray(saved.events)) data.events = saved.events.filter(event=>event&&typeof event.level==='string'&&typeof event.action==='string').slice(-500).map(event=>({level:event.level.slice(0,40),action:event.action.slice(0,30),op:String(event.op||'').slice(0,30),direction:event.direction===-1?-1:1}));
    }
  } catch (error) {
    if (!(error instanceof SyntaxError)) storageAvailable = false;
  }
  const requested=/^#level=(\d+)$/.exec(location.hash);
  const bookmarked=requested?Number(requested[1])-1:-1;
  let index = bookmarked>=0&&bookmarked<levels.length?bookmarked:data.current, session, busy = false, peeking = false, epoch = 0, hintStage = 0, tracked = null, audioContext;
  const collectionSize=10;
  const collectionLabels=['初见','巧思','回响','织路','归藏','合拍','折光','游园','织星','归一'];
  const lastInCollection=Array.from({length:Math.ceil(levels.length/collectionSize)},(_,i)=>i*collectionSize);
  lastInCollection[Math.floor(index/collectionSize)]=index;
  const dialog = $('info-dialog');
  const board = $('board'), targetBoard = $('target-board');

  function recordFor(level = levels[index]) {
    if (!data.records[level.id]) data.records[level.id] = { revision:level.revision, history:[], done:false, best:null, stats:{moves:0,undos:0,redos:0,restarts:0,hints:0,visits:0,seconds:0} };
    return data.records[level.id];
  }
  function log(action, move = {}) {
    const record = recordFor();
    if (Object.hasOwn(record.stats,action)) record.stats[action]++;
    data.events.push({level:levels[index].id,action,op:move.op||'',direction:move.direction||1});
    if (data.events.length>500) data.events.shift();
  }
  function save() {
    if (session) recordFor().history = session.history.map(move=>({...move}));
    data.current = index;
    try { localStorage.setItem(storageKey,JSON.stringify(data)); storageAvailable = true; }
    catch { storageAvailable = false; $('local-status').textContent = '本次进度保留在当前页面，离开前可导出试玩记录。'; }
  }
  function completion() {
    if (!session.solved) return;
    const record = recordFor();
    if (!record.done) log('completed');
    record.done = true;
    record.best = record.best === null ? session.history.length : Math.min(record.best,session.history.length);
  }
  function countDone() { return levels.filter(level=>data.records[level.id]?.done).length; }

  function buildNavigation() {
    $('collection-tabs').style.setProperty('--collection-count',lastInCollection.length);
    $('collection-tabs').innerHTML=lastInCollection.map((_,i)=>`<button class="collection-tab" data-collection="${i}" role="tab" aria-selected="${i===Math.floor(index/collectionSize)}" aria-controls="level-list">${esc(collectionLabels[i]||'新篇')}<small>${String(i*collectionSize+1).padStart(2,'0')}–${Math.min((i+1)*collectionSize,levels.length)}</small></button>`).join('');
    $('level-list').innerHTML = levels.map((level,i)=>`<button class="level-link" data-level="${i}" aria-label="第 ${i+1} 关 ${esc(level.title)}"><span class="level-number">${String(i+1).padStart(2,'0')}</span><span class="level-name">${esc(level.title)}</span></button>`).join('');
    $('level-list').addEventListener('click',event=>{
      const button=event.target.closest('[data-level]'); if(button) selectLevel(+button.dataset.level);
    });
    $('collection-tabs').addEventListener('click',event=>{
      const button=event.target.closest('[data-collection]');
      if(button&&Math.floor(index/collectionSize)!==+button.dataset.collection)selectLevel(lastInCollection[+button.dataset.collection]);
    });
  }
  function buildTools() {
    const level=levels[index];
    $('tools').style.setProperty('--tool-count',level.ops.length);
    $('tools').dataset.count=String(level.ops.length);
    $('tools').innerHTML=level.ops.map((op,i)=>`<div class="tool ${op.order===2?'self-inverse':''}" data-tool="${op.id}"><button class="tool-main" data-op="${op.id}" data-direction="1" aria-label="${esc(op.title)}" title="${esc(op.caption)}"><span class="tool-mark">${i+1}</span><span><span class="tool-title">${esc(op.title)}</span><span class="tool-shortcut">${op.order===2?'再按一次，回到原处':`${i+1} 拨动 · Shift+${i+1} 反向`}</span></span></button>${op.order===2?'':`<button class="tool-inverse" data-op="${op.id}" data-direction="-1" aria-label="${esc(op.title)}，反向" title="反向拨动 · Shift+${i+1}">↶</button>`}</div>`).join('');
    $('tools').querySelectorAll('[data-op]').forEach(button=>{
      button.addEventListener('click',()=>move({op:button.dataset.op,direction:+button.dataset.direction}));
      const show=()=>preview(button.dataset.op,+button.dataset.direction);
      button.addEventListener('pointerenter',show); button.addEventListener('focus',show);
      button.addEventListener('pointerleave',clearPreview); button.addEventListener('blur',clearPreview);
    });
  }
  function renderBoard() {
    const level=levels[index];
    R.draw(board,level,peeking?level.target:session.state);
    R.draw(targetBoard,level,level.target,{mini:true});
    setTracked();
  }
  function setTracked() {
    for(const svg of [board,targetBoard]) svg.querySelectorAll('.piece').forEach(piece=>piece.classList.toggle('tracked',+piece.dataset.token===tracked));
  }
  function update() {
    const level=levels[index], won=session.solved && !busy;
    $('stage').setAttribute('aria-busy',String(busy));
    $('stage').classList.toggle('solved',won);
    $('stage').classList.toggle('is-peeking',peeking);
    $('peek-button').setAttribute('aria-pressed',String(peeking));
    $('peek-button').disabled=busy;
    $('success-ribbon').hidden=!won;
    $('completion-card').hidden=!won;
    $('hint-title').textContent=hintStage===0?'工坊便笺':hintStage<3?'换个角度想想':'从此刻的位置出发';
    $('hint-button').disabled=busy||session.solved;
    $('hint-button').innerHTML=`${hintStage===0?'给我一点提示':hintStage===1?'再提示一点':'指出下一步'} <kbd>H</kbd>`;
    $('undo-button').disabled=busy||!session.history.length;
    $('redo-button').disabled=busy||!session.future.length||session.solved;
    $('reset-button').disabled=busy||!session.history.length;
    $('next-button').disabled=busy;
    $('tools').querySelectorAll('button').forEach(button=>button.disabled=busy||session.solved);
    $('move-count').textContent=`${session.history.length} 次拨动`;
    $('matched-count').textContent=won?'每种颜色，都回家了':`${session.matched} / ${level.points.length} 枚已归位`;
    $('match-dots').innerHTML=session.state.map((token,i)=>`<i class="${token===level.target[i]?'on':''}"></i>`).join('');
    $('discovery').textContent=level.discovery;
    $('next-button').innerHTML=index===levels.length-1?'收好这些巧思 <span>✦</span>':(index+1)%collectionSize===0?'走进下一间工坊 <span>→</span>':'下一件机关 <span>→</span>';
    $('collection-progress').textContent=`${countDone()} / ${levels.length} 件已点亮`;
    const currentCollection=Math.floor(index/collectionSize);
    $('collection-tabs').querySelectorAll('[data-collection]').forEach(button=>button.setAttribute('aria-selected',String(+button.dataset.collection===currentCollection)));
    $('level-list').querySelectorAll('button').forEach((button,i)=>{
      button.hidden=Math.floor(i/collectionSize)!==currentCollection;
      const done=!!data.records[levels[i].id]?.done;
      button.setAttribute('aria-current',String(i===index)); button.classList.toggle('done',done);
      button.querySelector('.level-number').textContent=done?'✓':String(i+1).padStart(2,'0');
    });
    $('sound-toggle').textContent=`声音 ${data.sound?'开':'关'}`;
    $('sound-toggle').setAttribute('aria-pressed',String(data.sound));
    $('motion-toggle').setAttribute('aria-pressed',String(data.reducedMotion));
    $('motion-toggle').textContent=data.reducedMotion?'舒缓动画 开':'舒缓动画';
  }
  function selectLevel(next) {
    if(session) save();
    epoch++; busy=false; peeking=false; hintStage=0; tracked=null;
    index=Math.max(0,Math.min(levels.length-1,next));
    lastInCollection[Math.floor(index/collectionSize)]=index;
    const level=levels[index], record=recordFor();
    session=new E.Session(level,record.history);
    log('visits'); completion();
    $('level-chapter').textContent=`第 ${String(index+1).padStart(2,'0')} 件  /  ${level.chapter}`;
    $('level-title').textContent=level.title; $('level-subtitle').textContent=level.subtitle;
    $('level-stamp').textContent=String(index+1).padStart(2,'0'); $('stage-tag').textContent=level.tag;
    $('hint-copy').textContent='正确的颜色也可以暂时离开。点一下徽章，可以一路跟着那种颜色。';
    $('stage-caption').textContent='指向下方把手，看看颜色会去哪里';
    $('stage').dataset.level=level.id;
    document.title=`${level.title} · 转念之间`;
    try{history.replaceState(null,'',`#level=${index+1}`);}catch{/* Saving progress also covers browsers that restrict file URL history. */}
    buildTools(); renderBoard(); update(); save();
    $('announcer').textContent=`第 ${index+1} 关，${level.title}。${level.subtitle}`;
  }
  function preview(id,direction=1) {
    if(busy||peeking||session.solved||dialog.open)return;
    const op=session.ops[id];
    if(!op)return;
    R.preview(board,levels[index],op,direction);
    $('stage-caption').textContent=direction===1?op.caption:`${op.title} · 沿相反的方向拨动`;
  }
  function clearPreview() {
    R.preview(board,levels[index],null,1);
    if(!peeking) $('stage-caption').textContent='指向下方把手，看看颜色会去哪里';
  }
  function setPeek(flag) {
    if((busy&&flag)||peeking===flag)return;
    peeking=flag;
    renderBoard(); update();
    $('stage-caption').textContent=flag?'正在叠看目标 · 松开，继续拨动':'指向下方把手，看看颜色会去哪里';
  }
  function chime(won=false,opIndex=0) {
    if(!data.sound)return;
    try {
      audioContext ||= new (window.AudioContext||window.webkitAudioContext)();
      if(audioContext.state==='suspended')audioContext.resume().catch(()=>{});
      const notes=won?[523.25,659.25,783.99,1046.5]:[520+opIndex*160];
      notes.forEach((hz,i)=>{
        const osc=audioContext.createOscillator(),gain=audioContext.createGain();
        const start=audioContext.currentTime+i*.105;
        osc.type='sine';osc.frequency.value=hz;
        gain.gain.setValueAtTime(0,start);gain.gain.linearRampToValueAtTime(won ? .055 : .045,start+.008);gain.gain.exponentialRampToValueAtTime(.0001,start+(won ? .55 : .17));
        osc.connect(gain);gain.connect(audioContext.destination);osc.start(start);osc.stop(start+(won ? .6 : .2));
        osc.onended=()=>{osc.disconnect();gain.disconnect();};
      });
    } catch { /* Audio is optional; movement is always available. */ }
  }
  async function transition(change,action) {
    if(!change)return;
    const level=levels[index], mine=++epoch, op=session.ops[change.move.op];
    clearPreview();setPeek(false);
    R.draw(board,level,change.before);setTracked();
    busy=true;log(action,change.move);completion();save();update();
    $('tools').querySelectorAll('.suggested').forEach(tool=>tool.classList.remove('suggested'));
    chime(false,level.ops.indexOf(op));
    const duration=data.reducedMotion?90:['exchange','carousel','spatial'].includes(op.motion)?680:op.motion==='mirror'?520:420;
    const finished=await R.animate(board,level,change.before,op,change.move.direction,duration,()=>epoch===mine);
    if(!finished)return;
    busy=false;renderBoard();update();
    if(session.solved){chime(true);$('announcer').textContent=`${level.title}修好了。${level.discovery}`;}
    else if(hintStage>=3) $('hint-copy').textContent='先看看这一步留下了什么。需要时，可以再问下一步。';
  }
  function move(command) {
    if(busy||dialog.open)return;
    transition(session.move(command),'moves');
  }
  function undo() {if(!busy&&!dialog.open)transition(session.undo(),'undos');}
  function redo() {if(!busy&&!dialog.open)transition(session.redo(),'redos');}
  function reset() {
    if(busy||dialog.open)return;
    session.restart();peeking=false;hintStage=0;log('restarts');
    $('hint-copy').textContent='重新试试。先观察一个位置，再让小机关动起来。';
    renderBoard();update();save();clearPreview();
    $('tools').querySelectorAll('.suggested').forEach(tool=>tool.classList.remove('suggested'));
  }
  function hint() {
    if(busy||session.solved||dialog.open)return;
    const level=levels[index];log('hints');
    if(hintStage<level.hints.length){$('hint-copy').textContent=level.hints[hintStage++];}
    else {
      hintStage=3;
      const solution=E.solve(session.state,level.target,level);
      if(solution.found&&solution.moves.length){
        const command=solution.moves[0],op=session.ops[command.op];
        $('hint-copy').textContent=`试着${command.direction===-1?'反向':''}拨动「${op.title}」一次，再观察颜色的位置。`;
        $('tools').querySelectorAll('.tool').forEach(tool=>tool.classList.toggle('suggested',tool.dataset.tool===op.id));
        preview(op.id,command.direction);
      }else $('hint-copy').textContent='先撤销到你熟悉的位置，重新观察。';
    }
    update();save();
  }
  function openDialog(title,body) {
    setPeek(false);clearPreview();$('dialog-title').textContent=title;$('dialog-body').innerHTML=body;
    if(!dialog.open)dialog.showModal();
  }
  function notes() {
    const level=levels[index];
    const pair=level.pair?levels.find(item=>item.id===level.pair):null;
    const comparison=pair?(level.pairNote||(level.group===pair.group?'相同的群，换一套把手，会有什么不同？':'同一个目标，可用动作和可达范围也可以不同。')):'';
    openDialog(`${level.title} · 机关手记`,`<p class="group-fact">${esc(level.group)} <small style="font-size:13px">· ${level.group_order} 种变换</small></p><p>${esc(level.math)}</p><svg class="note-diagram" aria-label="位置编号参考图"></svg><div class="generators">${level.ops.map((op,i)=>`${i+1}. ${esc(op.title)}　${esc(op.notation)}`).join('\n')}</div>${pair?`<p>可以和第 ${pair.number} 件「${esc(pair.title)}」一起看看：${esc(comparison)}</p>`:''}<p>位置编号对应上图。手记是可选的；用自己的办法修好机关就很好。</p>`);
    R.draw(dialog.querySelector('svg'),level,level.target,{mini:true,labels:true});
  }
  function help() {
    openDialog('借个位置，用完再还。','<p>让大机关里的每一种颜色，回到右侧图样中的位置。每枚把手都有固定的作用方式。</p><p>指向把手可预览路线；点击颜色，可以一路跟着它。正确的颜色也允许暂时离开。</p><div class="help-grid"><span>拨动把手</span><span>点击按钮，或按 1 / 2 / 3 / 4</span><span>反向拨动</span><span>点击小箭头，或 Shift + 数字</span><span>撤销 / 重做</span><span>Z / Y</span><span>重来 / 提示</span><span>R / H</span><span>叠看目标</span><span>按住空格，或按住图样下的按钮</span></div><p>没有时间和步数限制。卡住时，可以从展柜换一件机关。</p>');
  }
  function next() {
    if(busy)return;
    if(index<levels.length-1){selectLevel(index+1);return;}
    openDialog(countDone()===levels.length?'所有机关，都亮起来了。':'又收好了一份巧思。',`<p>你已经点亮 ${countDone()} / ${levels.length} 件机关。</p><p>哪一件让你发现了新办法？哪一件让你只想乱试？这些感受，会帮工坊长出下一批机关。</p><p>可以继续探索、重玩喜欢的机关，或从展柜下方导出本地试玩记录。</p>`);
  }
  function exportReport() {
    save();
    const report={game:'A Turn of Mind',build:'native-structures-0.6.1',humanFeedbackCollected:false,levels:levels.map(level=>({id:level.id,title:level.title,group:level.group,done:!!data.records[level.id]?.done,best:data.records[level.id]?.best??null,stats:data.records[level.id]?.stats??null,history:data.records[level.id]?.history??[]})),recentEvents:data.events};
    const url=URL.createObjectURL(new Blob([JSON.stringify(report,null,2)],{type:'application/json'}));
    const anchor=document.createElement('a');anchor.href=url;anchor.download='a-turn-of-mind-playtest.json';anchor.click();setTimeout(()=>URL.revokeObjectURL(url),2000);
    $('local-status').textContent='记录已保存在本机。也记下让你开心或困惑的那一刻吧。';
  }

  $('undo-button').addEventListener('click',undo);$('redo-button').addEventListener('click',redo);$('reset-button').addEventListener('click',reset);
  $('hint-button').addEventListener('click',hint);$('next-button').addEventListener('click',next);$('notes-button').addEventListener('click',notes);$('help-button').addEventListener('click',help);
  $('export-button').addEventListener('click',exportReport);
  $('sound-toggle').addEventListener('click',()=>{data.sound=!data.sound;update();save();});
  $('motion-toggle').addEventListener('click',()=>{data.reducedMotion=!data.reducedMotion;update();save();});
  $('dialog-close').addEventListener('click',()=>dialog.close());$('dialog-return').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',event=>{if(event.target===dialog){const rect=dialog.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)dialog.close();}});
  document.querySelector('.brand').addEventListener('click',event=>{event.preventDefault();selectLevel(0);});
  $('peek-button').addEventListener('pointerdown',event=>{event.preventDefault();event.currentTarget.setPointerCapture(event.pointerId);setPeek(true);});
  for(const event of ['pointerup','pointercancel','lostpointercapture'])$('peek-button').addEventListener(event,()=>setPeek(false));
  board.addEventListener('click',event=>{const piece=event.target.closest('.piece');if(piece&&!busy){tracked=tracked===+piece.dataset.token?null:+piece.dataset.token;setTracked();}});
  board.addEventListener('keydown',event=>{if(event.key==='Enter'&&event.target.closest('.piece')){event.preventDefault();const value=+event.target.closest('.piece').dataset.token;tracked=tracked===value?null:value;setTracked();}});
  window.addEventListener('keydown',event=>{
    if(event.repeat||dialog.open||event.ctrlKey||event.metaKey||event.altKey||event.target.matches('input,textarea,select,[contenteditable=true]'))return;
    if(event.code==='Space'){event.preventDefault();setPeek(true);return;}
    const number=/^Digit([1234])$/.exec(event.code);
    if(number){event.preventDefault();const op=levels[index].ops[+number[1]-1];if(op)move({op:op.id,direction:event.shiftKey?-1:1});return;}
    switch(event.code){
      case 'KeyZ':event.preventDefault();event.shiftKey?redo():undo();break;
      case 'KeyY':event.preventDefault();redo();break;
      case 'KeyR':event.preventDefault();reset();break;
      case 'KeyH':event.preventDefault();hint();break;
      case 'Escape':help();break;
    }
  });
  window.addEventListener('keyup',event=>{if(event.code==='Space')setPeek(false);});
  window.addEventListener('hashchange',()=>{
    const match=/^#level=(\d+)$/.exec(location.hash),nextIndex=match?Number(match[1])-1:-1;
    if(nextIndex>=0&&nextIndex<levels.length&&nextIndex!==index)selectLevel(nextIndex);
  });
  window.addEventListener('blur',()=>{setPeek(false);save();});
  window.addEventListener('pagehide',save);
  document.addEventListener('visibilitychange',()=>{if(document.hidden){setPeek(false);save();}});
  let lastTick=performance.now(),autosave=0;
  setInterval(()=>{
    const now=performance.now(),delta=Math.min((now-lastTick)/1000,1);lastTick=now;
    if(session&&!session.solved&&!dialog.open&&!document.hidden&&document.hasFocus())recordFor().stats.seconds+=delta;
    autosave+=delta;if(autosave>=5){autosave=0;save();}
  },500);
  buildNavigation();selectLevel(index);
  if(!storageAvailable)$('local-status').textContent='本次进度保留在当前页面，离开前可导出试玩记录。';
})();
