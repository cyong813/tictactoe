import axios from 'axios'

const baseUrl = 'http://127.0.0.1:8000'

export const getBoard = () => {
    return axios.get(`${baseUrl}/game`)
}

export const updateBoard = (currentPlayer: string, row: number, column: number) => {
    return axios.post(`${baseUrl}/play`, {
        currentPlayer,
        row,
        column
    })
}