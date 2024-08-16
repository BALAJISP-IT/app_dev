const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);

    speechSynthesis.speak(utterance);
  };
export default speak;