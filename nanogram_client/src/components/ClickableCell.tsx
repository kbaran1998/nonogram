import { useState } from 'react';

interface ClickableCellProps {
    row: number;
    column: number;
    addSelectedCells: Function;
}

interface NativeEvent {
    nativeEvent: {
        button: number;
    };
}

function ClickableCell(props: ClickableCellProps) {
    const [fill, setFilled] = useState(false);
    const [empty, setEmpty] = useState(false);

    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
    });
    const { row, column } = props;

    const handleClick = (e: NativeEvent) => {
        if (fill) {
            return;
        }
        switch (e.nativeEvent.button) {
            case 0: //Left mouse click
                setFilled(true);
                props.addSelectedCells(`${row}-${column}`);
                break;
            case 2: //Right mouse click
                setEmpty(!empty);
                break;
        }
    };
    return (
        <td
            className="clickable-cell"
            onClick={handleClick}
            onContextMenu={handleClick}
            style={{
                backgroundColor: fill ? '#000000da' : empty ? '#ff000042' : '',
            }}
        ></td>
    );
}

export default ClickableCell;
