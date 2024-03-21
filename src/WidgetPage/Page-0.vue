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
      "type": "Panel",
      "name": "Panel-2",
      "isSelect": false,
      "rect": {
        "x": 347,
        "y": 189,
        "w": 360,
        "h": 232
      },
      "subs": [
        {
          "type": "Panel",
          "name": "Panel-3",
          "isSelect": false,
          "rect": {
            "x": 120,
            "y": 51,
            "w": 155,
            "h": 121
          },
          "subs": []
        }
      ]
    },
    {
      "type": "Label",
      "name": "Label-0",
      "isSelect": false,
      "rect": {
        "x": 163,
        "y": 283,
        "w": 100,
        "h": 30
      },
      "text": "label"
    },
    {
      "type": "Image",
      "name": "Image-1",
      "isSelect": false,
      "rect": {
        "x": 85,
        "y": 314,
        "w": 50,
        "h": 50
      },
      "src": ""
    },
    {
      "type": "Button",
      "name": "Button-2",
      "isSelect": false,
      "rect": {
        "x": 167,
        "y": 379,
        "w": 100,
        "h": 30
      },
      "text": "button"
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