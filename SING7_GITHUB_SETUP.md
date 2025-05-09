# 🚀 Sing7 GitHub Setup Guide

## Step 1: SSH Key Setup 🔐

Run the following commands to set up the SSH key:

```bash
# Check if SSH key exists
if [ -f ~/.ssh/id_ed25519_sing7ai ]; then
  echo "SSH key already exists"
else
  # Generate a new SSH key for Sing7 project
  ssh-keygen -t ed25519 -C "nxkaaowpif11@hotmail.com" -f ~/.ssh/id_ed25519_sing7ai -N ""
  echo "SSH key generated"
fi

# Display the public key - you'll need to add this to GitHub
cat ~/.ssh/id_ed25519_sing7ai.pub
```

## Step 2: SSH Config Setup

Add the following to your SSH config file:

```bash
# Add SSH config
if grep -q "github.com-sing7ai" ~/.ssh/config; then
  echo "SSH config already exists"
else
  cat >> ~/.ssh/config << EOF

Host github.com-sing7ai
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_ed25519_sing7ai
EOF
  echo "SSH config added"
fi
```

## Step 3: Git Configuration

Set up Git configuration for this project only:

```bash
# Set Git configuration
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
```

## Step 4: Set Remote URL

Configure the remote repository URL:

```bash
# Configure remote URL
git remote set-url origin git@github.com-sing7ai:Sing7AI/Sing7.git || git remote add origin git@github.com-sing7ai:Sing7AI/Sing7.git
```

## Step 5: Add SSH Key to GitHub

1. Log in to GitHub with your account (nxkaaowpif11@hotmail.com)
2. Go to Settings → SSH and GPG keys → New SSH key
3. Title: "Sing7 Project Key"
4. Key type: "Authentication Key"
5. Key: Paste the content from your public key (from Step 1)
6. Click "Add SSH key"

## Step 6: Create Bundle File (Backup Method)

Create a bundle file for alternative upload method:

```bash
# Create a bundle file
git bundle create Sing7_complete_bundle.bundle HEAD
```

## Step 7: Push to GitHub

Try pushing directly to GitHub:

```bash
# Push to GitHub
git push -u origin main
```

## Alternative: Using Bundle File

If direct push doesn't work, you can use the bundle file:

```bash
# On a machine with GitHub access:
git clone Sing7_complete_bundle.bundle sing7_repo
cd sing7_repo
git remote set-url origin git@github.com:Sing7AI/Sing7.git
git push --all origin
```

## Running All Steps At Once

You can also run the attached script to perform all steps automatically:

```bash
chmod +x check_ssh.sh
./check_ssh.sh
```

## Troubleshooting

If you encounter issues:

1. Ensure SSH key is correctly added to GitHub
2. Test SSH connection: `ssh -T git@github.com-sing7ai`
3. Verify remote URL: `git remote -v`
4. Check Git configuration: `git config --local -l` 