<template>
<NumberInputBox title="Wonungen pro Etage" v-model="numberApartments" />
</template>

<script setup lang="ts">
import NumberInputBox from  "./NumberInputBox.vue"
const numberApartments = defineModel({type: Number, default: 1})
</script>
