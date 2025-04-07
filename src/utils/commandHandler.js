import * as constants from "../data/constants";

function handleCommand(command) {
  const commandList = command.split(" ");

  switch(commandList[0]) {
    case "sudo": return `${constants.userName} is not in the sudoers file. This incident will be reported.`;
    case "help": return constants.helpMessage;
    case "git": return constants.githubProfileURL;
    case "src": return constants.githubRepoURL;
    case "faq": return constants.commonlyAskedQuestions;
    case "exit": {
      window.close();
      return "";
    };
  }

  if (commandList[0] === "cat" && commandList[1] === "README") {
    return constants.readmeFile;
  } else if (commandList[0] === "cat" && commandList.length === 1) {
    return "cat: No file supplied.";
  } else if (commandList[0] === "cat") {
    return `cat: ${commandList[1]}: No such file or directory`;
  }

  if (commandList[0] === "ls" && (commandList[1] === "/" || commandList.length === 1)) {
    return `${constants.directoryContent}\n\n`;
  } else if (commandList[0] === "ls") {
    return `ls: cannot access '/${commandList[1].replace('/', '')}': No such file or directory`;
  }

  if (commandList[0] === "cd" && (commandList[1] === "/" || commandList.length === 1)) {
    return "";
  } else if (commandList[0] === "cd") {
    return `bash: cd: /${commandList[1].replace('/', '')}: No such file or directory`;
  }

  return commandList[0] + ": command not found";
}

export default handleCommand;