<template>
	<Card class="bg-white font-body flex flex-col text-left rounded-lg drop-shadow-sm overflow-hidden w-[325px]">
		<div class="bg-white dark:bg-neutral-950 relative top-0 p-1">
			<Badge  variant="outline" v-if="product.parent.MNR == 'PES PRO'"
				class="bg-arapawa-950 text-white dark:bg-neutral-800 top-0 right-0 fixed">Unsere Empfehlung</Badge>
			<ProductInformation :product="product"></ProductInformation>
			<NuxtImg ref="ProductImage" :src="imgsrc" alt="Product Image"
				class="w-full h-[200px] object-contain object-center" />
		</div>
		<div class="pt-2 px-4">
			<h3 class="text-xl font-bold border-b mb-2"> Serie: {{ product?.parent?.MNR }}</h3>
			<h3 class=" MNR text font-bold mb-2">Article : {{ product.MNR }}</h3>
			<p class="text-muted-foreground mb-2 h-6 text-sm">{{ product?.KTXT }}</p>
			<p class="text-muted-foreground mb-1 h-6 text-sm">{{ product?.Aufputz ? "Aufputz" : product.Unterputz ?
				"Unterputz"
				: "Einbau" }}</p>
			<p class="font-bold" :class="remainingProducts == 1 ? 'mb-1' : ''">Preis: {{ product?.PERIODE1 }}€</p>
			<div class="flex flex-col">
				<Card v-if="remainingProducts !== 1" class="h-[70px] text-sm shadow-none border-none mb-0">
					<CardHeader class="p-1">
						<CardDescription class="text-center">Wählen Sie aus, wie viele {{ productType }}
						</CardDescription>
					</CardHeader>
					<CardContent>
						<NumberField v-model="productQuantity" :default-value="0" :min="0" :max="remainingProducts">
							<NumberFieldContent class="h-8">
								<NumberFieldDecrement />
								<NumberFieldInput class="h-8 text-xl" />
								<NumberFieldIncrement />
							</NumberFieldContent>
						</NumberField>
					</CardContent>
				</Card>
				<Button
					class=" disabled:bg-slate-500 font-body dark:bg-neutral-950 dark:text-white mb-2 justify-self-center"
					:disabled="remainingProducts == 0" @click="$emit('addProduct', product)">
					hinzufügen
				</Button>
			</div>
		</div>
	</Card>
</template>

<script setup lang="ts">
import { type DeviceData } from '@/utils/interfaces.js'
import ProductInformation from '@/components/general/ProductInformation.vue';
import Badge from '@/components/ui/badge/Badge.vue';
const emit = defineEmits(['addProduct'])
const props = defineProps<{
	product: DeviceData;
	productType?: string;
	remainingProducts?: number
}>()
const productQuantity = defineModel<number>('productQuantity', { required: true })
watchEffect(() => {
	if (props.remainingProducts == 1) productQuantity.value = 1
})
// const remainingProducts = defineModel<number>('remainingProducts')
const productImage = useTemplateRef<HTMLImageElement>('ProductImage')
const imgsrc = props.product?.FrontalAnsichtFrei?.assetThumb && `https://pim.tcsapps.de${props.product.FrontalAnsichtFrei.assetThumb}`

</script>
