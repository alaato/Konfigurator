<template>
	<GeneralFilterBar/>
	<div
		class="flex flex-col-reverse items-center md:grid md:grid-cols-[1fr,350px] md:items-start max-w-[1400px] gap-3 py-3 ">
		
		<Button v-if="remainingProducts == 0" @click="$emit('resetSelection')"
			class="mb-3 inline-flex rounded-full text-white focus:outline-none  hover:bg-arapawa-900">
			<RotateCcw class="w-6 h-6" />
		</Button>
		<ProductGrid v-else :products="products" :packs="packs">
			<slot />
		</ProductGrid>
		<SideCard />
	</div>
</template>

<script setup lang="ts">
import ProductGrid from './ProductGrid.vue'
import { RotateCcw } from 'lucide-vue-next';
import SideCard from '../sideCard/SideCard.vue';
import { type DeviceData, type Pack, type Product } from '~/utils/interfaces/interfaces.js'
const emit = defineEmits(['resetSelection'])
const props = defineProps<{
	selectedProducts?: { neededQuantity: number; SelectedQuantity: number; products: any[] };
	products: DeviceData[];
	packs: Pack<DeviceData>[];
}>()
console.log(props.packs)
const remainingProducts = defineModel<number>()
</script>
