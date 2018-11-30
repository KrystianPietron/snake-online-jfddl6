import React from 'react'
const style = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexBasis: '10%'

}
const GameCell = (props) => (
    <div
    style = {style}
    >
        {
            props.row.map(cell => (
                <div>{cell}</div>
            )
            )
        }
    </div>
)
export default GameCell