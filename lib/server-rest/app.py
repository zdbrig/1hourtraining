from flask import Flask
import os

app = Flask(__name__)

@app.route("/")
def hello():
    port = os.environ.get("PORT", 5000)
    host = os.environ.get("HOST", "localhost")
    message = os.environ.get("MESSAGE", "Hello, World!")
    return f"{message}\n"

if __name__ == "__main__":
    app.run(host=os.environ.get("HOST", "localhost"), port=os.environ.get("PORT", 5000))
