(() => {
  const body = document.body;
  const loaderDone = () => window.setTimeout(() => body.classList.add('ready'), 950);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', loaderDone); else loaderDone();

  const menu = document.getElementById('menu');
  const nav = document.getElementById('nav');
  menu?.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menu.setAttribute('aria-expanded', String(open));
  });
  nav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { nav.classList.remove('open'); menu?.setAttribute('aria-expanded','false'); }));

  const progress = document.getElementById('scrollProgress');
  const updateProgress = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.height = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
  };
  window.addEventListener('scroll', updateProgress, {passive:true});
  updateProgress();

  const roles = ['Machine Learning systems','Generative AI applications','Computer Vision pipelines','AI-powered products'];
  const roleEl = document.getElementById('roleText');
  let roleIndex = 0;
  let deleting = false;
  let roleText = roles[0];
  function typeRole() {
    if (!roleEl) return;
    const full = roles[roleIndex];
    roleText = deleting ? full.slice(0, Math.max(0, roleText.length - 1)) : full.slice(0, roleText.length + 1);
    roleEl.textContent = roleText;
    let delay = deleting ? 42 : 72;
    if (!deleting && roleText === full) { delay = 1300; deleting = true; }
    else if (deleting && roleText === '') { deleting = false; roleIndex = (roleIndex + 1) % roles.length; delay = 250; roleText = ''; }
    window.setTimeout(typeRole, delay);
  }
  window.setTimeout(() => { roleText = ''; deleting = false; typeRole(); }, 1500);

  const dot = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  let mouseX = window.innerWidth/2, mouseY = window.innerHeight/2, ringX = mouseX, ringY = mouseY;
  window.addEventListener('mousemove', e => { mouseX = e.clientX; mouseY = e.clientY; dot.style.left = `${mouseX}px`; dot.style.top = `${mouseY}px`; });
  function animateCursor(){ ringX += (mouseX-ringX)*.14; ringY += (mouseY-ringY)*.14; ring.style.left=`${ringX}px`; ring.style.top=`${ringY}px`; requestAnimationFrame(animateCursor); }
  if (window.matchMedia('(pointer:fine)').matches) requestAnimationFrame(animateCursor);
  document.querySelectorAll('a,button,.project-card,.stack-group,.time-card').forEach(el => {
    el.addEventListener('mouseenter',()=>ring.classList.add('active')); el.addEventListener('mouseleave',()=>ring.classList.remove('active'));
  });

  // Lightweight animated neural-network background; no external runtime needed.
  const canvas = document.getElementById('neuralCanvas');
  const ctx = canvas?.getContext('2d');
  if (canvas && ctx) {
    let w, h, nodes=[];
    function resize(){ w=canvas.width=innerWidth*devicePixelRatio; h=canvas.height=innerHeight*devicePixelRatio; canvas.style.width=innerWidth+'px'; canvas.style.height=innerHeight+'px'; ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0); nodes=Array.from({length:Math.min(60, Math.max(28, Math.floor(innerWidth/24)))},()=>({x:Math.random()*innerWidth,y:Math.random()*innerHeight,vx:(Math.random()-.5)*.23,vy:(Math.random()-.5)*.23,r:Math.random()*1.6+.5})); }
    function draw(){ ctx.clearRect(0,0,innerWidth,innerHeight); for(const n of nodes){n.x+=n.vx;n.y+=n.vy;if(n.x<0||n.x>innerWidth)n.vx*=-1;if(n.y<0||n.y>innerHeight)n.vy*=-1;ctx.beginPath();ctx.arc(n.x,n.y,n.r,0,Math.PI*2);ctx.fillStyle='rgba(29,205,159,.45)';ctx.fill();} for(let i=0;i<nodes.length;i++){for(let j=i+1;j<nodes.length;j++){const a=nodes[i],b=nodes[j],dx=a.x-b.x,dy=a.y-b.y,d=Math.hypot(dx,dy);if(d<125){ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.strokeStyle=`rgba(29,205,159,${(1-d/125)*.08})`;ctx.lineWidth=1;ctx.stroke();}}} requestAnimationFrame(draw); }
    resize(); addEventListener('resize',resize); draw();
  }

  async function loadGithub(){
    const set=(id,v)=>{const e=document.getElementById(id); if(e)e.textContent=v;};
    try{
      const user=await fetch('https://api.github.com/users/Lakhan07AU',{headers:{Accept:'application/vnd.github+json'}}).then(r=>{if(!r.ok)throw new Error();return r.json()});
      const repos=await fetch('https://api.github.com/users/Lakhan07AU/repos?per_page=100',{headers:{Accept:'application/vnd.github+json'}}).then(r=>{if(!r.ok)throw new Error();return r.json()});
      const stars=repos.reduce((n,r)=>n+(r.stargazers_count||0),0);
      set('repoCount',user.public_repos ?? repos.length); set('starCount',stars); set('followerCount',user.followers ?? 0);
      const since=new Date(Date.now()-30*24*60*60*1000).toISOString();
      const commits=await fetch(`https://api.github.com/search/commits?q=author:Lakhan07AU+committer-date:>${since.slice(0,10)}`,{headers:{Accept:'application/vnd.github+json'}}).then(r=>r.ok?r.json():null);
      set('commitCount',commits?.total_count ?? '—');
    }catch{ set('repoCount','—'); set('starCount','—'); set('followerCount','—'); set('commitCount','—'); }
  }
  loadGithub();
})();
