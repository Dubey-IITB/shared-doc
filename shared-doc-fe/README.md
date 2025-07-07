# SharedDoc - Google Docs-like Document Editor

A modern, scalable document editor built with Next.js that enables real-time collaboration and document sharing.

## 🚀 Features

- **Modern UI/UX**: Beautiful, responsive design with smooth animations
- **Authentication System**: Secure login and registration with form validation
- **Real-time Collaboration**: (Coming soon) Work together with your team in real-time
- **Rich Text Editing**: (Coming soon) Advanced formatting options
- **Document Sharing**: (Coming soon) Share documents with team members
- **Scalable Architecture**: Built with scalability in mind using Next.js 14

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Authentication**: (Planned) NextAuth.js or similar
- **Database**: (Planned) PostgreSQL with Prisma
- **Real-time**: (Planned) Socket.io or similar

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd shared-doc
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Project Structure

```
src/
├── app/
│   ├── login/
│   │   └── page.tsx          # Login page
│   ├── register/
│   │   └── page.tsx          # Registration page
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Home page
├── components/               # (Planned) Reusable components
├── lib/                      # (Planned) Utility functions
└── types/                    # (Planned) TypeScript types
```

## 🎨 Design Principles

- **Scalability**: Component-based architecture for easy scaling
- **Accessibility**: WCAG compliant design
- **Performance**: Optimized for fast loading and smooth interactions
- **User Experience**: Intuitive navigation and responsive design
- **Security**: Secure authentication and data handling

## 🚧 Current Status

### ✅ Completed
- Home page with modern design
- Login page with form validation
- Registration page with comprehensive form
- Responsive design for all screen sizes
- Navigation between pages
- Google OAuth integration (UI ready)

### 🔄 In Progress
- Backend API development
- Database schema design
- Authentication system implementation

### 📋 Planned Features
- Real-time document editing
- Document sharing and permissions
- Rich text editor with formatting tools
- File upload and management
- User profile management
- Team collaboration features
- Document templates
- Export functionality (PDF, DOCX)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions, please:
1. Check the existing issues
2. Create a new issue with detailed information
3. Contact the development team

---

Built with ❤️ using Next.js and Tailwind CSS
