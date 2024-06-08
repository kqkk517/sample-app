#!/bin/sh

# wait for database to be ready
/usr/local/bin/wait-for-it.sh database:5432 --timeout=60 --strict -- echo "Database is up"

# start app
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000 &

# execute migration
alembic -c /opt/api-server/alembic.ini upgrade head

# wait for uvicorn process to complete
wait