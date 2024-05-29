
### docker指令
只run flask

    docker run -d -p 5000:5000 -v D:\flask:/app --name flask my_flask_app

    docker-compose up -d

### 問題排解!!

1. 跑的時候會有兩個IP 127.0.0.1:5000 和 172.17.0.2:5000，常常有時候其中一個會失效，但是另外一個可以跑，所以請兩個都試試看。

    root@4be643ba6a94:/app/flask# python3 app.py
    * Serving Flask app 'app'
    * Debug mode: on
    WARNING: This is a development server. Do not use it in a production deployment. Use a production WSGI server instead.
    * Running on all addresses (0.0.0.0)
    * Running on http://127.0.0.1:5000
    * Running on http://172.17.0.2:5000
    Press CTRL+C to quit
    * Restarting with watchdog (inotify)
    * Debugger is active!
    * Debugger PIN: 285-152-236

 2.
本來在app.py中使用以下寫法，docker run在container中可以跑，並會顯示在localhost:5000/上面。

    if __name__ == '__main__':
        app.run(debug=True)

但當我改成docker-compose.yml的寫法後就不能跑了，在localhost:5000/上面都顯示不出來。

要改成如下才可以RUN

    if __name__ == '__main__':
    app.run(host='0.0.0.0')


在嘗試Docker Compose 方案時，請確保你的Flask 應用程式在app.run() 中確實是使用0.0.0.0 進行監聽，而不是127.0.0.1，因為後者只會在容器內部可用，而前者會使得應用程序對外可見。
