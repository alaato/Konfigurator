<template>
	<Dialog>
		<DialogTrigger asChild>
			<InfoIcon class="w-5 h-5 text-neutral-400 cursor-pointer transition-transform hover:scale-110 hover:text-black" />
		</DialogTrigger>
		<DialogContent class="max-w-2xl">
			<DialogTitle>Article :{{ product?.MNR }}</DialogTitle>
			<DialogHeader class="max-w-2xl">
				<div class="flex flex-col md:flex-row gap-4 py-4 items-center ">
					<NuxtImg :src="imgsrc" :alt="product?.MNR" 
						class="object-scale-down rounded-md" />
						<p class="whitespace-pre-line my-1"><b> {{product?.TexteTK?.features[0]?.text}}</b></p>
				</div>
				<infoSection :imgsrc="imgsrc" :product="product" />
			</DialogHeader>
		</DialogContent>
	</Dialog>
</template>

<script lang="ts" setup>
import { InfoIcon } from 'lucide-vue-next'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import infoSection from './infoSection.vue'
const props = defineProps(['product'])
const imgsrc = props.product?.FrontalAnsichtFrei?.assetThumb ? `https://pim.tcsapps.de${props.product.FrontalAnsichtFrei.assetThumb}` : "/" + props.product.id
</script>
