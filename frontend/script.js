const items = [
  { id:'laptop-gaming', name:'Laptop ASUS ROG Gaming', type:'Elektronik', price:150000, status:'Tersedia', icon:'💻', specs:['RAM 16GB','RTX 3060','SSD 512GB','Intel i7-12700H'], rating:4.9, reviews:24, desc:'Laptop gaming bertenaga tinggi, cocok untuk desain grafis, video editing, dan rendering. Kondisi sangat baik, sudah include charger original.', bg:'linear-gradient(135deg,#EFF6FF,#DBEAFE)', owner:'Ahmad R.' },
  { id:'motor-honda', name:'Motor Honda Vario 125', type:'Kendaraan', price:80000, status:'Tersedia', icon:'🛵', specs:['Tahun 2022','Bensin Premium','Transmisi Matic','Helm Gratis'], rating:4.8, reviews:31, desc:'Motor matic bersih dan terawat, cocok untuk mobilitas harian di sekitar kampus. Surat-surat lengkap, termasuk helm gratis.', bg:'linear-gradient(135deg,#F0FDF4,#DCFCE7)', owner:'Budi S.' },
  { id:'kamera', name:'Kamera Sony Alpha A6400', type:'Elektronik', price:120000, status:'Disewa', icon:'📷', specs:['24.2 Megapiksel','Mirrorless','Kit Lens 16-50mm','2 Baterai + Charger'], rating:5.0, reviews:12, desc:'Kamera mirrorless profesional untuk fotografi dan videografi. Autofocus cepat dan akurat, sangat cocok untuk konten kreator mahasiswa.', bg:'linear-gradient(135deg,#FEF3C7,#FDE68A)', owner:'Citra M.' },
  { id:'sepeda', name:'Sepeda Lipat Polygon', type:'Kendaraan', price:45000, status:'Tersedia', icon:'🚲', specs:['16 Inch','7 Speed','Lipat Compact','Kondisi Prima'], rating:4.6, reviews:8, desc:'Sepeda lipat ringan dan mudah dibawa ke mana-mana. Cocok untuk mobilitas di dalam kampus atau sekitarnya.', bg:'linear-gradient(135deg,#F0FDF4,#BBF7D0)', owner:'Dewi P.' },
  { id:'proyektor', name:'Proyektor Epson EB-X41', type:'Elektronik', price:100000, status:'Tersedia', icon:'📽️', specs:['3600 Lumen','XGA 1024x768','HDMI + VGA','Remote Included'], rating:4.7, reviews:19, desc:'Proyektor cerah untuk presentasi, seminar, atau nonton bareng. Brightness tinggi cocok untuk ruangan terang sekalipun.', bg:'linear-gradient(135deg,#FAF5FF,#E9D5FF)', owner:'Eko F.' },
  { id:'drone', name:'DJI Mini 3 Pro', type:'Elektronik', price:200000, status:'Tersedia', icon:'🛸', specs:['4K 60fps','3 Axis Gimbal','34 Menit Terbang','Obstacle Avoidance'], rating:4.9, reviews:7, desc:'Drone profesional ringan untuk fotografi udara dan video aerial. Dilengkapi remote controller dan tas pelindung.', bg:'linear-gradient(135deg,#FFF7ED,#FED7AA)', owner:'Fani H.' },
  { id:'tripod', name:'Tripod Profesional Manfrotto', type:'Peralatan', price:30000, status:'Tersedia', icon:'📸', specs:['Tinggi Max 175cm','Beban Max 5kg','Ball Head','Tas Bawaan'], rating:4.5, reviews:15, desc:'Tripod kokoh dan stabil untuk kebutuhan fotografi atau videografi. Kompatibel dengan kamera DSLR, mirrorless, dan smartphone.', bg:'linear-gradient(135deg,#FFF1F2,#FFE4E6)', owner:'Gilang T.' },
  { id:'buku-algostrukdata', name:'Algoritma & Struktur Data', type:'Buku', price:8000, status:'Tersedia', icon:'📚', specs:['Edisi ke-3','Bahasa Indonesia','370 Halaman','Kondisi 90%'], rating:4.4, reviews:22, desc:'Buku referensi wajib untuk mata kuliah Algoritma dan Struktur Data. Dilengkapi contoh soal dan pembahasan lengkap.', bg:'linear-gradient(135deg,#ECFDF5,#A7F3D0)', owner:'Hana W.' },
];

function renderItems(filtered) {
  const grid = document.getElementById('items-grid');
  if (!grid) return;
  if (!filtered || !filtered.length) {
    grid.innerHTML = '<div class="empty-state" style="grid-column:1/-1"><div class="icon">🔍</div><h3>Tidak ada barang ditemukan</h3><p>Coba kata kunci atau filter lain</p></div>';
    return;
  }
  grid.innerHTML = filtered.map(item => `
    <div class="item-card" onclick="location.href='detail.html?id=${item.id}'">
      <div class="item-img" style="background:${item.bg}">
        ${item.icon}
        <span class="badge-avail ${item.status==='Tersedia'?'badge-green':'badge-red'}">${item.status}</span>
      </div>
      <div class="item-body">
        <div class="item-type">${item.type}</div>
        <div class="item-name">${item.name}</div>
        <div class="item-spec">${item.specs.slice(0,2).join(' · ')}</div>
        <div class="item-footer">
          <div class="item-price"><strong>Rp ${item.price.toLocaleString('id-ID')}</strong><span>/hari</span></div>
          <div class="item-rating"><span class="star">★</span> ${item.rating} (${item.reviews})</div>
        </div>
      </div>
    </div>
  `).join('');
}

function filterItems() {
  const q = document.getElementById('search-input')?.value.toLowerCase() || '';
  const type = document.getElementById('filter-type')?.value || '';
  const status = document.getElementById('filter-status')?.value || '';
  const filtered = items.filter(i =>
    (!q || i.name.toLowerCase().includes(q) || i.type.toLowerCase().includes(q)) &&
    (!type || i.type === type) &&
    (!status || i.status === status)
  );
  renderItems(filtered);
}

function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}

function openModal() {
  const modal = document.getElementById('modal-booking');
  if (!modal) return;
  modal.classList.add('open');
}

function closeModal() {
  const modal = document.getElementById('modal-booking');
  if (!modal) return;
  modal.classList.remove('open');
}

function calcTotal() {
  const s = document.getElementById('start-date')?.value;
  const e = document.getElementById('end-date')?.value;
  if (!s || !e) return;
  const days = Math.round((new Date(e) - new Date(s)) / 86400000);
  if (days <= 0) {
    const label = document.getElementById('duration-label');
    if (label) label.textContent = 'Tanggal tidak valid';
    return;
  }
  const itemName = document.getElementById('detail-breadcrumb')?.textContent;
  const item = items.find(i => i.name === itemName);
  if (!item) return;
  const total = days * item.price;
  const label = document.getElementById('duration-label');
  const price = document.getElementById('total-price');
  if (label) label.textContent = `${days} hari × Rp ${item.price.toLocaleString('id-ID')}`;
  if (price) price.textContent = `Rp ${total.toLocaleString('id-ID')}`;
}

function initNavigation() {
  const nav = document.querySelector('.nav-links');
  if (!nav) return;
  const path = window.location.pathname;
  const pageMap = {
    'index.html': 'nav-beranda',
    'barang.html': 'nav-kendaraan',
    'tentang.html': 'nav-tentang',
    'syarat.html': 'nav-syarat'
  };
  document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
  for (const [file, id] of Object.entries(pageMap)) {
    if (path.includes(file) || (path === '/' && file === 'index.html')) {
      const el = document.getElementById(id);
      if (el) el.classList.add('active');
      break;
    }
  }
}

document.addEventListener('DOMContentLoaded', initNavigation);
const modalOverlay = document.getElementById('modal-booking');
if (modalOverlay) {
  modalOverlay.addEventListener('click', function(e) {
    if (e.target === this) closeModal();
  });
}
