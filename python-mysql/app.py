from flask import Flask, request
import mysql.connector
import json
app = Flask(__name__)

conn = mysql.connector.connect(
  host="mariadb",
  user="root",
  password="root",
  database="sqoin"
)




@app.route('/')
def hello():
    return 'Hello, World!'

@app.route('/article', methods=['GET', 'POST'])
def article():
    print("get article")
    if request.method == 'POST':
        name = request.form['name']
        cursor = conn.cursor()
        cursor.execute("INSERT INTO article (name) VALUES (%s)", (name,))
        conn.commit()
        return 'Article created with name: %s' % name
    else:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM article")
        articles = cursor.fetchall()
        return json.dumps(articles)

@app.route('/article/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def article_id(id):
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM article WHERE id=%s", (id,))
    a = cursor.fetchone()
    if not a:
        return 'Article with id: %s not found' % id
    if request.method == 'PUT':
        name = request.form['name']
        cursor.execute("UPDATE article SET name=%s WHERE id=%s", (name, id))
        conn.commit()
        return 'Article with id: %s updated' % id
    if request.method == 'DELETE':
        cursor.execute("DELETE FROM article WHERE id=%s", (id,))
        conn.commit()
        return 'Article with id: %s deleted' % id
    return str(id) + ': ' + a[1]

if __name__ == '__main__':
    app.run(port=8080, debug=True, host='0.0.0.0')

