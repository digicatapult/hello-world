from __future__ import annotations

import os

from fastapi import FastAPI


def create_app() -> FastAPI:
    app = FastAPI()

    @app.get("/")
    def root() -> dict[str, str]:
        return {"message": "hello world"}

    return app


app = create_app()


def get_port() -> int:
    value = os.getenv("PORT", "3001")
    return int(value)
