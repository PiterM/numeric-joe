import { ref } from "vue";
import { defineStore } from "pinia";

export enum DigitState {
  current = "current",
  success = "success",
  failed = "failed",
  next = "",
}

export enum LineState {
  current = "current",
  next = "next",
}

export interface Digit {
  code: string | string[];
  state: DigitState;
}

export const useDigitsLines = defineStore("digitsLines", () => {
  const digitsLines = ref({
    [LineState.current]: getRandomDigitsLine(),
    [LineState.next]: getRandomDigitsLine(),
  });

  const currentKeyIndex = ref(0);
  digitsLines.value[LineState.current][0].state = DigitState.current;

  function setCurrentKeyState(currentKeyCode: string) {
    currentKeyIndex.value =
      currentKeyIndex.value < 10 ? currentKeyIndex.value + 1 : 10;

    const currentDigitLine = digitsLines.value[LineState.current];

    for (const key in currentDigitLine) {
      if (currentDigitLine[key].state === DigitState.current) {
        let currentKeyState = DigitState.failed;
        if (
          (currentDigitLine[parseInt(key)].code.constructor === Array &&
            currentDigitLine[parseInt(key)].code.includes(currentKeyCode)) ||
          currentDigitLine[parseInt(key)].code === currentKeyCode
        ) {
          currentKeyState = DigitState.success;
        }

        currentDigitLine[parseInt(key)].state = currentKeyState;

        if (currentKeyIndex.value < 10) {
          currentDigitLine[parseInt(key) + 1].state = DigitState.current;
          return false;
        } else {
          currentDigitLine[parseInt(key)].state = currentKeyState;
          return true;
        }
      }
    }
  }

  function refreshDigitsLines() {
    if (currentKeyIndex.value === 10) {
      if (isDigitsLineValid(digitsLines.value[LineState.current])) {
        const audio = new Audio("mario-coin.wav");
        audio.play();
      }

      digitsLines.value[LineState.current] = getRandomDigitsLine();
      digitsLines.value[LineState.current][0].state = DigitState.current;
      digitsLines.value[LineState.next] = getRandomDigitsLine();
      currentKeyIndex.value = 0;
    }
  }

  function isDigitsLineValid(line: Digit[]) {
    for (const key of line) {
      if (key.state === DigitState.failed) {
        return false;
      }
    }
    return true;
  }

  function getRandomDigitsLine() {
    const availableChars = [
      {
        code: "0",
        state: DigitState.next,
      },
      {
        code: "1",
        state: DigitState.next,
      },
      {
        code: "2",
        state: DigitState.next,
      },
      {
        code: "3",
        state: DigitState.next,
      },
      {
        code: "4",
        state: DigitState.next,
      },
      {
        code: "5",
        state: DigitState.next,
      },
      {
        code: "6",
        state: DigitState.next,
      },
      {
        code: "7",
        state: DigitState.next,
      },
      {
        code: "8",
        state: DigitState.next,
      },
      {
        code: "9",
        state: DigitState.next,
      },
      {
        code: "/",
        state: DigitState.next,
      },
      {
        code: "*",
        state: DigitState.next,
      },
      {
        code: "-",
        state: DigitState.next,
      },
      {
        code: "+",
        state: DigitState.next,
      },
      {
        code: [",", "."],
        state: DigitState.next,
      },
    ];
    return shuffle(availableChars).slice(0, 10);
  }

  function shuffle(array: Digit[]) {
    let currentIndex = array.length,
      randomIndex;

    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  return { digitsLines, setCurrentKeyState, refreshDigitsLines };
});
