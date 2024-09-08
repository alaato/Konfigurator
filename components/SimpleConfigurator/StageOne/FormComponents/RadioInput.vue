<template>
	<Button class="text-md" as-child>
						<label
							class="w-full text-center text-lg peer-checked:bg-arapawa-950 dark:peer-checked:bg-white m-0 p-1 peer-checked:font-bold peer-checked:text-white dark:peer-checked:text-black"
							:for="text">
							{{text}}
						</label>
					</Button>
</template>
<script setup lang="ts">
const props = defineProps<{
	text: string
}>()
</script>