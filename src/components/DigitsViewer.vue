<template>
  <div class="digits-viewer">
    <div class="digits-viewer__title">
      <h3>Keys to press</h3>
      <hr />
    </div>
    <div class="digits-viewer__digits current-line">
      <span class="key success">1</span>
      <span class="key success">2</span>
      <span class="key failed">+</span>
      <span class="key current">8</span>
      <span class="key">9</span>
      <span class="key">4</span>
      <span class="key">.</span>
      <span class="key">6</span>
      <span class="key">/</span>
      <span class="key">7</span>
      <span class="key">&crarr;</span>
    </div>
    <div class="digits-viewer__digits">
      <span class="key">5</span>
      <span class="key">6</span>
      <span class="key">9</span>
      <span class="key">-</span>
      <span class="key">2</span>
      <span class="key">2</span>
      <span class="key">3</span>
      <span class="key">*</span>
      <span class="key">7</span>
      <span class="key">8</span>
      <span class="key">&crarr;</span>
    </div>
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
