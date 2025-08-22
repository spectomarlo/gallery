(async () => {
  const status = document.getElementById('status');
  const gallery = document.getElementById('gallery');

  try {
    const res = await fetch('files.json', { cache: 'no-store' });
    if (!res.ok) throw new Error('files.json not found');
    const files = await res.json();

    if (!Array.isArray(files) || files.length === 0) {
      status.textContent = 'No images yet. Check back soon.';
      return;
    }

    const html = files.map(f => {
      const url = `https://drive.google.com/uc?export=view&id=${f.id}`;
      const alt = (f.name || '').replace(/"/g, '&quot;');
      return `<figure class="item"><img loading="lazy" src="${url}" alt="${alt}"></figure>`;
    }).join('');

    gallery.innerHTML = html;
    status.hidden = true;
    gallery.hidden = false;
  } catch (e) {
    console.error(e);
    status.textContent = 'Error loading gallery.';
  }
})();
