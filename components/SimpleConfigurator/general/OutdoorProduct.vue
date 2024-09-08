<template>
	<ProductCard :product="product" :productType="'Aussenstation'" @addProduct="addProduct"
		v-model:productQuantity="productQuantity"
		v-model:remainingOutdoorProducts="remainingOutdoorProducts" />
</template>

<script lang="ts" setup>
import ProductCard from './ProductCard.vue'
// variables
const props = defineProps(['product'])
const productQuantity = ref(0);

// stores
const currentStageStore = useCurrentStageStore();
const visitedStore = useVisitedStore();
const selectedProductsStore = useSelectedProductsStore();
const { selectedProducts, allSelectedProducts } = storeToRefs(selectedProductsStore)
const remainingOutdoorProducts = computed(() => {
	return selectedProducts.value.outdoorProducts.neededQuantity - selectedProducts.value.outdoorProducts.SelectedQuantity
})
//functions
const goToStage: Function = inject(`goToStage`)
function addProduct(product) {
	const isAddedProduct = selectedProducts.value.outdoorProducts.products.find((p) => p.MNR === product.MNR)
	if (isAddedProduct) {
		isAddedProduct.quantity += productQuantity.value
		selectedProducts.value.outdoorProducts.SelectedQuantity += productQuantity.value
		productQuantity.value = 0;
		console.log(isAddedProduct)
	}
	else if (!isAddedProduct && productQuantity.value > 0 && productQuantity.value <= remainingOutdoorProducts.value) {
		selectedProductsStore.addOneOutdoorProduct({ ...product, quantity: productQuantity.value });
		productQuantity.value = 0;
	}
	allSelectedProducts.value.push({ ...product, productQuantity })
	if (!visitedStore.visited.includes('Innenstation'))
		visitedStore.visited.push('Innenstation')
	if (remainingOutdoorProducts.value == 0)
		goToStage('Innenstation')
}
</script>

<style></style>