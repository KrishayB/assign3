import * as React from 'react'
import * as ReactBootstrap from 'react-bootstrap'

const { Badge, Button, Card } = ReactBootstrap

function Square({ value, onSquareClick }) {
    return (<button className='square' onClick={onSquareClick}>{value}</button>);
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6],            // diagonals
    ];

    for (const [a, b, c] of lines) {
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c])
            return squares[a];
    }

    return null;
}

function Board() {
    const [ squares, setSquares ] = React.useState(Array(9).fill(null));
    const [ setToX, setSetToX ] = React.useState(true);

    function handleClick(i) {
        if (squares[i] || calculateWinner(squares))
            return;
        const nextSquares = [...squares];
        nextSquares[i] = setToX ? 'X' : 'O';
        setSquares(nextSquares);
        setSetToX(!setToX);
    }

    const winner = calculateWinner(squares);
    const status = winner ? ('Winner: ' + winner) : ('Next player: ' + (setToX ? 'X' : 'O'));

    return (
        <>
            <Card className='starter-card'>
                <Card.Body>
                    <h1 className="greeting display-6 fw-bold">{status}</h1>
                </Card.Body>
            </Card>

            <div className='board-row'>
                <Square value={squares[0]} onSquareClick={() => handleClick(0)}/>
                <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
                <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
            </div>
            <div className='board-row'>
                <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
                <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
                <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
            </div>
            <div className='board-row'>
                <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
                <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
                <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
            </div>
        </>
    );
}

export default function App() {
    return <Board />;
}
