<template>
	<Card class="bg-white font-body flex flex-col text-left rounded-lg drop-shadow-sm overflow-hidden min-w-[360px] max-w-sm">
			<NuxtImg ref="ProductImage" loading="lazy" format="webp"  :src="imgsrc" alt="Product Image"
				width="300" height="300" class="w-full h-64 object-scale-down" />
			<div class="pt-4 px-4">
				<h3 class="text-xl font-bold border-b mb-2"> Serie: {{ product?.parent?.MNR }}</h3>
				<h3 class=" MNR text-l font-bold mb-2">Article : {{ product.MNR }}</h3>
				<p class="text-muted-foreground mb-2 h-6">{{ product.Geraeteart4077 }}</p>
				<p class="text-muted-foreground mb-2 h-6">{{ product.Kommunikationstechnologie4164 }}</p>
				<p class="text-muted-foreground mb-2 h-6">{{ product.Aufputz? "Aufputz": "" ||product.Unterputz? "Unterputz" : ""}}</p>
				<p class=" mb-2 font-bold">Preis: {{ product?.PERIODE1 }}€</p>
				<div class="flex flex-col p-2">
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
import {type DeviceData} from '@/utils/interfaces.js'
const emit = defineEmits(['addProduct'])
const props = defineProps<{ 
	product: DeviceData;
	productType?: string;
}>()
const productQuantity = defineModel<number>('productQuantity', { required: true })
const remainingProducts = defineModel<number>('remainingProducts')
const productImage = useTemplateRef<HTMLImageElement>('ProductImage')
const imgsrc = props.product?.FrontalAnsichtFrei?.assetThumb? `https://pim.tcsapps.de${props.product.FrontalAnsichtFrei.assetThumb}` : "/" + props.product.id
const onImgError = () => {
productImage.value.src = '/'+ props.product.id	
}
</script>
