<template>
	<Card :key="product.id"
		class="p-3 w-50 lg:w-60 bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform hover:scale-105">
		<button @click="$emit('handleProductClick', product)">
			<InfoIcon class="w-5 h-5 cursor-pointer transition-transform hover:scale-110" />
		</button>
		<img :src="imgsrc" class="w-full h-40 object-cover" />
		<h3 class="text-xl border-b pb-2 font-bold my-2"> Serie: {{ product.parent?.MNR }}</h3>
		<h3 class=" MNR text-l font-bold mb-2">Article : {{ product.MNR }}</h3>
		<p class="text-muted-foreground mb-2">{{ product.Geraeteart4077 }}</p>
		<p class=" mb-2 font-bold">Preis: {{ product.PERIODE1 }}€</p>
	</Card>
</template>

<script setup lang="ts">
import { InfoIcon } from 'lucide-vue-next'
const emit = defineEmits(['handleProductClick'])
const props = defineProps<{
	product: any;
}>()
const imgsrc = props.product?.FrontalAnsichtFrei?.assetThumb ? `https://pim.tcsapps.de${props.product.FrontalAnsichtFrei.assetThumb}` : "/ProductImages" + props.product.id

onMounted(() => {
	console.log(props.product)
})
</script>
