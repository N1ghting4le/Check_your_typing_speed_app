import { useRef } from "react";

const Text = ({text, inputedText, num, process}) => {
    const itemRefs = useRef([]);

    const renderText = () => {
        return process !== 'loading' && process !== 'loaded' ? text.split('').map((char, i) => {
            if (itemRefs.current[i]) {
                if (i === num) {
                    text[i] === inputedText[i] ? itemRefs.current[i].style = "background-color: green; color: black" : itemRefs.current[i].style = "background-color: red; color: black";
                } else {
                    text[i] === inputedText[i] ? itemRefs.current[i].style = "color: grey; background-color: none" : itemRefs.current[i].style = "color: black; background-color: none";
                }
            }
            return <span key={i} ref={el => itemRefs.current[i] = el}>{char}</span>
        }) : null;
    }

    return (
        <div className="text">{renderText()}</div>
    );
};

export default Text;