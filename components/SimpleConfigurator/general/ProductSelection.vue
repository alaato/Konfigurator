<template>
	<div class= "flex flex-col relative items-center">
		<SelectedProductsSideBarContainer :selectedProducts="selectedProducts" />
		<Button v-if="remainingProducts == 0" @click="$emit('resetSelection')"
			class="mb-3 inline-flex w-15 h-15 rounded-full text-white focus:outline-none  hover:bg-arapawa-900">
			<RotateCcw class="w-6 h-6" />
		</Button>
		<ProductGrid v-else :products="products" />
		<p v-if="products?.length == 0">Keine Aussenstation verfügbar. versuchen Sie eine mit
			{{ selectedProducts?.SelectedQuantity + 1 }} tasten anstatt</p>
	</div>
</template>

<script setup lang="ts">
import ProductGrid from '../general/ProductGrid.vue'
import { RotateCcw } from 'lucide-vue-next';
import SideCart from '../general/SideCart.vue';
import SelectedProductsSideBarContainer from './SelectedProductsSideBarContainer.vue'
import {type Product} from '@/utils/interfaces.js'
const emit = defineEmits(['resetSelection'])
const props = defineProps<{
	selectedProducts: { neededQuantity: number; SelectedQuantity: number; products: any[] };
	products: Product[];
}>()
const remainingProducts = defineModel<number>({ required: true })
</script>
