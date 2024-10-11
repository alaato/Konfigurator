<template>
	<TableRow v-for="product in products" :key="product.id">
		<ProductCells :no-price="noPrice" :quantity="product.quantity" :product="product" />
	</TableRow>
</template>

<script setup lang="ts">
import { TableCell, TableRow } from '@/components/ui/table';
import ProductCells from './ProductCells.vue'
const props = defineProps<{
	products: any[];
	noPrice?: boolean
}>()

</script>
