//Manipulacion del DOM
//getElement
const mainTittle = document.getElementById('mainTittle')

//inner.text
mainTittle.innerText = 'Bienvenidos al Mamboreta!!'

//Manipulacion de la tienda

// let products = [];
// let total = 0;

// function add(product, price){
//     console.log(product, price)
//     products.push(product);
//     total = total + price
//     document.getElementById("checkout").innerHTML = `Pagar $${total}`
// }

// function pay(){
//     swal.fire({
//         text:`El total a pagar es $${total}`,
//         confirmButtonText:'Pagar',
//         showCancelButton: true,
//         cancelButtonText: 'Seguir comprando'
// })
// }


const cardsDiv = document.querySelector('.cards')

const buscarProductos = async () => {
    const productosFetch = await fetch('productos.json')
    const productosJson = await productosFetch.json()
    console.log(productosJson)
    productosJson.forEach(prod=>{
        const{id,title,image,price} = prod
        cardsDiv.innerHTML += `
        <div class="card" style="width: 18rem;">
        <img src="${image}" class="card-img-top" alt="...">
        <div class = "card-body">
        <h5>${title}</h5>
            <p>${price}</p>
            <button id ${id} class="btn btn-primary"> AGREGAR</button>
        </div>
    </div>
        `
    })
}

buscarProductos()




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

//Uso de la libreria SweetAlert
Swal.fire({
    title:'COMMING SOON! HOT SALE! - Hasta 50% OFF',
    showConfirmButton:false,
    timer:3000
})




