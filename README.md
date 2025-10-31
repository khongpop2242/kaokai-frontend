# Kaokai Furniture Frontend

Frontend application for Kaokai Furniture e-commerce website built with React.

## Features

- 🛍️ Product browsing and search
- 🛒 Shopping cart
- 👤 User authentication and profiles
- ❤️ Favorites/Wishlist
- 💳 Payment integration (Stripe)
- 📦 Order management
- 👨‍💼 Admin dashboard
- 📱 Responsive design

## Backend API

This frontend connects to the backend API at:
- **Production**: `https://kaokai-backend.onrender.com`
- **Development**: Can be overridden using `REACT_APP_API_URL` environment variable

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm start
```

Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Building for Production

```bash
npm run build
```

Builds the app for production to the `build` folder.

## Environment Variables

Create a `.env` file in the root directory for local development:

```
REACT_APP_API_URL=http://localhost:5050
```

For production, the backend URL is automatically configured to `https://kaokai-backend.onrender.com`.

## Deployment

This project can be deployed on both **Vercel** and **Render**. 

### Vercel Setup Steps:

1. **Connect GitHub Repository to Vercel**
   - ไปที่ [Vercel Dashboard](https://vercel.com/dashboard)
   - คลิก "Add New Project"
   - เลือก repository `kaokai-frontend` จาก GitHub
   - Vercel จะ auto-detect เป็น Create React App

2. **Configure Build Settings** (ควรจะ auto-detect แล้ว)
   - **Framework Preset**: Create React App
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
   - **Install Command**: `npm install`

3. **Environment Variables** (ถ้าต้องการ override API URL)
   - ไปที่ Project Settings → Environment Variables
   - เพิ่ม `REACT_APP_API_URL` (optional) ถ้าต้องการเปลี่ยน backend URL
   - ถ้าไม่ตั้งค่า จะใช้ default: `https://kaokai-backend.onrender.com`

4. **Deploy**
   - คลิก "Deploy"
   - Vercel จะ build และ deploy อัตโนมัติ
   - หลังจาก deploy สำเร็จ จะได้ URL สำหรับ production

### Vercel Configuration File

ไฟล์ `vercel.json` ได้ถูกตั้งค่าไว้แล้วสำหรับ:
- SPA routing (rewrite all routes to index.html)
- Cache headers สำหรับ static assets
- Build configuration

---

### Render Deployment Guide

สำหรับ deploy บน Render (Static Site):

1. **Connect GitHub Repository**
   - ไปที่ [Render Dashboard](https://dashboard.render.com)
   - คลิก "New Static Site"
   - เลือก repository `kaokai-frontend` จาก GitHub

2. **Configure Settings**:
   - **Name**: `kaokai-frontend` (หรือชื่อที่ต้องการ)
   - **Branch**: `main`
   - **Root Directory**: **เว้นว่างไว้** (เพราะ repo คือ frontend อยู่แล้ว)
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `build` ⚠️ **สำคัญมาก!**
   - **Environment Variables** (Optional):
     - `REACT_APP_API_URL` - ถ้าต้องการ override backend URL

3. **Deploy**
   - คลิก "Create Static Site"
   - Render จะ build และ deploy อัตโนมัติ
   - หลังจาก deploy สำเร็จ จะได้ URL สำหรับ production

### Render Configuration File

ไฟล์ `render.yaml` ได้ถูกตั้งค่าไว้แล้วสำหรับ reference (optional)

## Project Structure

```
src/
├── components/      # Reusable components (Header, Footer, etc.)
├── pages/          # Page components
├── config/         # Configuration files (API settings)
└── App.js          # Main app component
```

## License

Copyright © 2025 Kaokai Furniture
