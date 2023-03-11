

const body = document.querySelector('body')

const opticOpt = document.getElementById('opticOpt')
const gunBench = document.getElementById('gunBench')
const myCardContainer = document.querySelector('#myCardContainer')
const submitBtn = document.querySelector('#subBtn')
const barrel = document.querySelector('#barrelLength')
const mainCard = document.querySelector('#mainCard')
const input1 = document.getElementById('input1')
const img = document.querySelectorAll('.option') 


let curGunObj = {}

const barrelOpt = (stock) => {
    gunBench.innerHTML = ''
    input1.innerHTML = ''
    axios.get(`/stocks/${stock}`)
    .then(response => {
        barrel.innerHTML = ''
        let gunOptArr = response.data
        for(let i = 0; i < gunOptArr.length; i++){
            barrelCards(gunOptArr[i])
        }
    }).catch(err => console.log(err))
}

const barrelCards = (barrelObj) => {
    let {imgIcon, stock, barrelLength, imgMain, optic } = barrelObj
    let barCard = document.createElement('div')
    barCard.setAttribute("id", 'barCard')
    barCard.innerHTML = `
    <img class='option1' src="${imgIcon}" onclick="displayOptics('${barrelLength}', '${stock}', '${optic}', '${imgMain}')" alt="">
    `
    barrel.appendChild(barCard)
}
const displayFirstImg = (imgMain) => {
    
    
}

const displayOptics = (barrelLength, stock, optic, imgMain) => {
    gunBench.innerHTML = ''
    input1.innerHTML = ''
    submitBtn.style.visibility = 'visible'
    let mainCard = document.createElement('div')
    mainCard.setAttribute("id", "mainCard")
    mainCard.innerHTML = `
    <img id='display' src="${imgMain}" alt="myGun">
    `
    gunBench.appendChild(mainCard)
    
    curGunObj = {
        name: '',
        imgMain,
        barrelLength,
        optic,
        stock
    }
    
    axios.get(`/${stock}/${barrelLength}`)
    .then(response=>{
        opticOpt.innerHTML = ''
        
        let optArr = response.data
        for(let i = 0; i < optArr.length; i++){
            opticCards(optArr[i])
        }
    }).catch(err=> console.log(err))
}

const opticCards = (optObj) => {
    let {imgMain, stock, barrelLength, optic, imgIcon} = optObj
    let optCard = document.createElement('section')
    
    optCard.innerHTML = `
    <img class='option2' onclick="displayImg('${barrelLength}', '${stock}', '${optic}', '${imgMain}')" src="${imgIcon}" alt="">
    `
    opticOpt.appendChild(optCard)

}

const displayImg = (barrelLength, stock, optic, imgMain) => {
    gunBench.innerHTML = ''
    input1.innerHTML = ''
    input1.style.visibility = 'hidden'
    submitBtn.style.visibility = 'visible'
    let mainCard = document.createElement('div')
    mainCard.setAttribute("id", "mainCard")
    mainCard.innerHTML = `
    <img id='display' src="${imgMain}" alt="myGun">
    `
    gunBench.appendChild(mainCard)
    
    curGunObj = {
        name: '',
        imgMain,
        barrelLength,
        optic,
        stock
    }
}


const createCard = gun => {
    let myCard = document.createElement('li')
    myCard.classList.add('gunCard')
    myCard.addEventListener('mouseover', ()=> myCard.classList.add('active'))
    myCard.addEventListener('mouseout', ()=> myCard.classList.remove('active'))
    myCard.innerHTML= `
    <p id="gunName">${gun.name}</p>
    <div id="imgCon">
        <img id='cardImg' src='${gun.imgMain}'></img>
    </div>
    <p id='barrel'>Barrel Length: ${gun.barrelLength} inches</p>
    <p id='stock'>Stock Type: ${gun.stock}</p>
    <p id='id'>Weapon ID: ${gun.id}</p>
    <button id='deleteBtn' onclick="deleteCard(${gun.id})" >Delete</button>
    `
    myCardContainer.appendChild(myCard)
}

const pullCards = () => {
    axios.get('/cards')
    .then(response => {
        myCardContainer.innerHTML = ''
        console.log(response.data)
        for(let i = 0; i < response.data.length; i++){
            createCard(response.data[i])
        }
    }).catch(err => console.log(err))
}

const deleteCard = id => {
    axios.delete(`/${id}`)
    .then(response => {
        pullCards(response.data)
    }).catch(err => console.log(err))
}

const addCard = gunObj => {
    axios.post(`/guns/add`, gunObj)
    .then(response => {
        myCardContainer.innerHTML = ''
        
        for(let i = 0; i < response.data.length; i++){
            createCard(response.data[i])
        }
    }).catch(err => console.log(err))
}


const submitHandler = evt => {
    
    input1.style.visibility = 'visible'
    input1.innerHTML = ''
    let inputCard = document.createElement('section')
    inputCard.setAttribute('id', 'inputCard')
    inputCard.innerHTML = `<p>Name your rifle</p>
    <input type="text" placeholder="Name..." id="nameIn">
    <button id="subObj" onclick="addGun()">Submit</button>
    <button id="cancel" onclick="cancelInput()">Cancel</button>`
    input1.appendChild(inputCard)
}

const cancelInput = evt => input1.style.visibility = 'hidden';

const addGun = evt => {
    submitBtn.style.visibility = "hidden"
    let name = document.querySelector('#nameIn') 
    curGunObj.name = name.value
    if(curGunObj.name === ''){
        alert("Please enter a name")
    } else { addCard(curGunObj)
        
        name.value = ''
        inputCard.innerHTML = ''
        input1.style.visibility = 'hidden'
    }
}

const btnLeft = document.querySelector('#left')
const btnRight = document.querySelector('#right')

btnLeft.addEventListener('click', function(){
    document.getElementById('myCardContainer').scrollLeft -= 255
    
});
btnRight.addEventListener('click', function(){
    document.getElementById('myCardContainer').scrollLeft += 255
    
});

// const rotate = () => {    
//     for(let i = 0; i < img.length; i++){
//         if(window.innerWidth <= 600){
//             img[i].setAttribute('style', 'transform: rotate(-90deg);')
//         } else if(window.innerWidth > 600){
//             img[i].setAttribute('style', 'transform: none;')
//         }
//     }
// }

submitBtn.addEventListener('click', submitHandler)

// rotate()
pullCards()