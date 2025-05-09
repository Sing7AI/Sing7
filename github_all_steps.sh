#!/bin/bash

# This script performs all steps needed to set up GitHub connection for Sing7 project
# It will generate SSH key, set up SSH config, configure Git, and prepare for upload

echo "==== Sing7 GitHub Setup Script ===="
echo "Account: nxkaaowpif11@hotmail.com"
echo "Repository: https://github.com/Sing7AI/Sing7"
echo ""

# Step 1: Set up SSH key
echo "Step 1: Setting up SSH key..."
if [ -f ~/.ssh/id_ed25519_sing7ai ]; then
  echo "SSH key already exists at ~/.ssh/id_ed25519_sing7ai"
else
  echo "Generating new SSH key..."
  ssh-keygen -t ed25519 -C "nxkaaowpif11@hotmail.com" -f ~/.ssh/id_ed25519_sing7ai -N ""
  echo "SSH key generated successfully"
fi

echo ""
echo "Public key (add this to GitHub):"
echo "--------------------------------"
cat ~/.ssh/id_ed25519_sing7ai.pub
echo "--------------------------------"
echo ""

# Step 2: Set up SSH config
echo "Step 2: Setting up SSH config..."
if grep -q "github.com-sing7ai" ~/.ssh/config; then
  echo "SSH config already exists for github.com-sing7ai"
else
  echo "Adding SSH config for github.com-sing7ai"
  cat >> ~/.ssh/config << EOF

Host github.com-sing7ai
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_ed25519_sing7ai
EOF
  echo "SSH config added successfully"
fi
echo ""

# Step 3: Configure Git for this project
echo "Step 3: Setting up Git configuration..."
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
echo "Git configuration complete"
echo ""

# Step 4: Set remote URL
echo "Step 4: Setting remote repository URL..."
git remote set-url origin git@github.com-sing7ai:Sing7AI/Sing7.git 2>/dev/null || git remote add origin git@github.com-sing7ai:Sing7AI/Sing7.git
echo "Remote URL set to git@github.com-sing7ai:Sing7AI/Sing7.git"
echo ""

# Step 5: Add setup files to Git
echo "Step 5: Adding setup files to Git..."
git add SING7_GITHUB_SETUP.md github_all_steps.sh 2>/dev/null
git commit -m "Sing7 V1.01" 2>/dev/null
echo "Setup files committed"
echo ""

# Step 6: Create bundle file
echo "Step 6: Creating bundle file..."
git bundle create Sing7_complete_bundle.bundle HEAD
echo "Bundle file created: Sing7_complete_bundle.bundle"
echo ""

# Step 7: Instructions for GitHub
echo "==== INSTRUCTIONS FOR GITHUB UPLOAD ===="
echo ""
echo "1. Add SSH key to GitHub:"
echo "   - Go to GitHub Settings → SSH and GPG keys → New SSH key"
echo "   - Title: Sing7 Project Key"
echo "   - Key: (copy the public key shown above)"
echo ""
echo "2. Push to GitHub:"
echo "   git push -u origin main"
echo ""
echo "Or use the bundle file method:"
echo "   - Copy Sing7_complete_bundle.bundle to a computer with GitHub access"
echo "   - Run: git clone Sing7_complete_bundle.bundle sing7_repo"
echo "   - Run: cd sing7_repo"
echo "   - Run: git remote set-url origin git@github.com:Sing7AI/Sing7.git"
echo "   - Run: git push --all origin"
echo ""
echo "Setup complete! Your code is ready to be pushed to GitHub." 