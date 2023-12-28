class Productos {
  constructor(Nombre, Precio, Stock, img) {
    this.Nombre = Nombre;
    this.Precio = Precio;
    this.Stock = Stock;
    this.img = img;
  }
}

const ArrayProductos = [
  new Productos("Guitarra Criolla", 10000, 30, "../assets/img/guitarra_criolla.jpg"),
  new Productos("Piano Yamaha", 700000, 15, "../assets/img/piano_yamaha.jpg"),
  new Productos("Auriculares Sure", 40000, 20, "../assets/img/sure_auriculares.png"),
  new Productos("Microfono Sure", 30000, 24, "../assets/img/sure_microfono.png"),
  new Productos("Guitarra Electrica", 350000, 35, "../assets/img/guitarra_electrica.png"),
  new Productos("Amplificador", 280000, 35, "../assets/img/amplificador.png"),
  new Productos("Puas", 300, 100, "../assets/img/pua.png"),
  new Productos("Cable", 5000, 30, "../assets/img/cable.png"),
  new Productos("Bajo Ibanez", 325000, 35, "../assets/img/bajo.png"),
  new Productos("Ukulele", 30000, 45, "../assets/img/ukulele.png"),
];

ArrayProductos.forEach((producto) => {
  let div = document.createElement("div");
  div.className = "card";
  div.innerHTML = `
    <p>Nombre: ${producto.Nombre}</p>
    <p>Precio: $${producto.Precio}</p>
    <p>Stock: ${producto.Stock}</p>
    <img src="${producto.img}" alt="${producto.Nombre}">
    <button onclick="addToCart('${producto.Nombre}', ${producto.Precio})">Agregar a Carrito</button>
  `;
  document.getElementById("contenedorproductos").appendChild(div);
});

const DESCUENTO_PALABRA_CLAVE = "CODER";
const DESCUENTO_PORCENTAJE = 20;
let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
let total = parseFloat(localStorage.getItem("total")) || 0;

function addToCart(productName, price) {
  Swal.fire({
    title: 'Ingresa tu palabra clave:',
    input: 'text',
    inputPlaceholder: 'Palabra clave',
    showCancelButton: true,
    confirmButtonText: 'Agregar al Carrito',
    cancelButtonText: 'Cancelar',
    preConfirm: (cuponInput) => {
      const cuponValue = cuponInput ? cuponInput.toUpperCase() : '';

      if (cuponValue === DESCUENTO_PALABRA_CLAVE) {
        price *= 1 - DESCUENTO_PORCENTAJE / 100;
      }

      cartItems.push({ name: productName, price: price });
      total += price;
      updateCart();
    }
  });
}


function removeFromCart(index) {
  total -= cartItems[index].price;
  cartItems.splice(index, 1);
  updateCart();
}

function updateCart() {
  const cartList = document.getElementById("cart-items");
  const totalElement = document.getElementById("total");

  cartList.innerHTML = "";

  cartItems.forEach((item, index) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${item.name} - $${item.price}`;

    const removeButton = document.createElement("button");
    removeButton.textContent = "Eliminar";
    removeButton.onclick = function () {
      removeFromCart(index);
    };

    listItem.appendChild(removeButton);
    cartList.appendChild(listItem);
  });

  totalElement.textContent = `Total: $${total}`;
}

function generarCardsProductos() {
  const contenedorProductos = document.getElementById("productos");

  productosDisponibles.forEach((producto) => {
    const productoElement = document.createElement("div");
    productoElement.classList.add("producto");
    productoElement.innerHTML = `
      <h3>${producto.nombre}</h3>
      <p>$${producto.precio}</p>
      <p>$${producto.Stock}</p>
      <button onclick="agregarAlCarrito(${producto.Nombre}, '${producto.Precio}', ${producto.Stock})">Agregar al Carrito</button>
    `;
    contenedorProductos.appendChild(productoElement);
  });
}

mostrarCarrito();
generarCardsProductos();
