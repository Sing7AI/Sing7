#!/bin/bash

# 创建专门用于Sing7AI的SSH密钥
echo "Creating exclusive SSH key for Sing7AI account..."

# 1. 生成新的SSH密钥，使用不同的文件名以避免覆盖
SSH_KEY_FILE=~/.ssh/sing7ai_exclusive_key
ssh-keygen -t ed25519 -C "nxkaaowpif11@hotmail.com" -f "$SSH_KEY_FILE" -N ""

# 2. 创建专用的SSH配置，确保只有这个密钥用于访问Sing7AI
cat >> ~/.ssh/config << EOF

# Exclusive configuration for Sing7AI
Host github.com-sing7ai-exclusive
  HostName github.com
  User git
  IdentityFile $SSH_KEY_FILE
  IdentitiesOnly yes
EOF

# 3. 显示公钥
echo ""
echo "Your exclusive SSH public key for Sing7AI:"
echo "=========================================="
cat "${SSH_KEY_FILE}.pub"
echo "=========================================="
echo ""

# 4. 更新Git远程URL
echo "Adding new Git remote using exclusive SSH config..."
git remote add sing7ai-exclusive git@github.com-sing7ai-exclusive:Sing7AI/Sing7.git

echo ""
echo "Instructions for GitHub setup:"
echo "1. Add the above SSH public key to your GitHub account (nxkaaowpif11@hotmail.com)"
echo "2. Make sure to add it as a new key, not replacing existing ones"
echo "3. After adding the key, test with: ssh -T git@github.com-sing7ai-exclusive"
echo "4. If successful, push with: git push -u sing7ai-exclusive main"
echo ""
echo "Setup complete!" 