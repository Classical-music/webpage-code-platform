<script setup>
import { computed } from 'vue';
import CtrlCommon from '@WidgetCtrl/CtrlCommon.vue';

const pageData = {
  "type": "Page",
  "name": "Page-0.json",
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
      "name": "Panel-5",
      "isSelect": false,
      "rect": {
        "x": 212,
        "y": 67,
        "w": 400,
        "h": 300
      },
      "subs": [
        {
          "type": "Label",
          "name": "Label-6",
          "isSelect": false,
          "rect": {
            "x": 135,
            "y": 107,
            "w": 100,
            "h": 30
          },
          "text": "label"
        }
      ]
    },
    {
      "type": "Image",
      "name": "Image-7",
      "isSelect": false,
      "rect": {
        "x": 101,
        "y": 201,
        "w": 50,
        "h": 50
      },
      "src": "/public/favicon.ico"
    },
    {
      "type": "Button",
      "name": "Button-8",
      "isSelect": false,
      "rect": {
        "x": 628,
        "y": 211,
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