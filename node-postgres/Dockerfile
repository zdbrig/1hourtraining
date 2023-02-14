from node:18
RUN apt-get update
RUN apt-get install -y netcat
WORKDIR /app


COPY package.json /app

RUN npm install


CMD ["/app/wait.sh" , "postgres" , "5432" , "rabbitmq", "5672"]