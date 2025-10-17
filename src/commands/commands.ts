import { DIRECTORY_CONTENT, README_FILE } from '../utils/constants';

import { checkIfRootDir } from './commandHelper';

export const handleCat = (parameters: string[]) => {
  if (parameters.includes('README')) {
    return README_FILE;
  } else if (parameters.some(checkIfRootDir)) {
    return `cat: ${parameters[0]}: Is a directory`;
  } else if (parameters.length === 0) {
    return 'cat: No file supplied';
  }

  return `cat: ${parameters[0]}: No such file or directory`;
};

export const handleLs = (parameters: string[]) => {
  if (parameters.length > 0) {
    return (
      parameters
        .map((param) => {
          if (checkIfRootDir(param)) return `${DIRECTORY_CONTENT}`;

          return `ls: cannot access '/${param.replace(
            '/',
            ''
          )}': No such file or directory`;
        })
        .join('\n\n') + '\n\n'
    );
  }

  return `${DIRECTORY_CONTENT}\n\n`;
};

export const handleCd = (parameters: string[]) => {
  if (parameters.length > 1) {
    return 'bash: cd: too many arguments';
  } else if (checkIfRootDir(parameters[0])) {
    return '';
  } else if (parameters[0] === 'README') {
    return 'bash: cd: README: Not a directory';
  }

  return `bash: cd: /${parameters[0].replace(
    '/',
    ''
  )}: No such file or directory`;
};

export const handleMan = (parameters: string[]) => {
  if (parameters.length === 0) {
    return "What manual page do you want?\nWe don't have many.";
  }

  let openedManPage = false;

  return (
    parameters
      .map((param) => {
        if (param === 'man') {
          if (!openedManPage) {
            window.open(
              'https://man7.org/linux/man-pages/man1/man.1.html',
              '_blank'
            );
          }

          openedManPage = true;
          return 'Opening Linux manual page...';
        }

        return `No manual entry for ${param}`;
      })
      .join('\n') + '\n'
  );
};

export const handleRm = (flags: string[], parameters: string[]) => {
  if (parameters.length === 0) return 'rm: missing operand';

  return (
    parameters
      .map((param) => {
        if (param === '/') {
          if (flags.includes('f') && flags.includes('r')) {
            return 'I bet you thought that would work.';
          } else if (flags.includes('r')) {
            return "rm: it is dangerous to operate recursively on '/'";
          }

          return "rm: cannot remove '/': Is a directory";
        } else if (param === 'README') {
          return "rm: cannot remove 'README': Permission denied";
        }

        return `rm: cannot remove '${param}': No such file or directory`;
      })
      .join('\n') + '\n'
  );
};

export const handleEcho = (parameters: string[]) => {
  return parameters.join(' \n').replaceAll('"', '') + '\n';
};

export const handleMkdir = (parameters: string[]) => {
  if (parameters.length === 0) return 'mkdir: missing operand';

  return parameters
    .map((param) => {
      if (checkIfRootDir(param) || param === 'README') {
        return `mkdir: cannot create directory '${param}': File exists`;
      }

      return `mkdir: cannot create directory '${param}': Permission denied`;
    })
    .join('\n');
};

export const handleRmdir = (parameters: string[]) => {
  if (parameters.length === 0) return 'rmdir: missing operand';

  return parameters
    .map((param) => {
      if (checkIfRootDir(param)) {
        return `rmdir: failed to remove '${param}': Directory not empty`;
      } else if (param === 'README') {
        return `rmdir: failed to remove '${param}: Not a directory`;
      }

      return `rmdir: cannot create directory '${param}': No such file or directory`;
    })
    .join('\n');
};
