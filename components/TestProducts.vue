<template>
  <div class="h-dvh">
    <ol class="flex gap-y-6 flex-wrap justify-center">
      <li v-for="product in products.elements">
        <ProductCard :product="product" />
      </li>
    </ol>
  </div>
</template>

<script setup>
const {search} = useProductSearchListing();

const {data:products} = await fetchProducts()
</script>

<style></style>