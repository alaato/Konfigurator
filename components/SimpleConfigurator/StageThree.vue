<template>
  <div class="text-center relative top-0">
    <p class="text-xl mb-3 top-0 sticky">Ausgewählte : {{ selectedProducts.indoorProducts.SelectedQuantity }} / {{ selectedProducts.indoorProducts.neededQuantity }}</p>
    <button v-if="remainingIndoorProducts==0" @click="reset"
          class="mb-2 inline-flex w-15 h-15 rounded-full text-white focus:outline-none  hover:bg-arapawa-900">
          <RotateCcw class="w-6 h-6" />
        </button>
    <div v-if="loading">
      ...loading
    </div>
    <ProductGrid v-else :products="products" />
  </div>
</template>

<script setup>
//imports
import ProductGrid from './ProductGrid.vue'
import { RotateCcw } from 'lucide-vue-next';
import indoorStations from '@/data/innenestationen.json'
//variables
const selectedProductsStore = useSelectedProductsStore();
const {selectedProducts, filter} = storeToRefs(selectedProductsStore)
const remainingIndoorProducts = computed(() => {
  return selectedProducts.value.indoorProducts.neededQuantity - selectedProducts.value.indoorProducts.SelectedQuantity
})

const productsFilter = {
  technologie : filter.value.technologie,
  video: filter.value.Video
}
const products = indoorStations.data?.getProductListing.edges.filter(product =>{
  if(productsFilter.video && product.node.Video2 && product.node.PERIODE1)
    return true
  else if (!productsFilter.video&& !product.node.Video2 && product.node.PERIODE1)
    return true
})
console.log(products)
// functions
function reset(){
	selectedProductsStore.resetIndoorProducts();
}
</script>
