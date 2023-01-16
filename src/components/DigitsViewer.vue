<script setup lang="ts">
import { ref, computed } from "vue";
import { useDigitsLines, DigitState } from "@/stores/digitsLines";

const digitsStore = useDigitsLines();
const { setCurrentKeyState, refreshDigitsLines, refreshDigitsLinesWithSound } =
  digitsStore;

const currentDigitsMap = computed(() => digitsStore.currentDigitsMap);
const nextDigitsMap = computed(() => digitsStore.nextDigitsMap);

const enterWaiting = ref(false);

(window as any).addEventListener("keypress", (e: KeyboardEvent) => {
  if (e.key === "Enter" && enterWaiting.value === true) {
    enterWaiting.value = false;
    refreshDigitsLinesWithSound();
    return;
  }

  if (e.key === "q") {
    enterWaiting.value = false;
    refreshDigitsLines();
    return;
  }

  if (setCurrentKeyState(e.key)) {
    enterWaiting.value = true;
  }
});
</script>

<template>
  <div class="digits-viewer">
    <div class="digits-viewer__title">
      <h3>Keys to press (press Q to skip a line)</h3>
      <hr />
    </div>
    <ul class="digits-viewer__digits current-line">
      <li
        v-for="[key, value] in currentDigitsMap"
        key="key"
        class="key"
        :class="{
          current: value.state === DigitState.current,
          success: value.state === DigitState.success,
          failed: value.state === DigitState.failed,
        }"
      >
        {{ value.code.constructor === Array ? value.code[0] : value.code }}
      </li>
      <li class="key" :class="{ current: enterWaiting }">&crarr;</li>
    </ul>
    <ul class="digits-viewer__digits">
      <li v-for="[key, value] in nextDigitsMap" class="key">
        {{ value.code.constructor === Array ? value.code[0] : value.code }}
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
      font-family: Calibri, "Trebuchet MS", sans-serif
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
