<template>
    <section class="py-2 relative">
        <div class="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
            <div class="hidden lg:grid grid-cols-2 py-6">
                <div class="font-normal text-xl leading-8 text-gray-500">Product</div>
                <p class="font-normal text-xl leading-8 text-gray-500 flex items-center justify-between">
                    <span class="w-full max-w-[200px] text-center">Einzelpreis</span>
                    <span class="w-full max-w-[260px] text-center">Menge</span>
                    <span class="w-full max-w-[200px] text-center">Total</span>
                </p>
            </div>

            <div v-for="product in selectedProducts.indoorProducts.products" :key="product"
                class="grid grid-cols-1 lg:grid-cols-2 min-[550px]:gap-6 border-t border-gray-200 py-6">
                <div
                    class="flex items-center flex-col min-[550px]:flex-row gap-3 min-[550px]:gap-6 w-full max-xl:justify-center max-xl:max-w-xl max-xl:mx-auto">
                    <div class="pro-data w-full max-w-sm ">
                        <h5 class="font-semibold text-lg leading-8 text-black max-[550px]:text-center">
                            {{ product?.parent?.MNR || "control system" }}
                        </h5>
                        <p
                            class="font-normal text-lg leading-8 text-gray-500 my-2 min-[550px]:my-3 max-[550px]:text-center">
                            Art.-Nummer: {{ product?.MNR }}
                        </p>
                    </div>
                </div>
                <div
                    class="flex items-center flex-col min-[550px]:flex-row w-full max-xl:max-w-xl max-xl:mx-auto gap-2">
                    <h6 class="font-manrope font-bold text-2xl leading-9 text-black w-full max-w-[176px] text-center">
                    </h6>
                    <div class="flex items-center w-full mx-auto justify-center">
                        <p type="number"
                            class="border-y border-gray-200 outline-none text-gray-900 font-semibold text-lg w-full max-w-[118px] min-w-[80px] placeholder:text-gray-900 py-[15px] text-center bg-transparent"
                            placeholder="1">
                            {{ product?.PERIODE1 }}€
                        </p>
                    </div>
                    <div class="flex items-center w-full mx-auto justify-center">
                        <p type="number"
                            class="border-y border-gray-200 outline-none text-gray-900 font-semibold text-lg w-full max-w-[118px] min-w-[80px] placeholder:text-gray-900 py-[15px] text-center bg-transparent"
                            placeholder="1">
                            {{ product?.quantity }}
                        </p>
                    </div>
                    <div class="flex items-center w-full mx-auto justify-center">
                        <p type="number"
                            class="border-y border-gray-200 outline-none text-gray-900 font-semibold text-lg w-full max-w-[118px] min-w-[80px] placeholder:text-gray-900 py-[15px] text-center bg-transparent"
                            placeholder="1">
                            {{ product?.PERIODE1 * product?.quantity }}€
                        </p>
                    </div>
                </div>
            </div>
            <div v-for="outdoorProduct in selectedProducts.outdoorProducts.products" :key="product"
                class="grid grid-cols-1 lg:grid-cols-2 min-[550px]:gap-6 border-t border-gray-200 py-6">
                <div
                    class="flex items-center flex-col min-[550px]:flex-row gap-3 min-[550px]:gap-6 w-full max-xl:justify-center max-xl:max-w-xl max-xl:mx-auto">
                    <div class="pro-data w-full max-w-sm ">
                        <h5 class="font-semibold text-lg leading-8 text-black max-[550px]:text-center">
                            {{ outdoorProduct?.parent?.MNR || "control system" }}
                        </h5>
                        <p
                            class="font-normal text-lg leading-8 text-gray-500 my-2 min-[550px]:my-3 max-[550px]:text-center">
                            Art.-Nummer: {{ outdoorProduct?.MNR }}
                        </p>
                    </div>
                </div>
                <div
                    class="flex items-center flex-col min-[550px]:flex-row w-full max-xl:max-w-xl max-xl:mx-auto gap-2">
                    <h6 class="font-manrope font-bold text-2xl leading-9 text-black w-full max-w-[176px] text-center">
                    </h6>
                    <div class="flex items-center w-full mx-auto justify-center">
                        <p type="number"
                            class="border-y border-gray-200 outline-none text-gray-900 font-semibold text-lg w-full max-w-[118px] min-w-[80px] placeholder:text-gray-900 py-[15px] text-center bg-transparent"
                            placeholder="1">
                            {{  outdoorProduct.PERIODE1  }}€
                        </p>
                    </div>
                    <div class="flex items-center w-full mx-auto justify-center">
                        <p type="number"
                            class="border-y border-gray-200 outline-none text-gray-900 font-semibold text-lg w-full max-w-[118px] min-w-[80px] placeholder:text-gray-900 py-[15px] text-center bg-transparent"
                            placeholder="1">
                            {{ outdoorProduct.quantity }}
                        </p>
                    </div>
                    <div class="flex items-center w-full mx-auto justify-center">
                        <p type="number"
                            class="border-y border-gray-200 outline-none text-gray-900 font-semibold text-lg w-full max-w-[118px] min-w-[80px] placeholder:text-gray-900 py-[15px] text-center bg-transparent"
                            placeholder="1">
                            {{ outdoorProduct.PERIODE1 * outdoorProduct.quantity }}€
                        </p>
                    </div>
                </div>
            </div>
            <div
                class="grid grid-cols-1 lg:grid-cols-2 min-[550px]:gap-6 border-t border-gray-200 py-6">
                <div
                    class="flex items-center flex-col min-[550px]:flex-row gap-3 min-[550px]:gap-6 w-full max-xl:justify-center max-xl:max-w-xl max-xl:mx-auto">
                    <div class="pro-data w-full max-w-sm ">
                        <h5 class="font-semibold text-lg leading-8 text-black max-[550px]:text-center">
                            {{ controlUnit?.parent?.MNR || "control system" }}
                        </h5>
                        <p
                            class="font-normal text-lg leading-8 text-gray-500 my-2 min-[550px]:my-3 max-[550px]:text-center">
                            Art.-Nummer: {{ controlUnit?.MNR }}
                        </p>
                    </div>
                </div>
                <div
                    class="flex items-center flex-col min-[550px]:flex-row w-full max-xl:max-w-xl max-xl:mx-auto gap-2">
                    <h6 class="font-manrope font-bold text-2xl leading-9 text-black w-full max-w-[176px] text-center">
                    </h6>
                    <div class="flex items-center w-full mx-auto justify-center">
                        <p type="number"
                            class="border-y border-gray-200 outline-none text-gray-900 font-semibold text-lg w-full max-w-[118px] min-w-[80px] placeholder:text-gray-900 py-[15px] text-center bg-transparent"
                            placeholder="1">
                            {{  controlUnit.PERIODE1  }}€
                        </p>
                    </div>
                    <div class="flex items-center w-full mx-auto justify-center">
                        <p type="number"
                            class="border-y border-gray-200 outline-none text-gray-900 font-semibold text-lg w-full max-w-[118px] min-w-[80px] placeholder:text-gray-900 py-[15px] text-center bg-transparent"
                            placeholder="1">
                            {{ controlUnit.quantity? controlUnit.quantity : 1 }}
                        </p>
                    </div>
                    <div class="flex items-center w-full mx-auto justify-center">
                        <p type="number"
                            class="border-y border-gray-200 outline-none text-gray-900 font-semibold text-lg w-full max-w-[118px] min-w-[80px] placeholder:text-gray-900 py-[15px] text-center bg-transparent"
                            placeholder="1">
                            {{ controlUnit.PERIODE1 }}€
                        </p>
                    </div>
                </div>
            </div>
            <div class="bg-gray-50 rounded-xl p-6 w-full mb-8 max-lg:max-w-xl max-lg:mx-auto">
                <div class="flex items-center justify-between w-full py-6">
                    <p class="font-manrope font-medium text-2xl leading-9 text-gray-900">Total</p>
                    <h6 class="font-manrope font-medium text-2xl leading-9 text-arapawa-950">{{ total }}€ </h6>
                </div>
            </div>
            <div class="flex items-center flex-col sm:flex-row justify-center gap-3 mt-8">
                <button
                    class="rounded-full w-full max-w-[280px] py-4 text-center justify-center items-center font-semibold text-lg text-white flex transition-all duration-300 hover:bg-black">Größhandler
                    <svg class="ml-2" xmlns="http://www.w3.org/2000/svg" width="23" height="22" viewBox="0 0 23 22"
                        fill="none">
                        <path d="M8.75324 5.49609L14.2535 10.9963L8.75 16.4998" stroke="white" stroke-width="1.6"
                            stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </button>
            </div>
        </div>
    </section>

</template>

<script setup>
const selectedProductsStore = useSelectedProductsStore();
const { selectedProducts } = storeToRefs(selectedProductsStore)
const controlUnit = selectedProducts.value.controlUnit
console.log(selectedProducts.value.controlUnit)
const total = computed(() => {
    let sum = 0
    selectedProducts.value.outdoorProducts.products.forEach((product) => {
        sum += product.PERIODE1 * selectedProducts.value.outdoorProducts.SelectedQuantity
    })
    selectedProducts.value.indoorProducts.products.forEach((product) => {
        sum+= product.quantity * product?.PERIODE1
    })
    sum += selectedProducts.value.controlUnit?.PERIODE1
    return sum
})
console.log(total.value)
</script>
