#!/bin/bash

SKILLS_DIR="$HOME/.claude/skills"
REPO_DIR="$(cd "$(dirname "$0")/skills" && pwd)"

for skill in "$REPO_DIR"/*/; do
  name=$(basename "$skill")
  target="$SKILLS_DIR/$name"

  if [ -L "$target" ]; then
    rm "$target"
    echo "✓ $name 제거됨"
  else
    echo "— $name: 심링크 없음, 건너뜀"
  fi
done
