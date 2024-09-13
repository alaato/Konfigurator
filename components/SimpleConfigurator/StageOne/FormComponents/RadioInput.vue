<template>
	<Button class="text-lg bg-transparent text-center text-black hover:text-white" as-child>
		<label
			class="w-full  m-0 p-1 peer-checked:bg-arapawa-950 dark:peer-checked:bg-white peer-checked:font-bold peer-checked:text-white dark:peer-checked:text-black"
			:for="text">
			{{ text }}
		</label>
	</Button>
</template>
<script setup lang="ts">
const props = defineProps<{
	text: string
}>()
</script>