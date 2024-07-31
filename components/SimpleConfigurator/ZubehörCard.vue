<template>
  <div class="bg-background text-left rounded-lg shadow-sm bg-white overflow-hidden min-w-[360px] max-w-sm">
    <img src="public/2517.jpg" alt="Product Image" width="150" height="150" class="w-full h-64 object-scale-down border-b pb-2" />
    <div class="p-6 flex flex-col">
      <h3 class="text-xl font-bold mb-2 border-b pb-2"> Serie: {{ product?.parent?.MNR }}</h3>
      <h3 class=" MNR text-l font-bold mb-2 border-b pb-2">Article : {{product.MNR}}</h3>
      <p class="text-muted-foreground mb-4 border-b pb-2">{{ product.Geraeteart4077 }}</p>
      <p class=" mb-4 border-b pb-2 font-bold text-green-900">Erfordlich</p>
      <p>{{ product?.PERIODE1 }}€</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
// variables
const props = defineProps(['product'])
const currentStageStore = useCurrentStageStore();
const {currentStage} = storeToRefs(currentStageStore)
const visitedStore = useVisitedStore();
const selectedProductsStore = useSelectedProductsStore();
const {selectedProducts} = storeToRefs(selectedProductsStore)

const goToStage: Function = inject(`goToStage`)
//function
function addProduct(product) {
if (currentStage.value === "Aussenstation") {
  selectedProductsStore.addOneOutdoorProduct(product);
  console.log(selectedProducts.value.outdoorProducts.products)
  if (!visitedStore.visited.includes('Innenstation'))
  visitedStore.visited.push('Innenstation')
  goToStage('Innenstation')
}
}
</script>

<style></style>