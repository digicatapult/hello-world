from __future__ import annotations

from fastapi.testclient import TestClient

from hello_world.app import create_app


def test_root() -> None:
    client = TestClient(create_app())
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "hello world"}
