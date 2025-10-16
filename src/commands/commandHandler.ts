import {
  COMMONLY_ASKED_QUESTIONS,
  GITHUB_PROFILE_URL,
  GITHUB_REPO_URL,
  HELP_MESSAGE,
  UFW_STATUS,
  USERNAME,
} from '../data/constants';

import { handleCat, handleCd, handleLs, handleMan, handleRm } from './commands';

const handleCommand = (commandString: string) => {
  const commandList = commandString.split(' ');
  const command = commandList[0];

  const groupedFlags = commandString.match(/-(\w+)/g) || [];
  const flags = groupedFlags.flatMap((m) => m.slice(1).split(''));

  const parameters = commandString
    .trim()
    .split(/\s+/)
    .filter((part) => !part.startsWith('-'))
    .slice(1);

  // Secret commands
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
    case 'pwd':
      return '/';
    case 'yes':
      return 'y';
    case 'fortune':
      return 'Fortunes are not supported. Sorry.';
    case 'shutdown':
    case 'exit':
      window.close();
      return '';
  }

  return command + ': command not found';
};

export default handleCommand;
