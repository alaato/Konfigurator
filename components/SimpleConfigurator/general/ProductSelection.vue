<template>
	<div class= "flex flex-col relative items-center">
		<Card class="text-md sticky w-96 top-0 z-10 mb-3 p-2 flex justify-around items-center">
			<CardTitle>Ausgewählte : {{ selectedProducts.SelectedQuantity }} / {{
				selectedProducts?.neededQuantity }}
			</CardTitle>
			<SideCart />
		</Card>
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
const emit = defineEmits(['resetSelection'])
const props = defineProps<{
	selectedProducts: { neededQuantity: number; SelectedQuantity: number; products: any[] };
	products: ({ node: { id: string; MNR: string; Geraeteart4077: string; Kommunikationstechnologie4164: string; Audio1: boolean; Video2: any; IP1: boolean; TEXT: any; V2D: boolean; TCSBUS: boolean; PERIODE1: number; parent: { MNR: string; }; Audio: { features: { name: string; text: string; }[]; }[]; AnzhalTatsen: string; }; } | { node: { id: string; MNR: string; Geraeteart4077: string; Kommunikationstechnologie4164: string; Audio1: boolean; Video2: boolean; IP1: boolean; TEXT: any; V2D: boolean; TCSBUS: boolean; PERIODE1: number; parent: { MNR: string; }; Audio: { features: { name: string; text: string; }[]; }[]; AnzhalTatsen: any; }; } | { node: { id: string; MNR: string; Geraeteart4077: string; Kommunikationstechnologie4164: string; Audio1: boolean; Video2: boolean; IP1: boolean; TEXT: any; V2D: any; TCSBUS: boolean; PERIODE1: number; parent: { MNR: string; }; Audio: { features: { name: string; text: string; }[]; }[]; AnzhalTatsen: string; }; } | { node: { id: string; MNR: string; Geraeteart4077: string; Kommunikationstechnologie4164: string; Audio1: boolean; Video2: boolean; IP1: any; TEXT: any; V2D: boolean; TCSBUS: any; PERIODE1: number; parent: { MNR: string; }; Audio: { features: { name: string; text: string; }[]; }[]; AnzhalTatsen: string; }; } | { node: { id: string; MNR: string; Geraeteart4077: string; Kommunikationstechnologie4164: string; Audio1: any; Video2: any; IP1: any; TEXT: any; V2D: boolean; TCSBUS: boolean; PERIODE1: number; parent: { MNR: string; }; Audio: {}[]; AnzhalTatsen: string; }; } | { node: { id: string; MNR: string; Geraeteart4077: string; Kommunikationstechnologie4164: string; Audio1: boolean; Video2: boolean; IP1: boolean; TEXT: string; V2D: any; TCSBUS: boolean; PERIODE1: number; parent: { MNR: string; }; Audio: { features: { name: string; text: string; }[]; }[]; AnzhalTatsen: any; }; } | { node: { id: string; MNR: string; Geraeteart4077: string; Kommunikationstechnologie4164: string; Audio1: boolean; Video2: any; IP1: boolean; TEXT: string; V2D: boolean; TCSBUS: boolean; PERIODE1: number; parent: { MNR: string; }; Audio: { features: { name: string; text: string; }[]; }[]; AnzhalTatsen: any; }; })[];
}>()
const remainingProducts = defineModel<number>({ required: true })
</script>
