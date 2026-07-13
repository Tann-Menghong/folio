const escapeHTML = (value = '') => String(value).replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
async function load() {
  try {
    const [site, projects] = await Promise.all([fetch('/data/settings.json').then(r => r.json()), fetch('/data/projects.json').then(r => r.json())]);
    document.title = `${site.name} — ${site.role}`;
    document.querySelector('#nav-name').textContent = site.name;
    document.querySelector('#intro').textContent = site.intro;
    document.querySelector('#role').textContent = site.role;
    document.querySelector('#about-text').textContent = site.about;
    document.querySelector('#copyright').textContent = `© ${new Date().getFullYear()} ${site.name}`;
    for (const el of document.querySelectorAll('#contact-link,#about-email,#footer-email')) el.href = `mailto:${site.email}`;
    document.querySelector('#footer-email').textContent = site.email;
    document.querySelector('#instagram').href = site.instagram || '#';
    document.querySelector('#projects').innerHTML = projects.map((p, i) => {
      const title = escapeHTML(p.title), category = escapeHTML(p.category), year = escapeHTML(p.year), desc = escapeHTML(p.description);
      const image = p.image ? `<img src="${escapeHTML(p.image)}" alt="${title}" loading="lazy">` : `<span>${title.charAt(0)}</span>`;
      return `<article class="project ${i % 3 === 0 ? 'project-featured' : ''}"><a class="project-link" href="mailto:${site.email}?subject=${encodeURIComponent('Project enquiry: ' + p.title)}"><div class="image ${p.image ? '' : 'placeholder ph'+((i%3)+1)}">${image}<em>View project ↗</em></div><div class="project-meta"><h2>${title}</h2><p>${category}</p><p>${year}</p></div>${desc ? `<p class="description">${desc}</p>` : ''}</a></article>`;
    }).join('');
  } catch (error) { console.error('Unable to load portfolio content.', error); }
}
load();
