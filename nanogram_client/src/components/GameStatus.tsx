interface GameStatusProps {
    lives: number;
}

function GameStatus(props: GameStatusProps) {
    return (
        <div>
            <h2>Lives: {props.lives}</h2>
        </div>
    );
}

export default GameStatus;
