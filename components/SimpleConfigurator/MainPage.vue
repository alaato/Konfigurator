<template>
	<div class="configurator">
		<h1>Sprechanlagen Konfigurator</h1>
		<SimpleConfiguratorStageTracker :current-stage="currentStage" :stages="stages" @goToStage="goToStage" />
		<div class="main-section w-full">
			<SimpleConfiguratorStageOne v-if="currentStage === 'Anforderungen'" :stages="stages" />
			<SimpleConfiguratorStageTwo v-if="currentStage === 'Aussenstation'" />
			<SimpleConfiguratorStageThree v-if="currentStage === 'Innenstation'" />
			<Zubehör :goToStage="goToStage" v-if="currentStage === 'Zubehör'" :currentStage="currentStage" />
			<SimpleConfiguratorStageFour v-if="currentStage === 'Übersicht'" />
		</div>
	</div>
</template>

<script setup>
import Zubehör from '../SimpleConfigurator/Zubehör.vue'
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
