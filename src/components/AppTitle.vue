<script setup lang="ts">
defineProps<{
  msg: string;
}>();
</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <h3>Train your numeric keys skills<br />to get a coin from Mario Bros.</h3>
  </div>
</template>

<style scoped lang="sass">
h1
  font-weight: 500
  font-size: 2.6rem
  top: -10px

h3
  font-size: 1.2rem
</style>
