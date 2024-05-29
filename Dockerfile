FROM python:3.9

WORKDIR /app

# 安裝 Flask 模組
RUN pip install Flask 

COPY . .

CMD ["python", "app.py"]
