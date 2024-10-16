<template>

	<ProductSelection :selectedProducts="selectedProducts.outdoorProducts" @resetSelection="reset" :products="products"
		:packs="packs" v-model="remainingoutdoorProducts" />

	<p v-if="products?.length == 0 && packs?.length == 0">
		Keine Aussenstation verfügbar. versuchen Sie eine mit
		{{ selectedProducts?.indoorProducts?.neededQuantity + 1 }} tasten anstatt
		oder Kontaktieren Sie uns
		<a href="mailto:verkauf@tcsag.de" class="underline text-blue-600">verkauf@tcsag.de</a>
	</p>
</template>

<script lang="ts" setup>
//imports

import ProductSelection from "../general/productCards/ProductSelectionGrid.vue";
import { type DeviceData, type Pack } from "@/utils/interfaces"
import { FindOutdoorProducts, SetSearchFilters, findOutDoorProductsWithEtexensions, findPackNoextensions } from '@/utils/ConfiguratorUtils/fecthOutdoorProducts.js'
//consts
const selectedProductsStore = useSelectedProductsStore();
const filterStore = useFilterStore();
const { filter } = storeToRefs(filterStore);
const { setNeededExtensions } = selectedProductsStore
const { selectedProducts } = storeToRefs(selectedProductsStore);
const remainingoutdoorProducts = computed(() => {
	return (
		selectedProducts.value.outdoorProducts.neededQuantity -
		selectedProducts.value.outdoorProducts.SelectedQuantity
	);
});

const productsFilter = SetSearchFilters(filter);
const products = computed(() => {
	return FindOutdoorProducts(filter.value);
});

const packs = computed(() => {
	if (filter.value.anzahlTasten < 24 && filter.value.funktion == "Video" || filter.value.funktion == "beide") return findPackNoextensions();
	return filter.value.anzahlTasten >= 24 ? findOutDoorProductsWithEtexensions(filter.value) : [];
});
console.log(packs.value);
//functions


function reset() {
	selectedProductsStore.resetOutdoorProducts();
	selectedProductsStore.resetExtension();
}

</script>
