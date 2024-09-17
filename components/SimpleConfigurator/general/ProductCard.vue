<template>
	<Card class="bg-white font-body text-left rounded-lg drop-shadow-sm overflow-hidden min-w-[360px] max-w-sm">
			<img src="https://g-0f4zqqgpsyi.vusercontent.net/placeholder.svg?height=200&width=200" alt="Product Image"
				width="300" height="300" class="w-full h-64 object-cover" />
			<div class="p-4">
				<h3 class="text-xl font-bold border-b pb-2 mb-2"> Serie: {{ product?.parent?.MNR }}</h3>
				<h3 class=" MNR text-l font-bold mb-2">Article : {{ product.MNR }}</h3>
				<p class="text-muted-foreground mb-4">{{ product.Geraeteart4077 }}</p>
				<p class=" mb-2 font-bold">Preis: {{ product?.PERIODE1 }}€</p>
				<div class="flex flex-col">
					<Card class="h-24 font-body text-sm shadow-none border-none">
						<CardHeader class="py-4" >
							<CardDescription class="text-center">Wählen Sie aus, wie viele {{productType}}</CardDescription>
						</CardHeader>
						<CardContent>
							<NumberField v-model="productQuantity" :default-value="0" :min="0"
								:max="remainingProducts">
								<NumberFieldContent class="h-8">
									<NumberFieldDecrement />
									<NumberFieldInput class="h-8 text-xl" />
									<NumberFieldIncrement />
								</NumberFieldContent>
							</NumberField>
						</CardContent>
					</Card>
					<Button class=" disabled:bg-slate-500 my-2 font-body dark:bg-neutral-950  dark:hover:bg-neutral-300"
						:disabled="remainingProducts == 0" @click="$emit('addProduct', product)">
						hinzufügen
					</Button>
					<p v-if="productQuantity > remainingProducts" class="text-red-900"> max : {{
						remainingProducts }}</p>
				</div>
			</div>
		</Card>
</template>

<script setup lang="ts">
import {type Product} from '@/utils/interfaces.js'
const emit = defineEmits(['addProduct'])
const props = defineProps<{ 
	product: Product;
	productType: string;
}>()
const productQuantity = defineModel<number>('productQuantity', { required: true })
const remainingProducts = defineModel<number>('remainingProducts',{ required: true })
</script>
