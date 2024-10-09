<template>
	<Card :class="props.class" class="bg-background text-left rounded-lg shadow-lg bg-white overflow-hidden w-80">
		<ProductInformation :product="product"></ProductInformation>
		<NuxtImg :src="imgsrc" alt="Product Image" width="250" height="250"
			class="w-full h-64 object-scale-down border-b pb-2" />
		<div class="p-6 flex flex-col">
			<h3 class=" MNR text-l font-bold mb-2 border-b pb-2">Article : {{ product.MNR }}</h3>
			<p class="text-muted-foreground mb-4 border-b pb-2 text-sm">{{ product.Geraeteart4077 }}</p>
			<p class=" mb-4 border-b pb-2 font-bold text-green-900">Erforderlich</p>
			<p>{{ product?.PERIODE1 }}€</p>
		</div>
	</Card>
</template>

<script lang="ts" setup>
import ProductInformation from '~/components/general/ProductInformation.vue';
// variables
const props = defineProps<{
	product: DeviceData;
	class?: string
}>()
const imgsrc = props.product?.FrontalAnsichtFrei?.assetThumb ? `https://pim.tcsapps.de${props.product.FrontalAnsichtFrei.assetThumb}` : "/ProductImages" + props.product.id
//function
</script>

<style></style>