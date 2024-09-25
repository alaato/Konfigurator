<template>
	<TableCell class="font-medium w-[200px]">
				<NuxtImg :src="imgsrc" alt="Kein Bild vorhanden"
				densities="x1 x2" class="object-scale-down w-10 max-h-[50px] mr-2" />
				<span>{{ product?.MNR }}</span>
			</TableCell>
			<TableCell class="text-center" >{{ quantity ? quantity : 1 }}</TableCell>
			<TableCell>{{ product?.PERIODE1 }}</TableCell>
			<TableCell class="text-right">
				{{ quantity ? quantity * product?.PERIODE1 : product?.PERIODE1 }}€
			</TableCell>
</template>
<script setup lang="ts">
import {type DeviceData} from '@/utils/interfaces.js'
const props = defineProps<{ 
	product: DeviceData;
	quantity?: number;
}>()
const imgsrc = props.product?.FrontalAnsichtFrei?.assetThumb? `https://pim.tcsapps.de${props.product.FrontalAnsichtFrei.assetThumb}` : "/" + props.product.id

</script>