import { resetTest } from "helpers/resetTest";
import { useSelector } from "react-redux";
import { State } from "store/reducer";
import "stylesheets/Result.scss";

export default function Result() {
    const {
        word: { wordList, typedHistory, currWord },
        preferences: { timeLimit },
    } = useSelector((state: State) => state);
    const spaces = wordList.indexOf(currWord); // this assumes spaces before currWord are typed
    let correctChars = 0;
    let typedChars = 0;

    const result = typedHistory.map((typedWord, idx) => {
        typedChars += typedWord.length;
        if (typedWord === wordList[idx]) {
            correctChars += wordList[idx].length;
            return true;
        }
        return false;
    });

    const wpm = ((correctChars + spaces) * 60) / timeLimit / 5;
    const cpm = ((correctChars + spaces) * 60) / timeLimit;
    const accuracy = typedChars > 0 ? (correctChars / typedChars) * 100 : 0;

    return (
        <div className="result">
            <table>
                <tbody>
                    <tr>
                        <td colSpan={2} align="center">
                            <h1>{Math.round(cpm) + " символов в минуту"}</h1>
                        </td>
                    </tr>
                    <tr>
                        <th>Точность:</th>
                        <td>{accuracy.toFixed(1)}%</td>
                    </tr>
                    <tr>
                        <th>Слов в минуту:</th>
                        <td>{Math.round(wpm)}</td>
                    </tr>
                    <tr>
                        <th>Правильных слов:</th>
                        <td>{result.filter((x) => x).length}</td>
                    </tr>
                    <tr className="wrong">
                        <th>Неправильных слов:</th>
                        <td>{result.filter((x) => !x).length}</td>
                    </tr>
                    <tr>
                        <td colSpan={2} align="center">
                            <button onClick={() => resetTest()}>
                                Перезапуск
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
