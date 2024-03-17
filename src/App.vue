<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
    <RouterView />
    <div style="bottom: 20px; left: 10px; position: absolute; z-index: 20;">
        <button>
            <RouterLink to="/editor">editor</RouterLink>
        </button>
    </div>
</template>

<style scoped>
</style>