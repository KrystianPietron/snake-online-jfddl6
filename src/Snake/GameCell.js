import React from 'react'

const GameCell = (props) => (
    <div>
        {
            props.row.map(cell => (
                <span>{cell}</span>
            )
            )
        }
    </div>
)
export default GameCell