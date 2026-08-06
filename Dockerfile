
FROM node:20-alpine AS frontend-builder

WORKDIR /app

COPY frontend/package.json ./frontend/

WORKDIR /app/frontend

RUN npm run build



FROM python:3.11-alpine AS backend-builder

WORKDIR /usr/src/app

RUN apk add --no-cache \
    gcc \
    musl-dev \
    postgresql-dev \
    libffi-dev

COPY requirements.txt .

RUN pip wheel \
    --no-cache-dir \
    --no-deps \
    --wheel-dir /usr/src/app/wheels \
    -r requirements.txt



FROM python:3.11-alpine AS runtime

WORKDIR /app

RUN apk add --no-cache \
    libpq \
    libffi

COPY --from=backend-builder /usr/src/app/wheels /wheels

RUN pip install --no-cache /wheels/* \
    && rm -rf /wheels

COPY . .

COPY --from=frontend-builder /app/frontend/dist /app/static


RUN addgroup -S django \
    && adduser -S django -G django \
    && mkdir -p /app/staticfiles \
    && chown -R django:django /app

USER django

EXPOSE 8000

CMD ["gunicorn", "--bind", "0.0.0.0:8000", "core.wsgi:application"]