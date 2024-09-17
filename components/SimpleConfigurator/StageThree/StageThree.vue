<template>
	<ProductSelection :selectedProducts="selectedProducts.indoorProducts" 
	@resetSelection="reset" :products="products"
	 v-model="remainingIndoorProducts"/>
</template>

<script setup>
//imports
import ProductSelection from '../general/ProductSelection.vue'
import indoorStations from '@/data/innenestationen.json'
//variables
const selectedProductsStore = useSelectedProductsStore();
const { selectedProducts, filter } = storeToRefs(selectedProductsStore)
const remainingIndoorProducts = computed(() => {
  return selectedProducts.value.indoorProducts.neededQuantity - selectedProducts.value.indoorProducts.SelectedQuantity
})

const productsFilter = {
  technologie: filter.value.technologie,
  video: filter.value.Video
}

const products = indoorStations.filter(product => {
  if (productsFilter.video && product.Video2 && product.Kommunikationstechnologie4164.includes(productsFilter.technologie))
    return true
  else if (!productsFilter.video && !product.Video2 && product.Kommunikationstechnologie4164.includes(productsFilter.technologie))
    return true
})
onMounted(() => {
  console.log(productsFilter)
})
// functions
function reset() {
  selectedProductsStore.resetIndoorProducts();
}
</script>
