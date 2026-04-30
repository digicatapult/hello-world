from __future__ import annotations

import uvicorn

from hello_world.app import get_port


def main() -> None:
    uvicorn.run(
        "hello_world.app:app",
        host="0.0.0.0",
        port=get_port(),
        log_level="info",
    )


if __name__ == "__main__":
    main()
