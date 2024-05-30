
## docker指令
只run flask

    docker run -d -p 5000:5000 -v D:\flask:/app --name flask my_flask_app

    docker-compose up -d

## 問題排解!!

### 1. 跑的時候會有兩個IP 127.0.0.1:5000 和 172.17.0.2:5000， <br />
常常有時候其中一個會失效，但是另外一個可以跑，所以請兩個URL都試試看。

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

#### 172.17.0.2
- **Docker 容器網絡**：`172.17.0.2` 是 Docker 分配給你的容器的內部 IP 位址。當 Docker 容器啟動時，它會自動分配一個 IP 位址，
通常在 `172.17.0.0/16` 網段內。這個 IP 位址是 Docker 虛擬網絡的一部分。

- **外部訪問**：當你在宿主機上訪問 `http://172.17.0.2:5000` 時，請求從宿主機的網絡介面進入容器的網絡介面。這樣你就可以從宿主機外部訪問容器內運行的服務。


### 2. 為什麼 `http://127.0.0.1:5000` 不能從宿主機訪問?
當 Flask 應用程式在 Docker 容器內運行時，如果只監聽 `127.0.0.1`，那麼它只接受來自容器內部的請求。宿主機和其他容器無法訪問容器內的 `127.0.0.1`。這就是為什麼你需要將 Flask 設置為監聽 `0.0.0.0`，這樣它可以接受來自任何網絡介面的連接。

本來在app.py中使用以下寫法，docker run在container中可以跑，並會顯示在localhost:5000/上面。

    if __name__ == '__main__':
        app.run(debug=True)

但當我改成docker-compose.yml的寫法後就不能跑了，在localhost:5000/上面都顯示不出來。

要改成如下才可以RUN

    if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)


在嘗試Docker Compose 方案時，請確保你的Flask 應用程式在app.run() 中確實是使用0.0.0.0 進行監聽，而不是127.0.0.1，因為後者只會在容器內部可用，而前者會使得應用程序對外可見。


