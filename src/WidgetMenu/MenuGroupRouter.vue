<script setup>
import { useRouterMgrStore } from "@store/RouterMgrStore";
import { usePageMgrStore } from '@store/PageMgrStore';

let routerMgr = useRouterMgrStore()
let pageMgr = usePageMgrStore()

function addRouter() {
    routerMgr.addRouter()
}
function  delRouter() {
    
}
</script>

<template>
    <div class="body">
        <div class="title" @click="routerMgr.doExpand">
            <div>Router管理</div>
            <div>
                <button @click.stop="addRouter">新建</button>
                <button @click.stop="delRouter">删除</button>
            </div>
        </div>
        <div v-if="routerMgr.isExpand" style="padding-left: 16px;">
            <div v-for="item in routerMgr.subs" class="item">
                <input v-model="item.url" style="width: 80px">
                <select v-model="item.page">
                    <option v-for="item in pageMgr.subs" :value="item.name">{{ item.name }}</option>
                </select>
            </div>
        </div>
    </div>
</template>

<style scoped>
.body {
    background: grey;
    border-bottom: 1px solid greenyellow;
}
.title {
    display: flex;
    justify-content: space-between;
    cursor: pointer;
}
.item {
    cursor: pointer;
    display: flex;
    justify-content: space-between;
}
.item:hover {
    background: red;
}
.item:active {
    background: green;
}
</style>