<template>
  <div class="configurator">
      <SimpleConfiguratorStageTracker :stages="stages"@goToStage="goToStage" />
      <SideCard/>
    <div class="main-section w-full">
      <SimpleConfiguratorStageOne v-if="currentStage === 'Anforderungen'" :stages="stages" />
      <SimpleConfiguratorStageTwo v-if="currentStage === 'Aussenstation'" />
      <SimpleConfiguratorStageThree v-if="currentStage === 'Innenstation'" />
      <Zubehör :goToStage="goToStage" v-if="currentStage === 'Zubehör'" :currentStage="currentStage" />
      <SimpleConfiguratorOverview v-if="currentStage === 'Übersicht'" />
    </div>
  </div>

</template>

<script setup>
import Zubehör from '../SimpleConfigurator/Zubehör.vue'
import SideCard from '../SimpleConfigurator/general/sideCard/SideCard.vue';
const stages = ref(["Anforderungen", "Aussenstation", "Innenstation", "Zubehör", "Übersicht"]);
const currentStageStore = useCurrentStageStore();
const { currentStage } = storeToRefs(currentStageStore)
const trackerRef = ref()
//functions
const goToStage = (targetStage) => {
  if (!stages.value.includes(targetStage)) {
    return;
  }
  currentStage.value = targetStage;
}
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