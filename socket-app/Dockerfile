FROM python:3.12-slim

WORKDIR /app

# Sistem güncellemeleri minimum tutuldu, sadece gerekli bağımlılıklar kuruldu
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY server.py .

ENV HOST=0.0.0.0
ENV PORT=8765

EXPOSE 8765

# Basit bir healthcheck: portun dinlenip dinlenmediğini kontrol eder
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
    CMD python -c "import socket; s = socket.create_connection(('localhost', 8765), timeout=3)" || exit 1

CMD ["python", "server.py"]
