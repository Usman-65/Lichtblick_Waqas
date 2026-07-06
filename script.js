function showPage(name){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.getElementById('page-'+name).classList.add('active');
  window.scrollTo({top:0,behavior:'smooth'});
  document.querySelectorAll('.nav-links a').forEach(a=>a.classList.remove('active'));
  if(name==='karriere') document.getElementById('nl-karriere')?.classList.add('active');
  else document.getElementById('nl-leist')?.classList.add('active');
}
function scrollSec(sel){
  setTimeout(()=>{
    const el=document.querySelector(sel);
    if(el) el.scrollIntoView({behavior:'smooth',block:'start'});
  },120);
}

const mobileToggle = document.querySelector('[data-mobile-toggle]');
const mobileLinks = document.querySelector('.nav-links');

function closeMobileMenu(){
  mobileLinks?.classList.remove('open');
  mobileToggle?.setAttribute('aria-expanded','false');
  mobileToggle?.setAttribute('aria-label','Menü öffnen');
}

mobileToggle?.addEventListener('click',()=>{
  const open = mobileLinks?.classList.toggle('open');
  mobileToggle.setAttribute('aria-expanded',String(Boolean(open)));
  mobileToggle.setAttribute('aria-label',open ? 'Menü schließen' : 'Menü öffnen');
});

mobileLinks?.addEventListener('click',closeMobileMenu);
document.addEventListener('keydown',event=>{
  if(event.key==='Escape') closeMobileMenu();
});

document.querySelectorAll('form[action^="mailto:"]').forEach(form=>{
  form.addEventListener('submit',event=>{
    if(!form.reportValidity()){
      event.preventDefault();
    }
  });
});

const pageRoutes = new Set(['home','karriere','impressum','datenschutz']);

function syncPageFromHash(){
  const route = window.location.hash.slice(1).replace(/^page-/,'');
  if(pageRoutes.has(route)) showPage(route);
}

window.addEventListener('hashchange',syncPageFromHash);
syncPageFromHash();
document.querySelector('[data-year]').textContent = new Date().getFullYear();
