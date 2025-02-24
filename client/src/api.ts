'use server'
import { redirect } from 'next/navigation'

import axios from 'axios'

const baseUrl = 'http://127.0.0.1:8000'

export const getRooms = async () => {
    try {
        const response = await axios.get(`${baseUrl}/rooms`)
        return response.data
    } catch (err) {
        console.log(err)
        throw err
    }
}

export const createRoom = async (name: string) => {
    try {
        const response = await axios.post(`${baseUrl}/rooms`, { name })
        const roomId = response.data.id
        redirect(`/rooms/${roomId}/game`)
    } catch (err) {
        console.log(err)
        throw err
    }
}

export const getBoard = async (id: number) => {
    return axios.get(`${baseUrl}/game/${id}`)
}

export const updateBoard = async (currentPlayer: string, row: number, column: number) => {
    return axios.post(`${baseUrl}/play`, {
        currentPlayer,
        row,
        column
    })
}