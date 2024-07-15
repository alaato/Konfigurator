<template>
    <div class="bg-background text-left rounded-lg shadow-lg overflow-hidden min-w-[360px] max-w-sm">
      <img src="public/2517.jpg" alt="Product Image" width="300" height="300" class="w-full h-64 object-scale-down" />
      <div class="p-6">
        <h3 class="text-xl font-bold mb-2"> Serie: {{ product?.parent?.MNR }}</h3>
        <h3 class=" MNR text-l font-bold mb-2">Article : {{product.MNR}}</h3>
        <p class="text-muted-foreground mb-4">{{ product.Geraeteart4077 }}</p>
        <Card class="grow w-96">
          <CardHeader>
            <CardDescription>Wählen Sie aus, wie viele Etagen</CardDescription>
          </CardHeader>
          <CardContent>
            <NumberField :default-value="0" :min="0" :max="remainingIndoorProducts">
              <NumberFieldContent>
                <NumberFieldDecrement />
                <NumberFieldInput />
                <NumberFieldIncrement />
              </NumberFieldContent>
            </NumberField>
          </CardContent>
        </Card>
        <div class="">
          <button @click="addProduct(product)">
            select
          </button>
        </div>
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
const remainingIndoorProducts = computed(() => {
  return selectedProducts.value.indoorProducts.neededQuantity - selectedProducts.value.indoorProducts.SelectedQuantity
})
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