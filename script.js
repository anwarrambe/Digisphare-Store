// 👇 UBAH BAGIAN INI SESUAI DATA TOKO KAMU 👇
const NOMOR_WA = "6281234567890"; // Ganti nomor WA kamu (pakai kode negara 62)
const NAMA_TOKO = "Toko Pribadi Saya";

// Daftar Produk
const products = [
  {
    id: 1,
    nama: "Buku Catatan Polos",
    harga: 25000,
    gambar: "https://via.placeholder.com/220x160/ecf0f1/333?text=Buku+Catatan"
  },
  {
    id: 2,
    nama: "Tas Kanvas",
    harga: 75000,
    gambar: "https://via.placeholder.com/220x160/ecf0f1/333?text=Tas+Kanvas"
  },
  {
    id: 3,
    nama: "Botol Minum",
    harga: 40000,
    gambar: "https://via.placeholder.com/220x160/ecf0f1/333?text=Botol+Minum"
  },
  {
    id: 4,
    nama: "Pulpen 1 Lusin",
    harga: 18000,
    gambar: "https://via.placeholder.com/220x160/ecf0f1/333?text=Pulpen"
  }
];

// Keranjang Belanja
let cart = [];

// Tampilkan Produk di Halaman
const productContainer = document.getElementById('products');
products.forEach(item => {
  const productEl = document.createElement('div');
  productEl.className = 'product';
  productEl.innerHTML = `
    <img src="${item.gambar}" alt="${item.nama}">
    <h3>${item.nama}</h3>
    <p class="price">Rp ${item.harga.toLocaleString('id-ID')}</p>
    <button onclick="addToCart(${item.id})">+ Masuk Keranjang</button>
  `;
  productContainer.appendChild(productEl);
});

// Fungsi Tambah ke Keranjang
function addToCart(productId) {
  const selected = products.find(p => p.id === productId);
  if (selected) {
    cart.push(selected);
    updateCartDisplay();
  }
}

// Perbarui Tampilan Keranjang
function updateCartDisplay() {
  document.getElementById('cart-count').textContent = cart.length;
  const listEl = document.getElementById('cart-items');
  const totalEl = document.getElementById('cart-total');
  listEl.innerHTML = '';
  let totalHarga = 0;

  cart.forEach((item, index) => {
    totalHarga += item.harga;
    const li = document.createElement('li');
    li.textContent = `${index + 1}. ${item.nama} - Rp ${item.harga.toLocaleString('id-ID')}`;
    listEl.appendChild(li);
  });

  totalEl.textContent = totalHarga.toLocaleString('id-ID');
}

// Buka / Tutup Modal
const modal = document.getElementById('cart-modal');
document.getElementById('cart-icon').addEventListener('click', () => modal.style.display = 'block');
document.querySelector('.close').addEventListener('click', () => modal.style.display = 'none');
window.addEventListener('click', (e) => {
  if (e.target === modal) modal.style.display = 'none';
});

// Proses Pesan ke WhatsApp
document.getElementById('checkout-btn').addEventListener('click', () => {
  if (cart.length === 0) return alert('Keranjang kamu masih kosong!');

  let pesan = `Halo ${NAMA_TOKO}, saya ingin memesan:%0A%0A`;
  let total = 0;

  cart.forEach((item, i) => {
    pesan += `${i+1}. ${item.nama} - Rp ${item.harga.toLocaleString('id-ID')}%0A`;
    total += item.harga;
  });

  pesan += `%0ATotal Pembayaran: Rp ${total.toLocaleString('id-ID')}%0A%0ATerima kasih.`;
  const url = `https://wa.me/${NOMOR_WA}?text=${pesan}`;
  window.open(url, '_blank');
});
