<template>
      <div class="fixed inset-y-56 right-0 flex max-w-full min-w-60 pl-10">
            <div class="flex h-full flex-col overflow-y-auto border border-black">
              <div class="flex-1 overflow-auto px-4 py-6 sm:px-6">
                <div class="flex items-start justify-between">
                  <DialogTitle class="text-lg font-medium text-gray-900">Ihre Auswahl</DialogTitle>
                </div>

                <div class="mt-8">
                  <div class="flow-root">
                    <ul role="list" class="-my-6 divide-y divide-gray-200">
                      <li v-for="product in products" :key="product.id" class="flex py-6">
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
                              <button type="button"
                                class="font-medium text-indigo-600 hover:text-indigo-500">Remove</button>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
      </div>
</template>


<script lang="ts" setup>
const productStore = useSelectedProductsStore()
const {allSelectedProducts} = storeToRefs(productStore)
watchEffect(() => {
  console.log(allSelectedProducts)
})
</script>

<style></style>