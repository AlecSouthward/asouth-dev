import { useEffect, useRef } from 'react';

import { LOGGED_IN_AS } from '../utils/constants';

import { scrollToBottom } from '../utils/generic';

const Input = ({
  submitCallback,
}: Readonly<{
  submitCallback: (inputValue: string, ignoreCommands?: boolean) => void;
}>) => {
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
    globalThis.addEventListener('keydown', onKeyPress);

    return () => globalThis.removeEventListener('keydown', onKeyPress);
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
    } else if (evt.ctrlKey && evt.key === 'c' && globalThis.getSelection()) {
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
        onInput={scrollToBottom}
        maxLength={15}
        spellCheck={false}
        autoCapitalize="off"
        autoCorrect="off"
        autoComplete="off"
        enterKeyHint="enter"
      />
    </div>
  );
};

export default Input;
