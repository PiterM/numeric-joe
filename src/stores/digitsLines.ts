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

const availableDigits = [
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
];

const availableSigns = [
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
    code: [".", ","],
    state: DigitState.next,
  },
];

export const useDigitsLines = defineStore("digitsLines", () => {
  const currentDigitsMap = ref(getRandomLine());
  const nextDigitsMap = ref(getRandomLine());

  const currentKeyIndex = ref(0);
  currentDigitsMap.value.set(0, {
    ...currentDigitsMap.value.get(0),
    state: DigitState.current,
  });

  function setCurrentKeyState(keyCode: string): boolean {
    let result = true;

    currentDigitsMap.value.forEach((value, key) => {
      if (
        currentKeyIndex.value < 10 &&
        currentDigitsMap.value.get(currentKeyIndex.value).state ===
          DigitState.current
      ) {
        let currentKeyState = DigitState.failed;
        if (
          (currentDigitsMap.value.get(currentKeyIndex.value).code
            .constructor === Array &&
            currentDigitsMap.value
              .get(currentKeyIndex.value)
              .code.includes(keyCode)) ||
          currentDigitsMap.value.get(currentKeyIndex.value).code === keyCode
        ) {
          currentKeyState = DigitState.success;
        }

        currentDigitsMap.value.set(currentKeyIndex.value, {
          ...currentDigitsMap.value.get(currentKeyIndex.value),
          state: currentKeyState,
        });

        if (currentKeyIndex.value < 9) {
          currentDigitsMap.value.set(currentKeyIndex.value + 1, {
            ...currentDigitsMap.value.get(currentKeyIndex.value + 1),
            state: DigitState.current,
          });
          result = false;
        } else {
          currentDigitsMap.value.set(currentKeyIndex.value, {
            ...currentDigitsMap.value.get(currentKeyIndex.value),
            state: currentKeyState,
          });
        }
      }
    });

    currentKeyIndex.value =
      currentKeyIndex.value < 10 ? currentKeyIndex.value + 1 : 10;

    return result;
  }

  function refreshDigitsLines() {
    currentKeyIndex.value = 0;

    currentDigitsMap.value = new Map([]);
    nextDigitsMap.value.forEach((value, key) => {
      currentDigitsMap.value.set(key, value);
    });

    currentDigitsMap.value.set(0, {
      ...currentDigitsMap.value.get(0),
      state: DigitState.current,
    });

    nextDigitsMap.value = getRandomLine();
  }

  function refreshDigitsLinesWithSound() {
    if (isDigitsLineValid(currentDigitsMap.value)) {
      new Audio("mario-coin.wav").play();
    }
    refreshDigitsLines();
  }

  function isDigitsLineValid(line: any) {
    for (let [key, value] of line) {
      if (value.state === DigitState.failed) {
        return false;
      }
    }
    return true;
  }

  function getRandomLine() {
    let digits = [];
    let signs = [];
    let line = [];

    const onlyDigits = Boolean(Math.floor(Math.random() * 2));

    for (let i = 0; i < (onlyDigits ? 10 : 7); i++) {
      const digit = shuffle(availableDigits)[0];
      digits.push(digit);
    }

    if (onlyDigits) {
      signs = [];
    } else {
      for (let j = 0; j < 3; j++) {
        const sign = shuffle(availableSigns)[0];
        signs.push(sign);
      }
    }

    const lineMap = new Map();
    line = shuffle([...digits, ...signs]);
    for (let k = 0; k < 10; k++) {
      lineMap.set(k, line[k]);
    }

    return lineMap;
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

  return {
    currentDigitsMap,
    nextDigitsMap,
    setCurrentKeyState,
    refreshDigitsLines,
    refreshDigitsLinesWithSound,
  };
});
