import React from 'react'
import GameBoard from './GameBoard'

class Snake extends React.Component {
    constructor(props) {
        super(props)

        const halfBoardDimension = Math.ceil(props.boardDimension / 2) - 1
        this.intervalId = null
        this.currentGameBoard = null
        this.direction = 'right'
        this.currentPlayerIndex = 0
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
            food: [
                // { x: 2, y: 2 }
            ],
            gameTickTime: props.startGameTickTime
        }

    }

    componentDidMount = () => {
        this.intervalId = setInterval(
            this.gameTick,
            this.state.gameTickTime
        )

        window.addEventListener(
            'keydown',
            this.onArrowKeyDown
        )
        this.placeNewFood()
    }
    componentWillMount = () => {
        clearInterval(this.intervalId)
        window.addEventListener(
            'keydown',
            this.onArrowKeyDown
        )
    }
    gameTick = () => (
        console.log('Tick'),
        this.checkIfMovesAreAvailable()
    )
    placeNewFood = () => {
        this.setState({ food: this.state.food.concat(this.generateNewFoodPosition()) })
    }
    generateNewFoodPosition = () => {
        const randomX = Math.round(Math.random() * (this.props.boardDimension - 1))
        const randomY = Math.round(Math.random() * (this.props.boardDimension - 1))
        return {
            x: randomX,
            y: randomY
        }

    }
    checkIfMovesAreAvailable = () => {
        const snakeHeadPosition = this.state.snakes[this.currentPlayerIndex][0]
        let newHeadPosition = null
        switch (this.direction) {
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
            case 'up':
                newHeadPosition = {
                    x: snakeHeadPosition.x,
                    y: snakeHeadPosition.y - 1,
                }
                break
            case 'down':
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
        ) {
            this.checkIfIsFood(newHeadPosition)
        } else {
            this.endGame()
            clearInterval(this.intervalId)
        }
    }
    checkIfIsFood = (newHeadPosition) => {
        const newFood = this.state.food.filter(
            foodPosition => (
                foodPosition.x !== newHeadPosition.x ||
                foodPosition.y !== newHeadPosition.y
            )
        )
        if (newFood.length === this.state.food.length) {
            this.moveSnake(newHeadPosition)
        } else {
            this.moveSnakeOnFood(newHeadPosition)
            this.setState({ food: newFood })
            this.placeNewFood()
        }

    }
    endGame = () => (
        alert(`YOU LOST!`)
    )
    moveSnake = (newHeadPosition) => {
        const snake = this.state.snakes[this.currentPlayerIndex]
        const snakeWithoutTrail = snake.slice(0, -1)
        const snakeWithNewHead = [newHeadPosition].concat(snakeWithoutTrail)

        const newSnakes = this.state.snakes.map((snake, i) => (
            this.currentPlayerIndex === i ?
                snakeWithNewHead
                :
                snake
        ))
        this.setState({ snakes: newSnakes })
    }
    moveSnakeOnFood = (newHeadPosition) => {
        const snake = this.state.snakes[this.currentPlayerIndex]
        const snakeWithNewHead = [newHeadPosition].concat(snake)

        const newSnakes = this.state.snakes.map((snake, i) => (
            this.currentPlayerIndex === i ?
                snakeWithNewHead
                :
                snake
        ))
        this.setState({ snakes: newSnakes })
    }
    onArrowKeyDown = event => {
        switch (event.key) {
            case 'ArrowUp':
                this.direction = 'up'
                break
            case 'ArrowDown':
                this.direction = 'down'
                break
            case 'ArrowRight':
                this.direction = 'right'
                break
            case 'ArrowLeft':
                this.direction = 'left'
                break
            default:
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
        this.currentGameBoard = this.composeGameBoard()

        return (
            <GameBoard gameBoard={this.currentGameBoard} />
        )
    }
}

Snake.defaultProps = {
    // @TODO is should be check if bigger than eg .5
    boardDimension: 10,
    startGameTickTime: 500
}

export default Snake