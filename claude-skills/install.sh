#!/bin/bash

SKILLS_DIR="$HOME/.claude/skills"
REPO_DIR="$(cd "$(dirname "$0")/skills" && pwd)"

mkdir -p "$SKILLS_DIR"

for skill in "$REPO_DIR"/*/; do
  name=$(basename "$skill")
  target="$SKILLS_DIR/$name"

  if [ -L "$target" ]; then
    rm "$target"
  elif [ -e "$target" ]; then
    echo "⚠️  $name: 기존 파일이 심링크가 아님 — 건너뜀 (수동 확인 필요)"
    continue
  fi

  ln -s "$skill" "$target"
  echo "✓ $name"
done

echo ""
echo "설치 완료: $(ls "$SKILLS_DIR" | wc -l | tr -d ' ')개 스킬"
