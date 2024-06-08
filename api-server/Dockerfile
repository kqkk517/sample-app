FROM python:3.12-slim

WORKDIR /api-server
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

ENV DATABASE_URL=driver://user:pass@localhost/dbname

COPY . .
RUN apt-get update && apt-get install -y curl
RUN curl -o /usr/local/bin/wait-for-it.sh https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh
RUN chmod +x /usr/local/bin/wait-for-it.sh
RUN chmod +x ./entrypoint.sh

ENTRYPOINT ["./entrypoint.sh"]