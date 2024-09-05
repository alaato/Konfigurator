<template>
	<ProductsModal title="Aussenstation auswählen" trigger-text="Aussenstation auswählen">
    <OutdoorForm v-if="!showGrid" :funktion="funktion" :technologie="technologie" :numberButtons="numberButtons" @handleSubmit="handleSubmit" />
    <div v-if="showGrid" class="relative" >	
      <Button variant="outline" size="sm" @click="resetSelection" class=" mb-3 flex items-center">
            	<ChevronLeft class="mr-2 h-4 w-4" /> zurück
          	</Button>
			<ProductsGrid :products="products" />
			<pagination :handlePageChange="handlePageChange" v-model:currentPage="currentPage" v-model:totalPages="totalPages" />
    </div>
	</ProductsModal>
</template>

<script lang="ts" setup>
import ProductsModal from '../general/ProductsModal.vue';
import OutdoorForm from './OutdoorForm.vue'
import outdoorStations from '@/data/aussenstationen.json'
import ProductsGrid from '../general/ProductGrid.vue';
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
import pagination from './pagination.vue'

//consts
const numberButtons = defineModel("numberButtons", { default: 1 })
const funktion = defineModel<string>("funktion")
const technologie = defineModel<string>("technologie")
const showGrid = useState("showGrid", () => false)
const ITEMS_PER_PAGE = 9
const currentPage = useState("currentPage", () => 1)
//stores
const selectedProductsStore = useSelectedProductsStore();
const {selectedProducts, filter} = storeToRefs(selectedProductsStore)

// functions
function handleSubmit() {
	console.log("hi")
	showGrid.value = true
	console.log(showGrid.value)
}
function resetSelection() {
	showGrid.value = false
}
const handlePageChange = (newPage: number) => {
    currentPage.value = newPage
  }
interface FilterOptions {
	[key: string]: any
}
const productsFilter: FilterOptions = {
  AnzhalTatsen: selectedProducts.value.indoorProducts.neededQuantity,
  funktion : filter.value.funktion == "Video" ? "Video-Außenstation" : "Audio-Außenstation",
}
if(filter.value.funktion == "Video")
	productsFilter.technologie = filter.value.technologie
console.log(productsFilter, outdoorStations.edges)	
let products = outdoorStations?.edges.filter(product =>{
  if(filter.value.funktion == "Video" &&  product.node.Kommunikationstechnologie4164 == productsFilter.technologie &&
   	product.node.AnzhalTatsen == productsFilter.AnzhalTatsen &&
	product.node.Geraeteart4077 ==  productsFilter.funktion )
  	return true
  else if (filter.value.funktion == "Audio" && product.node.AnzhalTatsen == productsFilter.AnzhalTatsen && product.node.Geraeteart4077 ==  productsFilter.funktion)
  	return true
})
const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE)
const startIndex = (currentPage.value - 1) * ITEMS_PER_PAGE
const endIndex = startIndex + ITEMS_PER_PAGE
const currentProducts = products.slice(startIndex, endIndex)

</script>

<style></style>