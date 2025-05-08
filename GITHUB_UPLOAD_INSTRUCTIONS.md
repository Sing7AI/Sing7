# GitHub Upload Instructions

Due to network issues, we've created the following files to help you upload the Sing7 project to GitHub:

1. `sing7_repo.bundle` - A complete Git repository bundle
2. `../Sing7_archive.tar.gz` - A compressed archive of all files

## Method 1: Using the Git bundle

If you have access to a system that can connect to GitHub:

1. Copy the `sing7_repo.bundle` file to that system
2. Create a new repository on GitHub (if not already created)
3. Run the following commands:

```bash
# Clone the bundle
git clone sing7_repo.bundle sing7_from_bundle
cd sing7_from_bundle

# Set the remote to your GitHub repository
git remote set-url origin git@github.com:Sing7AI/Sing7.git
# Or use HTTPS if preferred
# git remote set-url origin https://github.com/Sing7AI/Sing7.git

# Push all branches and tags
git push --all origin
git push --tags origin
```

## Method 2: Manual upload via GitHub web interface

1. Extract the archive: `tar -xzf Sing7_archive.tar.gz`
2. Create a new repository on GitHub (if not already created)
3. Upload files through the GitHub web interface
   - Go to your repository on GitHub
   - Click "Add file" > "Upload files"
   - Drag and drop files or select them manually
   - Enter "Sing7 V1.01" as the commit message
   - Click "Commit changes"

Note: The GitHub web interface has file size limitations, so you may need to upload files in batches.

## Repository configuration

Ensure these settings are applied to your repository:

- User name: Sing7
- User email: nxkaaowpif11@hotmail.com

## Git aliases

The repository includes these Git aliases:

```
[alias]
    br = branch
    co = checkout
    cm = commit -am
    df = diff
    st = status
    pl = pull
    ps = push
    cob = checkout -b
```

To set these up on another machine, run:

```bash
git config --local alias.br branch
git config --local alias.co checkout
git config --local alias.cm 'commit -am'
git config --local alias.df diff
git config --local alias.st status
git config --local alias.pl pull
git config --local alias.ps push
git config --local alias.cob 'checkout -b'
``` 