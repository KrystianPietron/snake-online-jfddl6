import React from 'react'

class Snake extends React.Component {
    state = {
        gameBoard: (
            Array(this.props.boardDimension)
                .fill(
                    Array(this.props.boardDimension)
                        .fill(1)
                )
        )
    }

    render() {
        const gameBoard = JSON.parse(JSON.stringify(this.state.gameBoard))

        return (
            <div>
                {
                    gameBoard.map(row => (
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
    }
}

Snake.defaultProps = {
    // @TODO is should be check if bigger than eg .5
    boardDimension: 10
}

export default Snake