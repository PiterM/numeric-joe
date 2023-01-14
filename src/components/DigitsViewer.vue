<script setup lang="ts">
import { ref } from "vue";
import { useKeyPressed } from "@/stores/keyPressed";
import { useDigitsLines, DigitState, LineState } from "@/stores/digitsLines";

const digitsStore = useDigitsLines();
const { digitsLines, setCurrentKeyState, refreshDigitsLines } = digitsStore;
const enterWaiting = ref(false);

(window as any).addEventListener("keypress", (e: any) => {
  if (e.key === "Enter" && enterWaiting.value === true) {
    enterWaiting.value = false;
    refreshDigitsLines();
    return;
  }

  const store = useKeyPressed();
  const { setKeyPressed } = store;
  setKeyPressed(e.key);
  if (setCurrentKeyState(e.key)) {
    enterWaiting.value = true;
  }
});
</script>

<template>
  <div class="digits-viewer">
    <div class="digits-viewer__title">
      <h3>Keys to press</h3>
      <hr />
    </div>
    <ul class="digits-viewer__digits current-line">
      <li
        v-for="key in digitsLines[LineState.current]"
        key="key"
        class="key"
        :class="{
          current: key.state === DigitState.current,
          success: key.state === DigitState.success,
          failed: key.state === DigitState.failed,
        }"
      >
        {{ key.code.constructor === Array ? key.code[0] : key.code }}
      </li>
      <li class="key" :class="{ current: enterWaiting }">&crarr;</li>
    </ul>
    <ul class="digits-viewer__digits">
      <li v-for="key in digitsLines[LineState.next]" class="key">
        {{ key.code.constructor === Array ? key.code[0] : key.code }}
      </li>
      <li class="key">&crarr;</li>
    </ul>
  </div>
</template>

<style scoped lang="sass">
.digits-viewer
  &__title
    font-size: 1.2rem
    font-weight: 500
    margin-bottom: 0.4rem
    color: var(--color-text)
    margin-bottom: 30px
  &__digits
    list-style-type: none
    padding: 0
    .key
      display: inline-block
      font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif
      border: 1px solid var(--color-border)
      background-color: var(--color-text)
      opacity: 0.6
      color: var(--color-digit-text)
      border-radius: 8px
      width: 50px
      height: 50px
      font-size: 2.5em
      text-align: center
      line-height: 48px
      margin: 0 5px 5px 0
      padding: 0

    .key.current
      background-color: var(--color-background-digit-current)
      animation: blinker 1s linear infinite
    .key.success
      background-color: var(--color-background-digit-success)
      opacity: 0.6
    .key.failed
      background-color: var(--color-background-digit-failed)
      opacity: 0.6
    &.current-line
      .key
        opacity: 1

@keyframes blinker
  50%
    opacity: 0
</style>
