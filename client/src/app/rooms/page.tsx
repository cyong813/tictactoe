'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getRooms } from '@/api'

export default function Page() {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [rooms, setRooms] = useState([])
    const router = useRouter()

    useEffect(() => {
        const fetchRooms = async () => {
            setLoading(true)
            try {
                const rooms = await getRooms()
                setRooms(rooms)
            } catch (e) {
                setError(true)
            } finally {
                setLoading(false)
            }
        }

        fetchRooms()
    }, [])

    const handleRoomEnter = (roomId: string) => {
        router.push(`/rooms/${roomId}/game`)
    }

    const handleCreateRoom = () => {
        router.push('/rooms/create')
    }

    return (
        <div>
            <ul>
                {rooms.map((room) => (
                    <li key={room.id}>
                        {room.name}
                        <button type='button' onClick={() => handleRoomEnter(room.id)}>
                            Play
                        </button>
                    </li>
                ))}
            </ul>
            <button type='button' onClick={handleCreateRoom}>
                Create a new room
            </button>
        </div>
    )
}