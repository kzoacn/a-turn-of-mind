const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const E=require('../web-native/engine.js');
const levels=require('../web-native/levels.js');
const original=require('./fixtures/collection-one.json');
const secondOriginal=require('./fixtures/collection-two.json');
const thirdOriginal=require('./fixtures/collection-three.json');
const fourthFifthOriginal=require('./fixtures/collections-four-five.json');
const sandbox={Workshop:E};vm.createContext(sandbox);vm.runInContext(fs.readFileSync(require.resolve('../web-native/render.js'),'utf8'),sandbox);
const render=sandbox.WorkshopRender;

const closureCache=new Map();
function closure(level){
  if(closureCache.has(level.id))return closureCache.get(level.id);
  const identity=level.target.slice(),queue=[identity],seen=new Map([[E.key(identity),identity]]);
  for(let i=0;i<queue.length;i++)for(const move of E.movesFor(level)){
    const op=level.ops.find(op=>op.id===move.op),next=E.apply(queue[i],op,move.direction),key=E.key(next);
    if(!seen.has(key)){seen.set(key,next);queue.push(next);}
  }
  closureCache.set(level.id,seen);return seen;
}
const compose=(p,q)=>q.map(value=>p[value]);
const inverse=p=>p.map((_,i)=>p.indexOf(i));
const parity=p=>p.reduce((sum,value,i)=>sum+p.slice(i+1).filter(other=>value>other).length,0)%2;

test('one hundred authored lessons use distinct colors and at most four tools',()=>{
  assert.equal(levels.length,100);assert.equal(new Set(levels.map(l=>l.id)).size,100);
  assert.equal(new Set(E.palette.map(c=>c.color)).size,8);
  for(const level of levels){
    assert.equal(new Set(level.initial).size,level.points.length);
    assert.deepEqual(level.initial.slice().sort((a,b)=>a-b),level.target);
    assert.ok(level.points.length<=E.palette.length);
    assert.ok(!E.equal(level.initial,level.target));
    assert.ok(level.ops.length>=1&&level.ops.length<=4);
    assert.equal(new Set(level.ops.map(op=>op.id)).size,level.ops.length);
  }
});
test('the original ten puzzles retain their ids, revisions, positions and operations',()=>{
  original.forEach((saved,i)=>{for(const key of Object.keys(saved))assert.deepEqual(levels[i][key],saved[key],`${saved.id}/${key}`);});
});
test('the second collection keeps every saved-state and geometry definition',()=>{
  secondOriginal.forEach((saved,i)=>{for(const key of Object.keys(saved))assert.deepEqual(levels[i+10][key],saved[key],`${saved.id}/${key}`);});
});
test('the third collection keeps every saved-state and geometry definition',()=>{
  thirdOriginal.forEach((saved,i)=>{for(const key of Object.keys(saved))assert.deepEqual(levels[i+20][key],saved[key],`${saved.id}/${key}`);});
});
test('collections four and five retain their complete authored definitions',()=>{
  fourthFifthOriginal.forEach((saved,i)=>assert.deepEqual(levels[i+30],saved,saved.id));
});
for(const level of levels){
  test(`${level.number}: ${level.id}, group and shortest solution`,()=>{
    assert.equal(closure(level).size,level.group_order);
    const solution=E.solve(level.initial,level.target,level);
    assert.ok(solution.found);assert.equal(solution.moves.length,level.shortest);
    const game=new E.Session(level);
    for(const move of level.certificate)assert.ok(game.move(move));
    assert.ok(game.solved);assert.equal(game.move(E.movesFor(level)[0]),null);
    for(let i=0;i<level.shortest;i++)assert.ok(game.undo());
    assert.deepEqual(game.state,level.initial);
    for(let i=0;i<level.shortest;i++)assert.ok(game.redo());
    assert.ok(game.solved);
    const restored=new E.Session(level,game.history);assert.ok(restored.solved);
    restored.restart();assert.deepEqual(restored.state,level.initial);assert.equal(restored.future.length,0);
    assert.equal(restored.move({op:'not-a-tool',direction:1}),null);
    assert.equal(restored.move({op:level.ops[0].id,direction:0}),null);
  });
  test(`${level.number}: every tool is reversible, and animations land on their real destinations`,()=>{
    for(const op of level.ops){
      let state=level.target.slice();
      for(let i=0;i<op.order;i++)state=E.apply(state,op);
      assert.deepEqual(state,level.target);
      assert.deepEqual(E.apply(E.apply(level.initial,op,1),op,-1),level.initial);
      for(const direction of [1,-1]){
        const map=E.permutation(op,level.points.length,direction);
        assert.equal(new Set(map).size,level.points.length);
        for(let source=0;source<map.length;source++){
          const start=render.pointAt(level,op,source,direction,0),end=render.pointAt(level,op,source,direction,1);
          for(let axis=0;axis<2;axis++){
            assert.ok(Math.abs(start[axis]-level.points[source][axis])<.01);
            assert.ok(Math.abs(end[axis]-level.points[map[source]][axis])<.01);
          }
          for(let step=0;step<=20;step++){
            const p=render.pointAt(level,op,source,direction,step/20);
            assert.ok(p[0]>=29&&p[0]<=771&&p[1]>=29&&p[1]<=451,`${level.id}/${op.id} token clipped at ${p}`);
          }
        }
      }
    }
  });
}
test('same group, different generating sets: exact closures and target comparison',()=>{
  for(const [a,b] of [[levels[2],levels[3]],[levels[5],levels[6]]]){
    assert.deepEqual([...closure(a).keys()].sort(),[...closure(b).keys()].sort());
  }
  assert.deepEqual(levels[5].initial,levels[6].initial);assert.deepEqual(levels[5].target,levels[6].target);
  assert.equal(levels[5].shortest,5);assert.equal(levels[6].shortest,3);
});
test('dihedral and quaternion relations identify the advertised groups',()=>{
  const dihedral=levels[1],r=E.permutation(dihedral.ops[0],5),s=E.permutation(dihedral.ops[1],5);
  assert.deepEqual(compose(s,compose(r,s)),inverse(r));
  const q=levels[8],i=E.permutation(q.ops[0],8),j=E.permutation(q.ops[1],8);
  assert.deepEqual(compose(i,i),compose(j,j));assert.notDeepEqual(compose(i,i),q.target);
  assert.deepEqual(compose(j,compose(i,inverse(j))),inverse(i));
  assert.notDeepEqual(compose(i,j),compose(j,i));
});
test('A4 has only even permutations; the greenhouse preserves its two blocks',()=>{
  for(const permutation of closure(levels[4]).values())assert.equal(parity(permutation),0);
  for(const permutation of closure(levels[7]).values()){
    const left=permutation.slice(0,3).slice().sort((a,b)=>a-b).join(',');
    assert.ok(left==='0,1,2'||left==='3,4,5');
  }
});
test('the same two-step destination in the moon puzzle has two different tools',()=>{
  const level=levels[8];
  for(const op of level.ops)assert.deepEqual(E.apply(E.apply(level.initial,op),op),level.target);
});
test('solver separates budget exhaustion from unreachable targets',()=>{
  const level=levels[0];
  const unreachable=E.solve([0,2,1,3,4],level.target,level);
  assert.equal(unreachable.found,false);assert.equal(unreachable.exhausted,true);
  const bounded=E.solve(levels[9].initial,levels[9].target,levels[9],1);
  assert.equal(bounded.found,false);assert.equal(bounded.exhausted,false);
});
test('new moves after undo discard the abandoned future; malformed saves stop safely',()=>{
  const level=levels[5],game=new E.Session(level);
  game.move({op:'turn',direction:1});game.undo();assert.equal(game.future.length,1);
  game.move({op:'swap',direction:1});assert.equal(game.future.length,0);
  const restored=new E.Session(level,[{op:'turn',direction:1},null,{op:'swap',direction:1}]);
  assert.equal(restored.history.length,1);
});
test('second collection: mirror, coordinate and affine relations',()=>{
  const mirror=levels[10],a=E.permutation(mirror.ops[0],6),b=E.permutation(mirror.ops[1],6);
  assert.deepEqual(compose(a,a),mirror.target);assert.deepEqual(compose(b,b),mirror.target);
  const r=compose(b,a);let p=mirror.target;
  for(let i=0;i<6;i++)p=compose(r,p);assert.deepEqual(p,mirror.target);
  const doors=levels[11],flips=doors.ops.map(op=>E.permutation(op,8));
  for(const x of flips)for(const y of flips)assert.deepEqual(compose(x,y),compose(y,x));
  const postal=levels[15],t=E.permutation(postal.ops[0],5),d=E.permutation(postal.ops[1],5);
  assert.deepEqual(compose(d,compose(t,inverse(d))),compose(t,t));
  assert.deepEqual(E.apply(E.apply(E.apply(levels[13].target,levels[13].ops[0]),levels[13].ops[0]),levels[13].ops[0]),levels[13].initial);
});
test('the cube operations preserve edges and yield 24 rotations on eight vertices',()=>{
  const level=levels[12],edges=new Set(level.edges.map(pair=>pair.slice().sort((a,b)=>a-b).join(',')));
  for(const op of level.ops){
    const p=E.permutation(op,8);
    for(const pair of level.edges)assert.ok(edges.has(pair.map(i=>p[i]).sort((a,b)=>a-b).join(',')));
  }
  assert.equal(closure(level).size,24);
});
test('two new generating sets realize precisely the same A5 and target',()=>{
  assert.deepEqual([...closure(levels[16]).keys()].sort(),[...closure(levels[17]).keys()].sort());
  assert.deepEqual(levels[16].initial,levels[17].initial);
  assert.equal(levels[16].shortest,5);assert.equal(levels[17].shortest,6);
  for(const p of closure(levels[16]).values())assert.equal(parity(p),0);
});
test('new room groups preserve their paired blocks',()=>{
  for(const level of [levels[14],levels[18]]){
    const blocks=new Set(level.rooms.map(pair=>pair.slice().sort((a,b)=>a-b).join(',')));
    for(const p of closure(level).values())for(const pair of level.rooms)assert.ok(blocks.has(pair.map(i=>p[i]).sort((a,b)=>a-b).join(',')));
  }
});
test('repairing adjacent stations along one route saves two moves',()=>{
  const level=levels[14];
  assert.equal(E.solve([0,1,3,2,4,5,6,7],level.target,level).moves.length,3);
  assert.equal(E.solve([0,1,2,3,5,4,6,7],level.target,level).moves.length,5);
  assert.equal(E.solve(level.initial,level.target,level).moves.length,6);
});
test('the final hint solver can solve even the farthest reachable state',()=>{
  const level=levels[19],states=closure(level),farthest=[...states.values()].at(-1);
  assert.equal(states.size,40320);
  const started=performance.now(),solution=E.solve(farthest,level.target,level);
  assert.ok(solution.found);assert.equal(solution.moves.length,level.diameter);
  let state=farthest;for(const move of solution.moves)state=E.apply(state,level.ops.find(op=>op.id===move.op),move.direction);
  assert.deepEqual(state,level.target);
  console.log(`S8 farthest-state hint: ${solution.visited} states, ${Math.round(performance.now()-started)} ms`);
});
test('the tetrahedral lantern rotates rigidly and its colors remain edge midpoints',()=>{
  const level=levels[21];
  for(const op of level.ops)for(const direction of [1,-1])for(const t of [0,.25,.5,.75,1]){
    const frame=level.frameVertices.map(v=>render.rotateVector(v,op,direction,t));
    for(let i=0;i<level.frameEdges.length;i++){
      const [a,b]=level.frameEdges[i],squared=frame[a].reduce((sum,x,k)=>sum+(x-frame[b][k])**2,0);
      assert.ok(Math.abs(squared-8)<1e-8);
      const midpoint=frame[a].map((x,k)=>(x+frame[b][k])/2),color=render.rotateVector(level.vertices[i],op,direction,t);
      color.forEach((value,k)=>assert.ok(Math.abs(value-midpoint[k])<1e-8));
    }
  }
});
test('the paired window puzzles generate exactly SL(2,3), with the same target',()=>{
  const a=levels[23],b=levels[24],mod=x=>(x%3+3)%3;
  assert.deepEqual([...closure(a).keys()].sort(),[...closure(b).keys()].sort());
  assert.deepEqual(a.initial,b.initial);assert.equal(a.shortest,4);assert.equal(b.shortest,2);
  for(const p of closure(a).values()){
    const u=a.gridVectors[p[3]],v=a.gridVectors[p[5]];
    assert.equal(mod(u[0]*v[1]-u[1]*v[0]),1);
    a.gridVectors.forEach(([x,y],i)=>{
      assert.equal(mod(x*u[0]+y*v[0]),mod(a.gridVectors[p[i]][0]));
      assert.equal(mod(x*u[1]+y*v[1]),mod(a.gridVectors[p[i]][1]));
    });
  }
  const involutions=[...closure(a).values()].filter(p=>!E.equal(p,a.target)&&E.equal(compose(p,p),a.target));
  assert.equal(involutions.length,1);assert.deepEqual(involutions[0],a.initial);
});
test('the star weave preserves every Fano line',()=>{
  const level=levels[25],lines=new Set(level.lines.map(line=>line.slice().sort((a,b)=>a-b).join(',')));
  assert.equal(lines.size,7);
  for(const line of level.lines)assert.equal(line.reduce((value,i)=>value^(i+1),0),0);
  for(const p of closure(level).values())for(const line of level.lines)assert.ok(lines.has(line.map(i=>p[i]).sort((a,b)=>a-b).join(',')));
});
test('the bookmark shuffles have the promised repeated behavior and translations',()=>{
  const level=levels[26];let outside=level.target.slice(),inside=level.target.slice();
  for(let i=0;i<3;i++){outside=E.apply(outside,level.ops[0]);inside=E.apply(inside,level.ops[1]);}
  assert.deepEqual(outside,level.target);assert.deepEqual(inside,level.initial);
  for(let mask=0;mask<8;mask++)assert.ok(closure(level).has(E.key(level.target.map(i=>i^mask))));
  assert.equal([...closure(level).values()].filter(p=>!E.equal(p,level.target)&&E.equal(compose(p,p),level.target)).length,7);
});
test('the echo cancels just one side, and the drawer group preserves its two layers',()=>{
  const echo=levels[27];let state=echo.initial.slice();
  for(const id of ['together','right_mirror','together','right_mirror'])state=E.apply(state,echo.ops.find(op=>op.id===id));
  assert.deepEqual(state,echo.target);
  const drawer=levels[22],blocks=new Set(['0,1,2','3,4,5']);
  for(const p of closure(drawer).values())for(const block of drawer.rooms)assert.ok(blocks.has(block.map(i=>p[i]).sort((a,b)=>a-b).join(',')));
});
test('the borrowed stars have orbits of sizes one, two and four',()=>{
  const level=levels[28],group=[...closure(level).values()];
  assert.deepEqual([...new Set(group.map(p=>p[0]))],[0]);
  assert.deepEqual([...new Set(group.map(p=>p[1]))].sort(),[1,2]);
  assert.deepEqual([...new Set(group.map(p=>p[3]))].sort(),[3,4,5,6]);
  let state=level.initial;
  for(const id of ['borrow','casket','borrow','casket'])state=E.apply(state,level.ops.find(op=>op.id===id));
  assert.deepEqual(state,level.target);
});
test('the three-petal finale uses A7 and all three petals',()=>{
  const level=levels[29];assert.equal(closure(level).size,2520);
  for(const p of closure(level).values())assert.equal(parity(p),0);
  assert.equal(level.initial[0],level.target[0]);
  assert.deepEqual(level.ops.map(op=>op.cycles[0].filter(i=>level.ops.every(other=>other.cycles[0].includes(i)))),[[0],[0],[0]]);
  assert.equal(new Set(level.certificate.map(move=>move.op)).size,3);
});
test('new generating-set comparisons keep identical goals and the claimed costs',()=>{
  for(const [a,b,first,second] of [[32,33,6,3],[43,44,6,5]]){
    assert.deepEqual(levels[a].initial,levels[b].initial);assert.deepEqual(levels[a].target,levels[b].target);
    assert.deepEqual([...closure(levels[a]).keys()].sort(),[...closure(levels[b]).keys()].sort());
    assert.equal(levels[a].shortest,first);assert.equal(levels[b].shortest,second);
  }
  assert.deepEqual(levels[47].initial,levels[48].initial);
  assert.equal(levels[47].shortest,9);assert.equal(levels[48].shortest,5);
  for(const k of closure(levels[48]).keys())assert.ok(closure(levels[47]).has(k));
  assert.ok(closure(levels[48]).size<closure(levels[47]).size);
});
test('the signed compass actions have the promised proper and full symmetries',()=>{
  const proper=levels[34],full=levels[40];
  const determinant=([u,v,w])=>u[0]*(v[1]*w[2]-v[2]*w[1])-v[0]*(u[1]*w[2]-u[2]*w[1])+w[0]*(u[1]*v[2]-u[2]*v[1]);
  for(const p of closure(proper).values())assert.equal(determinant([proper.vertices[p[0]],proper.vertices[p[2]],proper.vertices[p[4]]]),1);
  const signs=new Set();
  for(const p of closure(full).values())signs.add(determinant([full.vertices[p[0]],full.vertices[p[2]],full.vertices[p[4]]]));
  assert.deepEqual([...signs].sort(),[-1,1]);
  assert.deepEqual([...closure(full).keys()].sort(),[...closure(levels[18]).keys()].sort());
});
test('the extended window is GL(2,3), including both determinant signs',()=>{
  const level=levels[35],mod=x=>(x%3+3)%3,signs=new Set();
  for(const p of closure(level).values()){
    const u=level.gridVectors[p[3]],v=level.gridVectors[p[5]],det=mod(u[0]*v[1]-u[1]*v[0]);
    assert.ok(det!==0);signs.add(det);
    level.gridVectors.forEach(([x,y],i)=>{assert.equal(mod(x*u[0]+y*v[0]),mod(level.gridVectors[p[i]][0]));assert.equal(mod(x*u[1]+y*v[1]),mod(level.gridVectors[p[i]][1]));});
  }
  assert.deepEqual([...signs].sort(),[1,2]);
});
test('the two affine star galleries are actual finite-field affine groups',()=>{
  const f8=levels[37],mul=(a,b)=>{let out=0;for(let i=0;i<3;i++){if(b&1)out^=a;b>>=1;a=((a<<1)^((a&4)?11:0))&7;}return out;};
  for(const p of closure(f8).values()){
    const b=p[0],a=p[1]^b;assert.ok(a!==0);
    p.forEach((v,i)=>assert.equal(v,mul(a,i)^b));
  }
  const f7=levels[38];
  for(const p of closure(f7).values()){
    const b=p[0],a=(p[1]-b+7)%7;assert.ok(a!==0);
    p.forEach((v,i)=>assert.equal(v,(a*i+b)%7));
  }
});
test('the moon/flower coupling inverts the flower and has a unique involution',()=>{
  const level=levels[45],a=E.permutation(level.ops[0],7),b=E.permutation(level.ops[1],7);
  assert.deepEqual(compose(b,compose(a,inverse(b))),inverse(a));
  const involutions=[...closure(level).values()].filter(p=>!E.equal(p,level.target)&&E.equal(compose(p,p),level.target));
  assert.equal(involutions.length,1);assert.deepEqual(involutions[0],compose(b,b));
});
test('the controlled cube gates generate affine transformations of three bits',()=>{
  const level=levels[46];
  for(const p of closure(level).values()){
    const b=p[0],columns=[p[1]^b,p[2]^b,p[4]^b];
    p.forEach((v,i)=>{let expected=b;for(let k=0;k<3;k++)if(i&(1<<k))expected^=columns[k];assert.equal(v,expected);});
  }
  assert.equal(closure(level).size,1344);
});
test('both new A8 mechanisms contain every even permutation and use distinct structures',()=>{
  for(const i of [39,49]){assert.equal(closure(levels[i]).size,20160);for(const p of closure(levels[i]).values())assert.equal(parity(p),0);}
  assert.equal(levels[49].ops.length,4);
  assert.equal(new Set(levels[49].certificate.map(m=>m.op)).size,4);
});

test('the new clock hints describe executable solutions with the correct direction',()=>{
  const solutions={
    51:[['three',1],['two',-1]],52:[['same',1],['opposite',1]],
    54:[['all',1],['east',1]],55:[['left_fast',1],['left_fast',1],['right_fast',-1]],
    57:[['first',1],['second',1],['all',-1]],58:[['same',1],['same',1],['apart',1]],
    62:[['stride',1],['stride',1],['stride',1]],66:[['fold',1],['five',1]],
    74:[['crown',1],['branch',1],['twig',1],['branch',1],['crown',1]],
    79:[['linked',-1],['linked',-1],['linked',-1]],
    86:[['first',1],['second',1],['first',1],['second',1]]
  };
  for(const [number,word] of Object.entries(solutions)){
    const level=levels[number-1];let state=level.initial;
    for(const [id,direction] of word)state=E.apply(state,level.ops.find(op=>op.id===id),direction);
    assert.deepEqual(state,level.target,`${number} hint must solve, not deepen the scramble`);
  }
});
test('all new same-group comparisons have identical targets and verified distances',()=>{
  for(const [x,y,a,b] of [[62,63,3,2],[77,78,5,7],[83,84,7,4],[91,92,5,4],[96,97,3,2],[98,99,10,6],[36,87,4,3],[47,88,4,5]]){
    const first=levels[x-1],second=levels[y-1];
    assert.deepEqual(first.initial,second.initial);assert.deepEqual(first.target,second.target);
    assert.deepEqual([...closure(first).keys()].sort(),[...closure(second).keys()].sort());
    assert.equal(first.shortest,a);assert.equal(second.shortest,b);
  }
});
test('different-group comparisons accurately describe subgroup restrictions',()=>{
  for(const [small,big,firstCost,secondCost] of [[69,70,4,8],[73,72,4,6],[76,75,4,6],[94,93,3,6]]){
    const a=levels[small-1],b=levels[big-1];
    assert.deepEqual(a.initial,b.initial);assert.deepEqual(a.target,b.target);
    assert.ok(closure(a).size<closure(b).size);
    for(const key of closure(a).keys())assert.ok(closure(b).has(key));
    assert.equal(a.shortest,firstCost);assert.equal(b.shortest,secondCost);
  }
});
test('the two folded scales have different conjugation laws and involution counts',()=>{
  const involutions=[];
  for(const [number,multiplier] of [[64,3],[65,5]]){
    const level=levels[number-1],r=E.permutation(level.ops[0],8),s=E.permutation(level.ops[1],8);
    let power=level.target;for(let i=0;i<multiplier;i++)power=compose(r,power);
    assert.deepEqual(compose(s,compose(r,s)),power);
    involutions.push([...closure(level).values()].filter(p=>!E.equal(p,level.target)&&E.equal(compose(p,p),level.target)).length);
  }
  assert.notEqual(...involutions);
  for(const number of [64,65,66])for(const p of closure(levels[number-1]).values()){
    const b=p[0],a=(p[1]-b+8)%8;assert.ok([1,3,5,7].includes(a));
    p.forEach((v,i)=>assert.equal(v,(a*i+b)%8));
  }
});
test('the layered tree preserves its nested partitions, not only the final pairs',()=>{
  const level=levels[73];
  for(const width of [2,4]){
    const blocks=new Set(Array.from({length:8/width},(_,i)=>Array.from({length:width},(_,j)=>width*i+j).join(',')));
    for(const p of closure(level).values())for(let start=0;start<8;start+=width)
      assert.ok(blocks.has(p.slice(start,start+width).sort((a,b)=>a-b).join(',')));
  }
  assert.equal(closure(level).size,128);
});
test('paired room gates enforce even flips while unrestricted bells allow every mask',()=>{
  for(const number of [72,73,75,76,95]){
    const level=levels[number-1],masks=new Set(),roomPermutations=new Set();
    for(const p of closure(level).values()){
      let mask=0;const roomOrder=[];
      for(let i=0;i<4;i++){
        assert.equal(Math.floor(p[2*i]/2),Math.floor(p[2*i+1]/2));
        roomOrder.push(Math.floor(p[2*i]/2));mask|=(p[2*i]%2)<<i;
      }
      masks.add(mask);roomPermutations.add(roomOrder.join(','));
      if([72,73,76].includes(number))assert.equal(mask.toString(2).replaceAll('0','').length%2,0);
      if(number===73){assert.equal(mask&1,(mask>>2)&1);assert.equal((mask>>1)&1,(mask>>3)&1);}
    }
    if(number===75){assert.equal(masks.size,16);assert.equal(roomPermutations.size,24);}
    if(number===76){assert.equal(masks.size,8);assert.equal(roomPermutations.size,24);}
  }
});
test('page symmetries and page permutations preserve the intended two four-point blocks',()=>{
  for(const number of [68,69,70])for(const p of closure(levels[number-1]).values()){
    const block=p.slice(0,4).sort((a,b)=>a-b).join(',');assert.ok(['0,1,2,3','4,5,6,7'].includes(block));
    if(number===69)for(const start of [0,4])for(let i=0;i<4;i++){
      const step=(p[start+(i+1)%4]-p[start+i]+4)%4;assert.ok(step===1||step===3);
    }
  }
});
test('the garden products have independent full component groups',()=>{
  for(const [number,split,leftSize,rightSize] of [[56,3,6,3],[79,4,12,4],[80,4,24,24],[93,4,12,12]]){
    const level=levels[number-1],left=new Set(),right=new Set();
    for(const p of closure(level).values()){
      assert.ok(p.slice(0,split).every(x=>x<split));
      left.add(p.slice(0,split).join(','));right.add(p.slice(split).join(','));
    }
    assert.equal(left.size,leftSize);assert.equal(right.size,rightSize);
    assert.equal(closure(level).size,leftSize*rightSize);
  }
  for(const p of closure(levels[93]).values())assert.deepEqual(p.slice(0,4),p.slice(4).map(x=>x-4));
});
function fractionalMaps(q,squareDeterminant){
  const mod=x=>(x%q+q)%q,squares=new Set(Array.from({length:q-1},(_,i)=>(i+1)**2%q)),maps=new Set();
  const divide=(a,b)=>{if(!mod(b))return q;for(let i=0;i<q;i++)if(mod(i*b)===mod(a))return i;};
  for(let a=0;a<q;a++)for(let b=0;b<q;b++)for(let c=0;c<q;c++)for(let d=0;d<q;d++){
    const det=mod(a*d-b*c);if(!det||(squareDeterminant&&!squares.has(det)))continue;
    maps.add(E.key([...Array.from({length:q},(_,x)=>divide(a*x+b,c*x+d)),divide(a,c)]));
  }
  return [...maps].sort();
}
test('the far-point tools generate exactly the claimed projective matrix actions',()=>{
  for(const [number,q,special] of [[81,5,true],[82,5,false],[83,7,true],[84,7,true]])
    assert.deepEqual([...closure(levels[number-1]).keys()].sort(),fractionalMaps(q,special));
});
test('the semilinear star group is distinct from the other 168-element action',()=>{
  const level=levels[84],mul=(a,b)=>{let out=0;for(let i=0;i<3;i++){if(b&1)out^=a;b>>=1;a=((a<<1)^((a&4)?11:0))&7;}return out;};
  const expected=new Set();
  for(let a=1;a<8;a++)for(let b=0;b<8;b++)for(let k=0;k<3;k++){
    expected.add(E.key(Array.from({length:8},(_,x)=>{for(let j=0;j<k;j++)x=mul(x,x);return mul(a,x)^b;})));
  }
  assert.deepEqual([...closure(level).keys()].sort(),[...expected].sort());
  const hasOrderSix=l=>[...closure(l).values()].some(p=>{
    let s=l.target;for(let i=1;i<=6;i++){s=compose(p,s);if(E.equal(s,l.target))return i===6;}return false;
  });
  assert.ok(hasOrderSix(level));assert.equal(hasOrderSix(levels[82]),false);
});
test('the new line and cube tools preserve their older linear and affine groups',()=>{
  assert.deepEqual([...closure(levels[85]).keys()].sort(),[...closure(levels[25]).keys()].sort());
  assert.deepEqual([...closure(levels[87]).keys()].sort(),[...closure(levels[46]).keys()].sort());
  const gate=E.permutation(levels[87].ops[1],8);
  assert.deepEqual(compose(gate,gate),Array.from({length:8},(_,i)=>i^1));
  assert.equal(closure(levels[88]).size,40320);
});
test('the last two A8 structures are even, and the hundredth needs all four tools',()=>{
  for(const number of [90,100]){
    const level=levels[number-1];assert.equal(closure(level).size,20160);
    for(const p of closure(level).values())assert.equal(parity(p),0);
  }
  const last=levels.at(-1);
  for(const op of last.ops){
    const unique=op.cycles.flat().filter(i=>last.ops.filter(other=>other.cycles.flat().includes(i)).length===1);
    assert.ok(unique.some(i=>last.initial[i]!==last.target[i]),'an exclusive displaced point forces use of each tool');
  }
  assert.equal(new Set(last.certificate.map(move=>move.op)).size,4);
});
