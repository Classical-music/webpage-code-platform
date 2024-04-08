<script setup>
import { computed } from 'vue';
import CtrlCommon from '@WidgetCtrl/CtrlCommon.vue';

const pageData = {
  "type": "Page",
  "name": "Page-0",
  "isSelect": true,
  "rect": {
    "x": 0,
    "y": 0,
    "w": 800,
    "h": 500
  },
  "subs": [
    {
      "type": "CtrlCus_0",
      "name": "CtrlCus_0-0",
      "isSelect": false,
      "rect": {
        "x": 227,
        "y": 237,
        "w": 445,
        "h": 164
      },
      "mainType": "Panel"
    },
    {
      "type": "CtrlCus_0",
      "name": "CtrlCus_0-0",
      "isSelect": false,
      "rect": {
        "x": 90,
        "y": 36,
        "w": 501,
        "h": 159
      },
      "mainType": "Panel"
    }
  ]
}

const subs = computed(_ => {
    return pageData?.subs ?? []
})

</script>

<template>
    <div class="container-page">
        <CtrlCommon v-for="item in subs" :param="item"></CtrlCommon>
    </div>
</template>

<style scoped>
.container-page {
    border: 1px dashed grey;
    position: absolute;
    width: 100%;
    height: 100%;
}
</style>