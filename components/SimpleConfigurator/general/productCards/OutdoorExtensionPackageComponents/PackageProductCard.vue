<template>
	<Card :class="camera ? 'hover:scale-105 cursor-pointer' : ''"
			class="text-left rounded-lg shadow-lg overflow-hidden w-[325px] h-[340px] max-w-sm" 
			@click="camera? replaceCamera(product) : null">
		<div class="bg-white dark:bg-neutral-950 relative top-0">
			<div class="flex justify-between p-1">
				<ProductInformation :product="product" />
				<slot />
			</div>
			<NuxtImg ref="ProductImage" :src="imgsrc" @error="onImgError" alt="Product Image"
				class="w-full h-44 object-scale-down" />
		</div>
		<div class="px-4 py-2 flex flex-col">
			<h3 class="text-md font-bold mb-2"> {{ product?.KTXT }}</h3>
			<h3 class=" MNR text-mdfont-bold mb-2">Article : {{ product?.MNR }}</h3>
			<h3 class=" MNR text-mdfont-bold mb-2">Preis : {{ product?.PERIODE1 }}€</h3>
		</div>
	</Card>
</template>

<script lang="ts" setup>
import Card from '@/components/ui/card/Card.vue';
import ProductInformation from '@/components/general/ProductInformation.vue';

// variables
const props = defineProps<{
	product: DeviceData
	camera?: boolean
}>()
const productImage = useTemplateRef<HTMLImageElement>('ProductImage')
const imgsrc = computed(() => props.product?.FrontalAnsichtFrei?.assetThumb ? `https://pim.tcsapps.de${props.product.FrontalAnsichtFrei.assetThumb}` : "/" + props.product.id)
const onImgError = () => {
	productImage.value.src = '/' + props.product.id
}
const replaceCamera: Function = inject(`replaceCamera`)

</script>