<script setup>
import { usePageMenuStore } from '@store/PageMgrStore';
import { useRouterMgrStore } from '@store/RouterMgrStore';
import { computed } from 'vue';

let pageMenu = usePageMenuStore()
let routerMgr = useRouterMgrStore()

const props = defineProps({
    param: Object
})

function onClick() {
    let cb = props.param?.clickCb
    if (typeof cb === 'function') {
        cb(props.param)
    }
}
function onDel() {
    let cb = props.param?.delCb
    if (typeof cb === 'function') {
        cb(props.param)
    }
}

const selColor = computed(_ => {
    return props.param?.isSel ? 'green' : ''
})
</script>

<template>
    <div class="item">
        <div class="left" @click="onClick">
            <RouterLink :to="param.url">{{ param.url }}</RouterLink>
        </div>
        <select v-model="param.page" @change="routerMgr.saveRouter">
            <option v-for="item in pageMenu.pageList()" :value="item">{{ item }}</option>
        </select>
        <button v-if="param?.delCb" @click="onDel">删除</button>
    </div>
</template>

<style scoped>
.item {
    display: flex;
    justify-content: space-between;
}

.left {
    cursor: pointer;
    background: v-bind(selColor);
}
.left:hover {
    background: red;
}
button {
    width: 80px;
    height: 30px;
    cursor: pointer;
}
</style>@store/RouterMgrStore