FROM python:3

WORKDIR /api-server
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
RUN apt-get update && apt install -y tzdata && apt-get clean && rm -rf /var/lib/apt/lists/*
ENV TZ Azia/Tokyo

COPY . .