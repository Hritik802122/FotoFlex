#  FotoFlex — AI Image Transformation Tool

**FotoFlex** is a modern web app for uploading, transforming, and enhancing images using AI-ready image transformations (powered by ImageKit).  
Built with **Next.js (App Router)**, **TypeScript**, **React**, **Tailwind CSS**, and **ImageKit** for uploads and transformations.

---

##  Project overview

FotoFlex lets users:
- Upload images from the browser (drag & drop or file select)
- Preview the original image
- Choose from AI-style transformations (background remove, change background, etc.)
- View the transformed result and download it

State and UI flows are implemented with React + Context API and components are organized so uploader, preview, controls, and output are decoupled.

---

##  Features

- Client-side drag & drop upload + file selector
- Secure authenticated upload via ImageKit (server-signed token)
- Real-time upload progress and success/error states
- Original image preview & transformed image preview
- Transformation controls (parameters, prompts for background change)
- Loading UI and graceful UX on mobile and desktop
- Tailwind CSS for responsive styling

---

##  Tech stack & key libraries

- **Next.js (App Router)** — page routing, server routes
- **React + TypeScript** — UI & logic
- **Tailwind CSS** — utility-first styling
- **PostCSS / Autoprefixer** — CSS pipeline
- **imagekitio-react** — client library for direct uploads to ImageKit
- **ImageKit (server-side)** — signing upload requests (private key only on server)
- **Lucide React** — icons
- **Context API** — global app state (uploaded URL, selected transformations, params, loading)
- (Optional) **Vercel** — recommended hosting for Next.js

---

##  Project structure (important files)

```
├── app/
│ ├── page.tsx # Landing page (FotoFlex hero + Get Started)
│ ├── upload/page.tsx # Upload & transformation UI (main flow)
│ ├── api/
│ │ └── auth/route.ts # Server route to sign ImageKit uploads
│ └── layout.tsx # App layout + provider wrapper
│
├── components/
│ ├── image-uploader.tsx # Upload widget: hidden IKUpload input + drag/drop UI
│ ├── image-display-section.tsx # Shows original uploaded image
│ ├── transformation-controls.tsx # Dropdown + parameter inputs for transformations
│ ├── transformation-section.tsx # Contains controls + "Get Started"/apply buttons
│ ├── transformed-image-section.tsx # Shows transformed image / download link
│ └── render-loading.tsx # Full-screen or inline loading indicator
│
├── context/
│ └── app-context.tsx # Context: uploadedImageUrl, selectedTransformation, params, isLoading
├── public/ # public assets / favicon
├── globals.css # Tailwind imports + CSS variables
├── tailwind.config.js
├── postcss.config.mjs
├── package.json
└── README.md

