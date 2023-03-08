const express = require('express')
const cors = require('cors')


const app = express()

app.use(express.json())
app.use(cors())

app.use(express.static(`${__dirname}../../public`))

const {
    sendBarrelOpt,
    getCards,
    addGun,
    sendOptics,
    deleteCard
} = require('./controller')

app.get('/stocks/:stock', sendBarrelOpt)
app.get('/cards', getCards)
app.get('/:stock/:barrelLength', sendOptics)
app.post('/guns/add', addGun)
app.delete('/:id', deleteCard)


app.listen(5000, console.log(`App running on port 5000!`))