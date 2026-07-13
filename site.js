async function load() {
  const [site, projects] = await Promise.all([
    fetch('/data/settings.json').then(r => r.json()),
    fetch('/data/projects.json').then(r => r.json())
  ]);
  document.title = `${site.name} — ${site.role}`;
  document.querySelector('#nav-name').textContent = site.name;
  document.querySelector('#intro').textContent = site.intro;
  document.querySelector('#role').textContent = site.role;
  document.querySelector('#about-text').textContent = site.about;
  document.querySelector('#copyright').textContent = `© ${site.name}`;
  for (const el of document.querySelectorAll('#contact-link,#about-email,#footer-email')) { el.href=`mailto:${site.email}`; }
  document.querySelector('#footer-email').textContent=site.email;
  document.querySelector('#instagram').href=site.instagram || '#';
  document.querySelector('#projects').innerHTML = projects.map((p, i) => `<article class="project ${i % 3 === 0 ? 'large' : ''}"><div class="image ${p.image ? '' : 'placeholder ph'+((i%3)+1)}">${p.image ? `<img src="${p.image}" alt="${p.title}">` : `<span>${p.title.charAt(0)}</span>`}</div><div class="project-meta"><h2>${p.title}</h2><p>${p.category} · ${p.year}</p></div>${p.description ? `<p class="description">${p.description}</p>` : ''}</article>`).join('');
}
load();
