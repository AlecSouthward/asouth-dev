import { useEffect, useRef } from 'react';

import { LOGGED_IN_AS } from '../data/constants';

import { scrollToBottom } from '../utils/generic';

function Input({
  submitCallback,
}: Readonly<{
  submitCallback: (inputValue: string, ignoreCommands?: boolean) => void;
}>) {
  const inputRef = useRef<HTMLInputElement>(null);

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
    window.addEventListener('keydown', onKeyPress);
    return () => window.removeEventListener('keydown', onKeyPress);
  }, []);

  const onKeyPress = (evt: KeyboardEvent) => {
    if (!evt.target) return;

    const eventTarget = evt.target as HTMLInputElement;

    if (evt.key === 'Enter') {
      if (eventTarget.value.replaceAll(' ', '').length === 0) {
        submitCallback('', true);

        return;
      }

      submitCallback(eventTarget.value.trim());

      eventTarget.value = '';
    } else if (evt.ctrlKey && evt.key === 'c' && window.getSelection()) {
      evt.preventDefault();

      submitCallback(eventTarget.value.trim() + '^C', true);

      eventTarget.value = '';
    }
  };

  return (
    <div className="input-container">
      <p className="green">{LOGGED_IN_AS}</p>
      <input
        type="text"
        ref={inputRef}
        onChange={scrollToBottom}
        maxLength={16}
        spellCheck={false}
        autoFocus
      />
    </div>
  );
}

export default Input;
