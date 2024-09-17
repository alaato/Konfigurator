<template>
	<ProductsModal title="Aussenstation auswählen" text="Aussenstation auswählen">
		
		<OutdoorForm v-if="!showGrid" :funktion="funktion" :technologie="technologie"	:numberButtons="numberButtons"
		@handleSubmit="handleSubmit" />
		
		<div v-if="showGrid" class="relative">
			<FilterBar/>
			<ProductsGrid @resetSelection="resetSelection" :products="products" />
		</div>

	</ProductsModal>
</template>

<script lang="ts" setup>
import ProductsModal from '../general/ProductsModal.vue';
import OutdoorForm from './OutdoorForm.vue'
import outdoorStations from '@/data/aussenstationen.json'
import ProductsGrid from '../general/ProductGrid.vue';
import { ChevronLeft } from 'lucide-vue-next'
import FilterBar from '~/components/general/FilterBar.vue';

//consts
const numberButtons = defineModel("numberButtons", { default: 1 })
const funktion = defineModel<string>("funktion")
const technologie = defineModel<string>("technologie")
const showGrid = useState("showGrid", () => false)

//stores
const selectedProductsStore = useSelectedProductsStore();
const { selectedProducts, filter } = storeToRefs(selectedProductsStore)

// functions
function handleSubmit() {
	showGrid.value = true
	console.log(showGrid.value)
}
function resetSelection() {
	showGrid.value = false
}

interface FilterOptions {
	[key: string]: any
}
const productsFilter: FilterOptions = {
	AnzhalTatsen: selectedProducts.value.indoorProducts.neededQuantity,
	funktion: filter.value.funktion == "Video" ? "Video-Außenstation" : "Audio-Außenstation",
}
if (filter.value.funktion == "Video")
	productsFilter.technologie = filter.value.technologie
let products = outdoorStations?.filter(product => {
	if (filter.value.funktion == "Video" && product.Kommunikationstechnologie4164 == productsFilter.technologie &&
		product.AnzhalTatsen == productsFilter.AnzhalTatsen &&
		product.Geraeteart4077 == productsFilter.funktion)
		return true
	else if (filter.value.funktion == "Audio" && product.AnzhalTatsen == productsFilter.AnzhalTatsen && product.Geraeteart4077 == productsFilter.funktion)
		return true
})


</script>

<style></style>