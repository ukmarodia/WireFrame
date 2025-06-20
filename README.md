# Wireframe-to-Code

![Wireframe-to-Code Logo](./public/Wireframetocode.png)

Transform your UI wireframes into fully functional code with the power of AI. This Next.js application leverages an AI model to convert hand-drawn or digital wireframes into React components, speeding up your development workflow.

## Features

- AI-powered wireframe recognition and code generation
- Real-time image upload and processing
- Syntax-highlighted code editor for live previews
- User authentication and profile management
- Responsive UI with Tailwind CSS

## Tech Stack

- **Frontend:** Next.js, React, TypeScript, Tailwind CSS
- **Backend:** Next.js API Routes, Drizzle ORM
- **Authentication:** Firebase Auth
- **Deployment:** Vercel
- **Utilities:** Sonner, Prisma, Zod

## Demo

![Demo GIF](./public/demo.gif)

## Installation

1. Clone the repository:
   ```powershell
   git clone https://github.com/ukmarodia/WireFrame.git
   cd wireframe-to-code-main
   ```
2. Install dependencies:
   ```powershell
   npm install
   ```
3. Configure environment variables:
   - Rename `.env.example` to `.env.local`
   - Add your Firebase and database credentials

4. Run the development server:
   ```powershell
   npm run dev
   ```

## Usage

1. Register or login to access the dashboard.
2. Upload a wireframe image on the Designs page.
3. View and edit the generated React component code in the Code Editor.
4. Copy or download the component for integration into your project.

## Folder Structure

```
├── app/                 # Next.js App directory
│   ├── api/             # API routes
│   ├── components/      # Shared UI components
│   └── page.tsx         # Main entry
├── components/          # Design system components
├── context/             # React context providers
├── lib/                 # Utility functions
├── public/              # Static assets
├── hooks/               # Custom hooks
├── data/                # Constants and sample data
└── README.md            # Project documentation
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m "feat: add my feature"`
4. Push to the branch: `git push origin feature/my-feature`
5. Open a Pull Request describing your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Made with ❤️ by the Wireframe-to-Code team
