const Results = ({process, mistakes, text, time, seconds, inputedText}) => {
    const checkAccuracy = () => {
        return Math.round((1 - mistakes / text.length) * 100) < 0 ? 0 : Math.round((1 - mistakes / text.length) * 100);
    }

    return process === 'finish' ? (
        <div className="right_column">
            <h2>Results</h2>
            <div className="time">Time: <span>{time}</span></div>
            <div className="speed">Speed: <span>{((inputedText.length - 1) / seconds).toFixed(2)} symbols per second</span></div>
            <div className="mistakes">Mistakes: <span>{mistakes}</span></div>
            <div className="accuracy">Accuracy: <span>{checkAccuracy()}%</span></div>
            <h3>To try again click on input field</h3>
        </div>
    ) : 
    (
        <div className="right_column">
            <h2>You will see your results here</h2>
        </div>
    );
};

export default Results;