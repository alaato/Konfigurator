<template>
	<div class="configurator">
		<StageTrackerMobile/>
		<StageTracker :current-stage="currentStage" :stages="stages" @goToStage="goToStage" />
		<div class="main-section">
			<StageOne v-if="currentStage === 'Anforderungen'" :stages="stages" />
			<OutdoorStage v-if="currentStage === 'Aussenstation'" />
			<IndoorStage v-if="currentStage === 'Innenstation'" />
			<Zubehör :goToStage="goToStage" v-if="currentStage === 'Zubehör'" :currentStage="currentStage" />
			<Overview v-if="currentStage === 'Übersicht'" />
		</div>
	</div>
</template>

<script setup>
import Overview from './Overview/Overview.vue';
import StageOne from './StageOne/StageOne.vue';
import IndoorStage from './StageThree/IndoorStage.vue';
import OutdoorStage from './StageTwo/OutdoorStage.vue';
import Zubehör from './Zubehör/Zubehör.vue'
import StageTracker from './general/stageTracker/StageTracker.vue';
import StageTrackerMobile from './general/stageTracker/stageTrackerMobile.vue';
const stages = ref(["Anforderungen", "Aussenstation", "Innenstation", "Zubehör", "Übersicht"]);
provide("stages", stages);
const currentStageStore = useCurrentStageStore();
const { currentStage } = storeToRefs(currentStageStore)

//functions
const goToStage = (targetStage) => {
	if (!stages.value.includes(targetStage)) {
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
	gap: 14px;
	justify-content: center;
	margin: 0 auto;
	padding: 16px 16px;
	box-sizing: content-box;
}
</style>
