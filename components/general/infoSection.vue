<template>
	<div class="w-full">
		<Tabs default-value="Info" class="w-full h-[400px] overflow-y-scroll">
			<TabsList class="grid w-full grid-cols-4">
				<TabsTrigger value="Info">
					Info
				</TabsTrigger>
				<TabsTrigger value="key-features">
					key Features
				</TabsTrigger>
				<TabsTrigger value="characteristics">
					leistungsmerkmale
				</TabsTrigger>
				<TabsTrigger value="Downloads">
					Downloads
				</TabsTrigger>
			</TabsList>

			<TabsContent value="Info">
				<p class="whitespace-pre-line my-1">{{ product?.TexteTK?.features[1]?.text }}</p>
			</TabsContent>
			<TabsContent value="characteristics">
				<p v-for="(key, value) in characterstics" v-html="value + ': ' + '<b>'+key +'</b>'" class="whitespace-pre-line my-1" :key="value">
				
				</p>
			</TabsContent>
			<TabsContent value="key-features">
				<p class="whitespace-pre-line my-4"><b>{{ product?.TexteTK?.features[3]?.name }}</b></p>
				<p class="whitespace-pre-line my-1 ">{{ product?.TexteTK?.features[3]?.text }}</p>
			</TabsContent>
			<TabsContent value="Downloads">
				<a class="text-blue-900 block w-fit hover:text-black hover:underline dark:text-blue-700 dark:hover:text-white "
					:href="product.DBWebsiteLink">Dattensblatt</a>
				<a class="text-blue-900 block w-fit hover:text-black hover:underline dark:text-blue-700 dark:hover:text-white"
					:href="product.PIWebsiteLink">info</a>
			</TabsContent>
		</Tabs>
	</div>
</template>

<script setup lang="ts">
import extractInfo from '@/utils/ConfiguratorUtils/extractCharacteristics';

const props = defineProps<{
	imgsrc: string;
	product: DeviceData;
}>()
const characterstics = extractInfo(props.product)
</script>
