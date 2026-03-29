#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');

const args = process.argv.slice(2);
const type = args[0];     // 'claude' | 'anti' | 'install' (전체)
const command = args[1] || 'install';  // 'install' | 'uninstall' | 'list'
const skillFlag = args.indexOf('--skill');
const targetSkill = skillFlag !== -1 ? args[skillFlag + 1] : null;
const isLocal = args.includes('--local');

const CONFIGS = {
  claude: {
    src: path.join(__dirname, '..', 'claude-skills', 'skills'),
    getTarget: () => isLocal
      ? path.join(process.cwd(), '.claude', 'skills')
      : path.join(os.homedir(), '.claude', 'skills'),
    label: 'Claude Code',
  },
  anti: {
    src: path.join(__dirname, '..', 'antigravity-skills', 'skills'),
    getTarget: () => isLocal
      ? path.join(process.cwd(), '.agents', 'skills')
      : path.join(os.homedir(), '.agents', 'skills'),
    label: 'Antigravity',
  },
};

function getSkills(src) {
  return fs.readdirSync(src).filter(f =>
    fs.statSync(path.join(src, f)).isDirectory()
  );
}

function install(config) {
  const targetDir = config.getTarget();
  fs.mkdirSync(targetDir, { recursive: true });

  const skills = getSkills(config.src);
  const toInstall = targetSkill ? skills.filter(s => s === targetSkill) : skills;

  if (toInstall.length === 0) {
    console.error(`Skill not found: ${targetSkill}`);
    process.exit(1);
  }

  console.log(`\n[${config.label}]`);
  toInstall.forEach(skill => {
    const dest = path.join(targetDir, skill);
    if (fs.existsSync(dest)) fs.rmSync(dest, { recursive: true });
    fs.cpSync(path.join(config.src, skill), dest, { recursive: true });
    console.log(`  ✓ ${skill} → ${dest}`);
  });
}

function uninstall(config) {
  const targetDir = config.getTarget();
  const skills = targetSkill ? [targetSkill] : getSkills(config.src);

  console.log(`\n[${config.label}]`);
  skills.forEach(skill => {
    const dest = path.join(targetDir, skill);
    if (fs.existsSync(dest)) {
      fs.rmSync(dest, { recursive: true });
      console.log(`  ✓ removed: ${skill}`);
    }
  });
}

function list(config) {
  console.log(`\n[${config.label}] skills:`);
  getSkills(config.src).forEach(s => console.log(`  - ${s}`));
}

function printHelp() {
  console.log(`
Usage:
  npx github:ch0992/Skills claude install           # Claude Code 스킬 설치 (글로벌)
  npx github:ch0992/Skills anti   install           # Antigravity 스킬 설치 (글로벌)
  npx github:ch0992/Skills install                  # 전체 설치

Options:
  --local              프로젝트 로컬에 설치 (.claude/skills/ 또는 .agents/skills/)
  --skill <name>       특정 스킬만 설치/제거

Commands:
  install              스킬 설치
  uninstall            스킬 제거
  list                 사용 가능한 스킬 목록
`);
}

// 전체 설치: npx ... install (type 없이)
if (type === 'install' || type === 'uninstall' || type === 'list') {
  const cmd = type;
  Object.values(CONFIGS).forEach(config => {
    if (cmd === 'install') install(config);
    else if (cmd === 'uninstall') uninstall(config);
    else list(config);
  });
  console.log('\nDone.');
} else if (CONFIGS[type]) {
  const config = CONFIGS[type];
  if (command === 'install') install(config);
  else if (command === 'uninstall') uninstall(config);
  else if (command === 'list') list(config);
  else printHelp();
  console.log('\nDone.');
} else {
  printHelp();
}
