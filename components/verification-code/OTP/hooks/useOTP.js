import { useState } from 'react';

const BACKSPACE = 8;
const LEFT_ARROW = 37;
const RIGHT_ARROW = 39;
const DELETE = 46;

const useOTP = ({ onChange, numberOfInput }) => {
  const [activeInput, setActiveInput] = useState(0);
  const [currentValue, setCurrentValue] = useState([]);

  const getOtpValue = () => {
    const codeValue = currentValue.join('');
    onChange(Number(codeValue));
  };

  const handleFocus = (input) => {
    const numberInput = Math.max(Math.min(numberOfInput - 1, input), 0);
    setActiveInput(numberInput);
  };
  const handleInputFocus = (input) => {
    setActiveInput(input);
  };
  const handleFocusCode = (value) => {
    // eslint-disable-next-line prefer-destructuring
    currentValue[activeInput] = value;
    setCurrentValue([...currentValue]);
    getOtpValue();
  };

  const handleNextFocus = () => {
    handleFocus(activeInput + 1);
  };

  const handlePrevFocus = () => {
    handleFocus(activeInput - 1);
  };

  const handlePaste = (event) => {
    event.preventDefault();
    const pastedData = event.clipboardData
      .getData('text/plain')
      .slice(0, numberOfInput - activeInput)
      .split('');

    for (let pos = 0; pos < numberOfInput; pos += 1) {
      if (pos >= activeInput && pastedData.length > 0) {
        currentValue[pos] = pastedData.shift();
      }
    }
    setCurrentValue(currentValue);
    getOtpValue();
  };

  const handleChange = (event) => {
    const { value } = event.target;
    handleFocusCode(value);
    handleNextFocus();
  };
  const handleKeypress = (event) => {
    switch (event.keyCode) {
      case BACKSPACE:
        event.preventDefault();
        handleFocusCode('');
        handlePrevFocus();
        break;
      case DELETE:
        event.preventDefault();
        handleFocusCode('');
        break;
      case LEFT_ARROW:
        event.preventDefault();
        handlePrevFocus();
        break;
      case RIGHT_ARROW:
        event.preventDefault();
        handleNextFocus();
        break;
      default:
        break;
    }
  };
  return {
    activeInput,
    currentValue,
    getOtpValue,
    handleChange,
    handleKeypress,
    handlePaste,
    handleInputFocus
  };
};

export default useOTP;
