import './App.css';
import Results from '../results/Results';
import Textarea from '../textarea/Textarea';
import Text from '../text/Text';

import { useState, useEffect } from 'react';

function App() {
  const [inputedText, setInputedText] = useState('');
  const [num, setNum] = useState(-1);
  const [mistakes, setMistakes] = useState(0);
  const [time, setTime] = useState('00:00');
  const [seconds, setSeconds] = useState(0);
  const [process, setProcess] = useState('loading');
  const [texts, setTexts] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    getTexts();
  }, []);

  useEffect(() => {
    if (process === 'loaded') {
      updateText();
    }
  }, [process]);

  const getTexts = () => {
    fetch("http://localhost:3001/texts")
      .then(data => data.json())
      .then(data => setTexts(data))
      .then(() => setProcess('loaded'));
  }

  const updateText = () => {
    if (process !== 'typing') {
      setText(texts[Math.floor(Math.random() * 10)].text);
      setProcess('ready');
    }
  }

  return (
    <>
      <h1>Check your typing speed!</h1>
      <main>
        <div className="left_column">
          <h2>The text you should type</h2>
          <Text text={text} inputedText={inputedText} num={num} process={process}/>
          <button onClick={updateText}>Change text</button>
          <Textarea 
            setInputedText={setInputedText}
            inputedText={inputedText} 
            setNum={setNum} 
            num={num}
            setProcess={setProcess}
            setMistakes={setMistakes} 
            text={text}
            setTime={setTime}
            setSeconds={setSeconds}/>
        </div>
        <Results process={process} mistakes={mistakes} text={text} time={time} seconds={seconds} inputedText={inputedText}/>
      </main>
    </>
  );
}

export default App;
