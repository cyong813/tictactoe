'use client'

import { Stage, Layer, Rect, Text } from 'react-konva'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Konva from 'konva'
import styles from './page.module.css'
import { KonvaEventObject } from 'konva/lib/Node'
import { Shape } from 'konva/lib/Shape'

export default function Home() {
    const [isLoading, setLoading] = useState(true)
    const [board, setBoard] = useState([['', '', ''], ['', '', ''], ['', '', '']])
    const [currentPlayer, setCurrentPlayer] = useState('X')

    const onBoardClick = (e: KonvaEventObject<MouseEvent>, r: number, c: number) => {
        let shape = e.target as Shape
        shape.fill('white')
        e.cancelBubble = true
        if (['X', 'O'].includes(board[r][c])) return // do nothing when board cell is already filled
        axios.post('http://127.0.0.1:8000/play', {
            currentPlayer: 'X',
            row: r,
            column: c
        })
            .then(function (response) {
                setBoard(response.data.board)
                setCurrentPlayer(response.data.currentPlayer)
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    const handleMouseEnter = (e: KonvaEventObject<MouseEvent>, r: number, c: number) => {
        if (['X', 'O'].includes(board[r][c])) return
        let shape = e.target as Shape
        shape.fill('#daff9d')
        document.body.style.cursor = 'pointer'
    }

    const handleMouseLeave = (e: KonvaEventObject<MouseEvent>, r: number, c: number) => {
        if (['X', 'O'].includes(board[r][c])) return
        let shape = e.target as Shape
        shape.fill('white')
        document.body.style.cursor = 'default'
    }

    const buildBoard = (board: string[][]) => {
        const grid = []

        for (let r=0;r<board.length;r++) {
            for (let c=0;c<board[0].length;c++) {
                grid.push(
                    <Rect
                        key={`${r},${c}`}
                        x={(window.innerWidth * .4) + (c * 100)}
                        y={(window.innerHeight * .3) + (r * 100)}
                        width={100}
                        height={100}
                        fill='white'
                        strokeWidth={1}
                        stroke='black'
                        onClick={e => onBoardClick(e, r, c)}
                        onMouseEnter={e => handleMouseEnter(e, r, c)}
                        onMouseLeave={e => handleMouseLeave(e, r, c)}
                    />
                )
                if (board[r][c] === 'X') {
                    grid.push(
                        <Text
                            key={`X,${r},${c}`}
                            text='X'
                            fontSize={50}
                            x={(window.innerWidth * .4) + 33 + (c * 100)}
                            y={(window.innerHeight * .3) + 25 + (r * 100)}
                            fill='black'
                        />
                    )
                } else if (board[r][c] === 'O') {
                    grid.push(
                        <Text
                            key={`O,${r},${c}`}
                            text='O'
                            fontSize={50}
                            x={(window.innerWidth * .4) + 33 + (c * 100)}
                            y={(window.innerHeight * .3) + 25 + (r * 100)}
                            fill='black'
                        />
                    )
                }
            }
        }

        return (
            grid.map(comp => comp)
        )
    }

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/game')
            .then(function (response) {
                // handle success
                setBoard(response.data.board)
                setCurrentPlayer(response.data.currentPlayer)
            })
            .catch(function (error) {
                // handle error
            })
    }, [])

    return (
      <Stage width={window.innerWidth} height={window.innerHeight}>
          <Layer>
              {
                buildBoard(board)
              }
          </Layer>
      </Stage>
  );
}
