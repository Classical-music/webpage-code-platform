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
function delPage() {
    pageMgr.delSel()
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
            <div>
                <button @click.stop="addPage">新建</button>
                <button @click.stop="delPage">删除</button>
            </div>
        </div>
        <div v-if="pageMgr.isExpand" style="padding-left: 16px;">
            <div v-for="item in pageMgr.subs"
                @click="setSelPage(item)"
                class="item" :style="{background: item.isSel ? 'green' : ''}">
                {{ item.name }}
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
.item {
    cursor: pointer;
}
.item:hover {
    background: red;
}
</style>