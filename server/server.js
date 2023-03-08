const express = require('express')
const cors = require('cors')
const path = require('path')


const app = express()

app.use(express.json())
app.use(cors())

app.use(express.static(`${__dirname}../../public`))

const {
    sendM4Opt,
    sendM16Opt,
    sendMoeCarOpt,
    sendMoeOpt,
    getCards,
    addGun,
    deleteCard
} = require('./controller')

app.get('/stocks/M4', sendM4Opt)
app.get('/stocks/M16', sendM16Opt)
app.get('/stocks/MoeCar', sendMoeCarOpt)
app.get('/stocks/Moe', sendMoeOpt)
app.get('/cards', getCards)

app.post('/guns/add', addGun)
app.delete('/:id', deleteCard)
app.listen(5000, console.log(`App running on port 5000!`))

