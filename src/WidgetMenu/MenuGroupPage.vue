<script setup>
import { usePageDataStore } from '@store/PageDataStore';
import { usePageMgrStore } from '@store/PageMgrStore';
import { onMounted } from 'vue';

// 页面数据
let pageData = usePageDataStore()
// 页面管理
let pageMgr = usePageMgrStore()

function addPage() {
    // 生成初始化的页面数据
    pageData.resetPage()
    pageMgr.addPage(pageData.page)
}
function delPage(pname) {
    pageMgr.delSel(pname)
}
// 设置选中的Page
async function setSelPage(page) {
    pageMgr.setSel(page)
    let data = await pageMgr.readPage(page)
    pageData.resetPage(JSON.parse(data))
}
onMounted(_ => {
    pageMgr.readPageList()
})
</script>

<template>
    <div class="body">
        <div class="title" @click="pageMgr.doExpand">
            <div>Page管理</div>
        </div>
        <div v-if="pageMgr.isExpand" style="padding-left: 16px;">
            <button class="add-button" @click="addPage">新增</button>
            <div v-for="item in pageMgr.subs" class="row">
                <div @click="setSelPage(item)"
                    :style="{background: item.isSel ? 'green' : ''}"
                    class="item">{{ item.name }}</div>
                <button @click.stop="delPage(item.name)" style="cursor: pointer;">删除</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.body {
    background: grey;
    border-bottom: 1px solid greenyellow;;
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
button {
    width: 80px;
    height: 30px;
}
</style>