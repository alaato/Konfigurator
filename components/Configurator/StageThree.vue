<template>
  <div>
    <h2>Select Compatible Product</h2>
    <ProductGrid :products="products.elements" :stage="'Übersicht'"/>
  </div>
</template>

<script setup>
import ProductGrid from './ProductGrid.vue'
const {data:products} = await fetchProducts();
</script>
