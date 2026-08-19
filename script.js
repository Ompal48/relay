// ---------- Live pulse line ----------
const svg = document.getElementById('pulseSvg');
const W = 800, H = 150, N = 60;
let data = Array.from({length:N}, () => 70 + Math.random()*20);
let incidentAt = null; // index where incident starts
const statusDot = document.getElementById('statusDot');
const statusText = document.getElementById('statusText');
const alertBanner = document.getElementById('alertBanner');

function pathFrom(arr){
  const stepX = W / (arr.length - 1);
  return arr.map((v,i)=> `${i===0?'M':'L'} ${i*stepX},${H - v}`).join(' ');
}

function render(){
  svg.innerHTML = '';
  const ns = 'http://www.w3.org/2000/svg';

  // gridlines
  for(let i=1;i<4;i++){
    const l = document.createElementNS(ns,'line');
    l.setAttribute('x1',0); l.setAttribute('x2',W);
    l.setAttribute('y1', i*H/4); l.setAttribute('y2', i*H/4);
    l.setAttribute('stroke', '#1C2438'); l.setAttribute('stroke-width','1');
    svg.appendChild(l);
  }

  const path = document.createElementNS(ns,'path');
  path.setAttribute('d', pathFrom(data));
  path.setAttribute('fill','none');
  path.setAttribute('stroke', incidentAt!==null ? '#FF5C6C' : '#3ED98B');
  path.setAttribute('stroke-width','2.5');
  path.setAttribute('stroke-linecap','round');
  path.setAttribute('stroke-linejoin','round');
  svg.appendChild(path);

  // fill under curve
  const fill = document.createElementNS(ns,'path');
  fill.setAttribute('d', pathFrom(data) + ` L ${W},${H} L 0,${H} Z`);
  fill.setAttribute('fill', incidentAt!==null ? 'rgba(255,92,108,0.08)' : 'rgba(62,217,139,0.08)');
  fill.setAttribute('stroke','none');
  svg.insertBefore(fill, path);

  // last point marker
  const lastX = W, lastY = H - data[data.length-1];
  const dot = document.createElementNS(ns,'circle');
  dot.setAttribute('cx', lastX-2); dot.setAttribute('cy', lastY);
  dot.setAttribute('r', 4);
  dot.setAttribute('fill', incidentAt!==null ? '#FF5C6C' : '#3ED98B');
  svg.appendChild(dot);
}

let tick = 0;
function step(){
  tick++;
  data.shift();

  // scripted small incident every ~14s, self-resolving
  const cyclePos = tick % 140;
  if(cyclePos === 90){
    incidentAt = tick;
    statusDot.style.background = '#FF5C6C';
    statusText.textContent = 'Degraded — investigating';
    statusText.style.color = '#FF8A94';
    alertBanner.classList.add('show');
  }
  if(cyclePos === 115){
    incidentAt = null;
    statusDot.style.background = '#3ED98B';
    statusText.textContent = 'All systems healthy';
    statusText.style.color = '#3ED98B';
    alertBanner.classList.remove('show');
  }

  let next;
  if(cyclePos >= 90 && cyclePos < 112){
    next = 15 + Math.random()*15; // spike/drop during incident
  } else {
    next = 70 + Math.random()*20;
  }
  data.push(next);
  render();
}
render();
setInterval(step, 220);

// clock
const clockNow = document.getElementById('clockNow');
function updateClock(){
  const d = new Date();
  clockNow.textContent = 'last check: ' + d.toLocaleTimeString([], {hour:'2-digit',minute:'2-digit',second:'2-digit'});
}
updateClock();
setInterval(updateClock, 1000);

// ---------- CTA click feedback ----------
let toastTimer = null;
function handleCta(e){
  e.preventDefault();
  const toast = document.getElementById('toast');
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(()=> toast.classList.remove('show'), 2600);
  return false;
}

// ---------- Scroll reveal ----------
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries)=>{
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('in');
      io.unobserve(entry.target);
    }
  });
}, {threshold:0.15});
revealEls.forEach(el => io.observe(el));

// ---------- Easter egg: Konami code ----------
const seq = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
let pos = 0;
window.addEventListener('keydown', (e) => {
  const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
  if(key === seq[pos]){
    pos++;
    if(pos === seq.length){
      pos = 0;
      triggerEgg();
    }
  } else {
    pos = (key === seq[0]) ? 1 : 0;
  }
});
function triggerEgg(){
  document.body.classList.add('chaos');
  const banner = document.getElementById('eggBanner');
  banner.classList.add('show');
  setTimeout(()=> document.body.classList.remove('chaos'), 800);
  setTimeout(()=> banner.classList.remove('show'), 3200);
}
