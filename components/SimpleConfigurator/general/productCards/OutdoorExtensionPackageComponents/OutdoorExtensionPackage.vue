<template>

  <div class="flex flex-col items-center gap-1 md:grid md:grid-cols-2">
    <PackageProductCard v-if="pack.station" :product="pack.station" />
    <PackageProductCard v-if="pack.extension" :product="pack.extension" />
    <PackageProductCard v-if="camera" :product="camera">
      <changeCameraModel :products="products" @replaceCamera="replaceCamera" />
    </PackageProductCard>
    <PackageProductCard v-if="pack.controlUnit" :product="pack.controlUnit" />
    <Button @click="addProducts" class="w-full col-span-full dark:border border-white mb-1">Paket hinzufügen</Button>
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
const visitedStore = useVisitedStore();
const { addExtension, addOutdoorProducts } = selectedProductsStore;
const { getRemainingOutdoorNeeded } = storeToRefs(selectedProductsStore);
const camera = ref(props.pack.camera)



const products = fetchCameras();

function fetchCameras (){
  const cameras = ["FVK2202", "FVK3220", "FVK4224", "AMI10620"];
  const products: DeviceData[] = []
  cameras.forEach((camera) => {
    const found = extensions.find((extension) => extension.MNR.includes(camera))
    if(found) products.push(found)
  })
  return products
}

function replaceCamera(newCamera : DeviceData) {  
  camera.value = {...newCamera, quantity: camera.value.quantity}
}
function addProducts (){
  if (props.pack.camera)
    addExtension(camera.value, 1);
  if (props.pack.controlUnit)
    addExtension(props.pack.controlUnit, 1);
  addExtension(props.pack.extension, 1);
  addOutdoorProducts(props.pack.station, 1);
  if (getRemainingOutdoorNeeded.value <= 0) {
    goToStage("Innenstation");
    visitedStore.visited.push("Innenstation");
  }
};
provide("replaceCamera", replaceCamera);
</script>

<style></style>
