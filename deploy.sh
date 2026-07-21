#!/bin/bash

git pull origin main

source venv/bin/activate

pip install -r requirements.txt

python manage.py migrate

python manage.py collectstatic

pkill gunicorn

gunicorn core.wsgi:application --bind 127.0.0.1:8000 --daemon

sudo systemctl restart nginx
