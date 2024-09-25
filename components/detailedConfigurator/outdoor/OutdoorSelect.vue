<template>
	<ProductsModal title="Aussenstation auswählen" text="Aussenstation auswählen">

		<OutdoorForm v-if="!showGrid" :funktion="funktion" :technologie="technologie" :numberButtons="numberButtons"
			@handleSubmit="handleSubmit" />

		<div v-if="showGrid" class="relative">
			<FilterBar />
			<ProductsGrid @resetSelection="resetSelection" :products="products" />
		</div>

	</ProductsModal>
</template>

<script lang="ts" setup>
import ProductsModal from '../general/ProductsModal.vue';
import OutdoorForm from './OutdoorForm.vue'
import outdoorStations from '@/data/aussenstationen.json'
import ProductsGrid from '../general/ProductGrid.vue';
import FilterBar from '~/components/general/FilterBar.vue';
import { type Station } from '~/utils/interfaces';
//consts
const props = defineProps<{
	outdoorStation: Station
}>()
const numberButtons = defineModel("numberButtons", { default: 1 })
const funktion = defineModel<string>("funktion")
const technologie = defineModel<string>("technologie")
const showGrid = useState("showGrid", () => false)

//stores
const selectedProductsStore = useSelectedProductsStore();
const { selectedProducts, filter } = storeToRefs(selectedProductsStore)

// functions

function FindOutdoorProducts(productsFilter) {
	let products = outdoorStations?.filter((product) => {
		if (
			filter.value.funktion == "Video" &&
			filter.value.technologie == "TCS:BUS" &&
			product.AnzhalTatsen > productsFilter.AnzhalTatsen &&
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
		} else if (
			filter.value.funktion == "Audio" &&
			product.AnzhalTatsen == productsFilter.AnzhalTatsen &&
			!product.Video2
		)
			return true;
		else if (
			filter.value.funktion == "Beide" &&
			product.AnzhalTatsen == productsFilter.AnzhalTatsen &&
			!product.Video2 &&
			product.Audio1
		)
			return true;
		else if (
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
function SetSearchFilters() {
	const productsFilter = {
		AnzhalTatsen: numberButtons.value.toString(),
		funktion:
			filter.value.funktion == "Video"
				? "Video-Außenstation"
				: filter.value.funktion == "Audio"
					? "Audio-Außenstation"
					: "",
		technologie: null
	};
	if (filter.value.funktion != "Audio")
		productsFilter.technologie = filter.value.technologie;
	return productsFilter;
}
let products;
function handleSubmit() {
	showGrid.value = true
	const productsFilter = SetSearchFilters()
	products = FindOutdoorProducts(productsFilter)
}
function resetSelection() {
	showGrid.value = false
}

console.log(products)

</script>

<style></style>