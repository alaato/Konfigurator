<template>
  <div>
    <h2 class="text-2xl">Select a Product</h2>
    <div v-if="pending">
      loading.....
    </div>
    <!-- <ProductGrid v-else-if="!pending" :products="products.elements" :stage="'Innenstation'" /> -->
  </div>
</template>


<script setup>
import ProductGrid from './ProductGrid.vue'
const nuxt = useNuxtApp();
</script>
