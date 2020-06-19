docker-machine start default
docker-machine ip default
eval $(docker-machine env default)
docker-compose up -d --build