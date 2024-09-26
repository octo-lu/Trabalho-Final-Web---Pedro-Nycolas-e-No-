const express = require('express')

const cors = require('cors')
const app = express()
app.use(express.json())

//Pedro:
//middleware cors utilizado para permitir o uso de recursos em origens distintas
app.use(cors())


const fs = require('fs')

//Rota get para os dados do JSON newsLetter
app.get('/newsLetter', (req, res) => {
    const newsLetter = fs.readFileSync('./db/newsLetter.json', 'utf-8')
    const newsData = JSON.parse(newsLetter)
    res.json(newsLetter)
})
//Rota get para os dados do JSON schedule
app.get('/schedule', (req, res) => {
    const schedule = fs.readFileSync('./db/schedule.json', 'utf-8')
    const schData = JSON.parse(schedule)
    res.json(schData)
})
//PORTA DA API
app.listen(3000, () => {
    console.log('Api up')
})

//Rota POST para os dados do JSON newsLetter
app.post('/newsLetter', (req, res) => {
   
    const fileData = fs.readFileSync('./db/newsLetter.json', 'utf-8')
    const newsUsers = fileData ? JSON.parse(fileData) : [];

    newsUsers.push(req.body)

    fs.writeFileSync('./db/newsLetter.json', JSON.stringify(newsUsers, null, 2))
    res.status(200).json({message: 'Cadastrado com Sucesso'})
})

//Rota POST para os dados do JSON schedule
app.post('/schedule', (req, res) => {
    
    const fileData = fs.readFileSync('./db/schedule.json', 'utf-8')
    const schedule = fileData ? JSON.parse(fileData) : [];

    schedule.push(req.body)

    fs.writeFileSync('./db/schedule.json', JSON.stringify(schedule, null, 2))
    res.status(200).json({message: 'Cadastrado com Sucesso'})
})


