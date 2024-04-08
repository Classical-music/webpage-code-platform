<script setup>
import { computed, onMounted, reactive, toRaw } from 'vue';
import { compSimu } from '@Utils/CtrlMgr';
import { useCtrlCustomStore } from '@store/CtrlCustomStore';

/**
 * 自定义控件可配置参数: 由 @Utils/CtrlMgrjs: create 函数生成
 */
const props = defineProps({
    param: Object
})

// 自定义控件内部参数
const pageData = reactive({
  "mainType": "Panel",
  "main": {
    "type": "Panel",
    "name": "Panel-0",
    "isSelect": false,
    "rect": {
      "x": 0,
      "y": 0,
      "w": 400,
      "h": 300
    },
    "subs": [
      {
        "type": "Label",
        "name": "Label-0",
        "isSelect": false,
        "rect": {
          "x": 260,
          "y": 69,
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
          "x": 0,
          "y": 0,
          "w": 50,
          "h": 50
        },
        "src": ""
      }
    ]
  },
  "type": "CtrlCus_0"
})

onMounted(_ => {
    /**
     * addChild: 
     *   普通控件: 可在 usePageDataStore 直接向subs属性添加孩子
     *   自定义控件: 由于 subs 存在于 pageData 中, 只能对外开放 addChild 接口
     * 间接将 child 添加到 pageData.main.subs 中 
     */
    props.param.addChild = function(item) {
        pageData.main.subs.push(item)
        saveCusCtrl()
    }

    /**
     * mainType:
     *   用于向外部提供借口, 供外部修改 mainType, 并实时生效
     */
    props.param.mainType = computed({
        get: _ => pageData.mainType,
        set: (val) => {
            pageData.mainType = val
            pageData.main.type = val
            saveCusCtrl()
        }
    })

    /**
     * saveCusCtrl:
     *   内部调用, 更新自定义控件属性时, 刷新该自定义控件
     */
    const saveCusCtrl = _ => {
        useCtrlCustomStore().saveCtrl(pageData)
    }
})

const main = computed(_ => {
    return pageData?.main
})

const getComp = computed(_ => {
  let type = pageData?.main?.type ?? 'Panel'
  return compSimu(type)
})

</script>

<template>
    <component :is="toRaw(getComp.value)" :param="main" />
</template>

<style scoped>
</style>