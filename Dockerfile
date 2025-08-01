from ghcr.io/astral-sh/uv:python3.12-alpine

WORKDIR /app
COPY uv.lock ./
COPY pyproject.toml ./
RUN uv sync --no-dev
COPY . .

EXPOSE 8000

ENV PYTHONUNBUFFERED 1
ENV DEBIAN_FRONTEND=noninteractive

CMD ["uv", "run", "fastapi", "run", "api/main.py"]
