//Manipulacion del DOM
//getElement
const mainTittle = document.getElementById('mainTittle')

//inner.text
mainTittle.innerText = 'Bienvenidos al Mamboreta!!'

//Manipulacion de la tienda

let products = [];
let total = 0;

function add(product, price){
    console.log(product, price)
    products.push(product);
    total = total + price
    document.getElementById("checkout").innerHTML = `Pagar $${total}`
}

function pay(){
    window.alert(products.join(",\n"))
}

//Manejo del formulario con datos del cliente

const inputNombre = document.getElementById('nombre')
const inputApellido = document.getElementById('apellido')
const botonDatos = document.getElementById('botonDatos')

formulario.onclick = (e) =>{
    e.preventDefault()
    const usuario = {
        nombre: inputNombre.value,
        apellido: inputApellido.value
    }
    inputNombre.value = ''
    inputApellido.value = ''
    console.log(usuario)
    
//Guardar en el LocalStorage    
    localStorage.setItem('infoUsuario',JSON.stringify(usuario))
}

