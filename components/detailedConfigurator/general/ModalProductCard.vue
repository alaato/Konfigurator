<template>
  <div class="container mx-auto p-4">
    <Dialog v-model:open="isModalOpen">
      <DialogTrigger asChild>
        <Button @click="openModal">View Products</Button>
      </DialogTrigger>
      <DialogContent class="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>{{ selectedProduct ? selectedProduct.name : "Product Catalog" }}</DialogTitle>
        </DialogHeader>
        <div v-if="selectedProduct" class="mt-4">
          <Button variant="outline" size="sm" @click="handleBackToGrid" class="mb-4">
            <ChevronLeft class="mr-2 h-4 w-4" /> Back to Grid
          </Button>
          <div class="flex flex-col md:flex-row gap-4">
            <img :src="selectedProduct.image" :alt="selectedProduct.name" class="w-full md:w-1/2 h-64 object-cover rounded-md" />
            <div>
              <h2 class="text-xl font-semibold mb-2">{{ selectedProduct.name }}</h2>
              <p class="text-gray-600 mb-4">{{ selectedProduct.description }}</p>
              <p class="text-lg font-bold">${{ selectedProduct.price.toFixed(2) }}</p>
            </div>
          </div>
        </div>
        <div v-else class="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          <div
            v-for="product in products"
            :key="product.id"
            class="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform hover:scale-105"
            @click="handleProductClick(product)"
          >
            <img :src="product.image" :alt="product.name" class="w-full h-40 object-cover" />
            <div class="p-4">
              <h2 class="font-semibold text-sm mb-2">{{ product.name }}</h2>
              <p class="text-gray-600 text-xs">${{ product.price.toFixed(2) }}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ChevronLeft } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

// Define the structure of a product
type Product = {
  id: number
  name: string
  description: string
  price: number
  image: string
}

// Sample product data
const products: Product[] = [
  { id: 1, name: 'Elegant Watch', description: 'A stylish timepiece for any occasion', price: 199.99, image: '/placeholder.svg?height=200&width=200' },
  { id: 2, name: 'Leather Wallet', description: 'Genuine leather wallet with multiple compartments', price: 49.99, image: '/placeholder.svg?height=200&width=200' },
  { id: 3, name: 'Wireless Earbuds', description: 'High-quality sound with long battery life', price: 129.99, image: '/placeholder.svg?height=200&width=200' },
  { id: 4, name: 'Sunglasses', description: 'UV protection with a classic design', price: 79.99, image: '/placeholder.svg?height=200&width=200' },
  { id: 5, name: 'Backpack', description: 'Durable and spacious for everyday use', price: 89.99, image: '/placeholder.svg?height=200&width=200' },
  { id: 6, name: 'Sneakers', description: 'Comfortable and stylish for all-day wear', price: 109.99, image: '/placeholder.svg?height=200&width=200' },
]

const isModalOpen = ref(false)
const selectedProduct = ref<Product | null>(null)

const openModal = () => {
  isModalOpen.value = true
}

const handleProductClick = (product: Product) => {
  selectedProduct.value = product
}

const handleBackToGrid = () => {
  selectedProduct.value = null
}
</script>

<style scoped>
/* Add any specific styles if necessary */
</style>
