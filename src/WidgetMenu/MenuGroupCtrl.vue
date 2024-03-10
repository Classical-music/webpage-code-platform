<script setup>

</script>

<template>
    <div class="body">
        <div class="title" @click="">控件管理</div>

        <div v-if="true" style="padding-left: 16px;">
            <div v-for="item in 10" class="row">
                <div @click=""
                    class="item">{{ item }}</div>
                <button @click.stop="" style="cursor: pointer;">删除</button>
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