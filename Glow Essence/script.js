// ====== CARRUSEL AUTOMÁTICO ======
const slides = document.querySelectorAll('.carousel-item');
const dots = document.querySelectorAll('.carousel-indicators .dot');
let currentIndex = 0;
const totalSlides = slides.length;

function showSlide(index) {
  if (index >= totalSlides) currentIndex = 0;
  else if (index < 0) currentIndex = totalSlides - 1;
  else currentIndex = index;

  const carouselInner = document.querySelector('.carousel-inner');
  carouselInner.style.transform = `translateX(-${currentIndex * 100}%)`;

  dots.forEach(dot => dot.classList.remove('active'));
  dots[currentIndex].classList.add('active');
}

function nextSlide() {
  showSlide(currentIndex + 1);
}

// Poner evento click a cada punto
dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    showSlide(i);
  });
});

// Cambiar slide cada 5 segundos
setInterval(nextSlide, 5000);

// Mostrar primer slide
showSlide(currentIndex);

// ====== WISHLIST ======
const wishlistBtn = document.querySelector('.wishlist-btn');
const wishlistPanel = document.querySelector('.wishlist-panel');
const closeWishlistBtn = document.querySelector('.close-wishlist');
const wishlistContainer = document.querySelector('.wishlist-items');
const totalDisplay = document.querySelector('.wishlist-total span');
const whatsappBtn = document.querySelector('.send-whatsapp');

let wishlist = [];

// Abrir y cerrar wishlist
wishlistBtn.addEventListener('click', () => {
  wishlistPanel.classList.toggle('open');
});

closeWishlistBtn.addEventListener('click', () => {
  wishlistPanel.classList.remove('open');
});

// Agregar producto (funciona para .servicio u otro contenedor con clase 'add-to-wishlist')
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('add-to-wishlist')) {
    const productoElement = e.target.closest('.servicio, .producto');
    const nombre = productoElement.querySelector('h3, h4').textContent;
    const precioTexto = productoElement.querySelector('p').textContent;
    const precio = parseFloat(precioTexto.replace(/[^0-9.]/g, ''));
    const imagen = productoElement.querySelector('img').getAttribute('src');

    const producto = { nombre, precio, imagen };

    // Evitar duplicados
    if (!wishlist.some(item => item.nombre === producto.nombre)) {
      wishlist.push(producto);
      actualizarWishlist();
    }
  }
});

// Eliminar producto por índice
function eliminarProducto(index) {
  wishlist.splice(index, 1);
  actualizarWishlist();
}

// Actualizar contenido del panel wishlist
function actualizarWishlist() {
  wishlistContainer.innerHTML = '';

  wishlist.forEach((item, index) => {
    const div = document.createElement('div');
    div.classList.add('item-wishlist');
    div.innerHTML = `
      <img src="${item.imagen}" alt="${item.nombre}" style="width:50px; height:50px; object-fit:cover; border-radius:6px;">
      <div style="flex:1; margin-left:10px;">
        <h4 style="margin:0; font-size:0.95rem;">${item.nombre}</h4>
        <span style="color:#777;">$${item.precio.toFixed(2)}</span>
      </div>
      <button onclick="eliminarProducto(${index})" style="background:none; border:none; color:#ff69b4; font-size:1.2rem; cursor:pointer;">✕</button>
    `;
    wishlistContainer.appendChild(div);
  });

  const total = wishlist.reduce((sum, item) => sum + item.precio, 0);
  totalDisplay.textContent = `$${total.toFixed(2)}`;

  const mensaje = wishlist.map(item => `• ${item.nombre} - $${item.precio.toFixed(2)}`).join('%0A') + `%0A%0ATotal: $${total.toFixed(2)}`;
  const telefono = "524941013316"; // Reemplaza con tu número real
  whatsappBtn.href = `https://wa.me/${telefono}?text=${mensaje}`;
}

// (Opcional) para activar desde HTML si deseas usar onclick="toggleWishlist()"
function toggleWishlist() {
  wishlistPanel.classList.toggle('open');
}
