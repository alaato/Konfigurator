<template>
  <ProductCard productType="Zubehör" :product="product" @addProduct="addProduct"
    v-model:productQuantity="productQuantity" 
    :remainingProducts="remainingProducts" />
</template>

<script lang="ts" setup>
import { type DeviceData } from '@/utils/interfaces.js'

const props = defineProps<{
  product: DeviceData;
}>()
import ProductCard from "../general/productCards/ProductCard.vue"
const productQuantity = ref(0);
const prodcutStrore = useSelectedProductsStore()
const remainingProducts = ref(props.product.quantity)

const { addAccessories } = prodcutStrore
const { selectedProducts } = storeToRefs(prodcutStrore)

function addProduct(product) {
  const AddedProduct = selectedProducts.value.accessories.products.find((p) => p.MNR === product.MNR)
  
  if (AddedProduct) AddedProduct.quantity += productQuantity.value
  else addAccessories({ ...product, quantity: productQuantity.value })
  
  remainingProducts.value -= productQuantity.value
  selectedProducts.value.accessories.SelectedQuantity += productQuantity.value
  productQuantity.value = 0;
}
</script>

<style></style>