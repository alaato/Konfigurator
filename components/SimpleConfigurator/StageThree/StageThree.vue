<template>
	<ProductSelection :selectedProducts="selectedProducts.indoorProducts" @resetSelection="reset" :products="products"
		v-model="remainingIndoorProducts" />
</template>

<script setup>
//imports
import ProductSelection from '../general/productCards/ProductSelectionGrid.vue'
import indoorStations from '@/data/innenestationen.json'
//variables
const selectedProductsStore = useSelectedProductsStore();
const filterStore = useFilterStore();
const { filter } = storeToRefs(filterStore);
const { selectedProducts } = storeToRefs(selectedProductsStore)
const remainingIndoorProducts = computed(() => {
	return selectedProducts.value.indoorProducts.neededQuantity - selectedProducts.value.indoorProducts.SelectedQuantity
})
const productsFilter = {
	technologie: filter.value.technologie,
	video: filter.value.Video,
	Audio: filter.value.Audio
}
function thereIsVideoOutdoor() {
	if(selectedProducts.value.outdoorProducts.products.some(product => product.Video2)) return true
	else return false
}

const products = indoorStations.filter(product => {
	if (product.parent.MNR == "Innenstation TCS:BUS" || product.parent.MNR == "Innenstation V2D") return false
	if (thereIsVideoOutdoor() && product.Video2 && filter.value.technologie == "TCS:BUS" && product.TCSBUS)
		return true
	else if (thereIsVideoOutdoor() && product.Video2 && filter.value.technologie == "Video-2-Draht" && product.V2D)
		return true
	else if (productsFilter.Audio && product.Audio1 && !product.Video2)
		return true
}).sort((a, b) => {
	if (a.Video2 && !b.Video2) return -1
	if (!a.Video2 && b.Video2) return 1
	if (a.Video2 && b.Video2) return 0

})
onMounted(() => {
})
// functions
function reset() {
	selectedProductsStore.resetIndoorProducts();
}
</script>
