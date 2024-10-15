<template>
	<ol class="tracker w-full max-w-[1560px] flex flex-wrap justify-center gap-2 px-1 mt-3 ">
		<li class="gap-1 stage-item flex flex-col items-center" v-for="stage in stages" :key="stage"
			:class="{ 'completed': completed(stage) }">
			<div
				class="button rounded-full flex justify-center items-center w-6 h-6 md:w-9 md:h-9 bg-white border-black border ">
				<button
					class="bg-arapawa-950 dark:bg-black disabled:bg-gray-500 rounded-full w-4 h-4 md:w-7 md:h-7 flex justify-center items-center"
					:disabled="!visited(stage) || (stage == 'Übersicht' && !allProductsSelected)"
					@click="$emit('goToStage', stage)">
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
const { selectedProducts } = storeToRefs(selectedProductsStore)
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
	width: 120px;
	flex: 1 1 0;
}


.stage-item::after {
	content: " ";
	position: relative;
	width: calc(75%);
	height: 2px;
	background-color: rgb(233, 233, 233);
	order: -3;
	z-index: -1;
	left: calc(52.5%);
	top: 35%;
}

.completed.stage-item::after {
	background-color: #040372;
}

.dark .stage-item::after {
	background-color: rgb(109, 109, 109);
}

.dark .completed.stage-item::after {
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

@media screen and (max-width: 576px) {
	.stage-item::after {
		width: 0;
	}

	.stage-item {
		font-size: 16px;
		width: 110px;
		flex: 0 0 auto;
	}

}
</style>
