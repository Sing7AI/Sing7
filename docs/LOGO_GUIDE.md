# Sing7 Logo Display Guide

This guide explains how to properly display the Sing7 logo in the README.md file.

## Method 1: Upload to GitHub Repository

1. Create the directory structure (if it doesn't exist):
   ```bash
   mkdir -p public/assets/branding
   ```

2. Save your Sing7 logo as `sing7-logo-pop-art.png` in the following location:
   ```
   public/assets/branding/sing7-logo-pop-art.png
   ```

3. Commit and push these changes to your repository:
   ```bash
   git add public/assets/branding/sing7-logo-pop-art.png
   git commit -m "Add Sing7 logo"
   git push
   ```

4. The logo should now appear in the README.md automatically.

## Method 2: Use Base64 Encoding

If you prefer to embed the image directly in the markdown file:

1. Convert your PNG image to base64:
   ```bash
   # macOS/Linux
   cat your-logo.png | base64
   
   # Windows
   certutil -encodehex -f your-logo.png base64.txt 0x40000001
   ```

2. Edit the README.md file and uncomment the base64 image line, replacing the placeholder with your actual base64 string:
   ```markdown
   <img src="data:image/png;base64,YOUR_BASE64_STRING_HERE" alt="Sing7 Logo" width="500"/>
   ```

## Method 3: Use an External Image Hosting Service

If the above methods don't work for you:

1. Upload your logo to an image hosting service like Imgur, ImgBB, or a similar service
2. Get the direct URL to the image
3. Replace the image URL in the README.md:
   ```markdown
   <img src="https://your-image-host.com/your-logo.png" alt="Sing7 Logo" width="500"/>
   ```

## Troubleshooting

- **Image not showing in GitHub**: Make sure the path is correct and the image file exists in the repository
- **Base64 image too large**: GitHub has size limits. Consider using a smaller image or external hosting
- **SVG not rendering correctly**: Ensure your SVG file has the correct XML structure and namespaces

For further assistance, please refer to the project documentation or open an issue on GitHub. 