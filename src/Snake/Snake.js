import React from 'react'
import GameBoard from './GameBoard'

class Snake extends React.Component {
    constructor(props) {
        super(props)

        const halfBoardDimension = Math.ceil(props.boardDimension / 2) - 1

        this.state = {
            gameBoard: (
                Array(this.props.boardDimension)
                    .fill(
                        Array(this.props.boardDimension)
                            .fill(1)
                    )
            ),
            snakes: [
                [
                    { x: halfBoardDimension + 2, y: halfBoardDimension },
                    { x: halfBoardDimension + 1, y: halfBoardDimension },
                ],
                [
                    { x: halfBoardDimension - 2, y: halfBoardDimension },
                    { x: halfBoardDimension - 1, y: halfBoardDimension }
                ]
            ],
            directions: [
                'right',
                'left'
            ],
            food: [
                // { x: 2, y: 2 }
            ],
            currentPlayerIndex: 0
        }

    }
    composeGameBoard = () => {
        const gameBoardCopy = JSON.parse(JSON.stringify(this.state.gameBoard))
        this.state.snakes.forEach(snake => (
            snake.forEach(bodyCellPosition => (
                gameBoardCopy[bodyCellPosition.y][bodyCellPosition.x] = 0
            ))
        ))
        this.state.food.forEach(foodPosition => (
            gameBoardCopy[foodPosition.y][foodPosition.x] = 'F'
        ))
        return gameBoardCopy
    }

    render() {
        const gameBoard = this.composeGameBoard()

        return (
            <GameBoard gameBoard={gameBoard} />
        )
    }
}

Snake.defaultProps = {
    // @TODO is should be check if bigger than eg .5
    boardDimension: 10
}

export default Snake