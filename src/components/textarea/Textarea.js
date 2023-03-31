import { useState } from "react";

const Textarea = ({setInputedText, setNum, num, setProcess, setMistakes, text, setTime, setSeconds}) => {
    const [start, setStart] = useState(null);

    const updateInputedText = (e) => {
        setInputedText(e.target.value);
        setNum(num => num + 1);
    }

    const getZero = (num) => {
       return num < 10 && num >= 0 ? `0${num}` : num;
    }

    const onKeyPress = (e) => {
        if (e.code === 'Backspace') {
            setNum(num => num - 2);
        } else if (e.code === 'Enter') {
            text.includes(e.target.value) ? setMistakes(num => num + text.length - e.target.value.length) :
                                            setMistakes(num => num + text.length - e.target.value.length + 1);
            setSeconds(Math.floor((Date.parse(new Date()) - start) / 1000));
            setTime(`${getZero(Math.floor((Date.parse(new Date()) - start) / 1000 / 60))}:${getZero(Math.floor((Date.parse(new Date()) - start) / 1000) % 60)}`);
            setProcess('finish');
        } else if (e.target.value && text[num] !== e.target.value[num]) {
            setMistakes(num => num + 1);
            setInputedText(text => text.slice(0, num));
            e.target.value = e.target.value.slice(0, num);
            setNum(num => num - 1);
        }
    }

    const onTextareaReset = (e) => {
        e.target.value = '';
        setProcess('typing');
        setNum(-1);
        setInputedText('');
        setMistakes(0);
        setStart(Date.parse(new Date()));
    }

    return (
        <textarea 
            type="text" 
            placeholder="Type here. When you finish press Enter to see your results"
            onChange={updateInputedText}
            onClick={onTextareaReset}
            onKeyDown={onKeyPress}></textarea>
    );
};

export default Textarea;