<template>
	<NumberInputBox title="Etagen" v-model="numberFloors" />
</template>

<script setup lang="ts">
import NumberInputBox from './NumberInputBox.vue'

const numberFloors = defineModel({type: Number, default: 1})

</script>
