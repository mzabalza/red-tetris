import io from 'socket.io-client';

// NOT OPERATIONAL JET. POSSIBLE FUTURE IMPROVE TO HAVE CLEANED FILES
// TODO: add all socket functions here

let socket;

export const initiateSocket = (room) => {
    const socket = io(process.env.REACT_APP_SOCKET_URL);
    if (socket && room) socket.emit('join', room);
  }
//   export const disconnectSocket = () => {
//     console.log('Disconnecting socket...');
//     if(socket) socket.disconnect();
//   }
//   export const subscribeToChat = (cb) => {
//     if (!socket) return(true);
//     socket.on('chat', msg => {
//       console.log('Websocket event received!');
//       return cb(null, msg);
//     });
//   }
//   export const sendMessage = (room, message) => {
//     if (socket) socket.emit('chat', { message, room });
//   }