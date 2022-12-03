// //Manipulacion del DOM
// //getElement
const mainTittle = document.getElementById('mainTittle')

// //inner.text
mainTittle.innerText = '¡¡Bienvenidos al Mamboreta!!'


const cards = document.getElementById('cards')
const items = document.getElementById('items')
const footer = document.getElementById('footer')
const btnComprar = document.getElementById('checkout')
const templateCard = document.getElementById('template-card').content
const templateFooter = document.getElementById('template-footer').content
const templateCarrito = document.getElementById('template-carrito').content
const fragment = document.createDocumentFragment() 
let carrito = {} 

document.addEventListener('DOMContentLoaded',() =>{
    fetchData()
    if(localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'))
        mostrarCarrito()
    }
})

cards.addEventListener('click', e =>{
    addCarrito(e)
})

items.addEventListener('click',e =>{
    btnAccion(e)
})

const fetchData = async () => {
    try {
        const res = await fetch('productos.json')
        const data = await res.json()
        // console.log(data)
        mostrarCards(data)
    } catch(error) {
        console.log(error)
    }
}

const mostrarCards = data => {
    data.forEach(producto =>{
        templateCard.querySelector('h5').textContent = producto.title
        templateCard.querySelector('p').textContent = producto.price
        templateCard.querySelector('img').setAttribute("src", producto.image)
        templateCard.querySelector('.btn-dark').dataset.id = producto.id

        const clone = templateCard.cloneNode(true)
        fragment.appendChild(clone)
    })
    cards.appendChild(fragment)
}

const addCarrito = e => {
    console.log(e.target)
    console.log(e.target.classList.contains('btn-dark'))
    if(e.target.classList.contains('btn-dark')){
        setCarrito(e.target.parentElement)

    }
    e.stopPropagation()
}

const setCarrito = objeto =>{
    console.log(objeto)
    const producto = {
        id: objeto.querySelector('.btn-dark').dataset.id,
        title:objeto.querySelector('h5').textContent,
        price: objeto.querySelector('p').textContent,
        cantidad:1
    }

    if(carrito.hasOwnProperty(producto.id)){
        producto.cantidad = carrito[producto.id].cantidad+1
    }

    carrito[producto.id] = {...producto}
    mostrarCarrito()
}

const mostrarCarrito = () => {
    items.innerHTML = ''
    Object.values(carrito).forEach(producto =>{
        templateCarrito.querySelector('th').textContent = producto.id
        templateCarrito.querySelectorAll('td')[0].textContent = producto.title
        templateCarrito.querySelectorAll('td')[1].textContent = producto.cantidad
        templateCarrito.querySelector('.btn-info').dataset.id = producto.id
        templateCarrito.querySelector('.btn-danger').dataset.id = producto.id
        templateCarrito.querySelector('span').textContent = producto.cantidad * producto.price
        const clone = templateCarrito.cloneNode(true)
        fragment.appendChild(clone)
    })
    items.appendChild(fragment)

    mostrarFooter()

    localStorage.setItem('carrito',JSON.stringify(carrito))
}

const mostrarFooter = () =>{
    footer.innerHTML = ''
    if(Object.keys(carrito).length ===0){
        footer.innerHTML=`
        <th scope="row" colspan="5">Carrito vacío </th>
        `
        return
    }

    const cantidadTotal = Object.values(carrito).reduce((acc,{cantidad})=> acc + cantidad ,0)
    const precioTotal = Object.values(carrito).reduce((acc, {cantidad, price}) => acc + cantidad * price,0)
    
    templateFooter.querySelectorAll('td')[0].textContent = cantidadTotal
    templateFooter.querySelector('span').textContent = precioTotal

    const clone = templateFooter.cloneNode(true)
    fragment.appendChild(clone)
    footer.appendChild(fragment)

    const btnVaciarCarrito = document.getElementById('vaciar-carrito')
    btnVaciarCarrito.addEventListener('click', ()=>{
        carrito = {}
        mostrarCarrito()
    })
}

const btnAccion = e =>{
    //Aumentar los productos
    if(e.target.classList.contains('btn-info')){
        carrito[e.target.dataset.id]
        const producto = carrito[e.target.dataset.id]
        producto.cantidad++
        carrito[e.target.dataset.id] = {...producto}
        mostrarCarrito()
    }

    if(e.target.classList.contains('btn-danger')){
        const producto = carrito[e.target.dataset.id]
        producto.cantidad--
        if(producto.cantidad=== 0){
            delete carrito[e.target.dataset.id]
        }
        mostrarCarrito()
    }

e.stopPropagation()
}


btnComprar.onclick = () => {
    Swal.fire({
        title:'Gracias por tu compra!',
        showConfirmButton:false,
        timer:3000
    })
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
    
// //Guardar en el LocalStorage    
     localStorage.setItem('infoUsuario',JSON.stringify(usuario))
 }

// //Uso de la libreria SweetAlert
 Swal.fire({
     title:'COMMING SOON! HOT SALE! - Hasta 50% OFF',
     showConfirmButton:false,
     timer:3000
 })




