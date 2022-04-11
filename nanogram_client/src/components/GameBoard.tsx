import { useState } from 'react';
import './GameBoard.css';
import ClickableCell from './ClickableCell';
import GameStatus from './GameStatus';
import Modal from './Modal';

interface GameBoardProps {
    headerRows: Array<Array<number | string>>;
    headerColumns: Array<Array<number | string>>;
    answerCells: string[];
}

function GameBoard(props: GameBoardProps) {
    const [lives, setLives] = useState(3);
    function decreaseLives() {
        setLives(lives - 1);
    }
    const [won, setWon] = useState(false);

    const { headerRows, headerColumns, answerCells } = props;
    const rulesNumber = headerRows.length;
    const columnNumber = headerRows[0].length;

    const selectedCellsSet = new Set<string>();
    const answerCellsSet = new Set<string>();

    for (const cell of answerCells) {
        answerCellsSet.add(cell);
    }

    function addSelectedCells(row_column_string: string) {
        selectedCellsSet.add(row_column_string);
        console.log(Array.from(selectedCellsSet).join('", "'));
    }

    function generateCells(num: number, className: string) {
        return Array.from({ length: num }, (_, __) => (
            <td className={className}></td>
        ));
    }

    function generateClickableCells(num: number, rowIndex: number) {
        return Array.from({ length: num }, (_, columnIndex) => (
            <ClickableCell
                {...{ row: rowIndex, column: columnIndex, addSelectedCells }}
            />
        ));
    }

    function generateHeaderRows(
        emptyCellsNumber: number,
        rows: Array<Array<number | string>>
    ) {
        return rows.map((row) => {
            return (
                <tr>
                    {generateCells(emptyCellsNumber, 'empty')}
                    {row.map((column) => {
                        return <th scope="col">{column}</th>;
                    })}
                </tr>
            );
        });
    }

    function generateHeaderColumns(row: Array<number | string>) {
        return row.map((column) => <th scope="row">{column}</th>);
    }

    function generateRows(
        fillColumnsNumber: number,
        headerRows: Array<Array<number | string>>
    ) {
        return headerRows.map((row, rowIndex) => {
            return (
                <tr>
                    {generateHeaderColumns(row)}
                    {generateClickableCells(fillColumnsNumber, rowIndex)}
                </tr>
            );
        });
    }

    function equalSets(as: Set<string>, bs: Set<string>) {
        if (as.size !== bs.size) {
            decreaseLives();
            return;
        }
        for (var a of as) {
            if (!bs.has(a)) {
                decreaseLives();
                return;
            }
        }
        setWon(true);
    }

    return (
        <div className="game-container">
            <table className="game-board">
                <thead>{generateHeaderRows(rulesNumber, headerRows)}</thead>
                <tbody>{generateRows(columnNumber, headerColumns)}</tbody>
            </table>
            <GameStatus {...{ lives }} />
            <button onClick={() => equalSets(selectedCellsSet, answerCellsSet)}>
                Check
            </button>
            <Modal show={lives < 1} childrenText={'YOU LOOSE!!!'} />
            <Modal show={won} childrenText={'YOU WIN!!!'} />
        </div>
    );
}

export default GameBoard;
