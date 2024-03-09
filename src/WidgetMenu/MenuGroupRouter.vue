<script setup>
import { useRouterMgrStore } from "@store/RouterMgrStore";
import { usePageMgrStore } from '@store/PageMgrStore';
import { onMounted } from "vue";

let routerMgr = useRouterMgrStore()
let pageMgr = usePageMgrStore()

function addRouter() {
    routerMgr.addRouter()
}
function  delRouter(url) {
    routerMgr.delRouter(url)
}
function saveRouter() {
    routerMgr.saveRouter()
}

onMounted(_ => {
    routerMgr.init()
})
</script>

<template>
    <div class="body">
        <div class="title" @click="routerMgr.doExpand">
            <div>Router管理</div>
        </div>
        <div v-if="routerMgr.isExpand" style="padding-left: 16px;">
            <button @click="addRouter">新增</button>
            <button @click="saveRouter">保存</button>
            <div v-for="item in routerMgr.subs" class="row">
                <input v-model="item.url" style="width: 80px">
                <select v-model="item.page">
                    <option v-for="item in pageMgr.subs" :value="item.name">{{ item.name }}</option>
                </select>
                <button @click.stop="delRouter(item.url)">删除</button>
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
.row {
    display: flex;
    justify-content: space-between;
}
.item {
    cursor: pointer;
}
.item:hover {
    background: red;
}
.item:active {
    background: green;
}
button {
    width: 80px;
    height: 30px;
}
select {
    width: 150px;
    height: 30px;
}
</style>