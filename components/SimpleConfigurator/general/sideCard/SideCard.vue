<template>
  <aside class="lg:block sm:w-3/4 lg:w-full">
    <Card class="overflow-hidden shadow-sm sm:rounded-lg sticky top-6">
      <div class="p-6 ">
        <h2 class="text-2xl font-semibold mb-4">Ihre Auswahl</h2>
        <ScrollArea class="flex-grow">
          <ul  class="space-y-4 p-4 max-h-[400px]">
            <SideCartProductGroup :selectedQuantity="selectedProducts.indoorProducts.SelectedQuantity" title="Innenstationen" :products="selectedProducts.indoorProducts.products"
              :max="selectedProducts.indoorProducts.neededQuantity"></SideCartProductGroup>
            <SideCartProductGroup :selectedQuantity="selectedProducts.outdoorProducts.SelectedQuantity" title="Aussenstationen" :products="selectedProducts.outdoorProducts.products"
              :max="selectedProducts.outdoorProducts.neededQuantity"></SideCartProductGroup>
            <SideCartProductGroup :selectedQuantity="selectedProducts.accessories.SelectedQuantity" title="Zubehör" :products="selectedProducts.accessories.products">
            </SideCartProductGroup>
            <SideCartProductGroup :selectedQuantity="selectedProducts.extensions.SelectedQuantity" title="Erweiterungen" :products="selectedProducts.extensions.products" />
          </ul>
        </ScrollArea>
        <Button :disabled="!canGo" v-if="currentStage === 'Zubehör'" class="ml-4 border border-white" @click="weiter"> weiter</Button>
      </div>
    </Card>
  </aside>
</template>

<script lang="ts" setup>
import SideCartProductGroup from './SideCartProductGroup.vue';


// Mock data for demonstration

const selectedProductsStore = useSelectedProductsStore();
const currentStageStore = useCurrentStageStore();
const visitedStore = useVisitedStore()
const { currentStage } = storeToRefs(currentStageStore)
const { selectedProducts, getRemainingIndoorNeeded, getRemainingOutdoorNeeded } = storeToRefs(selectedProductsStore)
const { getAllSelectedProducts } = selectedProductsStore

const gotoStage: Function = inject(`goToStage`)

const canGo = computed(() => {
  return (getRemainingIndoorNeeded.value == 0 && getRemainingOutdoorNeeded.value == 0)
})

function weiter() {
  if (getRemainingIndoorNeeded.value == 0 && getRemainingOutdoorNeeded.value == 0) {
    gotoStage("Übersicht")
    if (!visitedStore.visited.includes("Übersicht"))
      visitedStore.visited.push("Übersicht")
  }

}


</script>