from python
RUN apt update && apt install -y  netcat 
WORKDIR /app

COPY . /app
EXPOSE 8080
RUN pip install -r requirements.txt