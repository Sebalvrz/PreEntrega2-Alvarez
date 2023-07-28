alert("Adidas Store");
console.log("Adidas Store");

class Producto {
    constructor(id, nombre, precio, cantidad) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.cantidad = cantidad;
    }

    aumentarCantidad(cantidad) {
        this.cantidad += cantidad;
    }

    descripcion() {
        return  "id: " + this.id +
                "\nnombre: " + this.nombre +
                "\nprecio: " + this.precio;
    }

    descripcionDeCompra() {
        return  "nombre: " + this.nombre +
                "\nprecio: " + this.precio +
                "\ncantidad: " + this.cantidad;
    }
}

class ProductoController {
    constructor() {
        this.listaProductos = [];
    }

    agregar(producto) {
        this.listaProductos.push(producto);
    }

    buscarProductoPorID(id) {
        return this.listaProductos.find(producto => producto.id === id);
    }

    mostrarProductos() {
        let listaEnTexto = "";
        this.listaProductos.forEach(producto => {
            listaEnTexto += producto.descripcion() + "\n---------------------\n";
        });
        alert(listaEnTexto);
        console.log(listaEnTexto);
    }
}

class Carrito {
    constructor() {
        this.listaCarrito = [];
    }

    agregar(producto, cantidad) {
        let existe = this.listaCarrito.some(el => el.id === producto.id);
        if (existe) {
            producto.aumentarCantidad(cantidad);
        } else {
            producto.aumentarCantidad(cantidad);
            this.listaCarrito.push(producto);
        }
    }

    mostrarProductos() {
        let listaEnTexto = "Carrito de compras:\n";
        this.listaCarrito.forEach(producto => {
            listaEnTexto += producto.descripcionDeCompra() + "\n--------------\n";
        });
        alert(listaEnTexto);
        console.log(listaEnTexto);
    }

    calcularTotal() {
        return this.listaCarrito.reduce((acumulador, producto) => acumulador + producto.precio * producto.cantidad, 0);
    }

    calcularIVA() {
        return this.calcularTotal() * 0.21;
    }

    mostrarDetalleConIVA() {
        let detalleConIVA = "Detalle de la compra con IVA:\n";
        this.listaCarrito.forEach(producto => {
            const subtotal = producto.precio * producto.cantidad;
            const iva = subtotal * 0.21;
            detalleConIVA += `${producto.nombre} - Cantidad: ${producto.cantidad} - Precio: $${producto.precio} - Subtotal: $${subtotal} - IVA (21%): $${iva}\n`;
        });
        alert(detalleConIVA);
        console.log(detalleConIVA);
    }

    obtenerTicketCompra() {
        let ticket = "=======================================\n";
        ticket += "       ADIDAS - TICKET DE COMPRA       \n";
        ticket += "=======================================\n";
        this.listaCarrito.forEach(producto => {
            const subtotal = producto.precio * producto.cantidad;
            ticket += `${producto.nombre} - Cantidad: ${producto.cantidad} - Precio: $${producto.precio} - Subtotal: $${subtotal}\n`;
        });
        ticket += "---------------------------------------\n";
        const totalSinIVA = this.calcularTotal();
        const iva = this.calcularIVA();
        const totalConIVA = totalSinIVA + iva;
        ticket += `SUBTOTAL: $${totalSinIVA}.-\n`;
        ticket += `IVA (21%): $${iva}.-\n`;
        ticket += `TOTAL: $${totalConIVA}.-\n`;
        ticket += "=======================================\n";
        return ticket;
    }
}

const CP = new ProductoController();
const zapatillas1 = new Producto(1, "Adidas Lucas Puig", 40000, 0);
const zapatillas2 = new Producto(2, "Adidas Stan Smith", 35000, 0);
const zapatillas3 = new Producto(3, "Adidas Superstar", 38000, 0);
const zapatillas4 = new Producto(4, "Adidas Retropy F2", 50000, 0);

CP.agregar(zapatillas1);
CP.agregar(zapatillas2);
CP.agregar(zapatillas3);
CP.agregar(zapatillas4);

const CARRITO = new Carrito();

let rta;

do {
    CP.mostrarProductos();
    let opcion = Number(prompt("Ingrese el código del producto"));
    let producto = CP.buscarProductoPorID(opcion);

    if (!producto) {
        alert("No corresponde a un artículo del listado. Intente nuevamente.");
        console.log("No corresponde a un artículo del listado. Intente nuevamente.");
        continue;
    }

    let cantidad = Number(prompt("Ingrese la cantidad del producto seleccionado"));
    if (cantidad <= 0) {
        alert("Error al ingresar la cantidad. Intente nuevamente.");
        console.log("Error al ingresar la cantidad. Intente nuevamente.");
        continue;
    }

    CARRITO.agregar(producto, cantidad);
    alert("El producto fue añadido al carrito: ");
    console.log("El producto fue añadido al carrito: ");
    CARRITO.mostrarProductos();

    rta = prompt("¿Agregar otro producto? (Si/No)").toLowerCase();
} while (rta === "si");

console.log("Resumen de la compra:");
CARRITO.mostrarProductos();
console.log(`Total sin IVA: $${CARRITO.calcularTotal()}.-`);
console.log(`IVA (21%): $${CARRITO.calcularIVA()}.-`);
console.log(`Total con IVA: $${CARRITO.calcularTotal() + CARRITO.calcularIVA()}.-`);

const detalleCompra = CARRITO.obtenerTicketCompra();
alert(detalleCompra);
console.log(detalleCompra);

alert("Gracias por su compra!");
console.log("Gracias por su compra!");