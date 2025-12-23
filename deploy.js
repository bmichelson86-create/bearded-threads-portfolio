const { execSync } = require('child_process');
const readline = require('readline');
const fs = require('fs');
const path = require('path');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

function runCommand(command, description) {
  console.log(`\n🔄 ${description}...`);
  try {
    execSync(command, { stdio: 'inherit' });
    console.log(`✅ ${description} - Success!`);
    return true;
  } catch (error) {
    console.error(`❌ ${description} - Failed!`);
    return false;
  }
}

async function deploy() {
  console.log('\n🚀 Bearded Threads - GitHub Pages Deployment Script\n');
  console.log('This script will deploy your website to GitHub Pages for FREE!\n');

  // Get repository name
  const repoName = await question('Enter your GitHub repository name (e.g., bearded-threads-portfolio): ');
  
  if (!repoName) {
    console.log('❌ Repository name is required!');
    rl.close();
    return;
  }

  console.log('\n📋 Deployment Summary:');
  console.log(`   Repository: ${repoName}`);
  console.log(`   GitHub Username: dre-minkwazu`);
  console.log(`   Live URL: https://dre-minkwazu.github.io/${repoName}/`);
  
  const confirm = await question('\nProceed with deployment? (yes/no): ');
  
  if (confirm.toLowerCase() !== 'yes' && confirm.toLowerCase() !== 'y') {
    console.log('❌ Deployment cancelled.');
    rl.close();
    return;
  }

  console.log('\n🎯 Starting deployment process...\n');

  // Check if .git exists
  const gitExists = fs.existsSync(path.join(__dirname, '.git'));
  
  if (!gitExists) {
    // Initialize Git repository
    if (!runCommand('git init', 'Initializing Git repository')) {
      rl.close();
      return;
    }

    // Create .gitignore if it doesn't exist
    if (!fs.existsSync('.gitignore')) {
      fs.writeFileSync('.gitignore', 'node_modules/\n.DS_Store\n*.log\n');
      console.log('✅ Created .gitignore file');
    }

    // Add all files
    if (!runCommand('git add .', 'Adding files to Git')) {
      rl.close();
      return;
    }

    // Initial commit
    if (!runCommand('git commit -m "Initial commit: Bearded Threads Portfolio"', 'Creating initial commit')) {
      rl.close();
      return;
    }

    // Rename branch to main
    if (!runCommand('git branch -M main', 'Setting main branch')) {
      rl.close();
      return;
    }

    // Add remote origin
    const remoteUrl = `https://github.com/dre-minkwazu/${repoName}.git`;
    if (!runCommand(`git remote add origin ${remoteUrl}`, 'Adding GitHub remote')) {
      rl.close();
      return;
    }
  } else {
    console.log('ℹ️  Git repository already exists, updating...');
    
    // Add and commit changes
    runCommand('git add .', 'Adding updated files');
    runCommand('git commit -m "Update: Bearded Threads Portfolio"', 'Committing changes');
  }

  console.log('\n📤 Pushing to GitHub...');
  console.log('⚠️  You may be prompted to log in to GitHub.\n');

  // Push to GitHub
  if (!runCommand('git push -u origin main', 'Pushing to GitHub')) {
    console.log('\n⚠️  If the push failed because the repository doesn\'t exist:');
    console.log(`   1. Go to https://github.com/new`);
    console.log(`   2. Create a repository named: ${repoName}`);
    console.log(`   3. Run this script again\n`);
    rl.close();
    return;
  }

  console.log('\n🌐 Deploying to GitHub Pages...');
  
  // Create gh-pages branch and deploy
  const ghPagesCommands = [
    'git checkout -b gh-pages',
    'git push -u origin gh-pages',
    'git checkout main'
  ];

  for (const cmd of ghPagesCommands) {
    execSync(cmd, { stdio: 'inherit' }).toString();
  }

  console.log('\n✨ Deployment Complete! ✨\n');
  console.log('📍 Your website will be live at:');
  console.log(`   🔗 https://dre-minkwazu.github.io/${repoName}/\n`);
  console.log('⏱️  Note: It may take 2-5 minutes for GitHub Pages to build your site.\n');
  console.log('📝 Next Steps:');
  console.log('   1. Go to https://github.com/dre-minkwazu/' + repoName + '/settings/pages');
  console.log('   2. Make sure "Source" is set to "Deploy from a branch"');
  console.log('   3. Make sure "Branch" is set to "gh-pages" and folder is "/ (root)"');
  console.log('   4. Wait a few minutes and visit your live site!\n');

  rl.close();
}

deploy().catch(error => {
  console.error('❌ Deployment failed:', error.message);
  rl.close();
  process.exit(1);
});
