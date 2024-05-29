from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    message = "歡迎來到我的網站！666"
    return render_template('index.html', message=message)

@app.route('/about')
def about():
    return render_template('about.html')


if __name__ == '__main__':
    app.run(host='0.0.0.0')
