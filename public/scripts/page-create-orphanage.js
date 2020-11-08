// create map
const map = L.map('mapid').setView([-29.4737155,-52.0414413], 13);

// create and add tileLayer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
.addTo(map);

// create icon
const icon = L.icon({
    iconUrl: "./public/images/map-marker.svg",
    iconSize: [58, 68],
    iconAnchor: [29, 68]
})

// create popup overlay
const popup = L.popup({
    closeButton: false,
    className: "map-popup",
    minWidth: 240,
    minHeight: 240
})

let marker;

// create and add marker
map.on('click', (event) => {
    const lat = event.latlng.lat;
    const lng = event.latlng.lng;

    document.querySelector('[name=lat]').value = lat;
    document.querySelector('[name=lng]').value = lng;

    // remover icon
    marker && map.removeLayer(marker)

    // add icon layer
    marker = L.marker([lat, lng], { icon })
    .addTo(map)
})

// add photos field

function addPhotoField(){
    // console.log("Está funcionando")
    // pegar conainer de fotos #images
    const container = document.querySelector('#images')

    // pegar container para duplicar .new-image
    const fieldContainer = document.querySelectorAll('.new-upload')

    // realizar o clone da ultima imagem adicionada.
    const newFieldContainer = fieldContainer[fieldContainer.length - 1].cloneNode(true)

    // verificar se o campo está vazio, se está vazio não adicionar ao container
    const input = newFieldContainer.children[0]
    
    if(input.value == "") {
        return
    }

    // limpar o campo antes de adicionar ao container imagens
    input.value = ""

    // adicionar o clone ao container de #imagens
    container.appendChild(newFieldContainer)
}

function deleteField(event){
    const span = event.currentTarget    

    const fieldContainer = document.querySelectorAll('.new-upload')

    if(fieldContainer.length <= 1){
        span.parentNode.children[0].value = ""
        return
    }

    // deletar o campo
    span.parentNode.remove();
}

// select yer or no
function toggleSelect(event){

    // retirar a class .active (dos botões)
    document.querySelectorAll('.button-select button')
    .forEach( function(button){
        button.classList.remove('active')
    })

    // pegar o botão clicado
    const button = event.currentTarget
    button.classList.add('active')

    // atualizar o meu input hidden com o valor selecionado
    const input = document.querySelector('[name="open_on_weekends"]')
    
    input.value = button.dataset.value
}