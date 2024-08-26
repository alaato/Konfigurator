<template>
	<div class="text-center">
		<p class="text-xl mb-3">Ausgewählte : {{ selectedProducts?.outdoorProducts?.SelectedQuantity }} / {{
			selectedProducts?.outdoorProducts?.neededQuantity }}</p>
		<button v-if="remainingoutdoorProducts == 0" @click="reset"
			class="mb-3 inline-flex w-15 h-15 rounded-full text-white focus:outline-none  hover:bg-arapawa-900">
			<RotateCcw class="w-6 h-6" />
		</button>
		<div v-if="pending">
			...loading
		</div>
		<ProductGrid v-else :currentStage="'Aussenstation'" :products="products" />
		<p v-if="products.length == 0">Keine Aussenstation verfügbar. versuchen Sie eine mit {{selectedProducts?.indoorProducts?.SelectedQuantity + 1}} tasten anstatt</p>

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
const remainingoutdoorProducts = computed(() => {
  return selectedProducts.value.outdoorProducts.neededQuantity - selectedProducts.value.outdoorProducts.SelectedQuantity
})
console.log(remainingoutdoorProducts.value)
const productsFilter = {
  AnzhalTatsen: selectedProducts.value.indoorProducts.neededQuantity,
  funktion : filter.value.funktion == "Video" ? "Video-Außenstation" : "Audio-Außenstation",
}
if(filter.value.funktion == "Video")
productsFilter.technologie = filter.value.technologie

let products = outdoorsStations.data?.getProductListing.edges.filter(product =>{
  if(filter.value.funktion == "Video" &&  product.node.Kommunikationstechnologie4164 == productsFilter.technologie &&
   	product.node.AnzhalTatsen == productsFilter.AnzhalTatsen &&
	product.node.Geraeteart4077 ==  productsFilter.funktion )
  	return true
  else if (filter.value.funktion == "Audio" && product.node.AnzhalTatsen == productsFilter.AnzhalTatsen && product.node.Geraeteart4077 ==  productsFilter.funktion)
  	return true
})
if(products.length == 0)
products = outdoorsStations.data?.getProductListing.edges.filter(product =>{
  if(filter.value.funktion == "Video" &&  product.node.Kommunikationstechnologie4164 == productsFilter.technologie &&
   	product.node.AnzhalTatsen == productsFilter.AnzhalTatsen  + 1 &&
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
