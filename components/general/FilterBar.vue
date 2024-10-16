<template>
	<div class="w-full bg-inherit rounded-lg">
		<div class="flex flex-wrap justify-center gap-2 items-center mb-1">
			<div v-for="(options, category) in filters" :key="category" class="relative">
				<FilterBox :options="options" :category="category" v-if="showBox(category)" />
			</div>
			<slot />
		</div>
	</div>
</template>

<script lang="ts" setup>

import FilterBox from './FilterBox.vue'

const selectedProductsStore = useSelectedProductsStore();
const currentStageStore = useCurrentStageStore();
const visitedStore = useVisitedStore()
const { currentStage } = storeToRefs(currentStageStore)
const { getRemainingIndoorNeeded, getRemainingOutdoorNeeded, selectedProducts } = storeToRefs(selectedProductsStore)
const gotoStage: Function = inject(`goToStage`)
const array = Array(selectedProducts.value.indoorProducts.neededQuantity).fill(0).map((_, index) => (index + 1).toString());
const filters = {
	Color: ["white", "Black", "Silver"],
	Material: ["Kunststoff", "Aluminium"],
	"Anzahl Tasten": array
}
const canGo = computed(() => {
	return (getRemainingIndoorNeeded.value == 0 && getRemainingOutdoorNeeded.value == 0)
})
const showBox = (category) => {
	if(category == "Anzahl Tasten" && currentStage.value !== "Aussenstation")
		return false
	else return true
}
function weiter() {
	if (getRemainingIndoorNeeded.value == 0 && getRemainingOutdoorNeeded.value == 0) {
		gotoStage("Übersicht")
		if (!visitedStore.visited.includes("Übersicht"))
			visitedStore.visited.push("Übersicht")
	}
}

watchEffect(() => {
})
</script>

<style scoped>
</style>