"""Support multiple documents per user

Revision ID: 47ba3dc55c32
Revises: 3471ff32312b
Create Date: 2025-07-07 21:37:41.753357

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '47ba3dc55c32'
down_revision: Union[str, Sequence[str], None] = '3471ff32312b'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('documents', sa.Column('created_at', sa.DateTime(), nullable=True))
    op.add_column('documents', sa.Column('updated_at', sa.DateTime(), nullable=True))
    op.drop_constraint(op.f('documents_owner_id_key'), 'documents', type_='unique')
    # ### end Alembic commands ###


def downgrade() -> None:
    """Downgrade schema."""
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_unique_constraint(op.f('documents_owner_id_key'), 'documents', ['owner_id'], postgresql_nulls_not_distinct=False)
    op.drop_column('documents', 'updated_at')
    op.drop_column('documents', 'created_at')
    # ### end Alembic commands ###
