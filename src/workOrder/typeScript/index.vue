<template>
    <div>{{ a }}</div>
    <div class="flex justify-start">{{ b }}</div>
    <div>{{ c }}</div>
    <button @click="_click">按钮</button>
</template>

<script setup>
import {ref,computed} from 'vue'
console.log('我提交了一次');

const a = ref('我在')
const b = ref('这里')
const c = computed(()=> {
    return '哈咯' + b.value
})


const _click = () => {
    b.value = '变化啦'
}
</script>