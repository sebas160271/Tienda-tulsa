document.getElementById("year").textContent = new Date().getFullYear();

const products = [
  {id:1, name:"Camiseta Neon Wave", category:"ropa", price:24.99, image:"https://source.unsplash.com/800x800/?tshirt", desc:"Camiseta juvenil con diseño neón."},
  {id:2, name:"Pantalón Trail", category:"ropa", price:49.99, image:"https://source.unsplash.com/800x800/?pants", desc:"Pantalón cómodo y moderno."},
  {id:3, name:"Reloj Orbit", category:"accesorios", price:129.99, image:"https://source.unsplash.com/800x800/?watch", desc:"Reloj inteligente con estilo minimalista."},
  {id:4, name:"Audífonos Pulse", category:"tecnologia", price:79.99, image:"https://source.unsplash.com/800x800/?headphones", desc:"Audífonos inalámbricos de alta fidelidad."},
  {id:5, name:"Zapatillas Sprint", category:"calzado", price:89.99, image:"https://source.unsplash.com/800x800/?sneakers", desc:"Zapatillas deportivas ligeras."},
  {id:6, name:"Mochila Nomad", category:"accesorios", price:59.99, image:"https://source.unsplash.com/800x800/?backpack", desc:"Mochila para laptop y viajes."}
];

const productGrid = document.getElementById("productGrid");
const modal = document.getElementById("modal");
const cart = [];

function renderProducts(list){
  productGrid.innerHTML = "";
  list.forEach(p=>{
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${p.image}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>${p.desc}</p>
      <strong>$${p.price.toFixed(2)}</strong><br>
      <button class="btn primary" onclick="viewProduct(${p.id})">Ver</button>
    `;
    productGrid.appendChild(card);
  });
}

function viewProduct(id){
  const p = products.find(x=>x.id===id);
  document.getElementById("modalTitle").textContent = p.name;
  document.getElementById("modalImg").src = p.image;
  document.getElementById("modalDesc").textContent = p.desc;
  document.getElementById("modalPrice").textContent = `$${p.price}`;
  modal.style.display = "flex";
  document.getElementById("addToCartBtn").onclick = ()=>addToCart(p);
}

document.getElementById("closeModal").onclick = ()=>modal.style.display="none";
window.onclick = e=>{ if(e.target===modal) modal.style.display="none"; };

function addToCart(p){
  const existing = cart.find(c=>c.id===p.id);
  if(existing){ existing.qty++; }
  else{ cart.push({...p, qty:1}); }
  updateCart();
  modal.style.display="none";
}

function updateCart(){
  const cartList = document.getElementById("cartList");
  const cartTotal = document.getElementById("cartTotal");
  cartList.innerHTML = "";
  let total = 0;
  cart.forEach(item=>{
    total += item.price * item.qty;
    cartList.innerHTML += `<p>${item.name} x${item.qty} — $${(item.price*item.qty).toFixed(2)}</p>`;
  });
  cartTotal.textContent = `$${total.toFixed(2)}`;
  document.getElementById("cartBtn").textContent = `Carrito (${cart.length})`;
}

document.getElementById("clearCart").onclick = ()=>{cart.length=0;updateCart();};
document.getElementById("checkout").onclick = ()=>alert("Compra completada. ¡Gracias!");
document.getElementById("searchInput").oninput = e=>{
  const q = e.target.value.toLowerCase();
  renderProducts(products.filter(p=>p.name.toLowerCase().includes(q)));
};
document.querySelectorAll("[data-filter]").forEach(btn=>{
  btn.onclick=()=>{
    const cat = btn.getAttribute("data-filter");
    renderProducts(cat==="all"?products:products.filter(p=>p.category===cat));
  };
});

renderProducts(products);
