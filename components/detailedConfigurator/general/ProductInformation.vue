<template>
<div className="p-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <img src="https://g-0f4zqqgpsyi.vusercontent.net/placeholder.svg?height=200&width=200" class="w-full md:w-1/2 h-64 object-cover rounded-md" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{{ product?.node?.MNR }}</h3>
                    <p className="text-gray-600 mb-4">{{ product?.node?.TEXT }}</p>
                    <p className="text-lg font-bold">{{ product?.node?.PERIODE1 }} €</p>
                  </div>
                </div>
              </div>
</template>

<script lang="ts" setup>
import { ChevronLeft } from 'lucide-vue-next'
const props = defineProps(['product'])
onMounted(() => {
  console.log(props.product)
})
</script>

<style></style>