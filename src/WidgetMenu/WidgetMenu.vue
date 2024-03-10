<script setup>
import { toRaw } from 'vue';
import { useMenuStore } from '@store/MenuStore';

let menu = useMenuStore()

</script>

<template>
  <div class="container">
    <div v-for="item in menu.data">
      <component :is="toRaw(item).comp" :param="item" />
    </div>
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