from python
RUN apt update && apt install -y  netcat 
WORKDIR /app

COPY app.py /app
COPY wait.sh /app
EXPOSE 8080
RUN pip install  Flask mysql.connector