<template>
	<button @click="$emit('click')" class="p-2 items-center justify-center flex w-10 h-10 text-white focus:outline-none  hover:bg-arapawa-900">
	          <CopyPlus />
	        </button>
</template>

<script lang="ts" setup >
import { CopyPlus } from 'lucide-vue-next';

const emit = defineEmits<{
	click: []
}>()

</script>
