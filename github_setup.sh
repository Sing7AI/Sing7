#!/bin/bash

# This script sets up GitHub connection for Sing7 project with SSH keys
# All configuration is project-specific as requested

echo "==== Sing7 GitHub Setup Script ===="
echo "Setting up GitHub for account: nxkaaowpif11@hotmail.com"
echo "Repository: https://github.com/Sing7AI/Sing7"
echo ""

# Step 1: Generate SSH key if it doesn't exist
echo "Step 1: Setting up SSH key..."
if [ -f ~/.ssh/id_ed25519_sing7ai ]; then
  echo "SSH key already exists at ~/.ssh/id_ed25519_sing7ai"
else
  echo "Generating new SSH key..."
  ssh-keygen -t ed25519 -C "nxkaaowpif11@hotmail.com" -f ~/.ssh/id_ed25519_sing7ai -N ""
  echo "SSH key generated successfully"
fi

# Display the public key
echo ""
echo "Public key (add this to GitHub):"
echo "--------------------------------"
cat ~/.ssh/id_ed25519_sing7ai.pub
echo "--------------------------------"
echo ""

# Step 2: Update SSH config
echo "Step 2: Setting up SSH config..."
if grep -q "github.com-sing7" ~/.ssh/config; then
  echo "SSH config already exists for github.com-sing7"
else
  echo "Adding SSH config for github.com-sing7"
  cat >> ~/.ssh/config << EOF

Host github.com-sing7
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

# Step 4: Set up remote
echo "Step 4: Setting up remote repository..."
git remote set-url origin git@github.com-sing7:Sing7AI/Sing7.git 2>/dev/null || \
git remote add origin git@github.com-sing7:Sing7AI/Sing7.git
echo "Remote URL set to git@github.com-sing7:Sing7AI/Sing7.git"
echo ""

# Step 5: Add all files
echo "Step 5: Adding all files to Git..."
git add .
git commit -m "Sing7 V1.01"
echo "Files committed with message 'Sing7 V1.01'"
echo ""

# Step 6: Test connection
echo "Step 6: Testing SSH connection to GitHub..."
ssh -T git@github.com-sing7 || echo "Connection test failed, but continuing..."
echo ""

# Step 7: Try pushing to GitHub
echo "Step 7: Attempting to push to GitHub..."
git push -u origin main
if [ $? -ne 0 ]; then
  echo "Direct push failed. Creating bundle file as alternative..."
  git bundle create Sing7_bundle.bundle HEAD
  echo "Bundle file created: Sing7_bundle.bundle"
  echo ""
  echo "To upload using the bundle file:"
  echo "1. Copy Sing7_bundle.bundle to a machine with GitHub access"
  echo "2. Run: git clone Sing7_bundle.bundle sing7_repo"
  echo "3. Run: cd sing7_repo"
  echo "4. Run: git remote set-url origin git@github.com:Sing7AI/Sing7.git"
  echo "5. Run: git push --all origin"
else
  echo "Successfully pushed to GitHub!"
fi

echo ""
echo "GitHub setup complete!" 