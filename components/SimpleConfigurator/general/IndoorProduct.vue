<template>
	<ProductCard :product="product" :productType="'Innenstation'" @addProduct="addProduct"
		v-model:productQuantity="productQuantity"
		v-model:remainingOutdoorProducts="remainingIndoorProducts" />
</template>

<script lang="ts" setup>
///imports
import ProductCard from './ProductCard.vue'

// variables
const props = defineProps(['product'])
const currentStageStore = useCurrentStageStore();
const { currentStage } = storeToRefs(currentStageStore)
const visitedStore = useVisitedStore();
const selectedProductsStore = useSelectedProductsStore();
const { selectedProducts, allSelectedProducts } = storeToRefs(selectedProductsStore)
const productQuantity = ref(0);
const remainingIndoorProducts = computed(() => {
	return selectedProducts.value.indoorProducts.neededQuantity - selectedProducts.value.indoorProducts.SelectedQuantity
})
const goToStage: Function = inject(`goToStage`)
//function
const addProduct = (product) => {
	const isAddedProduct = selectedProducts.value.indoorProducts.products.find((p) => p.MNR === product.MNR)
	if (isAddedProduct) {
		isAddedProduct.quantity += productQuantity.value
		selectedProducts.value.indoorProducts.SelectedQuantity += productQuantity.value
		productQuantity.value = 0;
	}
	if (!isAddedProduct && productQuantity.value > 0 && productQuantity.value <= remainingIndoorProducts.value) {
		selectedProducts.value.indoorProducts.products.push({ ...product, quantity: productQuantity.value })
		selectedProducts.value.indoorProducts.SelectedQuantity += productQuantity.value
		productQuantity.value = 0;
	}
	allSelectedProducts.value.push({ ...product, quantity: productQuantity.value })
	if (selectedProducts.value.indoorProducts.SelectedQuantity == selectedProducts.value.indoorProducts.neededQuantity) {
		goToStage("Zubehör")
		if (!visitedStore.visited.includes("Zubehör"))
			visitedStore.visited.push("Zubehör")
	}
}

</script>

<style></style>