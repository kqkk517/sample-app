FROM python:3.12-slim

WORKDIR /api-server
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

ENV DATABASE_URL=driver://user:pass@localhost/dbname

COPY . .