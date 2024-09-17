<template>
	<ProductSelection :selectedProducts="selectedProducts.outdoorProducts" @resetSelection="reset" :products="products"
		v-model="remainingoutdoorProducts" />
</template>

<script setup>
//imports

import ProductSelection from "../general/ProductSelection.vue";
import outdoorsStations from "@/data/aussenstationen.json";

//consts
const selectedProductsStore = useSelectedProductsStore();
const { selectedProducts, filter } = storeToRefs(selectedProductsStore);
const remainingoutdoorProducts = computed(() => {
	return (
		selectedProducts.value.outdoorProducts.neededQuantity -
		selectedProducts.value.outdoorProducts.SelectedQuantity
	);
});

const productsFilter = SetSearchFilters();
const products = FindOutdoorProducts();

function FindOutdoorProducts() {
	let products = outdoorsStations?.filter((product) => {
		if (filter.value.funktion == "Video" &&
			product.Kommunikationstechnologie4164 == productsFilter.technologie &&
			product.AnzhalTatsen == productsFilter.AnzhalTatsen &&
			product.Geraeteart4077 == productsFilter.funktion)
			return true;
		else if (filter.value.funktion == "Audio" &&
			product.AnzhalTatsen == productsFilter.AnzhalTatsen &&
			product.Geraeteart4077 == productsFilter.funktion)
			return true;
		else if (filter.value.funktion == "beide" &&
			product.AnzhalTatsen == productsFilter.AnzhalTatsen &&
			product.Kommunikationstechnologie4164 == productsFilter.technologie &&
			(product.Geraeteart4077 == "Audio-Außenstation" || product.Geraeteart4077 == "Video-Außenstation")
		)
			return true;
	});
	return products;
}
function SetSearchFilters() {
	const productsFilter = {
		AnzhalTatsen: selectedProducts.value.indoorProducts.neededQuantity,
		funktion: filter.value.funktion == "Video"
			? "Video-Außenstation"
			: filter.value.funktion == "Audio"
				? "Audio-Außenstation"
				: "",
	};
	if (filter.value.funktion != "Audio")
		productsFilter.technologie = filter.value.technologie;
	return productsFilter;
}

// functions
function reset() {
	selectedProductsStore.resetOutdoorProducts();
}
</script>
