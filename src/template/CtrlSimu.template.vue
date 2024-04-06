<script setup>
import { computed, onMounted, reactive, toRaw } from 'vue';
import { compSimu } from '@Utils/CtrlMgr';

/**
 * 自定义控件可配置参数: 由 @Utils/CtrlMgrjs: create 函数生成
 */
const props = defineProps({
    param: Object
})

// 自定义控件内部参数
const pageData = reactive([/*{placeholder}*/])

onMounted(_ => {
    /**
     * addChild: 
     *   普通控件: 可在 usePageDataStore 直接向subs属性添加孩子
     *   自定义控件: 由于 subs 存在于 pageData 中, 只能对外开放 addChild 接口
     * 间接将 child 添加到 pageData.main.subs 中 
     */
    props.param.addChild = function(item) {
        pageData.main.subs.push(item)
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
        }
    })

    /**
     * getAttr:
     *   向外部提供借口, 供外部获取 pageData 用于保存自定义控件的配置信息
     */
    props.param.getAttr = _ => pageData
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