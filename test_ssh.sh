#!/bin/bash
echo "Testing SSH connection to GitHub..."
ssh -T git@github.com-sing7ai 2>&1
echo "Exit code: $?" 