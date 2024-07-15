<template>
  <div class="configurator">
    <h1>Sprechanlagen Konfigurator</h1>
    <SimpleConfiguratorStageTracker :visited="visited" :stages="stages" :currentStage="currentStage" @goToStage="goToStage">
    </SimpleConfiguratorStageTracker>
    <SideBar />
    <div class="main-section ">
      <div v-if="currentStage === 'Anforderungen'">
        <SimpleConfiguratorStageOne :stages="stages" @nextStage="goToStageTwo" />
      </div>
        <SimpleConfiguratorStageTwo v-if="currentStage === 'Aussenstation'"/>
      <div v-if="currentStage === 'Innenstation'">
        <SimpleConfiguratorStageThree :products="indoorProducts" :compatibleProducts="compatibleProducts"
          @next-stage="goToStageFour" />
      </div>
      <div v-if="currentStage === 'Übersicht'">
        <SimpleConfiguratorStageFour :selectedProducts="selectedProducts" />
      </div>
    </div>
  </div>
</template>

<script setup>

const stages = ref(["Anforderungen", "Aussenstation", "Innenstation", "Übersicht"]);
const currentStageStore = useCurrentStageStore();
const {currentStage} = storeToRefs(currentStageStore)

const goToStage = (targetStage) => {
  if (!stages.value.includes(targetStage)) {
    console.log("Invalid stage:", targetStage);
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
  margin: 10px 0;
}
</style>