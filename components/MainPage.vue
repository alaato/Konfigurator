<template>
  <div class="configurator min-h-svh">
    <h1>Sprechanlagen Konfigurator</h1>
    <ConfiguratorStageTracker :visited="visited" :stages="stages" :currentStage="currentStage" @goToStage="goToStage">
    </ConfiguratorStageTracker>
    <div>
      <div v-if="currentStage === 'Anforderungen'">
        <ConfiguratorStageOne :stages="stages" @nextStage="goToStageTwo" />
      </div>
      <div v-if="currentStage === 'Ausenstation'">
        <ConfiguratorStageTwo :products="outdoorProducts" />
      </div>
      <div v-if="currentStage === 'Innenstation'">
        <ConfiguratorStageThree :products="indoorProducts" :compatibleProducts="compatibleProducts"
          @next-stage="goToStageFour" />
      </div>
      <div v-if="currentStage === 'Übersicht'">
        <ConfiguratorStageFour :selectedProducts="selectedProducts" />
      </div>
    </div>
  </div>
</template>

<script setup>

const stages = ref(["Anforderungen", "Ausenstation", "Innenstation", "Übersicht"]);
const currentStageStore = useCurrentStageStore();
const {currentStage} = storeToRefs(currentStageStore)
const outdoorProducts = ref([]);
const indoorProducts = ref([]);

const goToStageThree = async(product) => {
  selectedProducts.value.outdoorProduct = product;
  const {data:products} = await fetchProducts()
  indoorProducts.value = products.value.elements;
  console.log(selectedProducts.value.outdoorProduct);
  visited.value.push(stages.value[2])
  goToStage(stages.value[2]); // Transition to Stage Three
};

const goToStageFour = (product) => {
  selectedProducts.value.indoorProduct = product;
  console.log(selectedProducts.value)
  visited.value.push(stages.value[3])
  goToStage(stages.value[3])
};

const goToStage = (targetStage) => {
  // if (targetStage < 1 || targetStage > 4) {
  //   console.warn("Invalid stage:", targetStage);
  //   return;
  // }
  currentStage.value = targetStage;
}
provide("goToStage", goToStage);

onMounted(async() => {
  const { refreshCart } = useCart();

  await refreshCart();
})
</script>


<style>
.configurator {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 960px;
  gap: 16px;
  min-height: 100vh;
  justify-content: center;
  margin: 10px 0;
}
</style>