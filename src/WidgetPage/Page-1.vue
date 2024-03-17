<script setup>
import { computed } from 'vue';
import CtrlCommon from '@WidgetCtrl/CtrlCommon.vue';

const pageData = {
  "type": "Page",
  "name": "Page-1.json",
  "isSelect": true,
  "rect": {
    "x": 0,
    "y": 0,
    "w": 800,
    "h": 500
  },
  "subs": [
    {
      "type": "InputText",
      "name": "InputText-0",
      "isSelect": false,
      "rect": {
        "x": 0,
        "y": 0,
        "w": 150,
        "h": 30
      },
      "text": ""
    },
    {
      "type": "Button",
      "name": "Button-1",
      "isSelect": false,
      "rect": {
        "x": 217,
        "y": 200,
        "w": 100,
        "h": 30
      },
      "text": "button"
    },
    {
      "type": "Panel",
      "name": "Panel-2",
      "isSelect": false,
      "rect": {
        "x": 243,
        "y": 84,
        "w": 400,
        "h": 300
      },
      "subs": [
        {
          "type": "Button",
          "name": "Button-3",
          "isSelect": false,
          "rect": {
            "x": 0,
            "y": 45,
            "w": 100,
            "h": 30
          },
          "text": "button"
        }
      ]
    },
    {
      "type": "InputText",
      "name": "InputText-4",
      "isSelect": false,
      "rect": {
        "x": 0,
        "y": 0,
        "w": 150,
        "h": 30
      },
      "text": ""
    },
    {
      "type": "Button",
      "name": "Button-5",
      "isSelect": false,
      "rect": {
        "x": 108,
        "y": 297,
        "w": 100,
        "h": 30
      },
      "text": "button2"
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