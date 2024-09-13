<template>
  <div class="container mx-auto p-4">
    <button @click="isModalOpen = true" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
      View Products
    </button>

    <Teleport to="body">
      <div v-if="isModalOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
        <div class="bg-white rounded-lg shadow-xl w-full max-w-[800px] h-[80vh] flex flex-col relative">
          <header class="p-4 border-b">
            <h2 class="text-xl font-semibold">{{ selectedProduct ? selectedProduct.name : 'Product Catalog' }}</h2>
          </header>

          <main class="flex-grow overflow-auto">
            <div v-if="selectedProduct" class="p-4">
              <button @click="handleBackToGrid" class="mb-4 px-3 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors flex items-center">
                <ChevronLeft class="w-4 h-4 mr-2" aria-hidden="true" />
                <span>Back to Grid</span>
              </button>
              <div class="flex flex-col md:flex-row gap-4">
                <img :src="selectedProduct.image" :alt="selectedProduct.name" class="w-full md:w-1/2 h-64 object-cover rounded-md" />
                <div>
                  <h3 class="text-xl font-semibold mb-2">{{ selectedProduct.name }}</h3>
                  <p class="text-gray-600 mb-4">{{ selectedProduct.description }}</p>
                  <p class="text-lg font-bold">${{ selectedProduct.price.toFixed(2) }}</p>
                </div>
              </div>
            </div>

            <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
              <article
                v-for="product in currentProducts"
                :key="product.id"
                @click="handleProductClick(product)"
                class="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform hover:scale-105 flex flex-col h-[300px]"
              >
                <div class="h-[200px] overflow-hidden">
                  <img :src="product.image" :alt="product.name" class="w-full h-full object-cover" />
                </div>
                <div class="p-4 flex flex-col justify-between flex-grow">
                  <h3 class="font-semibold text-sm mb-2 line-clamp-2">{{ product.name }}</h3>
                  <p class="text-gray-600 text-xs font-bold">${{ product.price.toFixed(2) }}</p>
                </div>
              </article>
            </div>
          </main>

          <footer v-if="!selectedProduct" class="flex justify-between items-center p-4 border-t">
            <button
              @click="handlePageChange(currentPage - 1)"
              :disabled="currentPage === 1"
              class="px-3 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              <ChevronLeft class="w-4 h-4 mr-2" aria-hidden="true" />
              <span>Previous</span>
            </button>
            <span class="text-sm text-gray-600">
              Page {{ currentPage }} of {{ totalPages }}
            </span>
            <button
              @click="handlePageChange(currentPage + 1)"
              :disabled="currentPage === totalPages"
              class="px-3 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              <span>Next</span>
              <ChevronRight class="w-4 h-4 ml-2" aria-hidden="true" />
            </button>
          </footer>

          <button 
            @click="isModalOpen = false" 
            class="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            aria-label="Close modal"
          >
            <XIcon class="w-6 h-6" aria-hidden="true" />
          </button>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { ChevronLeft, ChevronRight, XIcon } from 'lucide-vue-next'

interface Product {
  id: number
  name: string
  description: string
  price: number
  image: string
}

const generateProducts = (count: number): Product[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `Product ${i + 1}`,
    description: `This is a description for Product ${i + 1}. It's a high-quality item that you'll love.`,
    price: Math.round(Math.random() * 200 + 10),
    image: `/placeholder.svg?height=200&width=200&text=Product+${i + 1}`
  }))
}

const products = generateProducts(50)
const ITEMS_PER_PAGE = 9

const isModalOpen = ref(false)
const selectedProduct = ref<Product | null>(null)
const currentPage = ref(1)

const totalPages = computed(() => Math.ceil(products.length / ITEMS_PER_PAGE))
const currentProducts = computed(() => {
  const startIndex = (currentPage.value - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  return products.slice(startIndex, endIndex)
})

const handleProductClick = (product: Product) => {
  selectedProduct.value = product
}

const handleBackToGrid = () => {
  selectedProduct.value = null
}

const handlePageChange = (newPage: number) => {
  currentPage.value = newPage
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>