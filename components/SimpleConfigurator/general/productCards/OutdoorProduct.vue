<template>
	<ProductCard :product="product" :productType="'Aussenstation'" @addProduct="addProduct"
		v-model:productQuantity="productQuantity" v-model:remainingProducts="remainingOutdoorProducts" />
</template>

<script lang="ts" setup>
import ProductCard from './ProductCard.vue'
// variables
const props = defineProps(['product'])
const productQuantity = ref(0);

// stores
const visitedStore = useVisitedStore();
const selectedProductsStore = useSelectedProductsStore();
const { selectedProducts } = storeToRefs(selectedProductsStore)
const remainingOutdoorProducts = computed(() => {
	return selectedProducts.value.outdoorProducts.neededQuantity - selectedProducts.value.outdoorProducts.SelectedQuantity
})
//functions
const goToStage: Function = inject(`goToStage`)
function addProduct(product) {
	const AddedProduct = selectedProducts.value.outdoorProducts.products.find((p) => p.MNR === product.MNR)
	if (AddedProduct) {
		AddedProduct.quantity += productQuantity.value
		selectedProducts.value.outdoorProducts.SelectedQuantity += productQuantity.value
		productQuantity.value = 0;
	}
	else if (!AddedProduct && productQuantity.value > 0 && productQuantity.value <= remainingOutdoorProducts.value) {
		selectedProductsStore.addOneOutdoorProduct({ ...product, quantity: productQuantity.value }, productQuantity.value);
		productQuantity.value = 0;
	}

	if (remainingOutdoorProducts.value == 0) {
		if (!visitedStore.visited.includes('Innenstation'))
			visitedStore.visited.push('Innenstation')
		goToStage('Innenstation')
	}

}
</script>

<style></style>