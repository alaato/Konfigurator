<template>
	<Card class="text-md sticky flex-grow w-full max-w-[1100px] top-0 z-10 mb-3 p-2 flex justify-around items-center">
		<CardTitle>{{ props.selectedProducts && ("Ausgewählte : " + props.selectedProducts.SelectedQuantity + " / " +
			props.selectedProducts?.neededQuantity) }}
		</CardTitle>
		<SideCart />
	</Card>
</template>

<script setup lang="ts">
import Card from '@/components/ui/card/Card.vue';
import SideCart from './SideCart.vue';
const props = defineProps<{
	selectedProducts?: { neededQuantity: number; SelectedQuantity: number; products: any[]}
}>()
</script>
