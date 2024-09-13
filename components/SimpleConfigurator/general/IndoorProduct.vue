<template>
	<ProductCard :product="product" :productType="'Innenstation'" @addProduct="addProduct"
		v-model:productQuantity="productQuantity"
		v-model:remainingProducts="remainingIndoorProducts" />
</template>

<script lang="ts" setup>
//imports
import ProductCard from './ProductCard.vue'

//stores
const visitedStore = useVisitedStore();
const selectedProductsStore = useSelectedProductsStore();
const { selectedProducts } = storeToRefs(selectedProductsStore)

// consts
const props = defineProps(['product'])
const productQuantity = ref(0);
const remainingIndoorProducts = computed<number>(() => {
	const remainingIndoorProducts : number = selectedProducts.value.indoorProducts.neededQuantity - selectedProducts.value.indoorProducts.SelectedQuantity
	return remainingIndoorProducts
})

const goToStage: Function = inject(`goToStage`)
//function
const addProduct = (product) => {
	const AddedProduct = selectedProducts.value.indoorProducts.products.find((p) => p.MNR === product.MNR)
	if (AddedProduct) {
		AddedProduct.quantity += productQuantity.value
		selectedProducts.value.indoorProducts.SelectedQuantity += productQuantity.value
		productQuantity.value = 0;
	}
	if (!AddedProduct && productQuantity.value > 0 && productQuantity.value <= remainingIndoorProducts.value) {
		selectedProducts.value.indoorProducts.products.push({ ...product, quantity: productQuantity.value })
		selectedProducts.value.indoorProducts.SelectedQuantity += productQuantity.value
		productQuantity.value = 0;
	}
	if (selectedProducts.value.indoorProducts.SelectedQuantity == selectedProducts.value.indoorProducts.neededQuantity) {
		goToStage("Zubehör")
		if (!visitedStore.visited.includes("Zubehör"))
			visitedStore.visited.push("Zubehör")
	}
}

</script>

<style></style>