<template>
	<div class= "grid grid-cols-1 justify-items-center  lg:grid-cols-[1fr,350px] max-w-[1400px] gap-3 py-3 mx-auto px-6 ">
		<Button  v-if="remainingProducts == 0" @click="$emit('resetSelection')"
			class="mb-3 inline-flex rounded-full text-white focus:outline-none  hover:bg-arapawa-900">
			<RotateCcw class="w-6 h-6" />
		</Button>
		<ProductGrid v-else :products="products">
			<slot/>
		</ProductGrid>
		<SideCard/>
	</div>
</template>

<script setup lang="ts">
import ProductGrid from './ProductGrid.vue'
import { RotateCcw } from 'lucide-vue-next';
import SideCard from '../sideCard/SideCard.vue';
import {type DeviceData, type Product} from '@/utils/interfaces.js'
const emit = defineEmits(['resetSelection'])
const props = defineProps<{
	selectedProducts?: { neededQuantity: number; SelectedQuantity: number; products: any[] };
	products: DeviceData[];
}>()
const remainingProducts = defineModel<number>()
</script>
