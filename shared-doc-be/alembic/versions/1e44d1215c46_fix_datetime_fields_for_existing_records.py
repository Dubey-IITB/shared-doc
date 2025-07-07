"""Fix datetime fields for existing records

Revision ID: 1e44d1215c46
Revises: 47ba3dc55c32
Create Date: 2025-07-07 21:43:37.833775

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from datetime import datetime


# revision identifiers, used by Alembic.
revision: str = '1e44d1215c46'
down_revision: Union[str, Sequence[str], None] = '47ba3dc55c32'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    # Update existing records to have proper datetime values
    current_time = datetime.utcnow()
    op.execute(
        f"UPDATE documents SET created_at = '{current_time}', updated_at = '{current_time}' WHERE created_at IS NULL OR updated_at IS NULL"
    )


def downgrade() -> None:
    """Downgrade schema."""
    # No downgrade needed for this data fix
    pass
