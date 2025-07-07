# SharedDoc

A modern, scalable Google Docs-like document editor with real-time collaboration capabilities, built with Next.js (frontend) and FastAPI (backend).

## 🚀 Features

### ✅ Implemented Features
- **User Authentication**: Secure JWT-based login and registration system
- **Document Management**: Create, edit, delete, and list multiple documents per user
- **Rich Text Editor**: Google Docs-like toolbar with comprehensive formatting options
  - Font family and size selection
  - Text formatting (bold, italic, underline, strikethrough)
  - Text alignment (left, center, right, justify)
  - Text and background color picker
  - Bullet and numbered lists
  - Link and image insertion
  - Undo/redo functionality
  - Clear formatting option
- **Document Search**: Real-time search through document titles
- **Document Title Editing**: Inline editing of document titles
- **Responsive Design**: Modern, mobile-friendly UI with Tailwind CSS
- **Database Integration**: PostgreSQL with SQLAlchemy ORM and Alembic migrations

### 🔄 In Progress
- Real-time collaboration features
- Document sharing and permissions
- File upload capabilities

### 📋 Planned Features
- Real-time document synchronization
- Document sharing with team members
- Export functionality (PDF, DOCX)
- Document templates
- User profile management
- Advanced collaboration tools

---

## 🗂️ Project Structure

- `shared-doc-fe/` — Frontend (Next.js 15, TypeScript, Tailwind CSS)
- `shared-doc-be/` — Backend (FastAPI, PostgreSQL, SQLAlchemy, Alembic)

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Python 3.8+
- PostgreSQL database

### 1. Clone the Repository
```bash
git clone git@github.com:Dubey-IITB/shared-doc.git
cd shared-doc
```

### 2. Backend Setup (FastAPI)
```bash
cd shared-doc-be

# Create virtual environment
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Set up environment variables
# Create a .env file with your database URL:
# DATABASE_URL=postgresql://username:password@localhost:5432/shareddoc

# Run database migrations
alembic upgrade head

# Start the server
uvicorn app.main:app --reload
```
- The API will be available at [http://localhost:8000](http://localhost:8000)
- API documentation at [http://localhost:8000/docs](http://localhost:8000/docs)

### 3. Frontend Setup (Next.js)
```bash
cd ../shared-doc-fe

# Install dependencies
npm install

# Start the development server
npm run dev
```
- The app will be available at [http://localhost:3000](http://localhost:3000)

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **State Management**: React hooks and localStorage
- **Authentication**: JWT tokens stored in localStorage

### Backend
- **Framework**: FastAPI
- **Database**: PostgreSQL with SQLAlchemy ORM
- **Authentication**: JWT with python-jose and passlib
- **Migrations**: Alembic
- **API Documentation**: Auto-generated with Swagger UI

---

## 📁 API Endpoints

### Authentication
- `POST /register` - User registration
- `POST /login` - User login

### Documents
- `GET /documents` - List user's documents
- `POST /documents` - Create new document
- `GET /documents/{id}` - Get specific document
- `PUT /documents/{id}` - Update document
- `DELETE /documents/{id}` - Delete document

---

## 🎨 User Interface

The application features a modern, Google Docs-inspired interface with:

- **Clean Navigation**: Intuitive breadcrumb navigation
- **Rich Toolbar**: Comprehensive formatting options with visual feedback
- **Document List**: Searchable list of user documents with creation dates
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Real-time Updates**: Immediate feedback for user actions

---

## 🔧 Development

### Database Migrations
```bash
cd shared-doc-be
alembic revision --autogenerate -m "Description of changes"
alembic upgrade head
```

### Code Quality
```bash
# Frontend linting
cd shared-doc-fe
npm run lint

# Backend (using your preferred Python linter)
cd shared-doc-be
# flake8, black, or mypy
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices for frontend code
- Use FastAPI best practices for backend development
- Write meaningful commit messages
- Test your changes thoroughly
- Update documentation as needed

---

## 📄 License

MIT — see [LICENSE](LICENSE)

---

## 🆘 Support

- Open an issue for bugs or feature requests
- Check the API documentation at `/docs` when the backend is running
- Review the existing issues before creating new ones

---



