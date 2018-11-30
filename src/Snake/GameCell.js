import React from 'react'
const style = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

}
const GameCell = (props) => (
    <div
        style={{
            ...style,
            flexBasis: 100 / props.numberOfCells + '%',
        }}
    >
        <div>{props.cell}</div>
    </div>
)
export default GameCell