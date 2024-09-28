<template>
<div className="p-4" ref="info">
                <div className="flex flex-col md:flex-row gap-4 items-center">
                  <img :src="imgsrc" :alt="product?.MNR" class="md:w-1/2 w-52 h-44 object-scale-down rounded-md mb-3" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{{ product?.MNR }}</h3>
                    <p className="text-lg font-bold">{{ product?.PERIODE1 }} €</p>
                  </div>
                </div>
              </div>
	<div className="p-4">
		<div className="flex flex-col md:flex-row gap-4">
			<img :src="imgsrc" :alt="product?.MNR" class="w-full md:w-1/2 h-64 object-cover rounded-md" />
			<div>
				<h3 className="text-xl font-semibold mb-2">{{ product?.MNR }}</h3>
				<p className="text-gray-600 mb-4">{{ product?.TEXT }}</p>
				<p className="text-lg font-bold">{{ product?.PERIODE1 }} €</p>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ChevronLeft } from 'lucide-vue-next'
const props = defineProps(['product'])
const imgsrc = props.product?.FrontalAnsichtFrei?.assetThumb? `https://pim.tcsapps.de${props.product.FrontalAnsichtFrei.assetThumb}` : "/" + props.product.id
const parser = new DOMParser();
const document = parser.parseFromString(props.product?.TEXT, "text/html");
const info = useTemplateRef("info")
const imgsrc = props.product?.FrontalAnsichtFrei?.assetThumb ? `https://pim.tcsapps.de${props.product.FrontalAnsichtFrei.assetThumb}` : "/ProductImages" + props.product.id

onMounted(() => {
  console.log(props.product)
  info.value.append(document.body)
	console.log(props.product)
})
</script>

<style></style>