const childProcess = require('child_process');
const treeKill = require('tree-kill');
const chalk = require('chalk');

const killHelp = () => {
  process.stdout.write(chalk.magenta('kill+[enter] to properly end the process', '\n'));
};

const bye = (error, stdout, stderr) => {
  process.stdout.write(chalk.yellow('---goodbye---', '\n'));
  process.exit();
};

const kill = (pid) => {
  const isWin = /^win/.test(process.platform);
  process.stdout.write(chalk.yellow('---killing dev env---', '\n'));
  process.stdout.write(chalk.blue('pid:', pid, '\n'));
  process.stdout.write(chalk.blue('platform:', process.platform, '\n'));
  if (isWin) {
    childProcess.exec('taskkill /PID ' + pid + ' /T /F', bye);
  } else {
    treeKill(pid, 'SIGTERM', (err) => {
      if (err) process.stdout.write(chalk.red(err, '\n'));
      bye();
    });
  }
};

module.exports = {
  killHelp: killHelp,
  bye: bye,
  kill: kill,
};
