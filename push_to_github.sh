#!/bin/bash

# This script attempts to push the Sing7 project to GitHub
# It first performs a test connection and then attempts to push

echo "==== Sing7 GitHub Push Script ===="
echo "Repository: https://github.com/Sing7AI/Sing7"
echo ""

# Test SSH connection
echo "Testing SSH connection to GitHub..."
ssh -T git@github.com-sing7ai 2>&1
SSH_RESULT=$?

if [ $SSH_RESULT -eq 1 ]; then
  echo "SSH connection successful (exit code 1 is normal for GitHub)"
  
  # Add any unstaged files
  echo "Adding any remaining files..."
  git add .
  git commit -m "Sing7 V1.01" || echo "Nothing to commit"
  
  # Push to GitHub
  echo "Pushing to GitHub..."
  git push -u origin main
  
  if [ $? -eq 0 ]; then
    echo "Successfully pushed to GitHub!"
  else
    echo "Push failed. Trying alternative method..."
    
    # Create bundle as backup
    echo "Creating updated bundle file..."
    git bundle create Sing7_updated_bundle.bundle HEAD
    
    echo ""
    echo "Please use the bundle file method:"
    echo "1. Copy Sing7_updated_bundle.bundle to a computer with GitHub access"
    echo "2. Run: git clone Sing7_updated_bundle.bundle sing7_repo"
    echo "3. Run: cd sing7_repo"
    echo "4. Run: git remote set-url origin git@github.com:Sing7AI/Sing7.git"
    echo "5. Run: git push --all origin"
  fi
else
  echo "SSH connection failed. Please ensure your SSH key is added to GitHub."
  echo "Creating bundle file for alternative method..."
  
  # Create bundle as backup
  git bundle create Sing7_updated_bundle.bundle HEAD
  
  echo ""
  echo "Please use the bundle file method:"
  echo "1. Copy Sing7_updated_bundle.bundle to a computer with GitHub access"
  echo "2. Run: git clone Sing7_updated_bundle.bundle sing7_repo"
  echo "3. Run: cd sing7_repo"
  echo "4. Run: git remote set-url origin git@github.com:Sing7AI/Sing7.git"
  echo "5. Run: git push --all origin"
fi 