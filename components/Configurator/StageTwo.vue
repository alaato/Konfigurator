<template>
  <div>
    <h2>Select a Product</h2>
    <ProductGrid :products="products.elements" :stage="'Innenstation'"/>
  </div>
</template>

<script setup>
import ProductGrid from './ProductGrid.vue'
const props = defineProps(['products'])
const {data:products} = await fetchProducts();
</script>
