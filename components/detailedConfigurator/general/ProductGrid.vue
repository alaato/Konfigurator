<template>
  <div class="mx-auto px-3 h-3/4 max-h-[600px] overflow-y-auto">
        <div v-if="selectedProduct" class="mt-3">
          <Button variant="outline" size="sm" @click="handleBackToGrid" class="mb-4">
            <ChevronLeft class="mr-2 h-4 w-4" /> Back to Grid
          </Button>
          <div class="flex flex-col md:flex-row gap-4">
            <div>

            </div>
          </div>
        </div>
        <div v-else class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-3">
          <ProductGridCard v-for="product in products" :product="product" :handleProductClick="handleProductClick" />
        </div>
  </div>
</template>

<script lang="ts" setup>
//imports
import { ref } from 'vue'
import { ChevronLeft } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import ProductGridCard from './ProductGridCard.vue'

//consts
const selectedProduct = ref(null)
const props = defineProps(['products'])
console.log(props.products)
//functions


const handleProductClick = (product) => {
  selectedProduct.value = product
}

const handleBackToGrid = () => {
  selectedProduct.value = null
}
</script>

<style scoped>
/* Add any specific styles if necessary */
</style>
