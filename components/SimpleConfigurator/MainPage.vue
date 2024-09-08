<template>
	<div class="configurator">
		<StageTracker :current-stage="currentStage" :stages="stages" @goToStage="goToStage" />
		<div class="main-section w-full">
			<StageOne v-if="currentStage === 'Anforderungen'" :stages="stages" />
			<StageTwo v-if="currentStage === 'Aussenstation'" />
			<StageThree v-if="currentStage === 'Innenstation'" />
			<Zubehör :goToStage="goToStage" v-if="currentStage === 'Zubehör'" :currentStage="currentStage" />
			<StageFour v-if="currentStage === 'Übersicht'" />
		</div>
	</div>
</template>

<script setup>
import StageFour from './StageFour/StageFour.vue';
import StageOne from './StageOne/StageOne.vue';
import StageThree from './StageThree/StageThree.vue';
import StageTwo from './StageTwo/StageTwo.vue';
import Zubehör from './Zubehör/Zubehör.vue'
import SideCard from './general/SideCard.vue';
import StageTracker from './general/StageTracker.vue';
const stages = ref(["Anforderungen", "Aussenstation", "Innenstation", "Zubehör", "Übersicht"]);
const currentStageStore = useCurrentStageStore();
const { currentStage } = storeToRefs(currentStageStore)

//functions
const goToStage = (targetStage) => {
	if (!stages.value.includes(targetStage)) {
		console.log("Invalid stage:", targetStage);
		return;
	}
	currentStage.value = targetStage;
};
provide("goToStage", goToStage);
</script>

<style>
.configurator {
	display: flex;
	flex-direction: column;
	align-items: center;
	max-width: 1200px;
	gap: 16px;
	justify-content: center;
	margin: 16px auto;
}
</style>
