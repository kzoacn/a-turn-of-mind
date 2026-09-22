(function (root) {
  'use strict';
  const E = root.Workshop;
  const tones = ['#94c8b3', '#dfbc79', '#c5acd5', '#d9a0af'];
  const escape = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
  const fmt = value => Number(value.toFixed(3));
  const mix = (a, b, t) => a + (b - a) * t;
  const lerp = (a, b, t) => [mix(a[0], b[0], t), mix(a[1], b[1], t)];
  function curveControl(a, b, bend = .2) {
    return [(a[0] + b[0]) / 2 - (b[1] - a[1]) * bend, (a[1] + b[1]) / 2 + (b[0] - a[0]) * bend];
  }
  function rotateVector(v,op,direction,t) {
    const angle=op.angle*direction*t,c=Math.cos(angle),s=Math.sin(angle);
    const axis=op.axisVector||(op.axis==='x'?[1,0,0]:op.axis==='y'?[0,1,0]:[0,0,1]);
    const length=Math.hypot(...axis),[u,w,q]=axis.map(value=>value/length),[x,y,z]=v;
    const dot=u*x+w*y+q*z,cross=[w*z-q*y,q*x-u*z,u*y-w*x];
    return v.map((value,i)=>value*c+cross[i]*s+[u,w,q][i]*dot*(1-c));
  }
  function project(level,v) {
    const spec=level.projection||{origin:[400,235],basis:[[112,0],[0,86],[48,-32]]};
    return spec.origin.map((value,i)=>value+v.reduce((sum,component,k)=>sum+component*spec.basis[k][i],0));
  }
  function pointAt(level, op, source, direction, t) {
    const destination = E.permutation(op, level.points.length, direction)[source];
    const a = level.points[source], b = level.points[destination];
    if (source === destination) return a;
    if (op.motion === 'spatial') {
      return project(level,rotateVector(level.vertices[source],op,direction,t));
    }
    if (op.motion === 'shear') {
      const axis=op.axis==='x'?0:1,other=1-axis,control=lerp(a,b,.5);
      if(Math.abs(b[axis]-a[axis])>op.spacing*1.5)control[other]+=Math.sign(a[other]-op.pivot[other])*90;
      return [(1-t)**2*a[0]+2*(1-t)*t*control[0]+t*t*b[0],(1-t)**2*a[1]+2*(1-t)*t*control[1]+t*t*b[1]];
    }
    if (op.motion === 'carousel') {
      const block=op.blocks.findIndex(c=>c.includes(source)),center=op.centers[block],pivot=op.pivot;
      const angle=op.angle*direction*t,dx=center[0]-pivot[0],dy=center[1]-pivot[1];
      return [pivot[0]+dx*Math.cos(angle)-dy*Math.sin(angle)+a[0]-center[0],pivot[1]+dx*Math.sin(angle)+dy*Math.cos(angle)+a[1]-center[1]];
    }
    if (op.motion === 'orbit') {
      const lane = op.cycles.findIndex(c => c.includes(source));
      const center = op.centers[lane], angle = op.angles[lane] * direction * t;
      const dx = a[0] - center[0], dy = a[1] - center[1];
      return [center[0] + dx * Math.cos(angle) - dy * Math.sin(angle), center[1] + dx * Math.sin(angle) + dy * Math.cos(angle)];
    }
    if (op.motion === 'exchange') {
      const block = op.blocks.findIndex(c => c.includes(source)), center = op.centers[block];
      const pivot = lerp(op.centers[0], op.centers[1], .5), angle = Math.PI * direction * t;
      const dx = center[0] - pivot[0], dy = center[1] - pivot[1];
      const spread=op.spread??.55;
      return [pivot[0] + dx * Math.cos(angle) - dy * spread * Math.sin(angle) + a[0] - center[0], pivot[1] + dy * Math.cos(angle) + dx * spread * Math.sin(angle) + a[1] - center[1]];
    }
    const control = curveControl(a, b, (op.motion === 'mirror' ? .17 : .22) * direction);
    return [(1-t)**2*a[0]+2*(1-t)*t*control[0]+t*t*b[0], (1-t)**2*a[1]+2*(1-t)*t*control[1]+t*t*b[1]];
  }
  function motionPath(level, op, source, direction = 1) {
    const samples = Array.from({ length: 25 }, (_, i) => pointAt(level, op, source, direction, i / 24));
    return samples.map((p, i) => `${i ? 'L' : 'M'} ${fmt(p[0])} ${fmt(p[1])}`).join(' ');
  }
  function glyph(kind) {
    switch (kind) {
      case 'sun': return '<circle r="5"/>' + Array.from({ length: 8 }, (_, i) => `<path d="M0 -9v-3" transform="rotate(${i*45})"/>`).join('');
      case 'wave': return '<path d="M-12 -3q6 -7 12 0t12 0M-12 5q6 -7 12 0t12 0" fill="none" stroke-width="2.4"/>';
      case 'flower': return Array.from({length:5},(_,i)=>`<ellipse cx="0" cy="-6" rx="4" ry="6" transform="rotate(${i*72})"/>`).join('')+'<circle r="2.4" fill="var(--token)" stroke="none"/>';
      case 'drop': return '<path d="M0 -13C-4 -6 -9 -2 -9 4a9 9 0 0 0 18 0C9 -2 4 -6 0 -13Z"/><path d="M4 3v4" stroke="var(--token)" fill="none"/>';
      case 'diamond': return '<path d="M0 -13 10 0 0 13 -10 0Z"/><path d="M0 -7V7" stroke="var(--token)"/>';
      case 'leaf': return '<path d="M-10 10Q-15 -9 11 -12Q14 10-10 10Z"/><path d="M-6 6 6 -6" stroke="var(--token)" fill="none"/>';
      case 'star': return '<path d="m0 -13 3.6 8 8.9.7-6.8 5.7 2.1 8.7L0 5.6l-7.8 4.5 2.1-8.7-6.8-5.7 8.9-.7Z"/>';
      case 'moon': return '<path d="M5 -11a12 12 0 1 0 6 17A10 10 0 0 1 5 -11Z"/>';
      default: return '<circle r="7"/>';
    }
  }
  function token(value, p, slot, mini) {
    const item = E.palette[value];
    return `<g class="piece" data-token="${value}" data-slot="${slot}" transform="translate(${p})" style="--token:${item.color}" ${mini ? '' : `role="button" tabindex="0" aria-label="关注${item.name}色徽章，目前在位置 ${slot+1}"`}>
      <title>${item.name} · 位置 ${slot+1}</title>
      <circle class="token-shadow" cy="4" r="27"/>
      <circle class="token-rim" r="29"/>
      <circle class="token-face" r="25"/>
      <path d="M-20 -9a22 22 0 0 1 40 0" class="token-shine"/>
      <g class="glyph">${glyph(item.glyph)}</g><circle class="tracking-ring" r="36"/>
    </g>`;
  }
  function artwork(level, mini) {
    const c = mini ? '#b7bea7' : '#718675';
    let art = '';
    const circle = (x,y,r,extra='') => `<circle cx="${x}" cy="${y}" r="${r}" ${extra}/>`;
    if(level.scene==='beat_garden') {
      for(const dial of level.dials){
        const [x,y]=dial.center,r=dial.radius;
        art+=circle(x,y,r,'class="beat-rim"')+circle(x,y,r-13,'class="beat-inner"');
        if(!mini){
          for(let i=0;i<dial.count*4;i++)art+=`<path d="M${x} ${y-r-15}v${i%4===0?8:3}" transform="rotate(${i*360/(dial.count*4)} ${x} ${y})" class="tick"/>`;
          art+=`<text x="${x}" y="${y+5}" class="beat-count">${dial.count}</text>`;
        }
      }
      if(!mini)for(let i=1;i<level.dials.length;i++){
        const a=level.dials[0].center,b=level.dials[i].center;
        art+=`<path d="M${a}Q${curveControl(a,b,.19)} ${b}" class="beat-link"/>`;
      }
    } else if(['scale_mirror','folded_scale'].includes(level.scene)) {
      art+=`<polygon points="${level.points.join(' ')}" class="scale-glass"/>`+circle(400,235,151,'class="scale-rim"');
      if(!mini)art+=circle(400,235,166,'class="engraving"')+circle(400,235,65,'class="scale-center"');
      for(const angle of level.mirrorAngles||[])art+=`<path d="M400 65V405" transform="rotate(${angle*180/Math.PI} 400 235)" class="mirror-axis"/>`;
      if(level.scene==='folded_scale')for(const [i,op] of level.ops.entries())if(op.id!=='turn'){
        art+=`<path d="${op.cycles.flat().map(source=>motionPath(level,op,source)).join(' ')}" class="fold-route" style="stroke:${tones[i]}"/>`;
      }
      if(!mini)art+='<path d="M389 235 400 224 411 235 400 246Z" class="mirror-center"/>';
    } else if(level.scene==='branch_tree') {
      const leaves=level.points,pairs=[0,1,2,3].map(i=>[(leaves[2*i][0]+leaves[2*i+1][0])/2,244]);
      for(let i=0;i<4;i++){
        art+=`<rect x="${leaves[2*i][0]-33}" y="302" width="142" height="68" rx="32" class="leaf-nest"/>`;
        for(const j of [2*i,2*i+1])art+=`<path d="M${pairs[i]}Q${pairs[i][0]} 290 ${leaves[j]}" class="tree-twig"/>`;
      }
      const crowns=[[248,152],[552,152]];
      crowns.forEach((p,i)=>{
        for(const j of [2*i,2*i+1])art+=`<path d="M${p}Q${p[0]} 204 ${pairs[j]}" class="tree-branch"/>`;
        art+=`<path d="M400 75Q400 119 ${p}" class="tree-crown"/>`;
      });
      for(const p of [[400,75],...crowns,...pairs])art+=circle(...p,5,'class="tree-joint"');
      if(!mini)art+='<path d="M400 62v-12m-8 6h16" class="tick"/>';
    } else if(level.scene==='garden_gates') {
      art+='<rect x="250" y="85" width="300" height="300" rx="48" class="gate-courtyard"/><path d="M285 120H515V350H285Z" class="gate-walk"/><path d="M365 235h70m-35-35v70" class="gate-walk"/>';
      if(!mini)for(const [x,y] of [[400,120],[515,235],[400,350],[285,235]])art+=`<path d="M${x-15} ${y+10}v-18q15-20 30 0v18" class="garden-door"/>`;
    } else if(level.scene==='shuttle_rail') {
      art+=`<path d="M${level.points.join('L')}" class="shuttle-track"/><path d="M${level.points.at(-1)}Q400 414 ${level.points[0]}" class="shuttle-return"/>`;
      for(let i=0;i<6;i++)art+=`<path d="M${level.points[i]}Q${curveControl(level.points[i],level.points[i+1],i%2?.26:-.26)} ${level.points[i+1]}" class="shuttle-bridge shuttle-${i%2}"/>`;
      if(!mini)art+='<path d="M139 353h63m396 0h63" class="engraving"/>';
    } else if(level.scene==='petal_pages') {
      for(const panel of level.panels){
        art+=`<polygon class="turning-page" data-face="${panel}" points="${panel.map(i=>level.points[i]).join(' ')}"/>`;
        panel.forEach((a,i)=>{const b=panel[(i+1)%4];art+=`<path class="page-edge" data-edge="${a},${b}" d="M${level.points[a]}L${level.points[b]}"/>`;});
      }
      for(const [i,op] of level.ops.entries())for(const cycle of op.cycles)if(cycle.length>2)art+=`<path d="${cycle.map(source=>motionPath(level,op,source)).join(' ')}" class="petal-loop" style="stroke:${tones[i]}"/>`;
      if(!mini)art+='<path d="M380 235q20-28 40 0m-40 0q20 28 40 0" class="page-binding"/>';
    } else if(level.scene==='projective_post') {
      art+=circle(...level.haloCenter,level.haloRadius,'class="star-port-rim"');
      const op=level.ops.find(op=>op.id==='far');
      for(const cycle of op.cycles)art+=`<path d="${cycle.map(source=>motionPath(level,op,source)).join(' ')}" class="far-route"/>`;
      art+=circle(...level.points.at(-1),42,'class="far-dock"');
      if(!mini)art+=circle(...level.haloCenter,level.haloRadius-13,'class="engraving"')+'<path d="M209 290q16-14 32 0m-25 6h18" class="tick"/>';
    } else if(level.scene==='semilinear_halo') {
      art+=circle(...level.haloCenter,level.haloRadius,'class="star-port-rim"');
      const echo=level.ops.find(op=>op.id==='echo');
      for(const cycle of echo.cycles)art+=`<path d="${cycle.map(source=>motionPath(level,echo,source)).join(' ')}" class="echo-triangle"/>`;
      for(const [a,b] of level.ops[1].cycles)art+=`<path d="M${level.points[a]}L${level.points[b]}" class="field-bridge"/>`;
      if(!mini)art+=circle(400,235,44,'class="fixed-star-halo"');
    } else if(level.scene==='hinged_stars') {
      level.starWheels.forEach((w,i)=>{
        art+=circle(...w.center,w.radius,`class="hinged-rim hinged-${i}"`);
        art+=`<polygon points="${w.cycle.map(j=>level.points[j]).join(' ')}" class="hinged-pane hinged-${i}"/>`;
        if(!mini)art+=circle(...w.center,w.radius-14,'class="engraving"');
      });
    } else if(level.scene==='post_hub') {
      for(let i=1;i<level.points.length;i++)art+=`<path d="M${level.points[0]}L${level.points[i]}" class="post-road" style="stroke:${tones[i-1]}"/>`;
      art+='<rect x="351" y="188" width="98" height="95" rx="22" class="post-pavilion"/>';
      if(!mini)art+='<path d="M346 182q54-55 108 0" class="post-roof"/>';
    } else if(['petal_chain','century_flower'].includes(level.scene)) {
      level.ops.forEach((op,i)=>{for(const cycle of op.cycles){
        art+=`<polygon points="${cycle.map(j=>level.points[j]).join(' ')}" class="petal-glass petal-${i}"/>`;
        art+=`<path d="${cycle.map(source=>motionPath(level,op,source)).join(' ')}" class="petal-loop" style="stroke:${tones[i]}"/>`;
      }});
      if(level.scene==='century_flower'){
        art+=circle(400,235,62,'class="century-seal"');
        if(!mini)art+='<text x="400" y="246" class="century-number">100</text><path d="M376 260h48" class="tick"/>';
      }
    } else if(['letter_ring','eight_gate_ring'].includes(level.scene)) {
      art+=circle(400,235,151,'class="scale-rim"');
      if(level.scene==='eight_gate_ring')for(let i=0;i<8;i++)art+=`<path d="M383 64v-9q17-22 34 0v9" transform="rotate(${i*45} 400 235)" class="garden-door"/>`;
      if(!mini)art+='<rect x="373" y="215" width="54" height="38" rx="5" class="letter-envelope"/><path d="m376 218 24 17 24-17" class="letter-fold"/>';
    } else if(level.scene==='long_steps') {
      art+=circle(400,235,151,`stroke="${c}" stroke-width="2" fill="none"`);
      if(!mini){art+=circle(400,235,126,'class="engraving"');for(let i=0;i<24;i++)art+=`<path d="M400 70v${i%3===0?10:4}" transform="rotate(${i*15} 400 235)" class="tick"/>`;}
    } else if(['ratio_dials','mirror_dials'].includes(level.scene)) {
      const radius=level.dialRadius||104;
      for(const x of [240,560]){
        art+=circle(x,235,radius,`stroke="${c}" stroke-width="2" fill="none"`);
        if(!mini)art+=circle(x,235,radius+12,'class="engraving"');
        if(level.scene==='mirror_dials')art+=`<path d="M${x} ${235-radius-16}V${235+radius+16}" class="mirror-axis"/>`;
      }
      if(!mini)art+=`<path d="M${248+radius} 227C390 207 410 263 ${552-radius} 243M${248+radius} 243C390 263 410 207 ${552-radius} 227" class="coupling"/>`;
    } else if(level.scene==='row_yard') {
      for(const y of [160,310])art+=`<path d="M218 ${y}H582" class="yard-rail"/>`;
      for(const [a,b] of level.bridgePairs||[])art+=`<path d="M${level.points[a]}L${level.points[b]}" class="yard-bridge"/>`;
      if(level.localSquare){
        art+=`<polygon class="yard-wheel" data-face="${level.localSquare}" points="${level.localSquare.map(i=>level.points[i]).join(' ')}"/>`;
        level.localSquare.forEach((a,i)=>{const b=level.localSquare[(i+1)%4];art+=`<path d="M${level.points[a]}L${level.points[b]}" class="yard-wheel-edge" data-edge="${a},${b}"/>`;});
      }
      if(!mini)art+='<path d="M221 183v104m358-104v104" class="engraving"/>';
    } else if(level.scene==='pages') {
      for(const panel of level.panels){
        art+=`<polygon class="turning-page" data-face="${panel}" points="${panel.map(i=>level.points[i]).join(' ')}"/>`;
        panel.forEach((a,i)=>{const b=panel[(i+1)%panel.length];art+=`<path class="page-edge" data-edge="${a},${b}" d="M${level.points[a]}L${level.points[b]}"/>`;});
      }
      if(!mini)art+='<path d="M400 122V348m-8-214v202m16-202v202" class="page-binding"/>';
    } else if(['field_halo','pocket_wheel'].includes(level.scene)) {
      const [cx,cy]=level.haloCenter;
      art+=circle(cx,cy,level.haloRadius,`stroke="${c}" stroke-width="2" fill="none"`);
      if(!mini)art+=circle(cx,cy,level.haloRadius+13,'class="engraving"');
      if(level.scene==='pocket_wheel'){
        const op=level.ops.find(op=>op.id==='pocket');
        art+=`<path d="${op.cycles[0].map(source=>motionPath(level,op,source)).join(' ')}" class="pocket-track"/>`;
      }else{
        for(const [a,b] of level.ops[1].cycles)art+=`<path d="M${level.points[a]}L${level.points[b]}" class="field-bridge"/>`;
        if(!mini)art+=circle(cx,cy,43,'class="fixed-star-halo"');
      }
    } else if(level.scene==='star_post') {
      art+=circle(400,235,151,`stroke="${c}" stroke-width="2" fill="none"`);
      const op=level.ops[1];art+=`<path d="${op.cycles[0].map(source=>motionPath(level,op,source)).join(' ')}" class="star-post-route"/>`;
      if(!mini)art+=circle(400,235,65,'class="engraving"');
    } else if(level.scene==='moon_flower') {
      for(const x of [240,560])art+=circle(x,235,100,`stroke="${c}" stroke-width="2" fill="none"`);
      art+='<path d="M354 227q23-18 46 0t46 0M354 243q23-18 46 0t46 0" class="coupling"/>';
      if(!mini)art+='<path d="M233 219q-15 16 0 32m-4-28q-8 12 0 24" class="echo-mirror"/><path d="M569 213a24 24 0 1 0 11 39 22 22 0 0 1-11-39Z" class="center-moon"/>';
    } else if(['islands','linked_islands'].includes(level.scene)) {
      for(const x of [240,560]){
        art+=circle(x,235,104,`stroke="${c}" stroke-width="2" fill="none"`);
        if(!mini)art+=circle(x,235,116,'class="island-shore"');
      }
      art+='<path d="M344 235Q400 185 456 235M344 235Q400 285 456 235" class="ferry-bridge"/>';
      if(level.scene==='linked_islands')art+='<path d="M242 375C315 418 485 418 558 375" class="shared-shaft"/>';
      if(!mini)art+='<path d="M190 402q14-7 28 0t28 0M544 402q14-7 28 0t28 0" class="engraving"/>';
    } else if(level.scene==='staggered_walk') {
      art+=circle(400,235,155,`stroke="${c}" stroke-width="1" fill="none"`);
      for(let i=0;i<8;i++){
        const a=level.points[i],b=level.points[(i+1)%8],mid=lerp(a,b,.5),dx=mid[0]-400,dy=mid[1]-235;
        art+=`<path d="M${a}Q${mid[0]+dx*.12} ${mid[1]+dy*.12} ${b}" class="walking-bridge ${i%2?'second-bridge':'first-bridge'}"/>`;
      }
      if(!mini)art+=circle(400,235,105,'class="engraving"')+'<path d="M385 235h30m-15-15v30" class="tick"/>';
    } else if(level.scene==='edge_lantern') {
      for(const face of [[0,2,3],[0,1,3]])art+=`<polygon class="lantern-face" data-frame-face="${face}" points="${face.map(i=>project(level,level.frameVertices[i])).join(' ')}"/>`;
      for(const [a,b] of level.frameEdges)art+=`<path class="lantern-edge" data-frame-edge="${a},${b}" d="M${project(level,level.frameVertices[a])}L${project(level,level.frameVertices[b])}"/>`;
      level.frameVertices.forEach((v,i)=>{const p=project(level,v);art+=`<circle class="frame-joint" data-frame-point="${i}" cx="${p[0]}" cy="${p[1]}" r="4"/>`;});
      if(!mini)art+='<ellipse cx="400" cy="424" rx="147" ry="11" class="cube-ground"/>';
    } else if(level.scene==='drawers') {
      art+='<rect x="217" y="105" width="366" height="260" rx="16" class="drawer-cabinet"/>';
      for(const row of level.rooms){const a=row[0],b=row.at(-1);art+=`<path d="M${level.points[a]}L${level.points[b]}" class="room-pod" data-room="${a},${b}"/><path d="M${level.points[a]}L${level.points[b]}" class="room-pod-line" data-room="${a},${b}"/>`;}
      if(!mini)art+='<path d="M253 106v-20h294v20" class="service-bracket"/><path d="M384 236h32" class="tick"/>';
    } else if(['shear_window','mirror_window','diagonal_window'].includes(level.scene)) {
      art+=`<polygon class="window-pane" data-face="0,2,4,6" points="${[0,2,4,6].map(i=>level.points[i]).join(' ')}"/>`;
      for(const [a,b] of [[0,2],[2,4],[4,6],[6,0],[1,5],[3,7]])art+=`<path class="window-bar" data-edge="${a},${b}" d="M${level.points[a]}L${level.points[b]}"/>`;
      if(!mini)art+='<path d="M217 92v26m366-26v26M217 352v26m366-26v26M257 52h26m234 0h26M257 418h26m234 0h26" class="window-port"/><path d="M392 235h16m-8-8v16" class="tick"/>';
      if(level.scene==='mirror_window')art+='<path d="M400 70V402" class="mirror-axis"/><path d="M400 219 414 235 400 251 386 235Z" class="mirror-center"/>';
      if(level.scene==='diagonal_window')art+='<path d="M235 70 565 400" class="mirror-axis"/><path d="M400 219 414 235 400 251 386 235Z" class="mirror-center"/>';
    } else if(level.scene==='fano') {
      for(const line of level.lines.slice(0,6)){
        let pair=[line[0],line[1]],length=-1;
        for(const a of line)for(const b of line){const d=Math.hypot(level.points[a][0]-level.points[b][0],level.points[a][1]-level.points[b][1]);if(d>length){length=d;pair=[a,b];}}
        art+=`<path d="M${level.points[pair[0]]}L${level.points[pair[1]]}" class="star-thread"/>`;
      }
      art+=circle(400,235,80,'class="star-circle"');
      if(!mini)art+='<path d="M240 343h320" class="engraving"/>';
    } else if(level.scene==='weave') {
      art+='<path d="M175 110h450v250H175Z" class="book-frame"/><path d="M184 232h432" class="book-seam"/>';
      for(const y of [150,320])art+=`<path d="M193 ${y}H607" class="bookmark-rail"/>`;
      if(!mini)for(let i=0;i<4;i++)art+=`<path d="M${220+i*120} 190Q${340+i*60} 235 ${580-i*120} 280" class="woven-thread"/>`;
    } else if(level.scene==='echo_wheels') {
      for(const x of [240,560]){
        art+=circle(x,235,108,`stroke="${c}" stroke-width="2" fill="none"`);
        art+=`<path d="M${x-108} 297L${x+108} 173" class="echo-mirror"/>`;
      }
      if(!mini)art+='<path d="M353 227q23-20 47 0t47 0M353 243q23-20 47 0t47 0" class="coupling"/>';
    } else if(level.scene==='borrowed_stars') {
      art+=circle(400,74,43,'class="fixed-star-halo"')+'<path d="M400 119v19M300 178Q400 126 500 178" class="borrow-thread"/><g data-spin-pivot="400,305"><rect x="278" y="238" width="244" height="134" rx="23" class="star-casket"/>';
      art+='<path d="M300 260 500 350M500 260 300 350" class="casket-diagonal"/></g>';
      if(!mini)art+='<path d="M388 305h24m-12-12v24" class="tick"/>';
    } else if(['three_petals','cove_ring','petal_ring'].includes(level.scene)) {
      level.ops.forEach((op,i)=>{
        const path=op.cycles[0].map(source=>motionPath(level,op,source)).join(' ');
        art+=`<path d="${path}" class="petal-loop" style="stroke:${tones[i]}"/>`;
        const points=op.cycles[0].map(source=>level.points[source]);
        art+=`<path d="M${points[0]}Q${curveControl(points[0],points[1],.22)} ${points[1]}Q${curveControl(points[1],points[2],.22)} ${points[2]}Q${curveControl(points[2],points[0],.22)} ${points[0]}Z" class="petal-glass petal-${i}"/>`;
      });
      if(level.scene!=='three_petals'&&!mini)art+=circle(400,235,35,'class="engraving"')+'<path d="M390 235h20m-10-10v20" class="tick"/>';
    } else if (['cube_flips','cube_turns','cube_shear','octahedron','mirror_compass','prism'].includes(level.scene)) {
      for(const face of level.faces) art+=`<polygon class="cube-face" data-face="${face.join(',')}" points="${face.map(i=>level.points[i]).join(' ')}"/>`;
      for(const [a,b] of level.edges) art+=`<path class="cube-edge ${a<4&&b<4?'back-edge':''}" data-edge="${a},${b}" d="M${level.points[a]}L${level.points[b]}"/>`;
      if(!mini)art+='<ellipse cx="400" cy="404" rx="160" ry="13" class="cube-ground"/>';
      if(level.gateFace)art+=`<polygon points="${level.gateFace.map(i=>level.points[i]).join(' ')}" class="gate-plane"/>`;
      if(level.scene==='mirror_compass')art+=`<polygon points="${[0,2,1,3].map(i=>level.points[i]).join(' ')}" class="compass-mirror"/>`;
    } else if(level.scene==='double_mirror') {
      art+=circle(400,235,151,`stroke="${c}" stroke-width="2" fill="none"`);
      art+='<path d="M400 38V432" class="mirror-axis"/><path d="M307 396 493 74" class="second-mirror-axis"/>';
      if(!mini)art+=circle(400,235,169,'class="engraving"')+'<path d="M400 220 415 235 400 250 385 235Z" class="mirror-center"/>';
    } else if(level.scene==='rhythm') {
      art+=circle(270,235,80,`stroke="${c}" stroke-width="2" fill="none"`)+circle(555,235,106,`stroke="${c}" stroke-width="2" fill="none"`);
      art+='<path d="M350 226H449M350 244H449" class="coupling"/>';
      if(!mini)art+='<text x="270" y="240" class="rhythm-label">两拍</text><text x="555" y="240" class="rhythm-label">三拍</text><path d="M392 218v34m10-34v34m10-34v34" class="tick"/>';
    } else if(['four_rooms','three_rooms','room_parade'].includes(level.scene)) {
      art+=circle(400,235,level.scene==='room_parade'?126:135,`stroke="${c}" stroke-width="1.5" fill="none" stroke-dasharray="4 7"`);
      for(const pair of level.rooms){
        const a=level.points[pair[0]],b=level.points[pair[1]];
        art+=`<path d="M${a}L${b}" class="room-pod" data-room="${pair.join(',')}"/><path d="M${a}L${b}" class="room-pod-line" data-room="${pair.join(',')}"/>`;
      }
      if(!mini)art+='<path d="M346 65H454m-108 0v13m108-13v13" class="service-bracket"/><path d="M382 235h36m-18-18v36" class="tick"/>';
    } else if(level.scene==='postal') {
      art+=circle(400,235,142,`stroke="${c}" stroke-width="2" fill="none"`);
      art+=`<path d="${level.ops[0].cycles[0].map((v,i)=>(i?'L':'M')+level.points[v]).join(' ')}Z" class="postal-route"/>`;
      if(!mini)art+='<path d="M370 406h60m-48 7h36" class="engraving"/>';
    } else if(level.scene==='five_petals') {
      art+=circle(400,235,151,`stroke="${c}" stroke-width="2" fill="none"`);
      art+=`<path d="${level.ops[1].cycles[0].map((v,i)=>(i?'L':'M')+level.points[v]).join(' ')}Z" class="triangle-ribbon ribbon-two"/>`;
      if(!mini){
        for(const p of level.points)art+=`<path d="M400 235Q${p[0]} 235 ${p}" class="engraving"/>`;
        art+=circle(400,235,35,'class="engraving"');
      }
    } else if(level.scene==='butterfly') {
      for(const x of [280,520])art+=circle(x,235,120,`stroke="${c}" stroke-width="2" fill="none"`);
      if(!mini)art+='<path d="M386 212Q370 160 344 162M414 212Q430 160 456 162" class="coupling"/><path d="M400 274v26" class="tick"/>';
    } else if(level.scene==='asymmetric_overlap') {
      for(const [x,r] of [[260,120],[510,130]]){
        art+=circle(x,240,r,`stroke="${c}" stroke-width="2" fill="none"`);
        if(!mini)art+=circle(x,240,r+12,'class="engraving"');
      }
      if(!mini)art+='<text x="260" y="245" class="rhythm-label">四拍</text><text x="510" y="245" class="rhythm-label">五拍</text>';
    } else if (['wheel','mirror'].includes(level.scene)) {
      art += circle(400,235,151,`stroke="${c}" stroke-width="2" fill="none"`);
      if (!mini) {
        art += circle(400,235,140,'class="engraving"') + circle(400,235,164,'class="engraving"');
        for(let i=0;i<40;i++) art += `<path d="M400 61v${i%8===0?9:4}" transform="rotate(${i*9} 400 235)" class="tick"/>`;
        art += '<path d="M400 191 412 223 444 235 412 247 400 279 388 247 356 235 388 223Z" class="center-flower"/>';
      }
      if (level.scene === 'mirror') art += '<path d="M400 35V435" class="mirror-axis"/><path d="M387 234 400 221 413 234 400 247Z" class="mirror-center"/>';
    } else if (['twins','linked','exchange'].includes(level.scene)) {
      for (const x of [240,560]) {
        art += circle(x,235,108,`stroke="${c}" fill="none" stroke-width="2"`);
        if (!mini) art += circle(x,235,121,'class="engraving"') + `<path d="M${x-18} 235h36m-18-18v36" class="tick center-tick"/>`;
      }
      if (level.scene === 'linked') art += '<path d="M350 223C390 196 410 274 450 247M350 247C390 274 410 196 450 223" class="coupling"/>';
      if (level.scene === 'exchange' && !mini) art += '<path d="M240 374C380 463 563 434 601 318M560 94C420 6 237 35 199 151" class="room-orbit"/><path d="M141 352v30h198v-30M461 352v30h198v-30" class="room-sill"/>';
    } else if (level.scene === 'triad') {
      art += '<path d="M280 115Q409 32 520 115Q608 246 520 355Q326 288 280 115Z" class="triangle-ribbon ribbon-one"/><path d="M520 115Q614 245 520 355Q400 435 280 355Q339 163 520 115Z" class="triangle-ribbon ribbon-two"/>';
      if(!mini) art += '<circle cx="400" cy="235" r="40" class="engraving"/><path d="M385 235h30m-15-15v30" class="tick"/>';
    } else if (level.scene === 'dial') {
      art += circle(400,235,Math.sqrt(120**2*2),`stroke="${c}" stroke-width="2" fill="none"`);
      art += '<path d="M290 94Q400 30 510 94M310 107H490" class="scissors-track"/>';
      if(!mini) art += circle(400,235,72,'class="engraving"') + '<path d="M400 215v40m-20-20h40" class="tick"/>';
    } else if (level.scene === 'hub') {
      for (const p of level.points.slice(1)) art += `<path d="M400 237L${p}" stroke="${c}" stroke-width="3" fill="none"/>`;
      if(!mini) art += circle(400,237,50,'class="engraving"') + '<path d="M199 374Q400 454 601 374" class="engraving"/>';
    } else if (level.scene === 'quaternion') {
      art += circle(400,235,164,`stroke="${c}" stroke-width="2" fill="none"`) + circle(400,235,84,`stroke="${c}" stroke-width="2" fill="none"`);
      if(!mini) art += circle(400,235,184,'class="engraving"') + '<path d="M410 211a25 25 0 1 0 12 39 22 22 0 0 1-12-39Z" class="center-moon"/>';
      for(const cycle of level.ops[1].cycles) art += `<path d="${cycle.map((v,i)=>(i?'L':'M')+level.points[v]).join(' ')}Z" class="tide-trace"/>`;
    } else if (level.scene === 'overlap') {
      for(const x of [260,520]) {
        art += circle(x,238,130,`stroke="${c}" stroke-width="2" fill="none"`);
        if(!mini) art += circle(x,238,142,'class="engraving"') + `<path d="M${x-17} 238h34m-17-17v34" class="tick center-tick"/>`;
      }
    }
    return art;
  }
  function draw(svg, level, state, {mini=false, labels=false} = {}) {
    if(mini){
      const xs=level.points.map(p=>p[0]),ys=level.points.map(p=>p[1]);
      const x=Math.min(...xs)-62,y=Math.min(...ys)-62;
      svg.setAttribute('viewBox',`${x} ${y} ${Math.max(...xs)-x+62} ${Math.max(...ys)-y+62}`);
    } else svg.setAttribute('viewBox','0 0 800 480');
    svg.classList.toggle('mini-board',mini);
    svg.innerHTML = `<g class="mechanism-art">${artwork(level, mini)}</g><g class="slot-layer">${level.points.map((p,i)=>`<g transform="translate(${p})"><circle r="34" class="socket"/>${labels?`<text y="-42" class="slot-number">${i+1}</text>`:''}</g>`).join('')}</g><g class="preview-paths"></g><g class="piece-layer">${state.map((value,slot)=>token(value,level.points[slot],slot,mini)).join('')}</g>`;
    svg.dataset.level = level.id;
  }
  function preview(svg, level, op, direction) {
    const paths=svg.querySelector('.preview-paths');
    if(!paths) return;
    svg.querySelectorAll('.piece').forEach(piece=>piece.classList.remove('affected','unaffected'));
    if(!op){ paths.innerHTML=''; return; }
    const map=E.permutation(op,level.points.length,direction), color=tones[level.ops.indexOf(op) % tones.length];
    paths.innerHTML=map.map((destination,source)=>{
      if(destination===source) return '';
      const p=pointAt(level,op,source,direction,.62), next=pointAt(level,op,source,direction,.65);
      const angle=Math.atan2(next[1]-p[1],next[0]-p[0])*180/Math.PI;
      return `<path d="${motionPath(level,op,source,direction)}" class="preview-line" style="stroke:${color}"/><path d="M-7 -5 0 0 -7 5" class="preview-arrow" transform="translate(${p}) rotate(${angle})" style="stroke:${color}"/>`;
    }).join('');
    svg.querySelectorAll('.piece').forEach(piece=>piece.classList.add(map[+piece.dataset.slot]===+piece.dataset.slot?'unaffected':'affected'));
  }
  function animate(svg, level, before, op, direction, duration, valid) {
    const pieces = new Map([...svg.querySelectorAll('.piece')].map(piece=>[+piece.dataset.token,piece]));
    const started = performance.now();
    return new Promise(resolve=>{
      function frame(now) {
        if(!valid()){ resolve(false); return; }
        const t=Math.min(1,(now-started)/duration), eased=t*t*(3-2*t);
        before.forEach((value,source)=>{
          const p=pointAt(level,op,source,direction,eased);
          pieces.get(value).setAttribute('transform',`translate(${p})`);
        });
        if(op.motion==='spatial'||op.turnFrame){
          svg.querySelectorAll('[data-edge]').forEach(edge=>{const [a,b]=edge.dataset.edge.split(',').map(Number);edge.setAttribute('d',`M${pointAt(level,op,a,direction,eased)}L${pointAt(level,op,b,direction,eased)}`);});
          svg.querySelectorAll('[data-face]').forEach(face=>face.setAttribute('points',face.dataset.face.split(',').map(Number).map(source=>pointAt(level,op,source,direction,eased)).join(' ')));
          svg.querySelectorAll('[data-spin-pivot]').forEach(frame=>{const [x,y]=frame.dataset.spinPivot.split(',').map(Number),angle=op.angle??op.angles?.[0]??0;frame.setAttribute('transform',`rotate(${angle*direction*eased*180/Math.PI} ${x} ${y})`);});
        }
        if(op.motion==='spatial'&&level.frameVertices){
          const frame=level.frameVertices.map(v=>project(level,rotateVector(v,op,direction,eased)));
          svg.querySelectorAll('[data-frame-edge]').forEach(edge=>{const [a,b]=edge.dataset.frameEdge.split(',').map(Number);edge.setAttribute('d',`M${frame[a]}L${frame[b]}`);});
          svg.querySelectorAll('[data-frame-face]').forEach(face=>face.setAttribute('points',face.dataset.frameFace.split(',').map(Number).map(i=>frame[i]).join(' ')));
          svg.querySelectorAll('[data-frame-point]').forEach(pin=>{const p=frame[+pin.dataset.framePoint];pin.setAttribute('cx',p[0]);pin.setAttribute('cy',p[1]);});
        }
        if(['carousel','exchange','orbit'].includes(op.motion))svg.querySelectorAll('[data-room]').forEach(room=>{const [a,b]=room.dataset.room.split(',').map(Number);room.setAttribute('d',`M${pointAt(level,op,a,direction,eased)}L${pointAt(level,op,b,direction,eased)}`);});
        if(t<1) requestAnimationFrame(frame); else resolve(true);
      }
      requestAnimationFrame(frame);
    });
  }
  root.WorkshopRender={escape,draw,preview,animate,pointAt,motionPath,glyph,rotateVector,project};
})(globalThis);
