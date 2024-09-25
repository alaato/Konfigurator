<template>
	<ol class="stage-tracker sm:w-[600px] lg::w-[768px] flex gap-5 ">
		<li class="gap-1 stage-item flex flex-col items-center" v-for="stage in stages" :key="stage">
			<div class="button rounded-full flex justify-center items-center w-10 h-10 bg-white border-black border-2 ">
				<button
					class="bg-arapawa-950 dark:bg-black  disabled:bg-gray-500 rounded-full w-8 h-8 flex justify-center items-center"
					:disabled="!visited(stage) || (stage == 'Übersicht' && !allProductsSelected)" @click="$emit('goToStage', stage)">
					<Dot v-if="!visited(stage)" />
					<Circle v-if="currentStage == stage" class="text-white" />
					<Check v-if="completed(stage)" color="white" />
				</button>
			</div>
			{{ stage }}
		</li>

	</ol>
</template>

<script setup>
//imports
import { Check, Circle, Dot } from 'lucide-vue-next'

const props = defineProps(["currentStage", "stages"]);
const visitedStore = useVisitedStore();
const selectedProductsStore = useSelectedProductsStore();
const {selectedProducts} = storeToRefs(selectedProductsStore)
const allProductsSelected = computed(() => {
	const allOutdoorSelected = selectedProducts.value.outdoorProducts.SelectedQuantity == selectedProducts.value.outdoorProducts.neededQuantity
	const allIndoorSelected = selectedProducts.value.indoorProducts.SelectedQuantity == selectedProducts.value.indoorProducts.neededQuantity

	return allOutdoorSelected && allIndoorSelected
})

let visited = (stage) => visitedStore.visited.includes(stage)
const completed = (stage) => visited(stage) && (visitedStore.visited.indexOf(props.currentStage) > visitedStore.visited.indexOf(stage))

</script>

<style>
.stage-item {
	position: relative;
	flex: 1 1 0;
	width: 120px;
}


.stage-item::after {
	content: " ";
	position: relative;
	width: calc(100%);
	height: 2px;
	background-color: rgb(233, 233, 233);
	order: -3;
	z-index: -1;
	left: calc(50% + 10px);
	top: 35%;
}

.dark .stage-item::after {
	background-color: white;
}

.stage-item:last-of-type::after {
	width: 0;
	height: 0;
}

.stage-item:disabled:hover,
.stage-item:disabled:focus,
.stage-item:disabled:focus-visible {
	cursor: default;
	border: solid 1px gray;
}
</style>
