<template>

	<ProductSelection :selectedProducts="selectedProducts.outdoorProducts" @resetSelection="reset" :products="products"
		v-model="remainingoutdoorProducts" />

	<p v-if="products?.length == 0">
		Keine Aussenstation verfügbar. versuchen Sie eine mit
		{{ selectedProducts?.indoorProducts?.neededQuantity + 1 }} tasten anstatt
		oder Kontaktieren Sie uns
		<a href="mailto:verkauf@tcsag.de" class="underline text-blue-600">verkauf@tcsag.de</a>
	</p>
</template>

<script lang="ts" setup>
//imports

import ProductSelection from "../general/productCards/ProductSelectionGrid.vue";
import { type Pack } from "@/utils/interfaces"
import { FindOutdoorProducts, SetSearchFilters, findOutDoorProductsWithEtexensions } from '@/utils/ConfiguratorUtils/fecthOutdoorProducts.js'
//consts
const selectedProductsStore = useSelectedProductsStore();
const { setNeededExtensions } = selectedProductsStore
const { selectedProducts, filter } = storeToRefs(selectedProductsStore);
const remainingoutdoorProducts = computed(() => {
	return (
		selectedProducts.value.outdoorProducts.neededQuantity -
		selectedProducts.value.outdoorProducts.SelectedQuantity
	);
});

const productsFilter = SetSearchFilters(selectedProducts, filter);
const products: DeviceData[] | Pack[] = parseInt(productsFilter.AnzhalTatsen) >= 24 ? findOutDoorProductsWithEtexensions(productsFilter) : FindOutdoorProducts(productsFilter, filter)

//functions


function reset() {
	selectedProductsStore.resetOutdoorProducts();
	selectedProductsStore.resetExtension();
}
</script>
