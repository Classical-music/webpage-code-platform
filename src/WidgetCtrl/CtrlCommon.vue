<script setup>
import { computed } from 'vue';
import CtrlPanel from '@WidgetCtrl/CtrlPanel.vue'
import CtrlLabel from '@WidgetCtrl/CtrlLabel.vue'
import CtrlImage from '@WidgetCtrl/CtrlImage.vue'
import CtrlButton from '@WidgetCtrl/CtrlButton.vue'


const props = defineProps({
    param: Object
})

const compDict = {
    Panel: CtrlPanel,
    Label: CtrlLabel,
    Image: CtrlImage,
    Button: CtrlButton,
}
const comp = computed(_ => {
    console.log(props.param?.type)
    return compDict[props.param?.type]
})

const commonStyle = computed(_ => {
    let rect = props.param?.rect
    return {
        width: rect.w + 'px',
        height: rect.h + 'px',
        left: rect.x + 'px',
        top: rect.y + 'px',
    }
})

</script>

<template>
    <component :is="comp" class="common" :style="commonStyle" :param="param"></component>
</template>

<style scoped>
.common {
    position: absolute;
}
</style>