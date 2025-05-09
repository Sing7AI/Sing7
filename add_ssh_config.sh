#!/bin/bash

# Add new SSH config for Sing7AI
cat >> ~/.ssh/config << EOF

Host github.com-sing7ai-new
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_ed25519_sing7ai_new
EOF

echo "SSH config added for github.com-sing7ai-new" 