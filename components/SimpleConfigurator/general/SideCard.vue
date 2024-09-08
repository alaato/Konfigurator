<template>
  <Card class="hidden h-96 2xl:flex fixed inset-y-[17rem] right-2 max-w-full min-w-60">
    <div class="flex h-full flex-col overflow-y-auto ">
      <div class="flex-1 overflow-auto px-4 py-6 sm:px-6">
        <div class="flex items-start justify-between">
          <h3 class="text-lg font-medium text-gray-900">Ihre Auswahl</h3>
        </div>

        <div class="mt-8">
          <div class="flow-root">
            <ul role="list" class="-my-6 divide-y divide-gray-200">
              <li v-for="(product, index) in getAllSelectedProducts" :key="index" class="flex py-6">
                <div class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                  <img :src="product?.imageSrc" :alt="product?.imageAlt"
                    class="h-full w-full object-cover object-center" />
                </div>

                <div class="ml-4 flex flex-1 flex-col">
                  <div>
                    <div class="flex justify-between text-base font-medium text-gray-900">
                      <h3>
                        <a :href="product?.href">{{ product?.name }}</a>
                      </h3>
                      <p class="ml-4">{{ product?.price }}</p>
                    </div>
                    <p class="mt-1 text-sm text-gray-500">{{ product?.color }}</p>
                  </div>
                  <div class="flex flex-1 items-end justify-between text-sm">
                    <p class="text-gray-500">Qty {{ product?.quantity }}</p>

                    <div class="flex">
                      <Button
                        class="p-1 h-max rounded-full w-max focus:outline-none hover:bg-transparent bg-transparent"
                        @click="emitDelete(product)">
                        <Trash2 color="red" />
                      </Button>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </Card>
</template>


<script lang="ts" setup>
//
import { Trash2 } from 'lucide-vue-next';

//
const productStore = useSelectedProductsStore()
const { getAllSelectedProducts, selectedProducts } = storeToRefs(productStore)
function emitDelete(product) {
  const index = getAllSelectedProducts.value.indexOf(product)
  console.log(product, index, getAllSelectedProducts, selectedProducts)
  getAllSelectedProducts.value.splice(index, 1)
}
</script>

<style></style>