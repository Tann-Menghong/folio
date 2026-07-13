const escapeHTML = (value = '') => String(value).replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
const copy = {
  en:{work:'Selected work',about:'About',contact:'Contact',practice:'Independent creative practice',explore:'Scroll to explore',selected:'Selected work',studio:'The studio',projectPrompt:'Have a project in mind?',talk:'Let’s talk ↗',elsewhere:'Elsewhere',top:'Back to top ↑'},
  km:{work:'ស្នាដៃ',about:'អំពីខ្ញុំ',contact:'ទំនាក់ទំនង',practice:'ស្ទូឌីយោច្នៃប្រឌិតឯករាជ្យ',explore:'មើលស្នាដៃ',selected:'ស្នាដៃដែលបានជ្រើសរើស',studio:'អំពីស្ទូឌីយោ',projectPrompt:'មានគម្រោងក្នុងចិត្តមែនទេ?',talk:'ចាប់ផ្តើមការសន្ទនា ↗',elsewhere:'បណ្តាញសង្គម',top:'ត្រឡប់ទៅខាងលើ ↑'}
};
let siteData, projectData, language = localStorage.getItem('portfolio-language') || 'km';
const local = (english, khmer) => language === 'km' && khmer ? khmer : english;
function render() {
  document.documentElement.lang = language === 'km' ? 'km' : 'en';
  document.body.classList.toggle('khmer', language === 'km');
  document.title = `${siteData.name} — ${local(siteData.role, siteData.role_km)}`;
  document.querySelector('#nav-name').textContent = siteData.name;
  document.querySelector('#intro').textContent = local(siteData.intro, siteData.intro_km);
  document.querySelector('#role').textContent = local(siteData.role, siteData.role_km);
  document.querySelector('#about-text').textContent = local(siteData.about, siteData.about_km);
  document.querySelector('#copyright').textContent = `© ${new Date().getFullYear()} ${siteData.name}`;
  document.querySelectorAll('[data-i18n]').forEach(el => el.textContent = copy[language][el.dataset.i18n]);
  for (const el of document.querySelectorAll('#contact-link,#about-email,#footer-email')) el.href = `mailto:${siteData.email}`;
  document.querySelector('#footer-email').textContent = siteData.email;
  document.querySelector('#instagram').href = siteData.instagram || '#';
  const telegram = document.querySelector('#telegram-link');
  telegram.href = siteData.telegram || '#'; telegram.hidden = !siteData.telegram;
  document.querySelector('#language-toggle').textContent = language === 'km' ? 'EN' : 'ខ្មែរ';
  const projects = projectData.projects || projectData;
  document.querySelector('#projects').innerHTML = projects.map((p, i) => {
    const title = escapeHTML(local(p.title, p.title_km)), category = escapeHTML(local(p.category, p.category_km)), year = escapeHTML(p.year), description = escapeHTML(local(p.description, p.description_km));
    const image = p.image ? `<img src="${escapeHTML(p.image)}" alt="${title}" loading="lazy">` : `<span>${title.charAt(0)}</span>`;
    return `<article class="project ${i % 3 === 0 ? 'project-featured' : ''}"><a class="project-link" href="mailto:${siteData.email}?subject=${encodeURIComponent('Project enquiry: ' + p.title)}"><div class="image ${p.image ? '' : 'placeholder ph'+((i%3)+1)}">${image}<em>${language === 'km' ? 'មើលស្នាដៃ ↗' : 'View project ↗'}</em></div><div class="project-meta"><h2>${title}</h2><p>${category}</p><p>${year}</p></div>${description ? `<p class="description">${description}</p>` : ''}</a></article>`;
  }).join('');
}
async function load() {
  try { [siteData, projectData] = await Promise.all([fetch('/data/settings.json').then(r => r.json()), fetch('/data/projects.json').then(r => r.json())]); render(); document.querySelector('#language-toggle').addEventListener('click', () => { language = language === 'km' ? 'en' : 'km'; localStorage.setItem('portfolio-language', language); render(); }); }
  catch (error) { console.error('Unable to load portfolio content.', error); }
}
load();
