import { useSelector } from "react-redux";
import { State } from "store/reducer";
import "stylesheets/Footer.scss";

export default function Footer() {
    const { timerId } = useSelector((state: State) => state.time);

    return (
        <div className={`bottom-area ${timerId ? "hidden" : ""}`}>
            <span className="hint">
                <kbd>Ctrl</kbd> + <kbd>k</kbd> (<kbd>Ctrl</kbd> + <kbd>л</kbd>)
                для открытия команд
            </span>
            <span className="hint">
                <kbd>Tab</kbd> для перезапуска теста
            </span>
            <footer>
                <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://www.github.com/nedomru/typing-test">
                    <span>&lt;/&gt;</span> github
                </a>
            </footer>
        </div>
    );
}
