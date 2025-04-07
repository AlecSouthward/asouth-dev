import { useState } from 'react';

import Input from "./Input";

import handleCommand from '../utils/commandHandler';
import { loggedInAs, helpMessage } from '../data/constants';

function Terminal() {
  const [history, setHistory] = useState([helpMessage]);

  function onInputSubmitted(inputValue, ignoreCommands = false) {
    let commandResponse = "";

    if (!ignoreCommands) {
      commandResponse = handleCommand(inputValue);
    }

    setHistory((prev) => {
      const newHistory = [...prev];
      newHistory.push(`<p class="green">${loggedInAs}</p>${inputValue}<p>${commandResponse}</p>`);
      return newHistory;
    });
  }

  return (
    <div className="terminal-container">
      {history.map((line, lineIndex) => <p key={lineIndex} style={{display: "inline"}} dangerouslySetInnerHTML={{ __html: line }} />)}
      <Input submitCallback={onInputSubmitted} />
    </div>
  );
};

export default Terminal;