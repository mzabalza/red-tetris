<!-- TABLE OF CONTENTS -->
## TETRIS.IO
Everyone knows the Tetris Game and everyone knows Javascript, it only remains to build a Tetris in Javascript.
Yes, but ...

Tetris.io is multiplayer and online. It allows you to disturb intergalactic parties during your long coding nights (There are still some WIFI issues on some planets).

Tetris.io uses the latest technologies in Javascript which are at the heart of a great intellectual, industrial and financial battle between Facebook and Google whose challenge is to be the master of the world.

Tetris.io will has required a lot of brain juice to design the architecture, specify an asynchronous network protocol, implement infunctional programming, create an algorithm of pieces’ animation and display everything graphically in HTML!
Good game, good code ...


### GET STARTED

#### Star with Docker in MAC
```
docker-machine create --driver virtualbox default (First time)
docker-machine start default (After first time)
eval $(docker-machine env default)
```

```
cd src/client
npm run dev-server
```
```
cd src/server
npm run dev
```

http://localhost:8080/



### Resources
* Socket.io + Hooks https://levelup.gitconnected.com/handling-socketio-rooms-with-react-hooks-4723dd44692e
* https://dev.to/aduranil/how-to-use-websockets-with-redux-a-step-by-step-guide-to-writing-understanding-connecting-socket-middleware-to-your-project-km3
