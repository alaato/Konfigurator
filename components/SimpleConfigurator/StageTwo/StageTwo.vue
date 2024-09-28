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

<script setup>
//imports

import ProductSelection from "../general/ProductSelection.vue";
import outdoorsStations from "@/data/aussenstationen.json";

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

const productsFilter = SetSearchFilters();
const products = productsFilter.AnzhalTatsen >= 24 ? findOutDoorProductsWithEtexensions() : FindOutdoorProducts();

function FindOutdoorProducts() {
	let products = outdoorsStations?.filter((product) => {
		if (product.parent.MNR == "PET") return false
		if (
			product.AnzhalTatsen >= productsFilter.AnzhalTatsen &&
			product.MNR == "ASI12000-0000"
		)
			return true;
		if (
			filter.value.funktion == "Video" &&
			product.AnzhalTatsen == productsFilter.AnzhalTatsen &&
			product.Video2
		) {
			if (filter.value.technologie == "TCS:BUS" && product.TCSBUS) return true;
			else if (filter.value.technologie == "Video-2-Draht" && product.V2D)
				return true;
		}
		if (
			filter.value.funktion == "Audio" &&
			product.AnzhalTatsen == productsFilter.AnzhalTatsen &&
			!product.Video2
		)
			return true;
		if (
			filter.value.funktion == "Beide" &&
			product.AnzhalTatsen == productsFilter.AnzhalTatsen &&
			!product.Video2 &&
			product.Audio1
		)
			return true;
		if (
			filter.value.funktion == "Beide" &&
			product.AnzhalTatsen == productsFilter.AnzhalTatsen &&
			(product.Video2 || product.Audio1)
		)
			return true;
	}).sort((a, b) => {
		if (a.parent.MNR == "PES PRO") return -1
		if (a.Video2 && !b.Video2) return -1
		if (!a.Video2 && b.Video2) return 1
		if (a.Video2 && b.Video2) return 0
	})
	return products;
}
function findOutDoorProductsWithEtexensions() {
	const stations = ["PES PRO", "PES", "TCU"]
	let extension;
	let station;
	const products = []
	if (productsFilter.AnzhalTatsen > 20 && productsFilter.AnzhalTatsen <= 32) addProductsUpto48(12);
	if (productsFilter.AnzhalTatsen > 32 && productsFilter.AnzhalTatsen <= 48) addProductsUpto48(28);
	else if (productsFilter.AnzhalTatsen > 48 && productsFilter.AnzhalTatsen < 76) addProductsUpto132(1);
	else if (productsFilter.AnzhalTatsen >= 76 && productsFilter.AnzhalTatsen < 104) addProductsUpto132(2);
	else if (productsFilter.AnzhalTatsen > 104 && productsFilter.AnzhalTatsen < 132) addProductsUpto132(3);
	else if (productsFilter.AnzhalTatsen == 132) addProductsUpto132(28);

	return products

	function addProductsUpto48(extButtonNumber) {
		extension = outdoorsStations.find((product) => product.MNR == `PET${extButtonNumber}-EN/04`);
		const pesModel = productsFilter.AnzhalTatsen - extButtonNumber;
		const evenPesModel = pesModel + pesModel % 2
		station = outdoorsStations.find((product) => product.MNR.includes(`PES${evenPesModel}`));
		products.push(station, extension);
		setNeededExtensions(1)
	}
	function addProductsUpto132(PET28Quantity) {
		station = outdoorsStations.find((product) => product.MNR.includes(`PES20`));
		const PETModel = productsFilter.AnzhalTatsen - 20 - 28 * PET28Quantity;
		const evenPETModel = PETModel + PETModel % 2
		extension = outdoorsStations.find((product) => product.MNR.includes(`PET${evenPETModel}`));
		const PET28 = outdoorsStations.find((product) => product.MNR.includes("PET28"))
		if (PET28Quantity == 4) products.push(station, PET28)
		else products.push(station, extension, PET28);
		setNeededExtensions(PET28Quantity)
	}
}
function SetSearchFilters() {
	const productsFilter = {
		AnzhalTatsen: selectedProducts.value.indoorProducts.neededQuantity,
		funktion:
			filter.value.funktion == "Video"
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
