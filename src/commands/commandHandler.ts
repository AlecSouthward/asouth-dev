import {
  CLEAR_CODE,
  COMMONLY_ASKED_QUESTIONS,
  GITHUB_PROFILE_URL,
  GITHUB_REPO_URL,
  HELP_MESSAGE,
  UFW_STATUS,
  USERNAME,
} from '../utils/constants';

import {
  handleCat,
  handleCd,
  handleEcho,
  handleLs,
  handleMan,
  handleMkdir,
  handleRm,
  handleRmdir,
} from './commands';

export const commandHistory: string[] = [];

const handleCommand = (commandString: string) => {
  const commandList = commandString.split(' ');
  const command = commandList[0];

  const groupedFlags = commandString.match(/-(\w+)/g) || [];
  const flags = groupedFlags.flatMap((flag) => flag.slice(1).split(''));

  const parameters = commandString
    .trim()
    .split(/\s+/)
    .filter((part) => !part.startsWith('-'))
    .slice(1);

  commandHistory.push(commandString);

  // Hard-coded commands
  switch (commandString) {
    case 'sudo ufw status':
      return UFW_STATUS;
    case ':(){ :|:& };:':
      return 'Try again.';
  }

  switch (command) {
    case 'sudo':
      return `${USERNAME} is not in the sudoers file. This incident will be reported.`;
    case 'help':
      return HELP_MESSAGE;
    case 'git':
      return GITHUB_PROFILE_URL;
    case 'src':
      return GITHUB_REPO_URL;
    case 'faq':
      return COMMONLY_ASKED_QUESTIONS;
    case 'cat':
      return handleCat(parameters);
    case 'ls':
      return handleLs(parameters);
    case 'cd':
      return handleCd(parameters);
    case 'man':
      return handleMan(parameters);
    case 'rm':
      return handleRm(flags, parameters);
    case 'echo':
      return handleEcho(parameters);
    case 'pwd':
      return '/';
    case 'yes':
      return 'y';
    case 'whoami':
      return 'guest';
    case 'date':
      return new Date().toUTCString();
    case 'history':
      return commandHistory
        .map(
          (historyCommand, historyCommandIndex) =>
            `  ${historyCommandIndex + 1}  ${historyCommand}`
        )
        .join('\n');
    case 'fortune':
      return 'Fortunes are not supported. Sorry.';
    case 'clear':
      return CLEAR_CODE;
    case 'mkdir':
      return handleMkdir(parameters);
    case 'rmdir':
      return handleRmdir(parameters);
    case 'shutdown':
    case 'exit':
      window.close();
      return '';
  }

  return command + ': command not found';
};

export default handleCommand;
