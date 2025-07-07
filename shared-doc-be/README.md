# SharedDoc Backend - FastAPI Server

A robust, scalable backend API for the SharedDoc document editor, built with FastAPI, PostgreSQL, and SQLAlchemy.

## 🚀 Features

### ✅ Implemented Features
- **User Authentication**: JWT-based authentication with secure password hashing
- **Document Management**: Full CRUD operations for documents
- **Database Integration**: PostgreSQL with SQLAlchemy ORM
- **Database Migrations**: Alembic for schema management
- **API Documentation**: Auto-generated Swagger UI documentation
- **Input Validation**: Pydantic schemas for request/response validation
- **Error Handling**: Comprehensive error handling and status codes
- **Security**: JWT tokens, password hashing with bcrypt, CORS support

### 🔄 In Progress
- Real-time collaboration features
- Document sharing and permissions
- File upload capabilities

### 📋 Planned Features
- Real-time document synchronization with WebSockets
- Document sharing with team members
- File upload and management
- User profile management
- Advanced collaboration tools
- Rate limiting and API throttling
- Audit logging

## 🛠️ Tech Stack

- **Framework**: FastAPI
- **Database**: PostgreSQL with SQLAlchemy ORM
- **Authentication**: JWT with python-jose and passlib[bcrypt]
- **Migrations**: Alembic
- **Validation**: Pydantic
- **Documentation**: Auto-generated with Swagger UI
- **Development**: Uvicorn ASGI server

## 📦 Installation

### Prerequisites
- Python 3.8+
- PostgreSQL database
- pip package manager

### Setup

1. Clone the repository and navigate to backend:
```bash
cd shared-doc-be
```

2. Create virtual environment:
```bash
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Set up environment variables:
Create a `.env` file in the `shared-doc-be` directory:
```env
DATABASE_URL=postgresql://username:password@localhost:5432/shareddoc
SECRET_KEY=your-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

5. Run database migrations:
```bash
alembic upgrade head
```

6. Start the development server:
```bash
uvicorn app.main:app --reload
```

The API will be available at [http://localhost:8000](http://localhost:8000)
API documentation at [http://localhost:8000/docs](http://localhost:8000/docs)

## 🏗️ Project Structure

```
app/
├── main.py              # FastAPI application entry point
├── database.py          # Database connection and session management
├── models.py            # SQLAlchemy database models
├── schemas.py           # Pydantic schemas for request/response validation
├── crud.py              # Database CRUD operations
├── auth.py              # Authentication and JWT token handling
├── deps.py              # Dependency injection functions
└── routes.py            # API route definitions

alembic/
├── versions/            # Database migration files
├── env.py               # Alembic environment configuration
└── alembic.ini          # Alembic configuration file
```

## 📁 API Endpoints

### Authentication
- `POST /register` - User registration
  - Request: `{"username": "string", "email": "string", "password": "string"}`
  - Response: `{"access_token": "string", "token_type": "bearer", "username": "string"}`

- `POST /login` - User login
  - Request: `{"username": "string", "password": "string"}`
  - Response: `{"access_token": "string", "token_type": "bearer", "username": "string"}`

### Documents
- `GET /documents` - List user's documents
  - Headers: `Authorization: Bearer <token>`
  - Response: `[{"id": "int", "title": "string", "content": "string", "created_at": "datetime", "updated_at": "datetime"}]`

- `POST /documents` - Create new document
  - Headers: `Authorization: Bearer <token>`
  - Request: `{"title": "string", "content": "string"}`
  - Response: `{"id": "int", "title": "string", "content": "string", "created_at": "datetime", "updated_at": "datetime"}`

- `GET /documents/{id}` - Get specific document
  - Headers: `Authorization: Bearer <token>`
  - Response: `{"id": "int", "title": "string", "content": "string", "created_at": "datetime", "updated_at": "datetime"}`

- `PUT /documents/{id}` - Update document
  - Headers: `Authorization: Bearer <token>`
  - Request: `{"title": "string", "content": "string"}`
  - Response: `{"id": "int", "title": "string", "content": "string", "created_at": "datetime", "updated_at": "datetime"}`

- `DELETE /documents/{id}` - Delete document
  - Headers: `Authorization: Bearer <token>`
  - Response: `{"message": "Document deleted successfully"}`

## 🗄️ Database Schema

### Users Table
```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    hashed_password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Documents Table
```sql
CREATE TABLE documents (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL DEFAULT 'Untitled Document',
    content TEXT,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🔧 Development

### Database Migrations
```bash
# Create a new migration
alembic revision --autogenerate -m "Description of changes"

# Apply migrations
alembic upgrade head

# Rollback migration
alembic downgrade -1

# View migration history
alembic history
```

### Code Quality
```bash
# Install development dependencies
pip install flake8 black mypy

# Run linters
flake8 app/
black app/
mypy app/
```

### Testing
```bash
# Install testing dependencies
pip install pytest pytest-asyncio httpx

# Run tests
pytest
```

## 🔒 Security Features

- **Password Hashing**: Bcrypt for secure password storage
- **JWT Tokens**: Secure token-based authentication
- **Input Validation**: Pydantic schemas for request validation
- **SQL Injection Protection**: SQLAlchemy ORM with parameterized queries
- **CORS Support**: Configurable CORS for frontend integration
- **Error Handling**: Secure error responses without sensitive information

## 🌐 API Documentation

The API includes comprehensive auto-generated documentation:

- **Swagger UI**: Available at `/docs` when server is running
- **ReDoc**: Available at `/redoc` when server is running
- **OpenAPI Schema**: Available at `/openapi.json`

## 🔧 Configuration

### Environment Variables
- `DATABASE_URL`: PostgreSQL connection string
- `SECRET_KEY`: Secret key for JWT token signing
- `ALGORITHM`: JWT algorithm (default: HS256)
- `ACCESS_TOKEN_EXPIRE_MINUTES`: Token expiration time (default: 30)

### CORS Configuration
CORS is configured to allow requests from the frontend development server. Update the origins in `main.py` for production deployment.

## 🚀 Deployment

### Production Setup
1. Set up a production PostgreSQL database
2. Configure environment variables for production
3. Use a production ASGI server like Gunicorn with Uvicorn workers
4. Set up reverse proxy (nginx) for SSL termination
5. Configure proper CORS origins for production domain

### Docker Deployment
```dockerfile
FROM python:3.11-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .
RUN alembic upgrade head

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow FastAPI best practices
- Use Pydantic for data validation
- Write comprehensive API documentation
- Add proper error handling
- Write tests for new features
- Update database migrations as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.

## 🆘 Support

- Open an issue for bugs or feature requests
- Check the API documentation at `/docs` when the server is running
- Review the existing issues before creating new ones

---

