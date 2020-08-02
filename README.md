<!-- TABLE OF CONTENTS -->
## SOCKET.IO

### Usage
```
cd src/client
npm run dev-server
```
```
cd src/server
npm run dev
```

http://localhost:8080/

### Star with Docker in MAC
```
docker-machine create --driver virtualbox default (First time)
docker-machine start default (After first time)
eval $(docker-machine env default)
```

### Project Dependencies

* REACT
    * react
    * react-scripts
    * react-dom
    * react-router-dom
* BABEL
    * babel-core
    * babel-loader
    * babel-preset-env
    * babel-preset-react
* WEBPACK
    * webpack
    * webpack-dev-server


### Resources
* Socket.io + Hooks https://levelup.gitconnected.com/handling-socketio-rooms-with-react-hooks-4723dd44692e
* https://dev.to/aduranil/how-to-use-websockets-with-redux-a-step-by-step-guide-to-writing-understanding-connecting-socket-middleware-to-your-project-km3
* SOCKET.IO Cheatsheet: https://socket.io/docs/emit-cheatsheet/
