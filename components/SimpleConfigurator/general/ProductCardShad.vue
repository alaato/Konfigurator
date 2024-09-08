<template>
    <div class="bg-background text-left rounded-lg shadow-lg overflow-hidden min-w-[360px] max-w-sm">
      <img :src="`https://devpim.tcs-apps.de/admin/asset/get-image-thumbnail?id=${product?.FrontalAnsichtFrei?.id}&treepreview=1&_dc=1722247817`" alt="Product Image" width="150" height="150" class="w-full h-64 object-scale-down" />
      <div class="p-6 flex flex-col">
        <h3 class="text-xl font-bold mb-2"> Serie: {{ product?.parent?.MNR }}</h3>
        <h3 class=" MNR text-l font-bold mb-2">Article : {{product.MNR}}</h3>
        <p class="text-muted-foreground mb-4">{{ product.Geraeteart4077 }}</p>
        <Card class="">
          <CardHeader>
            <CardDescription>Wählen Sie aus, wie viele Etagen</CardDescription>
          </CardHeader>
          <CardContent >
            <NumberField :default-value="1" :min="1">
              <NumberFieldContent>
                <NumberFieldDecrement />
                <NumberFieldInput />
                <NumberFieldIncrement />
              </NumberFieldContent>
            </NumberField>
          </CardContent>
        </Card>
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