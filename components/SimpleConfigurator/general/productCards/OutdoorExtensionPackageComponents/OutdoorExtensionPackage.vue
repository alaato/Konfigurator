<template>
	<Card class="mt-1 flex flex-col gap-1 justify-center items-center w-fit max-w-[800px]">
		<CardContent class="flex flex-col md:flex-row gap-1 p-0 py-0 px-0">
			<PackageProductCard v-if="pack.station" :product="pack.station" />
			<PackageProductCard v-if="pack.extension" :product="pack.extension" />
			<PackageProductCard v-if="camera" :product="camera">
				<changeCameraModel :products="products" @replaceCamera="replaceCamera" />
			</PackageProductCard>
			<div v-if="pack.camera && pack.extension" class="bg-neutral-200 dark:bg-neutral-800 w-80"></div>
		</CardContent>
		<Button @click="addProducts" class="dark:border my-1 grow-0 w-fit justify-self-center border-white">Paket
			hinzufügen</Button>

	</Card>

</template>

<script lang="ts" setup>
import Button from "@/components/ui/button/Button.vue";
import PackageProductCard from "./PackageProductCard.vue";
import { type Pack, type DeviceData } from "@/utils/interfaces";
import extensions from "@/data/Funktionserweiterung.json"
import changeCameraModel from "./changeCameraModel.vue";
const props = defineProps<{
	pack: Pack<DeviceData>;
}>();
const goToStage: Function = inject(`goToStage`);

const selectedProductsStore = useSelectedProductsStore();
const visitedStore = useVisitedStore();
const { addExtension, addOutdoorProducts, addPack, replaceExtension } = selectedProductsStore;
const { getRemainingOutdoorNeeded } = storeToRefs(selectedProductsStore);
const camera = ref(props.pack.camera)



const products = fetchCameras();

function fetchCameras() {
	const cameras = ["FVK220", "FVK3220", "FVK4224", "AMI10620", "FVK4214", "FVK4225", "FVK2201", "FVK2202"];
	const products: DeviceData[] = []
	cameras.forEach((camera) => {
		const found = extensions.find((extension) => extension.MNR.includes(camera))
		if (found) products.push(found)
	})
	return products
}

function replaceCamera(newCamera: DeviceData) {
	camera.value = { ...newCamera, quantity: camera.value.quantity }
	replaceExtension(props.pack.camera, camera.value)
}
function addProducts() {
	addPack({ ...props.pack, camera: camera.value });
	if (getRemainingOutdoorNeeded.value <= 0) {
		goToStage("Innenstation");
		visitedStore.visited.push("Innenstation");
	}
};
provide("replaceCamera", replaceCamera);
</script>

<style></style>
