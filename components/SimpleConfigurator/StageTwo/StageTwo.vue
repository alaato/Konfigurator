<template>
	<ProductSelection :selectedProducts="selectedProducts.outdoorProducts" 
	@resetSelection="reset" :products="products"
	 v-model="remainingoutdoorProducts" />
</template>


<script setup>
//imports

import ProductSelection from '../general/ProductSelection.vue'
import outdoorsStations from '@/data/aussenstationen.json'

//consts
const selectedProductsStore = useSelectedProductsStore();
const { selectedProducts, filter } = storeToRefs(selectedProductsStore)
const remainingoutdoorProducts = computed(() => {
	return selectedProducts.value.outdoorProducts.neededQuantity - selectedProducts.value.outdoorProducts.SelectedQuantity
})
const productsFilter = {
	AnzhalTatsen: selectedProducts.value.indoorProducts.neededQuantity,
	funktion: filter.value.funktion == "Video" ? "Video-Außenstation" : "Audio-Außenstation",
}
if (filter.value.funktion == "Video")
	productsFilter.technologie = filter.value.technologie

let products = outdoorsStations?.edges.filter(product => {
	if (filter.value.funktion == "Video" && product.node.Kommunikationstechnologie4164 == productsFilter.technologie &&
		product.node.AnzhalTatsen == productsFilter.AnzhalTatsen &&
		product.node.Geraeteart4077 == productsFilter.funktion)
		return true
	else if (filter.value.funktion == "Audio" && product.node.AnzhalTatsen == productsFilter.AnzhalTatsen && product.node.Geraeteart4077 == productsFilter.funktion)
		return true
})

if (products.length == 0){
	products = outdoorsStations.data?.getProductListing.edges.filter(product => {
		if (filter.value.funktion == "Video" && product.node.Kommunikationstechnologie4164 == productsFilter.technologie &&
			product.node.AnzhalTatsen == productsFilter.AnzhalTatsen + 1 &&
			product.node.Geraeteart4077 == productsFilter.funktion)
			return true
		else if (filter.value.funktion == "Audio" && product.node.AnzhalTatsen == productsFilter.AnzhalTatsen && product.node.Geraeteart4077 == productsFilter.funktion)
			return true
	})
}

// functions
function reset() {
	selectedProductsStore.resetOutdoorProducts();
}
</script>
