import React from 'react'
import GameBoard from './GameBoard'

class Snake extends React.Component {
    constructor(props) {
        super(props)

        const halfBoardDimension = Math.ceil(props.boardDimension / 2) - 1
        this.intervalId = null
        this.currentGameBoard = null
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
            currentPlayerIndex: 0,
            gameTickTime: props.startGameTickTime
        }

    }
    componentDidMount = () => (
        this.intervalId = setInterval(
            this.gameTick,
            this.state.gameTickTime
        )
    )
    componentWillMount = () => (
        clearInterval(this.intervalId)
    )
    gameTick = () => (
        console.log('Tick'),
        this.checkIfMovesAreAvailable()
    )
    checkIfMovesAreAvailable = () => (
        this.state.snakes.forEach(snakePositions, snakeIndex => {
            const snakeHeadPosition = snakePositions[0]
            const direction = this.state.directions[snakeIndex]
            let newHeadPosition = null
            switch (direction) {
                case 'left':
                    newHeadPosition = {
                        x: snakeHeadPosition.x - 1,
                        y: snakeHeadPosition.y,
                    }
                    break
                case 'right':
                    newHeadPosition = {
                        x: snakeHeadPosition.x + 1,
                        y: snakeHeadPosition.y,
                    }
                    break
                case 'top':
                    newHeadPosition = {
                        x: snakeHeadPosition.x,
                        y: snakeHeadPosition.y - 1,
                    }
                    break
                case 'bottom':
                    newHeadPosition = {
                        x: snakeHeadPosition.x,
                        y: snakeHeadPosition.y + 1,
                    }
                    break
                    default:
            }
            if (
                this.currentGameBoard[newHeadPosition.y] &&
                this.currentGameBoard[newHeadPosition.y][newHeadPosition.x]
            ){
                this.moveSnake(snakeIndex)
            }else{
                this.endGame(snakeIndex)
            }
        }
        )
    )
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
        this.currentGameBoard = this.composeGameBoard()

        return (
            <GameBoard gameBoard={this.currentGameBoard} />
        )
    }
}

Snake.defaultProps = {
    // @TODO is should be check if bigger than eg .5
    boardDimension: 10,
    startGameTickTime: 1000
}

export default Snake