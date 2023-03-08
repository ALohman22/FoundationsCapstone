

const m4Opt = [
    {
        barrelLength: "8 inches",
        stock: "m4",
        imgMain: "../images/8complete.png",
        imgIcon: "../images/8upper.jpg"
    },  
    {
        barrelLength: "12 inches",
        stock: "m4",
        imgMain: "../images/12complete.png",
        imgIcon: "../images/12upper.jpg"
    }, 
    {
        barrelLength: "14.5 inches",
        stock: "m4",
        imgMain: "../images/14.5complete.png",
        imgIcon: "../images/14.5upper.jpg"
    },
    {
        barrelLength: "16 inches",
        stock: "m4",
        imgMain: "../images/16complete.png",
        imgIcon: "../images/16upper.jpg"
    }
]   

const m16Opt = [
    {
        barrelLength: "8 inches",
        stock: "m16",
        imgMain: "../images/8completeM16.png",
        imgIcon: "../images/8upper.jpg"
    },  
    {
        barrelLength: "12 inches",
        stock: "m16",
        imgMain: "../images/12completeM16.png",
        imgIcon: "../images/12upper.jpg"
    }, 
    {
        barrelLength: "14.5 inches",
        stock: "m16",
        imgMain: "../images/14.5completeM16.png",
        imgIcon: "../images/14.5upper.jpg"
    },
    {
        barrelLength: "16 inches",
        stock: "m16",
        imgMain: "../images/16completeM16.png",
        imgIcon: "../images/16upper.jpg"
    }
]

const moeCarOpt = [
    {
        barrelLength: "8 inches",
        stock: "moeCar",
        imgMain: "../images/8completeMoeCar.png",
        imgIcon: "../images/8upper.jpg"
    },  
    {
        barrelLength: "12 inches",
        stock: "moeCar",
        imgMain: "../images/12completeMoeCar.png",
        imgIcon: "../images/12upper.jpg"
    }, 
    {
        barrelLength: "14.5 inches",
        stock: "moeCar",
        imgMain: "../images/14.5completeMoeCar.png",
        imgIcon: "../images/14.5upper.jpg"
    },
    {
        barrelLength: "16 inches",
        stock: "moeCar",
        imgMain: "../images/16completeMoeCar.png",
        imgIcon: "../images/16upper.jpg"
    }
]

const moeOpt = [
    {
        
        barrelLength: "8 inches",
        stock: "moe",
        imgMain: "../images/8completeMoe.png",
        imgIcon: "../images/8upper.jpg"
    },  
    {
        
        barrelLength: "12 inches",
        stock: "moe",
        imgMain: "../images/12completeMoe.png",
        imgIcon: "../images/12upper.jpg"
    }, 
    {
        
        barrelLength: "14.5 inches",
        stock: "moe",
        imgMain: "../images/14.5completeMoe.png",
        imgIcon: "../images/14.5upper.jpg"
    },
    {
        
        barrelLength: "16 inches",
        stock: "moe",
        imgMain: "../images/16completeMoe.png",
        imgIcon: "../images/16upper.jpg"
    }
]

const myRifles = [{
    name: "big pete",
    barrelLength: "8 inches",
    stock: "moe",
    imgMain: "../images/8completeMoe.png",
    id: 1
    
},  
{
    name: "big pete",
    barrelLength: "12 inches",
    stock: "moe",
    imgMain: "../images/12completeMoe.png",
    id: 2
    
}, 
{
    name: "big pete",
    barrelLength: "14.5 inches",
    stock: "moe",
    imgMain: '../images/14.5completeMoe.png',
    id: 3
    
},
{
    name: "big pete",
    barrelLength: "16 inches",
    stock: "moe",
    imgMain: '../images/16completeMoe.png',
    id: 4
    
}]
gunId = 5

module.exports = {
    sendM4Opt: (req,res) => {
        res.status(200).send(m4Opt)
    },
    sendM16Opt: (req,res) => {
        res.status(200).send(m16Opt)
    },
    sendMoeCarOpt: (req,res) => {
        res.status(200).send(moeCarOpt)
    },
    sendMoeOpt: (req,res) => {
        res.status(200).send(moeOpt)
    },


    getCards: (req,res) => {
        res.status(200).send(myRifles)
    },
    addGun: (req,res) => {
        let newGun = {...req.body, id:gunId}
        console.log(newGun)
        myRifles.push(newGun)
        res.status(200).send(myRifles)
        gunId++
    },
    deleteCard: (req,res) => {
        let { id } = req.params
        console.log(id)
        let index = myRifles.findIndex(rifles => rifles.id === +id)
        myRifles.splice(index,1)
        res.status(200).send(myRifles)
    }
}