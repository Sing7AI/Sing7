#!/bin/bash

# Sing7 GitHub Upload Script
# This script will set up Git configuration for the Sing7 project
# and prepare everything for upload to GitHub

# Set Git configuration for this project only
echo "Setting up Git configuration for Sing7 project..."
git config --local user.name "Sing7"
git config --local user.email "nxkaaowpif11@hotmail.com"
git config --local alias.br "branch"
git config --local alias.co "checkout"
git config --local alias.cm "commit -am"
git config --local alias.df "diff"
git config --local alias.st "status"
git config --local alias.pl "pull"
git config --local alias.ps "push"
git config --local alias.cob "checkout -b"
git config --local log.date "iso"
git config --local init.defaultBranch "main"

# Set the remote repository URL
echo "Setting remote repository URL..."
git remote set-url origin git@github.com-sing7ai:Sing7AI/Sing7.git

# Create a bundle file that can be used to upload to GitHub
echo "Creating Git bundle file..."
git bundle create Sing7_final_bundle.bundle HEAD

# Instructions for manual upload
echo ""
echo "===== UPLOAD INSTRUCTIONS ====="
echo "Option 1: Push directly using SSH"
echo "Run: git push -u origin main"
echo ""
echo "Option 2: Clone from bundle and push"
echo "1. Copy Sing7_final_bundle.bundle to a computer with GitHub access"
echo "2. Run the following commands:"
echo "   git clone Sing7_final_bundle.bundle sing7_clone"
echo "   cd sing7_clone"
echo "   git remote set-url origin git@github.com:Sing7AI/Sing7.git"
echo "   git push --all origin"
echo ""
echo "===== SSH KEY INFORMATION ====="
echo "If you need to add the SSH key to your GitHub account:"
echo "1. Go to GitHub Settings > SSH and GPG keys > New SSH key"
echo "2. Add the following public key:"
echo ""
cat ~/.ssh/id_ed25519_sing7ai.pub
echo ""
echo "SSH configuration is already set up in ~/.ssh/config with alias github.com-sing7ai" 