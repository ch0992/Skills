#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');

const SKILLS_SRC = path.join(__dirname, '..', 'skills');
const args = process.argv.slice(2);
const command = args[0];
const skillFlag = args.indexOf('--skill');
const targetSkill = skillFlag !== -1 ? args[skillFlag + 1] : null;
const isLocal = args.includes('--local');

function getTargetDir() {
  if (isLocal) {
    return path.join(process.cwd(), '.agents', 'skills');
  }
  return path.join(os.homedir(), '.agents', 'skills');
}

function listSkills() {
  const skills = fs.readdirSync(SKILLS_SRC).filter(f =>
    fs.statSync(path.join(SKILLS_SRC, f)).isDirectory()
  );
  console.log('\nAvailable skills:');
  skills.forEach(s => console.log(`  - ${s}`));
  console.log();
}

function installSkills() {
  const targetDir = getTargetDir();
  fs.mkdirSync(targetDir, { recursive: true });

  const skills = fs.readdirSync(SKILLS_SRC).filter(f =>
    fs.statSync(path.join(SKILLS_SRC, f)).isDirectory()
  );

  const toInstall = targetSkill ? skills.filter(s => s === targetSkill) : skills;

  if (toInstall.length === 0) {
    console.error(`Skill not found: ${targetSkill}`);
    process.exit(1);
  }

  toInstall.forEach(skill => {
    const src = path.join(SKILLS_SRC, skill);
    const dest = path.join(targetDir, skill);

    if (fs.existsSync(dest)) fs.rmSync(dest, { recursive: true });

    fs.cpSync(src, dest, { recursive: true });
    console.log(`✓ Installed: ${skill} → ${dest}`);
  });

  console.log(`\nDone. Target: ${isLocal ? '--local (.agents/skills/)' : '--global (~/.agents/skills/)'}`);
}

function uninstallSkills() {
  const targetDir = getTargetDir();
  const skills = targetSkill ? [targetSkill] : fs.readdirSync(SKILLS_SRC).filter(f =>
    fs.statSync(path.join(SKILLS_SRC, f)).isDirectory()
  );

  skills.forEach(skill => {
    const dest = path.join(targetDir, skill);
    if (fs.existsSync(dest)) {
      fs.rmSync(dest, { recursive: true });
      console.log(`✓ Uninstalled: ${skill}`);
    }
  });
}

switch (command) {
  case 'install':   installSkills(); break;
  case 'uninstall': uninstallSkills(); break;
  case 'list':      listSkills(); break;
  default:
    console.log(`
Usage:
  npx github:yeonggyuchoi/antigravity-skills install           # global (~/.agents/skills/)
  npx github:yeonggyuchoi/antigravity-skills install --local  # local (.agents/skills/)
  npx github:yeonggyuchoi/antigravity-skills install --skill <name>
  npx github:yeonggyuchoi/antigravity-skills list
  npx github:yeonggyuchoi/antigravity-skills uninstall
`);
}
