import { setTimerId, setWordList, timerSet } from "store/actions";
import { store } from "store/store";

export const resetTest = async () => {
    const { dispatch, getState } = store;
    const {
        time: { timerId },
        preferences: { timeLimit, type },
    } = getState();
    document
        .querySelectorAll(".wrong, .right")
        .forEach((el) => el.classList.remove("wrong", "right"));
    if (timerId) {
        clearInterval(timerId);
        dispatch(setTimerId(null));
    }
    import(`wordlists/${type}.json`).then((words) => {
        const punctuations = [".", ",", "!", "?", ";", ":"];
        const originalList = words.default;

        // Modified list with punctuation after every 1–5 words
        const modifiedList = [];
        let count = 0;

        for (let i = 0; i < originalList.length; i++) {
            modifiedList.push(originalList[i]);
            count++;

            // Random number between 1 and 8
            const rand = Math.floor(Math.random() * 5) + 1;

            if (count === rand) {
                modifiedList.push(
                    punctuations[
                        Math.floor(Math.random() * punctuations.length)
                    ]
                );
                count = 0;
            }
        }

        dispatch(setWordList(modifiedList));
    });

    dispatch(timerSet(timeLimit));
};
