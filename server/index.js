import express from 'express'
import cors from 'cors'

const app = express()
const port = 8000

app.use(cors())

app.get('/game', (req, res) => {
    res.send({
        score: 0,
        board: [['X', 'O', 'O'],['X', 'X', 'O'],['X','','']],
        currentPlayer: 'X'
    })
})

app.post('/play', (req, res) => {
    // const { currentPlayer, row, column } = req.body
    res.send({
        score: 0,
        board: [['X', 'O', 'O'],['X', 'X', 'O'],['X','X','']],
        currentPlayer: 'O'
    })
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})