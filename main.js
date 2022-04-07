class Producto {
    constructor (nombre, precio, stock){
        this.nombre= nombre;
        this.precio= parseInt(precio);
        this.stock= stock;
    }

    sinIva(){
        this.precio = this.precio - this.precio*0.21;
    }

    actualizarStock(x){
        this.stock= this.stock - x;
    }
}

const arrayProductos = [];
arrayProductos.push(new Producto ("remera not see", 1300, 10));
arrayProductos.push(new Producto ("Jean", 2000, 10));
arrayProductos.push(new Producto ("ambos", 3300, 15)); 

console.log(arrayProductos);


function ordenarMenorMayor(){
    arrayProductos.sort((a,b)=> a.precio - b.precio);
    console.log(arrayProductos);
    mostrarListaOrdenada();
}

//Precio: Mayor a menor
function ordenarMayorMenor(){
    arrayProductos.sort((a,b)=> b.precio - a.precio);
    console.log(arrayProductos);
    mostrarListaOrdenada();
}

function mostrarListaOrdenada(){
    let array = [];
    for (i=0; i<arrayProductos.length; i++){
        array.push(arrayProductos[i].nombre+" $"+arrayProductos[i].precio);
    }
    alert("Lista de precios:"+"\n"+array.join("\n"))
}


let total = 0;

function agregarAlCarrito() {
    let otroMas; 
    

    do {
        let producto = prompt ("¿Querés comprar remera, jean o ambos?", "Ej: ambos"); 
        let cantidad = parseInt(prompt ("¿Cuántos querés comprar?"));    
        let precio;

            switch (producto) {
                case arrayProductos[0].nombre:
                    arrayProductos[0].actualizarStock(cantidad);
                    if (arrayProductos[0].stock < 0 || isNaN(cantidad)){
                        alert("Lo sentimos. En este momento no tenemos stock")
                        arrayProductos[0].stock=arrayProductos[0].stock+cantidad;
                        precio = 0;
                        cantidad = 0;
                    }else{
                        precio= arrayProductos[0].precio;
                    }
                    break;
                case arrayProductos[1].nombre:
                    arrayProductos[1].actualizarStock(cantidad);
                    if (arrayProductos[1].stock<0 || isNaN(cantidad)){
                        alert("Lo sentimos. En este momento no tenemos stock")
                        arrayProductos[1].stock=arrayProductos[1].stock+cantidad;
                        precio = 0;
                        cantidad = 0;
                    }else{
                        precio= arrayProductos[1].precio;
                    }
                    break;
                case arrayProductos[2].nombre:
                    arrayProductos[2].actualizarStock(cantidad);
                    if (arrayProductos[2].stock<0 || isNaN(cantidad)){
                        alert("Lo sentimos. En este momento no tenemos stock")
                        arrayProductos[2].stock=arrayProductos[2].stock+cantidad;
                        precio = 0;
                        cantidad = 0;
                    }else{
                        precio= arrayProductos[2].precio;
                    }
                    break;
                default:
                    alert("Alguno de los ingresados no es correcto");
                    precio= 0;
                    cantidad= 0;
            }
        total= total + precio*cantidad;
        otroMas = confirm("¿Querés agregar otro producto?");
    }while (otroMas);
}


function descuento (total) {
    if (total>=5000){
        total = total*0.80;
        alert("Tenés 20% de descuento")
    }
    return total;
}

function envio (total) {
    let confirmacion = confirm("¿Querés envio a domicilio?");
    if (confirmacion && total>=2000){
        alert("Tenés envío gratis. El total de tu compra es $"+total);
    }else if (confirmacion && total<2000 && total!=0){
        total=total+700;
        alert("El envío cuesta $700. El total de tu compra asciende a $"+total);
    }else{
        alert("El total de tu compra es $"+total);
    }
    return total;
}


let cuotas;
function cantidadCuotas(){
    let confirmacion = confirm("¿Querés pagar en cuotas?");
    if(confirmacion) {
        cuotas=  parseInt(prompt("¿En cuántas cuotas querés pagar?"));
        if (cuotas==0){
            cuotas=1;
        }else if (isNaN(cuotas)){
            cantidadCuotas();
        }
    }else {
        cuotas= 1;
    }
    return cuotas;
}


function calcularIntereses (cuotas) {
    if (cuotas==1){
        return 0;
    }else{
        let tasa = 12.3+ cuotas*0.2;
        return tasa*cuotas;
    }
}

//Calculo el total de carrito
function totalAPagar (total, cuotas, intereses) {
    total = (total+intereses)
    let valorCuota= total/cuotas;
    alert ("El total a pagar es $"+total+" en "+cuotas+" cuotas de $"+valorCuota);
}



//---------LLAMADO A LAS FUNCIONES----------
function comprar () {
    if (confirm("¿Querés ordenar la lista de productos del más barato al más caro?")){
        ordenarMenorMayor();
    }else{
        ordenarMayorMenor();
    }
    agregarAlCarrito();
    totalAPagar (envio(descuento(total)), cantidadCuotas(), calcularIntereses(cuotas));
}

comprar();