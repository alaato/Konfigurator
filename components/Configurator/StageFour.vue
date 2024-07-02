<template>
  <div>
    <h2>Selected Products</h2>
    <ul>
      <li>
        {{ selectedProducts.indoorProduct.name }} - {{ selectedProducts.indoorProduct.id }}
      </li>
      <li>
        {{ selectedProducts.outdoorProduct.name }} - {{ selectedProducts.outdoorProduct.id }}
      </li>
    </ul>
    <button>Add to Cart</button>
  </div>
</template>

<script setup>
onMounted(async() => {
  const { refreshCart } = useCart();

  await refreshCart();
})

const props = defineProps(['selectedProducts'])
</script>
