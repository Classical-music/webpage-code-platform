<script setup>
import MenuGroupPage from './MenuGroupPage.vue';
import MenuGroupRouter from './MenuGroupRouter.vue';

const compList = [
  MenuGroupPage,
  MenuGroupRouter,
]
</script>

<template>
  <div class="container">
    <component v-for="comp in compList" :is="comp"></component>
  </div>
</template>

<style scoped>
.container {
  border: 1px solid grey;
  background: rgb(241, 157, 62);
}

.item {
  background: rgb(169, 165, 165);
  padding: 12px 6px;
  box-sizing: border-box;
  border-top: 1px solid;
}
</style>