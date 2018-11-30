import React from 'react'
import GameRow from './GameRow'

const GameBoard = (props) =>(
    <div>
    {
        <GameRow gameBoard={props.gameBoard}/>
    }
</div>
)
export default GameBoard