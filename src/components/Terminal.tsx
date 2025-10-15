import { useEffect, useState } from 'react';

import { HELP_MESSAGE, LOGGED_IN_AS } from '../data/constants';

import handleCommand from '../utils/commandHandler';
import { scrollToBottom } from '../utils/generic';

import Input from './Input';

function Terminal() {
  const [history, setHistory] = useState([HELP_MESSAGE]);

  useEffect(scrollToBottom, [history]);

  function onInputSubmitted(inputValue: string, ignoreCommands = false) {
    let commandResponse = '';

    if (!ignoreCommands) {
      commandResponse = handleCommand(inputValue);
    }

    setHistory((prev) => {
      const newHistory = [...prev];
      newHistory.push(
        `<p class="green">${LOGGED_IN_AS}</p>${inputValue}<p>${commandResponse}</p>`
      );
      return newHistory;
    });
  }

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
}

export default Terminal;
