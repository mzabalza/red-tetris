<!-- TABLE OF CONTENTS -->
## SOCKET.IO 

### Sending to sender-client only
```
socket.emit('message', "this is a test");
```
### Sending to all clients except sender
```
socket.broadcast.emit('message', "this is a test");
```
### Sending to all clients in 'game' room(channel) except sender
```
socket.broadcast.to('game').emit('message', 'nice game');
```
### Sender client, only if they are in 'game' room(channel)
```
socket.to('game').emit('message', 'enjoy the game');
```
### Sending to individual socketid
```
socket.broadcast.to(socketid).emit('message', 'for your eyes only');
```
### Sending to all clients, include sender
```
io.emit('message', "this is a test");
```
### Sending to all clients in 'game' room(channel), include sender
```
io.in('game').emit('message', 'cool game');
```
### Sending to all clients in namespace 'myNamespace', include sender
```
io.of('myNamespace').emit('message', 'gg');
```
### Send to all connected clients
```
