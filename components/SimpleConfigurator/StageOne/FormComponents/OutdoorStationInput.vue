<template>
	<NumberInputBox title="Aussenstationen" v-model="numberOutdoorStaions" :max="4"/>
</template>

<script setup lang="ts">
import NumberInputBox from './NumberInputBox.vue'
const numberOutdoorStaions = defineModel({ type: Number, default: 1 })
</script>
