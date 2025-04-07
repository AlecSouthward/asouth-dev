import React, { useRef, useEffect } from 'react';

import { loggedInAs } from '../data/constants';

function Input({ submitCallback }) {
  const inputRef = useRef(null);

  useEffect(() => {
    const handleClick = () => {
      inputRef.current?.focus();
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", onKeyPress);
    return () => window.removeEventListener("keydown", onKeyPress);
    // eslint-disable-next-line
  }, []);

  const onKeyPress = (evt) => {
    if (evt.key === 'Enter') {
      if (evt.target.value.replaceAll(' ', '').length === 0) {
        submitCallback('', true);
  
        return;
      }

      submitCallback(evt.target.value.trim());

      evt.target.value = "";
    } else if (evt.ctrlKey && evt.key === 'c' && window.getSelection()) {
      evt.preventDefault();

      submitCallback(evt.target.value.trim() + "^C", true);

      evt.target.value = "";
    }
  };

  return (
    <div className="input-container">
      <p className="green">{loggedInAs}</p>
      <input
        type="text"
        ref={inputRef}
        autoFocus
      />
    </div>
  )
};

export default Input;