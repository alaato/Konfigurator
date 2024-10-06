<template>
  <div class="mx-auto px-3 h-[50vh] overflow-y-auto">
    <Button variant="outline" size="sm" @click="handleBackButton" class=" mb-3 flex items-center">
				<ChevronLeft class="mr-2 h-4 w-4" /> zurück
			</Button>
        <div v-if="selectedProduct" class="mt-3">
          <ProductInformation :product="selectedProduct"/>
        </div>
        <div v-else class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-3">
          <ProductGridCard v-for="product in currentProducts" :product="product" @handleProductClick="handleProductClick" />
        </div>
  </div>
  <pagination v-if="!selectedProduct" :handlePageChange="handlePageChange" v-model:currentPage="currentPage"
  v-model:totalPages="totalPages" />
</template>

<script lang="ts" setup>
//imports
import { ref } from 'vue'
import { ChevronLeft } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import ProductGridCard from './ProductGridCard.vue'
import pagination from './pagination.vue'
import ProductInformation from '../../general/ProductInformation.vue'

//consts
const emit = defineEmits(['resetSelection'])
const selectedProduct = ref(null)
const props = defineProps(['products'])
const ITEMS_PER_PAGE = 9
const currentPage = useState("currentPage", () => 1)
const totalPages = Math.ceil(props.products.length / ITEMS_PER_PAGE) + 1
const startIndex = (currentPage.value - 1) * ITEMS_PER_PAGE
const endIndex = startIndex + ITEMS_PER_PAGE
const currentProducts = props.products.slice(startIndex, endIndex)
//functions

const handlePageChange = (newPage: number) => {
	currentPage.value = newPage
}
const handleProductClick = (product) => {
  selectedProduct.value = product
}

const handleBackButton = () => {
  if(selectedProduct.value) {
    selectedProduct.value = null
  }
  else {
    emit('resetSelection')
  }
}
</script>

<style scoped>
/* Add any specific styles if necessary */
</style>
