# AriVision AI - Plant Pathology Diagnostic Lab

This project is a clinical-grade plant disease detection web application using modern deep learning concepts like Vision Transformers (ViT) and Swin Transformers.

## Features

- **Leaf Scanning**: Upload or drag-and-drop a leaf image.
- **Advanced Diagnostics**: Analyzes the pathology using an ensemble of ViT and Swin models.
- **Detailed Results**: Provides the plant name, the identified disease, confidence scores, treatment/cure instructions, prevention techniques, and ongoing care tips.
- **History & Dashboard**: View previously scanned results and statistics.
- **Premium UI**: Designed with glassmorphism, dynamic gradients, and ambient animations like falling leaves.

## Technologies Used

- **Frontend**: React, TypeScript, Tailwind CSS, Framer Motion
- **Tooling**: Vite, shadcn/ui

## Getting Started

1. **Install dependencies:**
   ```sh
   npm install
   ```
2. **Run the development server:**
   ```sh
   npm run dev
   ```
3. Open `http://localhost:8080` in your browser.

## Project Structure

- `src/components`: UI components, animations, and navigation.
- `src/pages`: Main application screens (Dashboard, Scan, Results, etc.).
- `src/lib`: Utilities and mocked diagnosis engine.
