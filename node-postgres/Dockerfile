from  bbacem/node-18-netcat
WORKDIR /app


COPY package.json /app

RUN npm install


CMD ["/app/wait.sh" , "postgres" , "5432" , "rabbitmq", "5672"]