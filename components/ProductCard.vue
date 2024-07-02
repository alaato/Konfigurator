<template>
  <div
    class="ProductCard gap-6 flex grow h-max w-max max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
    <a class="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl" href="#">
      <img class="object-cover" :src="product.cover.media.url" alt="product image" />
      <span
        class="Sale absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">39%
        OFF</span>
    </a>
    <div class="mt-4 px-5 pb-5">
      <a href="#">
        <h5 class="text-xl tracking-tight text-slate-950">{{ product.translated?.name }}</h5>
      </a>
      <div class="mt-2 mb-5 flex items-center justify-between">
        <p>
          <span
            class="text-3xl font-bold text-slate-950">${{ getFormattedPrice(product?.calculatedPrice?.unitPrice) }}</span>
        </p>
      </div>
      <h3 class="text-xl text-green-900">
        available - {{ product.availableStock }} - piece
      </h3>
      <slot></slot>
    </div>
  </div>
</template>


<script setup>
const { getFormattedPrice } = usePrice();
const props = defineProps(["product"]);
const { product } = props;
const { addProduct } = useCart();
async function addProductToCart() {
  await addProduct(product, 1)
}
</script>