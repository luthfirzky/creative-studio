// Creative Studio — interaksi halaman (Vanilla JavaScript, tanpa library)
// Dimuat dengan atribut `defer`, jadi kode ini berjalan setelah HTML selesai dibaca.

// ---------- 1. Menu hamburger (mobile) ----------
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');

function setMenu(open) {
  mobileMenu.hidden = !open;
  menuBtn.setAttribute('aria-expanded', String(open));
  menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
}

menuBtn.addEventListener('click', () => setMenu(mobileMenu.hidden));
// Tutup menu setelah salah satu link diklik
mobileMenu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenu(false)));
// Tutup menu dengan tombol Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !mobileMenu.hidden) {
    setMenu(false);
    menuBtn.focus();
  }
});

// ---------- 2. Filter portfolio ----------
const filterButtons = document.querySelectorAll('.filter-btn');
const projects = document.querySelectorAll('.work-grid article');

filterButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const filter = btn.dataset.filter;

    filterButtons.forEach((b) => {
      const active = b === btn;
      b.classList.toggle('is-active', active);
      b.setAttribute('aria-pressed', String(active));
    });

    projects.forEach((card) => {
      const show = filter === 'All' || card.dataset.cat === filter;
      card.hidden = !show;
      if (show) {
        // Mainkan ulang animasi masuk
        card.classList.remove('is-entering');
        void card.offsetWidth;
        card.classList.add('is-entering');
      }
    });
  });
});

// ---------- 3. Slider testimonial ----------
// Ganti isi array ini dengan testimoni asli klien Anda.
const testimonials = [
  { quote: '[Kutipan ulasan klien — tuliskan pengalaman kerja sama dan hasil yang dirasakan.]', name: '[Client Name]', role: '[Position, Company]', initials: 'C1' },
  { quote: '[Kutipan ulasan klien kedua — fokus pada proses dan komunikasi tim.]', name: '[Client Name]', role: '[Position, Company]', initials: 'C2' },
  { quote: '[Kutipan ulasan klien ketiga — fokus pada kualitas dan dampak produk.]', name: '[Client Name]', role: '[Position, Company]', initials: 'C3' },
];

let current = 0;
const pad = (n) => String(n).padStart(2, '0');
const el = (id) => document.getElementById(id);

function showTestimonial(index) {
  current = (index + testimonials.length) % testimonials.length;
  const t = testimonials[current];
  el('testiQuote').textContent = t.quote;
  el('testiName').textContent = t.name;
  el('testiRole').textContent = t.role;
  el('testiInitials').textContent = t.initials;
  el('testiCounter').textContent = `${pad(current + 1)} / ${pad(testimonials.length)}`;

  const quote = el('testiQuote');
  quote.classList.remove('is-changing');
  void quote.offsetWidth;
  quote.classList.add('is-changing');
}

el('testiPrev').addEventListener('click', () => showTestimonial(current - 1));
el('testiNext').addEventListener('click', () => showTestimonial(current + 1));

// ---------- 4. Form kontak ----------
// CATATAN: situs statis tidak punya server, jadi form ini BELUM benar-benar mengirim email.
// Untuk mengaktifkannya, sambungkan ke layanan form (mis. Formspree / Web3Forms) — lihat penjelasan di chat.
const form = el('contactForm');
const success = el('formSuccess');

form.addEventListener('submit', (e) => {
  e.preventDefault(); // cegah browser memuat ulang halaman
  if (!form.checkValidity()) {
    form.reportValidity(); // tampilkan pesan "wajib diisi" bawaan browser
    return;
  }
  form.hidden = true;
  success.hidden = false;
  form.reset();
});

el('formReset').addEventListener('click', () => {
  success.hidden = true;
  form.hidden = false;
  el('f-name').focus();
});
