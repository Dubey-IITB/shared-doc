# SharedDoc Frontend - Google Docs-like Document Editor

A modern, scalable document editor built with Next.js 15 that provides a Google Docs-like experience with rich text editing, document management, and user authentication.

## 🚀 Features

### ✅ Implemented Features
- **User Authentication**: Secure JWT-based login and registration system
- **Document Management**: Create, edit, delete, and list multiple documents per user
- **Rich Text Editor**: Google Docs-like toolbar with comprehensive formatting options
  - Font family and size selection (Arial, Times New Roman, Courier New, Georgia, Verdana, Helvetica)
  - Text formatting (bold, italic, underline, strikethrough)
  - Text alignment (left, center, right, justify)
  - Text and background color picker
  - Bullet and numbered lists
  - Link and image insertion
  - Undo/redo functionality
  - Clear formatting option
- **Document Search**: Real-time search through document titles with instant filtering
- **Document Title Editing**: Inline editing of document titles with save/cancel options
- **Responsive Design**: Modern, mobile-friendly UI with Tailwind CSS
- **Navigation**: Intuitive breadcrumb navigation and user-friendly routing
- **State Management**: Efficient state management with React hooks and localStorage

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
- Offline support
- Document versioning

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **State Management**: React hooks and localStorage
- **Authentication**: JWT tokens stored in localStorage
- **HTTP Client**: Native fetch API
- **Build Tool**: Turbopack for fast development

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd shared-doc/shared-doc-fe
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

**Note**: Make sure the backend server is running on `http://localhost:8000` for full functionality.

## 🏗️ Project Structure

```
src/
├── app/
│   ├── login/
│   │   └── page.tsx              # Login page with form validation
│   ├── register/
│   │   └── page.tsx              # Registration page with comprehensive form
│   ├── documents/
│   │   ├── page.tsx              # Documents list with search functionality
│   │   └── [id]/
│   │       └── page.tsx          # Document editor with rich text toolbar
│   ├── globals.css               # Global styles and Tailwind imports
│   ├── layout.tsx                # Root layout with navigation
│   └── page.tsx                  # Home page with user info
├── components/                   # Reusable components (planned)
├── lib/                          # Utility functions (planned)
└── types/                        # TypeScript types (planned)
```

## 🎨 Design Principles

- **Scalability**: Component-based architecture for easy scaling
- **Accessibility**: WCAG compliant design with proper ARIA labels
- **Performance**: Optimized with Next.js 15 and Turbopack
- **User Experience**: Intuitive navigation and responsive design
- **Security**: Secure authentication and data handling
- **Modern UI**: Google Docs-inspired interface with clean aesthetics

## 🚧 Current Status

### ✅ Completed
- **Authentication System**: Complete login/registration with JWT tokens
- **Document Management**: Full CRUD operations for documents
- **Rich Text Editor**: Comprehensive formatting toolbar with all major features
- **Search Functionality**: Real-time document search with instant results
- **Responsive Design**: Mobile-friendly interface across all pages
- **Navigation**: Seamless navigation between pages with proper state management
- **User Interface**: Modern, clean design with Google Docs inspiration
- **Error Handling**: Proper error handling and user feedback
- **Loading States**: Loading indicators for better UX

### 🔄 In Progress
- Real-time collaboration features
- Document sharing capabilities
- File upload system

### 📋 Planned Features
- Real-time document synchronization
- Document sharing with team members
- Export functionality (PDF, DOCX)
- Document templates
- User profile management
- Team collaboration features
- Offline support
- Document versioning and history
- Advanced formatting options
- Spell check and grammar correction

## 🔧 Development

### Available Scripts
```bash
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Development Guidelines
- Use TypeScript for all new code
- Follow Next.js 15 best practices
- Implement responsive design for all components
- Add proper error handling and loading states
- Write meaningful commit messages
- Test on multiple devices and browsers

## 🌐 API Integration

The frontend integrates with the FastAPI backend through the following endpoints:

- **Authentication**: `/login`, `/register`
- **Documents**: `/documents`, `/documents/{id}`

All API calls include JWT authentication headers and proper error handling.

## 🎯 Key Features Explained

### Rich Text Editor
The editor uses `contentEditable` with `execCommand` for formatting, providing a Google Docs-like experience with:
- Real-time formatting preview
- Keyboard shortcuts support
- Undo/redo functionality
- Cross-browser compatibility

### Document Search
Real-time search functionality that:
- Filters documents as you type
- Searches through document titles
- Provides instant visual feedback
- Maintains search state during navigation

### Authentication Flow
Secure authentication system featuring:
- JWT token storage in localStorage
- Automatic token validation
- Redirect logic for protected routes
- User session persistence

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style
- Use TypeScript for all new code
- Follow ESLint configuration
- Use Tailwind CSS for styling
- Implement responsive design
- Add proper TypeScript types

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions, please:
1. Check the existing issues
2. Create a new issue with detailed information
3. Contact the development team

---

