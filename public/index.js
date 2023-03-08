const gunBench = document.getElementById('gunBench')
const myCardContainer = document.querySelector('ul')
const submitBtn = document.querySelector('#subBtn')
const barrel = document.querySelector('#barrelLength')

let curGunObj = {}

const barrelOpt = (stock) => {
    gunBench.innerHTML = ''
    axios.get(`http://localhost:5000/stocks/${stock}`)
    .then(response => {
        barrel.innerHTML = ''
        let gunOptArr = response.data
        for(let i = 0; i < gunOptArr.length; i++){
            barrelCards(gunOptArr[i])
            // console.log(response.data[i])
        }
        // console.log(response.data)
    }).catch(err => console.log(err))
}

const barrelCards = (barrelObj) => {
    let { imgMain, imgIcon, stock, barrelLength } = barrelObj
    let barCard = document.createElement('div')
    barCard.innerHTML = `
    <img id='option' onclick="displayImg('${barrelLength}', '${stock}','${imgMain}')" src="${imgIcon}" alt="" style="height: 100px;">
    `
    barrel.appendChild(barCard)
}

const displayImg = (barrelLength, stock, imgMain) => {
    gunBench.innerHTML = ''
    let mainCard = document.createElement('div')
    mainCard.innerHTML = `
    <img id='display' src="${imgMain}" alt="myGun" style="width: 100%;">
    `
    gunBench.appendChild(mainCard)

    curGunObj = {
        name: '',
        imgMain,
        barrelLength,
        stock
    }
}


const createCard = gun => {
   

    let myCard = document.createElement('li')
    myCard.classList.add('gunCard')

    myCard.innerHTML= `

    <p id="gunName">${gun.name}</p>
    <img id='cardImg' src='${gun.imgMain}'></img>
    <p id='barrel'>Barrel Length: ${gun.barrelLength}</p>
    <p id='stock'>Stock Type: ${gun.stock}</p>
    <p id='id'>Weapon ID: ${gun.id}</p>
    <button id='deleteBtn' onclick="deleteCard(${gun.id})" >Delete</button>
    
    `

    myCardContainer.appendChild(myCard)
}

const pullCards = () => {
    axios.get('http://localhost:5000/cards')
    .then(response => {
        myCardContainer.innerHTML = ''
        console.log(response.data)
        for(let i = 0; i < response.data.length; i++){
            createCard(response.data[i])
        }
    }).catch(err => console.log(err))
}

const deleteCard = id => {
    axios.delete(`http://localhost:5000/${id}`)
    .then(response => {
    pullCards(response.data)
    }).catch(err => console.log(err))
}

const addCard = gunObj => {
    axios.post(`http://localhost:5000/guns/add`, gunObj)
    .then(response => {
        myCardContainer.innerHTML = ''
    
        for(let i = 0; i < response.data.length; i++){
            createCard(response.data[i])
    }
    }).catch(err => console.log(err))
}


const submitHandler = evt => {
    console.log(curGunObj)
    // let inputContainer = document.querySelector('#inputContainer')
    // inputContainer.style.visibility = 'visible';
    let inputCard = document.createElement('section')
    inputCard.setAttribute('id', 'inputCard')
    inputCard.innerHTML = `<p>Name your rifle</p>
            <input type="text" placeholder="Name..." id="nameIn">
            <button id="subObj" onclick="addGun()">Submit</button>`
    gunBench.insertBefore(inputCard, gunBench.firstChild)
}

const addGun = evt => {
    
    let name = document.querySelector('#nameIn') 
        curGunObj.name = name.value

        addCard(curGunObj)

        name.value = ''
        inputCard.innerHTML = ''
}

submitBtn.addEventListener('click', submitHandler)

pullCards()