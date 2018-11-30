import React from 'react'
import GameCell from './GameCell'

const GameRow = (props) => (
    <div>
        {
            props.gameBoard.map(row => (
                <div>
                    <GameCell row={row} />
                </div>
            ))
        }
    </div>
)
export default GameRow