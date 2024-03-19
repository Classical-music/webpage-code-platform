<script setup>
import { computed } from 'vue';
import CtrlCommon from '@WidgetCtrl/CtrlCommon.vue';

const pageData = {
  "type": "Page",
  "name": "Page-0",
  "isSelect": false,
  "rect": {
    "x": 0,
    "y": 0,
    "w": 800,
    "h": 500
  },
  "subs": [
    {
      "type": "Panel",
      "name": "Panel-0",
      "isSelect": true,
      "rect": {
        "x": 152,
        "y": 56,
        "w": 400,
        "h": 300
      },
      "subs": []
    },
    {
      "type": "TableBase",
      "name": "TableBase-0",
      "isSelect": false,
      "rect": {
        "x": 0,
        "y": 0,
        "w": 150,
        "h": 300
      },
      "text": ""
    },
    {
      "type": "TreeBase",
      "name": "TreeBase-1",
      "isSelect": false,
      "rect": {
        "x": 0,
        "y": 0,
        "w": 150,
        "h": 300
      },
      "text": ""
    },
    {
      "type": "ListBase",
      "name": "ListBase-2",
      "isSelect": false,
      "rect": {
        "x": 0,
        "y": 0,
        "w": 150,
        "h": 300
      },
      "text": ""
    },
    {
      "type": "PopupBase",
      "name": "PopupBase-3",
      "isSelect": false,
      "rect": {
        "x": 0,
        "y": 0,
        "w": 480,
        "h": 320
      },
      "text": ""
    },
    {
      "type": "Dropdown",
      "name": "Dropdown-4",
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
      "type": "Radio",
      "name": "Radio-5",
      "isSelect": false,
      "rect": {
        "x": 0,
        "y": 0,
        "w": 16,
        "h": 16
      },
      "text": ""
    },
    {
      "type": "Check",
      "name": "Check-6",
      "isSelect": false,
      "rect": {
        "x": 0,
        "y": 0,
        "w": 16,
        "h": 16
      },
      "text": ""
    },
    {
      "type": "InputFile",
      "name": "InputFile-7",
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
      "type": "InputPasswd",
      "name": "InputPasswd-8",
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
      "type": "InputText",
      "name": "InputText-9",
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
      "name": "Button-10",
      "isSelect": false,
      "rect": {
        "x": 0,
        "y": 0,
        "w": 100,
        "h": 30
      },
      "text": "button"
    },
    {
      "type": "Image",
      "name": "Image-11",
      "isSelect": false,
      "rect": {
        "x": 0,
        "y": 0,
        "w": 50,
        "h": 50
      },
      "src": ""
    },
    {
      "type": "Label",
      "name": "Label-12",
      "isSelect": false,
      "rect": {
        "x": 0,
        "y": 0,
        "w": 100,
        "h": 30
      },
      "text": "label"
    },
    {
      "type": "Panel",
      "name": "Panel-13",
      "isSelect": true,
      "rect": {
        "x": 272,
        "y": 115,
        "w": 400,
        "h": 300
      },
      "subs": []
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