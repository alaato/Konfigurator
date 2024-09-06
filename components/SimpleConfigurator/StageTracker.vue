<template>
	<ol class="stage-tracker w-full max-w-[768px] flex gap-5 ">
		<li class="gap-1 stage-item flex flex-col items-center" v-for="stage in stages" :key="stage">
			<div class="button rounded-full flex justify-center items-center w-9 h-9 bg-white border ">
				<button
					class="bg-arapawa-950 dark:bg-black disabled:bg-gray-500 rounded-full w-8 h-8 flex justify-center items-center"
					:disabled="!visited(stage)" @click="$emit('goToStage', stage)">
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
let visited = (stage) => visitedStore.visited.includes(stage)
const completed = (stage) => visited(stage) && (visitedStore.visited.indexOf(props.currentStage) > visitedStore.visited.indexOf(stage))

</script>

<style>
.stage-item {
	position: relative;
	flex: 1 1 0;
	--size: 137px;
	--spacing: 0.5rem;
}


.stage-item::after {
	content: " ";
	position: relative;
	width: calc(100% - 20px);
	height: 2px;
	background-color: black;
	order: -1;
	left: calc(50% + 10px);
	top: 35%;
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
