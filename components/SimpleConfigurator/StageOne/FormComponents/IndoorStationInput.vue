<template>
	<NumberInputBox title="Innenstationen" v-model="numberIndoorStaions" :max="40" />

</template>

<script setup lang="ts">
import NumberInputBox from './NumberInputBox.vue';


const numberIndoorStaions = defineModel({ type: Number, default: 1 })

</script>
