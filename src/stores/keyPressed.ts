import { ref } from "vue";
import { defineStore } from "pinia";

export const useKeyPressed = defineStore("keyPressed", () => {
  const keyPressed = ref();
  function setKeyPressed(key: number) {
    keyPressed.value = key;
  }

  return { keyPressed, setKeyPressed };
});
