<template>
	<div class="w-full bg-inherit rounded-lg">
		<div class="flex flex-wrap justify-center gap-2 items-center mb-1">
			<h2 class="text-lg font-semibold mr-4">Filters:</h2>
			<div v-for="(options, category) in filters" :key="category" class="relative">
				<FilterBox :options="options" :category="category" />
			</div>
			<slot />
		</div>
	</div>
</template>

<script lang="ts" setup>

import FilterBox from './FilterBox.vue'
const array = Array(40).fill(0).map((_, index) => (index + 1).toString());
const filters = {
	Color: ["white", "Black", "Silver"],
	Material: ["Kunststoff", "Aluminium"],
	number: array
}
const selectedProductsStore = useSelectedProductsStore();
const currentStageStore = useCurrentStageStore();
const visitedStore = useVisitedStore()
const { currentStage } = storeToRefs(currentStageStore)
const { getRemainingIndoorNeeded, getRemainingOutdoorNeeded } = storeToRefs(selectedProductsStore)

const gotoStage: Function = inject(`goToStage`)

const canGo = computed(() => {
	return (getRemainingIndoorNeeded.value == 0 && getRemainingOutdoorNeeded.value == 0)
})

function weiter() {
	if (getRemainingIndoorNeeded.value == 0 && getRemainingOutdoorNeeded.value == 0) {
		gotoStage("Übersicht")
		if (!visitedStore.visited.includes("Übersicht"))
			visitedStore.visited.push("Übersicht")
	}
}

watchEffect(() => {
	console.log(filters)
})
</script>

<style scoped>
/* Add any additional component-specific styles here */
</style>