<template>
	<Card
	            :key="product.id"
	            class="flex-grow p-3 w-50 lg:w-60 bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform hover:scale-105"
	          >
			  	<button @click="$emit('handleProductClick', product)">
					<InfoIcon class="w-5 h-5cursor-pointer transition-transform hover:scale-110" />
				</button>
	            <img  src="https://g-0f4zqqgpsyi.vusercontent.net/placeholder.svg?height=200&width=200" alt="Elegant Watch" class="w-full h-40 object-cover" />
	            <h3 class="text-xl border-b pb-2 font-bold my-2"> Serie: {{ product.node.parent?.MNR }}</h3>
	            <h3 class=" MNR text-l font-bold mb-2">Article : {{ product.node.MNR }}</h3>
	            <p class="text-muted-foreground mb-2">{{ product.node.Geraeteart4077 }}</p>
	            <p class=" mb-2 font-bold">Preis: {{ product.node?.PERIODE1 }}€</p>
	          </Card>
</template>

<script setup lang="ts">
import {InfoIcon} from 'lucide-vue-next'
const emit = defineEmits(['handleProductClick'])
const props = defineProps<{ 
	product: any;
}>()
onMounted(() => {
	console.log(props.product)
})
</script>
