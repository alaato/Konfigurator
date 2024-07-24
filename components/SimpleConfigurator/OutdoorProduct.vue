<template>
  <div class="bg-background text-left rounded-lg shadow-lg overflow-hidden min-w-[360px] max-w-sm">
    <img src="public/2517.jpg" alt="Product Image" width="300" height="300" class="w-full h-64 object-scale-down" />
    <div class="p-6">
      <h3 class="text-xl font-bold mb-2"> Serie: {{ product?.parent?.MNR }}</h3>
      <h3 class=" MNR text-l font-bold mb-2">Article : {{product.MNR}}</h3>
      <p class="text-muted-foreground mb-4">{{ product.Geraeteart4077 }}</p>
      <div class="flex flex-col">
        <Card class="h-32">
        <CardHeader>
          <CardDescription>Wählen Sie aus, wie viele Innenstationen</CardDescription>
        </CardHeader>
        <CardContent>
          <NumberField   v-model="productQuantity" :default-value="0"  :min="0" :max="remainingOutdoorProducts">
            <NumberFieldContent class="h-10">
              <NumberFieldDecrement />
              <NumberFieldInput class="h-10"/>
              <NumberFieldIncrement />
            </NumberFieldContent>
          </NumberField>
        </CardContent>
      </Card>
        <button class=" disabled:bg-slate-500 my-2 justify-self-center" :disabled="remainingOutdoorProducts==0" @click="addProduct(product, productQuantity)">
          hinzufügen
        </button>
        <p v-if="productQuantity >remainingOutdoorProducts" class="text-red-900" > max : {{ remainingOutdoorProducts }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
// variables
const props = defineProps(['product'])
const productQuantity = ref(0);
const currentStageStore = useCurrentStageStore();
const {currentStage} = storeToRefs(currentStageStore)
const visitedStore = useVisitedStore();
const selectedProductsStore = useSelectedProductsStore();
const {selectedProducts} = storeToRefs(selectedProductsStore)
const remainingOutdoorProducts = computed(() => {
return selectedProducts.value.outdoorProducts.neededQuantity - selectedProducts.value.outdoorProducts.SelectedQuantity
})
const goToStage: Function = inject(`goToStage`)
//function
function addProduct(product, quantity) {
if (currentStage.value === "Aussenstation") {
  selectedProductsStore.addOutdoorProducts({...product, quantity: quantity}, quantity);
  if (!visitedStore.visited.includes('Innenstation'))
  visitedStore.visited.push('Innenstation')
  if(remainingOutdoorProducts.value == 0)
    goToStage('Innenstation')
}
}
</script>

<style></style>