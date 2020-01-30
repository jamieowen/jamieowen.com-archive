# docker build -t jamieowen.com ./jamieowen.com
# docker build -t labs.jamieowen.com ./labs.jamieowen.com

docker-compose -f docker-compose-setup.yml up -d
docker network create web

touch acme.json
chmod 600 acme.json
