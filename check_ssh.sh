#!/bin/bash

# Check if SSH key exists
if [ -f ~/.ssh/id_ed25519_sing7ai ]; then
  echo "SSH key already exists at ~/.ssh/id_ed25519_sing7ai"
  echo "Public key:"
  cat ~/.ssh/id_ed25519_sing7ai.pub
else
  echo "SSH key does not exist, will generate a new one"
  ssh-keygen -t ed25519 -C "nxkaaowpif11@hotmail.com" -f ~/.ssh/id_ed25519_sing7ai -N ""
  echo "SSH key generated successfully"
  echo "Public key:"
  cat ~/.ssh/id_ed25519_sing7ai.pub
fi

# Check SSH config
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

# Set Git configuration for this project
echo "Setting Git configuration for this project..."
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

# Set remote URL
echo "Setting remote URL to git@github.com-sing7ai:Sing7AI/Sing7.git"
git remote set-url origin git@github.com-sing7ai:Sing7AI/Sing7.git || git remote add origin git@github.com-sing7ai:Sing7AI/Sing7.git

# Create a bundle file
echo "Creating bundle file: Sing7_complete_bundle.bundle"
git bundle create Sing7_complete_bundle.bundle HEAD

echo "Setup complete! Follow these steps to upload to GitHub:"
echo "1. Add the SSH key to your GitHub account"
echo "2. Run: git push -u origin main"
echo ""
echo "Or use the bundle file:"
echo "1. Copy Sing7_complete_bundle.bundle to a computer with GitHub access"
echo "2. Run: git clone Sing7_complete_bundle.bundle sing7_repo"
echo "3. Run: cd sing7_repo"
echo "4. Run: git remote set-url origin git@github.com:Sing7AI/Sing7.git"
echo "5. Run: git push --all origin" 