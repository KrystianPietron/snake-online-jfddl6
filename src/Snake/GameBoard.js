import React from 'react'

const GameBoard = (props) =>(
    <div>
    {
        props.gameBoard.map(row => (
            <div>
                {
                    row.map(cell => (
                        <span>{cell}</span>
                    ))
                }
            </div>
        ))
    }
</div>
)
export default GameBoard