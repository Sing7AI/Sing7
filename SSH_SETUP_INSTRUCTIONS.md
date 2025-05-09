# SSH Key Setup for GitHub

## SSH Key Information

A project-specific SSH key has been generated:

- **Private key location**: `~/.ssh/id_ed25519_sing7ai`
- **Public key content**:
```
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIIFIgaxKmEopbzCi1bjkDcI3e4DI7hPu2xL7b1uIvXfo your-github-email@example.com
```

## SSH Configuration

The following configuration has been added to `~/.ssh/config`:

```
Host github.com-sing7ai
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_ed25519_sing7ai
```

This configuration allows you to use a specific SSH key when connecting to the Sing7 repository without affecting your SSH configuration for other GitHub projects. This is achieved by using the custom hostname `github.com-sing7ai` instead of directly using `github.com`.

## Adding SSH Key to GitHub

1. Log in to GitHub with your account (your-github-email@example.com)
2. Navigate to Settings (click on your avatar in the top right and select "Settings")
3. Select "SSH and GPG keys" from the sidebar
4. Click "New SSH key"
5. Title: "Sing7 Project Key"
6. Key type: "Authentication Key"
7. Key: Paste the public key shown above
8. Click "Add SSH key"

## Testing the Connection

To test the SSH connection to GitHub:

```bash
ssh -T git@github.com-sing7ai
```

You should see a message like:
```
Hi username! You've successfully authenticated, but GitHub does not provide shell access.
```

## Creating a Repository (if it doesn't exist)

1. Go to GitHub and click the "+" in the top right, then select "New repository"
2. Set the owner to "Sing7AI" (create the organization first if needed)
3. Set the repository name to "Sing7"
4. Choose "Public" or "Private" as needed
5. Do NOT initialize with README or add .gitignore/license
6. Click "Create repository"

## Committing and Pushing Code

The repository has been configured with the following Git settings:

```bash
git config --local user.name "Sing7"
git config --local user.email "your-github-email@example.com"
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

To push your code to GitHub:

```bash
# Set the remote URL (if not already set)
git remote set-url origin git@github.com-sing7ai:Sing7AI/Sing7.git

# Push to GitHub
git push -u origin main
```

## Using the Bundle File (Alternative Method)

If direct pushing doesn't work, you can use the bundle file:

```bash
# On any machine with Git installed
git clone sing7_complete.bundle sing7_repo
cd sing7_repo
git remote set-url origin git@github.com-sing7ai:Sing7AI/Sing7.git
git push --all origin
``` 