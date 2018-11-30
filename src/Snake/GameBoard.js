import React from 'react'
import GameRow from './GameRow'
const style = {
    width: '100%',
    maxWidth: '700px',
    margin: '0 auto'
}
const GameBoard = (props) => (
    <div
        style={style}
    >
    {
        <GameRow gameBoard={props.gameBoard}/>
    }
</div>
)
export default GameBoard