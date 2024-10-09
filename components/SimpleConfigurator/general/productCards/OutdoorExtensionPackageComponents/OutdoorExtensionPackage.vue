<template>

	<div class="flex flex-col items-center gap-1 md:grid md:grid-cols-2">
		<PackageProductCard v-if="pack.station" :product="pack.station" />
		<PackageProductCard v-if="pack.extension" :product="pack.extension" />
		<PackageProductCard v-if="pack.camera" :product="pack.camera">
			<changeCameraModel :products="products" @setCamera="setCamera" />
		</PackageProductCard>
		<PackageProductCard v-if="pack.controlUnit" :product="pack.controlUnit" />
		<Button @click="addProducts" class="w-full col-span-full dark:border border-white mb-1">Paket
			hinzufügen</Button>
	</div>
</template>

<script lang="ts" setup>
import Button from "@/components/ui/button/Button.vue";
import PackageProductCard from "./PackageProductCard.vue";
import { type Pack, type DeviceData } from "@/utils/interfaces";
import extensions from "@/data/Funktionserweiterung.json"
import changeCameraModel from "./changeCameraModel.vue";
const props = defineProps<{
	pack: Pack;
}>();
const goToStage: Function = inject(`goToStage`);

const selectedProductsStore = useSelectedProductsStore();
const { addExtension, addOneOutdoorProduct } = selectedProductsStore;
const { getRemainingOutdoorNeeded } = storeToRefs(selectedProductsStore);

const fetchCameras = () => {
	const cameras = ["FVK2202", "FVK3220", "FVK4224", "AMI10620"];
	const products: DeviceData[] = []
	cameras.forEach((camera) => {
		const found = extensions.find((extension) => extension.MNR.includes(camera))
		if (found) products.push(found)
	})
	console.log(products)
	return products
}
const products = fetchCameras();

function addProducts() {
	if (props.pack.camera)
		addExtension(props.pack.camera, 1);
	if (props.pack.controlUnit)
		addExtension(props.pack.controlUnit, 1);
	addExtension(props.pack.extension, 1);
	addOneOutdoorProduct(props.pack.station, 1);
	if (getRemainingOutdoorNeeded.value <= 0) goToStage("Innenstation");
	console.log(getRemainingOutdoorNeeded.value);
};
function setCamera(camera: DeviceData) {
	props.pack.camera = camera
}
</script>

<style></style>
