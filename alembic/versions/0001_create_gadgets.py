"""create gadgets

First Alembic revision for the migration-checks canary. Creates a gadgets
table with a CHECK-constrained status column so the migration-checks-poetry
workflow has a real schema and constraint to exercise.

Revision ID: 0001
Revises:
Create Date: 2026-01-01 00:00:00.000000

"""

from collections.abc import Sequence
from typing import Union

import sqlalchemy as sa

from alembic import op

revision: str = "0001"
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        "gadgets",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("name", sa.Text(), nullable=False),
        sa.Column("status", sa.Text(), nullable=False, server_default="active"),
    )
    op.create_check_constraint(
        "gadgets_status_check", "gadgets", "status IN ('active', 'retired')"
    )


def downgrade() -> None:
    op.drop_table("gadgets")
