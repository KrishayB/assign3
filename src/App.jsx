import * as React from 'react'
import * as ReactBootstrap from 'react-bootstrap'

const { Badge, Button, Card } = ReactBootstrap

function Square({ value, onSquareClick, isSelected }) {
    return (<button className={'square' + (isSelected ? ' selected' : '')} onClick={onSquareClick}>{value}</button>);
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

// Checks if two cells are adjacent to each other
function isAdjacent(i, j) {
    const rowI = Math.floor(i / 3);
    const colI = i % 3;
    const rowJ = Math.floor(j / 3);
    const colJ = j % 3;
    return Math.abs(rowI - rowJ) <= 1 && Math.abs(colI - colJ) <= 1 && i !== j;
}

function Board() {
    const [ squares, setSquares ] = React.useState(Array(9).fill(null));
    const [ setToX, setSetToX ] = React.useState(true);
    const [ selectedSquare, setSelectedSquare ] = React.useState(null);

    function handleClick(i) {
        if (calculateWinner(squares))
            return;

        const currentPlayer = setToX ? 'X' : 'O';
        const numPlayerPieces = squares.filter(piece => piece === currentPlayer).length;

        if (numPlayerPieces < 3) {
            if (squares[i])
                return;

            const nextSquares = [...squares];
            nextSquares[i] = currentPlayer;
            setSquares(nextSquares);
            setSetToX(!setToX);
        } else {
            if (selectedSquare === null) {
                if (squares[i] !== currentPlayer)
                    return;
                setSelectedSquare(i);
            } else {
                if (squares[i] !== null || !isAdjacent(selectedSquare, i)) {
                    setSelectedSquare(null);
                    return;
                }
                const nextSquares = [...squares];
                nextSquares[i] = currentPlayer;
                nextSquares[selectedSquare] = null;

                // If the middle square belongs to the player, then they have to move it or win
                const hasCenterPiece = squares[4] === currentPlayer;
                if (hasCenterPiece) {
                    const wouldWin = calculateWinner(nextSquares);
                    const vacatesCenter = selectedSquare === 4;
                    if (!wouldWin && !vacatesCenter) {
                        setSelectedSquare(null);
                        return;
                    }
                }

                setSquares(nextSquares);
                setSelectedSquare(null);
                setSetToX(!setToX);
            }
        }
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
                <Square value={squares[0]} onSquareClick={() => handleClick(0)} isSelected={selectedSquare === 0}/>
                <Square value={squares[1]} onSquareClick={() => handleClick(1)} isSelected={selectedSquare === 1}/>
                <Square value={squares[2]} onSquareClick={() => handleClick(2)} isSelected={selectedSquare === 2}/>
            </div>
            <div className='board-row'>
                <Square value={squares[3]} onSquareClick={() => handleClick(3)} isSelected={selectedSquare === 3}/>
                <Square value={squares[4]} onSquareClick={() => handleClick(4)} isSelected={selectedSquare === 4}/>
                <Square value={squares[5]} onSquareClick={() => handleClick(5)} isSelected={selectedSquare === 5}/>
            </div>
            <div className='board-row'>
                <Square value={squares[6]} onSquareClick={() => handleClick(6)} isSelected={selectedSquare === 6}/>
                <Square value={squares[7]} onSquareClick={() => handleClick(7)} isSelected={selectedSquare === 7}/>
                <Square value={squares[8]} onSquareClick={() => handleClick(8)} isSelected={selectedSquare === 8}/>
            </div>
        </>
    );
}

export default function App() {
    return <Board />;
}
