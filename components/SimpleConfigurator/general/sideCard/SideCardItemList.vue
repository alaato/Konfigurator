<template>
	<ul class="space-y-4 p-4 w-full max-h-[600px] lg:max-h-[400px] lg:h-[380px]">
		<SideCartProductGroup :selectedQuantity="selectedProducts.indoorProducts.SelectedQuantity"
			title="Innenstationen" :products="selectedProducts.indoorProducts.products"
			:max="selectedProducts.indoorProducts.neededQuantity"></SideCartProductGroup>
		<SideCartProductGroup :selectedQuantity="selectedProducts.outdoorProducts.SelectedQuantity"
			title="Aussenstationen" :products="selectedProducts.outdoorProducts.products"
			:max="selectedProducts.outdoorProducts.neededQuantity"></SideCartProductGroup>
		<SideCartProductGroup :selectedQuantity="selectedProducts.accessories.SelectedQuantity" title="Zubehör"
			:products="selectedProducts.accessories.products">
		</SideCartProductGroup>
		<SideCartProductGroup :selectedQuantity="selectedProducts.extensions.SelectedQuantity" title="Erweiterungen"
			:products="selectedProducts.extensions.products" />
	</ul>
</template>

<script setup lang="ts">
import SideCartProductGroup from './SideCartProductGroup.vue';

const selectedProductsStore = useSelectedProductsStore();
const { selectedProducts } = storeToRefs(selectedProductsStore)

</script>
