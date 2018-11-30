import React from 'react'
import GameCell from './GameCell'
const style={
    display: 'flex',
    backgroundColor: 'red'
}
const GameRow = (props) => (
    <div
    style = {style}
    >
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