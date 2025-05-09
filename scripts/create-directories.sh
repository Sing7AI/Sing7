#!/bin/bash
# 🗂️ Create project directory structure for Sing7

# Create necessary directories
mkdir -p public/assets/images
mkdir -p public/assets/audio
mkdir -p public/assets/fonts

mkdir -p src/components/audio/RhythmLab
mkdir -p src/components/audio/MelodyMaker
mkdir -p src/components/audio/ChordMaker
mkdir -p src/components/audio/Studio
mkdir -p src/components/marketplace
mkdir -p src/components/layout
mkdir -p src/components/ui

mkdir -p src/hooks
mkdir -p src/lib/audio
mkdir -p src/pages/marketplace
mkdir -p src/pages/studio

mkdir -p src/services/blockchain/contracts
mkdir -p src/services/storage

mkdir -p src/store/slices
mkdir -p src/styles
mkdir -p src/types

# Create empty placeholder files in empty directories
touch src/pages/index.tsx
touch src/pages/_app.tsx
touch src/pages/_document.tsx
touch src/pages/404.tsx
touch src/pages/500.tsx

# Create placeholder image files
touch public/assets/images/.gitkeep
touch public/assets/audio/.gitkeep
touch public/assets/fonts/.gitkeep

echo "Directory structure created successfully!" 