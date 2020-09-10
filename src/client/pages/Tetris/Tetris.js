import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';


import './Tetris.css';

import { createStage, checkCollision } from '../../utils/gameHelpers';
import { randomTetromino } from '../../utils/tetrominos';

// ACTIONS
import { setAlert } from '../../store/actions/alert';


// COMPONENTS
import Stage from '../../components/Stage/Stage';
import NextTetrominos from '../../components/NextTetrominos/NextTetrominos';
import ActionButtons from '../../components/ActionButtons/ActionButtons';
import Leaderboard from '../../components/Leaderboard/Leaderboard';
import InfoPanel from '../../components/InfoPanel/InfoPanel';
import EndModal from '../../components/EndModal/EndModal';

// CUSTOM HOOKS
import { useInterval } from '../../hooks/useInterval';
import { usePlayer } from '../../hooks/usePlayer';
import { useStage } from '../../hooks/useStage';
import { useDropTime } from '../../hooks/useDropTime';
import { useGameStatus } from '../../hooks/useGameStatus';

let socket;

const Tetris = ({ match, setAlert }) => {

    const history = useHistory();


    const [start, setStart] = useState(false);
    const [username, setUsername] = useState('');
    const [players, setPlayers] = useState([]);
    const [game, setGame] = useState({
        players: [],
        room: '',
        ready: false,
        status: false,
        tetrominos: []
    });

    const [readyToPlay, setReadyToPlay] = useState(false);
    const [gameOver, setGameOver] = useState(false);

    // const [stage, setStage] = useState(createStage());
    const [nextPiece, setNextPiece] = useState(randomTetromino());

    const [turn, setTurn] = useState(1);

    const [modalIsOpen, setIsOpen] = useState(false);


    // HOOKS
    const [nextTetrominos, setNextTetrominos] = useState([]);
    const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer(nextTetrominos);
    const [stage, setStage, rowsCleared] = useStage(player, resetPlayer, setTurn, nextTetrominos);
    const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(rowsCleared, turn, game, socket);

    const [dropTime, setDropTime] = useDropTime(null);

    const ENDPOINT = 'http://localhost:5000';

    useEffect(() => {

        const { room, username } = match.params;

        socket = io(ENDPOINT);

        setUsername(username);
        socket.emit('join', { username, room });

        // SIMILAR TO COMPONENT DID UNMOUNT?
        return () => {
            socket.disconnect();

            console.log('out!!!');
        }

    }, [ENDPOINT, match.params]);

    useEffect(() => {

        socket.on('game', ({ game }) => {

            setGame(game);
            setPlayers(game.players);
        });

        socket.on('out', ({ message }) => {
            socket.disconnect();
            console.log(message);
            setAlert(message, 'Error', 2000);
            history.push('/');
        });

        socket.on('nextTetrominos', ({ tetrominos }) => {
            setNextTetrominos(tetrominos);
        });


    }, []);



    useEffect(() => {

        socket.on('startGame', () => {
            setStart(true);
        });
    }, [nextTetrominos])

    useEffect(() => {
        if (start) {
            startGame();
        }
    }, [start]);

    const startGame = () => {
        setStage(createStage());
        setDropTime(1000 - ((level) * 100));
        resetPlayer(nextTetrominos[0]);
        setRows(0);
        setGameOver(false);
    };

    const drop = () => {
        // if (!dropTime) {
        //   return
        // }

        // Increase level when player has cleared 10 rows
        if (rows > (level + 1) * 1) {
            setLevel(prev => prev + 1);
        }
        if (!checkCollision(player, stage, { x: 0, y: 1 })) {
            // Move one pos down
            updatePlayerPos({ x: 0, y: 1, collided: false });
        } else {
            // Game Over
            if (player.pos.y < 1) {
                console.log("GAME OVER!!!");
                setDropTime(null);

                setGameOver(true);
                socket.disconnect();

                setIsOpen(true);
            }
            // Tetromino reached floor
            updatePlayerPos({ x: 0, y: 0, collided: true });
        }
    };

    const keyUp = ({ keyCode }) => {
        if (!gameOver) {
            if (keyCode === 40) { // Down arrow
                setDropTime(1000 - ((level) * 100));

            }
        }
    };

    const dropPlayer = () => {
        setDropTime(null);
        drop();
    };

    const movePlayer = dir => {
        if (!checkCollision(player, stage, { x: dir, y: 0 })) {
            updatePlayerPos({ x: dir, y: 0 });
        }
    };

    const move = ({ keyCode }) => {
        if (!gameOver) {
            if (keyCode === 37) {
                movePlayer(-1);
            } else if (keyCode === 39) {
                movePlayer(1);
            } else if (keyCode === 40) { // Down arrow
                dropPlayer();
            } else if (keyCode === 38) { // Up arrow
                playerRotate(stage, 1);
            }
        }
    };

    const pause = () => {
        if (dropTime) {
            setDropTime(null);
        } else {
            setDropTime(1000 - ((level) * 100));
        };
    };

    useInterval(() => {
        drop();

    }, dropTime) // what is the second




    return (
        <div>
            <Leaderboard game={game} />
            <div className='wrapper'
                role="button"
                tabIndex="0"
                onKeyDown={e => move(e)}
                onKeyUp={e => keyUp(e)}
            >
                {game.room && <h2 className='title-game'>Room: {game.room} user: {username}</h2>}
                
                {start == false && game.players.length && game.players[0].name === username &&
                    <ActionButtons game={game} socket={socket} />}
                <div className='content'>
                    <InfoPanel turn={turn} score={score} rows={rows} game={game} socket={socket}/>
                    <Stage stage={stage}/>
                    <NextTetrominos nextTetrominos={nextTetrominos} />
                </div>

            </div>
            <EndModal game={game} modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} closeModal={() => setIsOpen(false)} />

        </div>
    )
}

export default connect(null, { setAlert })(Tetris);