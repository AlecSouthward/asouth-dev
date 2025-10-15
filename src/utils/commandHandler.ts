import {
  COMMONLY_ASKED_QUESTIONS,
  DIRECTORY_CONTENT,
  GITHUB_PROFILE_URL,
  GITHUB_REPO_URL,
  HELP_MESSAGE,
  README_FILE,
  USERNAME,
} from '../data/constants';

function handleCommand(command: string) {
  const commandList = command.split(' ');

  switch (commandList[0]) {
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
    case 'exit':
      window.close();
  }

  if (commandList[0] === 'cat' && commandList[1] === 'README') {
    return README_FILE;
  } else if (commandList[0] === 'cat' && commandList.length === 1) {
    return 'cat: No file supplied.';
  } else if (commandList[0] === 'cat') {
    return `cat: ${commandList[1]}: No such file or directory`;
  }

  if (
    commandList[0] === 'ls' &&
    (commandList[1] === '/' || commandList.length === 1)
  ) {
    return `${DIRECTORY_CONTENT}\n\n`;
  } else if (commandList[0] === 'ls') {
    return `ls: cannot access '/${commandList[1].replace(
      '/',
      ''
    )}': No such file or directory`;
  }

  if (
    commandList[0] === 'cd' &&
    (commandList[1] === '/' || commandList.length === 1)
  ) {
    return '';
  } else if (commandList[0] === 'cd') {
    return `bash: cd: /${commandList[1].replace(
      '/',
      ''
    )}: No such file or directory`;
  }

  return commandList[0] + ': command not found';
}

export default handleCommand;
