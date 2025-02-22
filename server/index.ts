import express, { Request, Response } from 'express'
import cors from 'cors'

const app = express()
const PORT = 8000

app.use(cors())

app.get('/game', (req: Request, res: Response) => {
    res.send({
        score: 0,
        board: [['X', 'O', 'O'],['X', 'X', 'O'],['X','','']],
        currentPlayer: 'X'
    })
})

app.post('/play', (req: Request, res: Response) => {
    // const { currentPlayer, row, column } = req.body
    res.send({
        score: 0,
        board: [['X', 'O', 'O'],['X', 'X', 'O'],['X','X','']],
        currentPlayer: 'O'
    })
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})