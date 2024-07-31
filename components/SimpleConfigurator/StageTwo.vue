<template>
	<div class="text-center">
		<p class="text-xl mb-3">Ausgewählte : {{ selectedProducts?.outdoorProducts?.SelectedQuantity }} / {{
			selectedProducts?.outdoorProducts?.neededQuantity }}</p>
		<button v-if="remainingOutdoorProducts == 0" @click="reset"
			class="mb-3 inline-flex w-15 h-15 rounded-full text-white focus:outline-none  hover:bg-arapawa-900">
			<RotateCcw class="w-6 h-6" />
		</button>
		<div v-if="pending">
			...loading
		</div>
		<ProductGrid v-else :currentStage="'Aussenstation'" :products="products" />
	</div>
</template>


<script setup>
import ProductGrid from './ProductGrid.vue'
import { RotateCcw } from 'lucide-vue-next';
import outdoorsStations from '@/data/aussenstationen.json'

//variables
const selectedProductsStore = useSelectedProductsStore();
const {selectedProducts, filter} = storeToRefs(selectedProductsStore)
console.log(filter.value)
const remainingIndoorProducts = computed(() => {
  return selectedProducts.value.indoorProducts.neededQuantity - selectedProducts.value.indoorProducts.SelectedQuantity
})
const productsFilter = {
  AnzhalTatsen: selectedProducts.value.indoorProducts.neededQuantity,
  funktion : filter.value.funktion == "Video" ? "Video-Außenstation" : "Audio-Außenstation",
}
if(filter.value.funktion == "Video")
productsFilter.technologie = filter.value.technologie

const products = outdoorsStations.data?.getProductListing.edges.filter(product =>{
  if(filter.value.funktion == "Video" &&  product.node.Kommunikationstechnologie4164 == productsFilter.technologie &&
   	product.node.AnzhalTatsen == productsFilter.AnzhalTatsen &&
	product.node.Geraeteart4077 ==  productsFilter.funktion )
  	return true
  else if (filter.value.funktion == "Audio" && product.node.AnzhalTatsen == productsFilter.AnzhalTatsen && product.node.Geraeteart4077 ==  productsFilter.funktion)
  	return true
})


// functions
function reset() {
	selectedProductsStore.resetOutdoorProducts();
}
</script>
