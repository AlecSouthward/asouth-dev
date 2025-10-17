import { useEffect, useState } from 'react';

import { CLEAR_CODE, HELP_MESSAGE, LOGGED_IN_AS } from '../utils/constants';

import { scrollToBottom } from '../utils/generic';

import handleCommand from '../commands/commandHandler';
import Input from './Input';

const Terminal = () => {
  const [history, setHistory] = useState([HELP_MESSAGE]);

  useEffect(scrollToBottom, [history]);

  const onInputSubmitted = (inputValue: string, ignoreCommands = false) => {
    let commandResponse = '';

    if (!ignoreCommands) {
      commandResponse = handleCommand(inputValue);

      if (commandResponse === CLEAR_CODE) {
        setHistory([]);
        return;
      }
    }

    setHistory((prev) => {
      const newHistory = [...prev];
      newHistory.push(
        `<p class="green">${LOGGED_IN_AS}</p>${inputValue}<p>${commandResponse}</p>`
      );
      return newHistory;
    });
  };

  return (
    <div className="terminal-container">
      {history.map((line, lineIndex) => (
        <p
          key={line + lineIndex}
          style={{ display: 'inline' }}
          dangerouslySetInnerHTML={{ __html: line }}
        />
      ))}
      <Input submitCallback={onInputSubmitted} />
    </div>
  );
};

export default Terminal;
