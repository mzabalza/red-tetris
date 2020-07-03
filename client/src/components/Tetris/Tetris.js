import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { connect } from 'react-redux';

import { createStage, checkCollision } from '../../gameHelpers';

// Styled Components
import { StyledTetrisWrapper, StyledTetris } from '../styles/StyledTetris';

// Custom Hooks
import { useInterval } from '../../hooks/useInterval';
import { usePlayer } from '../../hooks/usePlayer';
import { useStage } from '../../hooks/useStage';
import { useGameStatus } from '../../hooks/useGameStatus';
import { useDropTime } from '../../hooks/useDropTime';

// Components
import Stage from './Stage';
import Display from './Display';
import StartButton from './StartButton';
import Header from './Header';
import Sidebar from './Sidebar';
import { configure } from '@testing-library/react';

let socket;

// TODO: PUT ALL FUNCIONTS IN DIFFERENT FILES

const Tetris = ({ auth, location }) => {


  const [userName, setUserName] = useState('');
  const [room, setRoom] = useState('');
  const [roomData, setRoomData] = useState(null);

  const [readyToPlay, setReadyToPlay] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
  const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
  const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(rowsCleared);
  // const [dropTime, setDropTime] = useDropTime(level);
  const [dropTime, setDropTime] = useDropTime(null);


  console.log('re-render');


  useEffect(() => {
    socket = io(process.env.REACT_APP_SOCKET_URL);

    socket.on('room', ({ room }) => {
      console.log('Room data: ');
      console.log(room);
      setRoomData(room);
      // setUsers(users);
    });
  }, []);

  useEffect(() => {

    if (!auth.user) {
      return undefined
    }

    setRoom(location.state.formData.roomName);
    setLevel(location.state.formData.level);

    console.log('Form data: ');
    console.log(location.state.formData);

    setUserName(auth.user.name);

  }, [location.state.formData, auth.user]);


  useEffect(() => {
    console.log('put user useEffect');

    if (!userName | !room) {
      return undefined
    }

    const body = {
      roomName: room,
      userName: userName,
      score,
      level,
    };

    socket.emit('addUser', { body }, (error) => {
      if (error) {
        alert(error);
      }
    });

  }, [userName, room])


  // useEffect(() => {
  //   console.log('Ready to play useEffect');
  //   console.log(roomData);
  //   if (!roomData) {
  //     return undefined
  //   }

  //   if (roomData.users.length == roomData.users.nbPlayers) {
  //     console.log(`Current users: ${roomData.users.length} vs Game users: ${location.state.formData.nbPlayers}`);
  //     setReadyToPlay(true);
  //   }

  // }, [roomData])





  useEffect(() => {
    console.log('editUser useEffect');


    if (!userName | !room) {
      return undefined
    }

    const body = {
      roomName: room,
      userName: userName,
      score,
      level,
    };

    console.log(body)
    // socket.emit('addUser', { userName, room, score, level });
    socket.emit('addUser', { body }, (error) => {
      if (error) {
        alert(error);
      }
    });
    // setDropTime(1000 - ((level) * 100));
    setDropTime(null);

  }, [score, level]);

  const movePlayer = dir => {
    if (!checkCollision(player, stage, { x: dir, y: 0 })) {
      updatePlayerPos({ x: dir, y: 0 });
    }
  };

  const startGame = () => {
    // Reset everything
    setStage(createStage());
    setDropTime(1000 - ((level) * 100));
    resetPlayer();
    setRows(0);
    setGameOver(false);
    // pauseGame();
  };

  const pauseGame = () => {
    console.log(`Level: ${level}`);
    console.log(`BEFORE: ${dropTime}`);
    dropTime ? setDropTime(null) : setDropTime(1000 - ((level) * 100));
    console.log(`AFTER: ${dropTime}`);
  };

  const drop = () => {
    // if (!dropTime) {
    //   return
    // }
    console.log('drop');

    // console.log(`Droptime: ${dropTime}`);
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
        setGameOver(true);
        setDropTime(null);
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

  useInterval(() => {
    drop();

  }, dropTime) // what is the second

  return (
    <div className="App">
      <StyledTetrisWrapper
        role="button"
        tabIndex="0"
        onKeyDown={e => move(e)}
        onKeyUp={e => keyUp(e)}
      >
        <Header room={room} />
        <div className="content">
          <Sidebar
            roomData={roomData}
            socket={socket}
            setLevel={setLevel}
            setDropTime={setDropTime}
            setScore={setScore}
          />
          <StyledTetris>
            <Stage stage={stage} />
            <aside>
              {gameOver ? (
                <Display gameOver={gameOver} text="Game Over" />
              ) : (
                  <div>
                    <Display text={`Score: ${score}`} />
                    <Display text={`Rows: ${rows}`} />
                    <Display text={`Level: ${level}`} />
                    <Display text={`Speed: ${dropTime}`} />
                  </div>
                )}
              <StartButton callback={pauseGame} text="Pause" />
              <StartButton disabled={!readyToPlay} callback={startGame} text="Start game" />
            </aside>
          </StyledTetris>
        </div>

      </StyledTetrisWrapper>
    </div>

  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {})(Tetris);
