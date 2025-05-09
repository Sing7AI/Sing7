# GitHub Upload Instructions

Follow these steps to upload the Sing7 project to GitHub:

## 1. GitHub Repository Setup

1. Login to GitHub with email: your-github-email@example.com
2. Create the Sing7AI organization/user if it doesn't exist
3. Create a repository named "Sing7"

## 2. SSH Key Setup

1. Add the SSH public key to your GitHub account:

```
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIIFIgaxKmEopbzCi1bjkDcI3e4DI7hPu2xL7b1uIvXfo your-github-email@example.com
```

   - Go to GitHub -> Settings -> SSH and GPG keys
   - Click "New SSH key"
   - Paste the above key
   - Save

## 3. Code Upload Methods

### Method A: Using Git Bundle (Recommended)

1. Copy `sing7_complete.bundle` to a computer where you have GitHub access
2. Run these commands:

```bash
# Clone from bundle
git clone sing7_complete.bundle sing7_repo
cd sing7_repo

# Set remote to your GitHub repository
git remote set-url origin git@github.com:Sing7AI/Sing7.git

# Push all branches and tags
git push --all origin
git push --tags origin
```

### Method B: Manual Upload

1. Extract the archive file:
   - `tar -xzf Sing7_project.tar.gz`

2. Upload through GitHub web interface:
   - Go to https://github.com/Sing7AI/Sing7
   - Click "Add file" -> "Upload files"
   - Drag and drop the extracted files
   - Use "Sing7 V1.01" as the commit message

## 4. Project Configuration

The project has been configured with:

```
[user]
    name = Sing7
    email = your-github-email@example.com
[alias]
    br = branch
    co = checkout
    cm = commit -am
    df = diff
    st = status
    pl = pull
    ps = push
    cob = checkout -b
[log]
    date = iso
[init]
    defaultBranch = main
```

All commits use the message "Sing7 V1.01" in English. 