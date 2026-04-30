# syntax=docker/dockerfile:1.20
FROM python:3.12-slim AS service

ENV POETRY_VERSION=2.3.1

RUN apt-get update && apt-get upgrade -y \
	&& pip install --no-cache-dir "poetry==${POETRY_VERSION}" \
	&& rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY pyproject.toml poetry.lock README.md ./
COPY hello_world ./hello_world
COPY index.py ./

RUN poetry config virtualenvs.create false \
	&& poetry install --only main --no-interaction --no-ansi --no-root

EXPOSE 3001

CMD ["python", "index.py"]
