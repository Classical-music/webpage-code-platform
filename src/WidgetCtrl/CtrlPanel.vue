<script setup>
import { computed } from 'vue';
import CtrlCommon from './CtrlCommon.vue';


const props = defineProps({
    param: Object
})

const subs = computed(_ => {
    return props.param?.subs ?? []
})

</script>

<template>
    <div class="container">
        <div v-for="item in subs">
            <CtrlCommon :param="item"></CtrlCommon>
        </div>
    </div>
</template>

<style scoped>
.container {
    border: 1px solid grey;
}
</style>