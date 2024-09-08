<template>
	<Card class="bg-white text-left rounded-lg drop-shadow-sm overflow-hidden min-w-[360px] max-w-sm">
		<img src="https://g-0f4zqqgpsyi.vusercontent.net/placeholder.svg?height=200&width=200" alt="Product Image"
			width="300" height="300" class="w-full h-64 object-cover" />
		<div class="p-6">
			<h3 class="text-xl font-bold border-b pb-2 mb-2"> Serie: {{ product?.parent?.MNR }}</h3>
			{{ product.Text ? product.Text : '' }}
			<h3 class=" MNR text-l font-bold mb-2">Article : {{ product.MNR }}</h3>
			<p class="text-muted-foreground mb-4">{{ product.Geraeteart4077 }}</p>
			<p class=" mb-4 font-bold">Preis: {{ product?.PERIODE1 }}€</p>
			<div class="flex flex-col">
				<Card class="h-32">
					<CardHeader>
						<CardDescription>Wählen Sie aus, wie viele Innenstationen</CardDescription>
					</CardHeader>
					<CardContent>
						<NumberField v-model="productQuantity" :default-value="0" :min="0"
							:max="remainingOutdoorProducts">
							<NumberFieldContent class="h-10">
								<NumberFieldDecrement />
								<NumberFieldInput class="h-10" />
								<NumberFieldIncrement />
							</NumberFieldContent>
						</NumberField>
					</CardContent>
				</Card>
				<Button class=" disabled:bg-slate-500 my-2 justify-self-center"
					:disabled="remainingOutdoorProducts == 0" @click="addProduct(product)">
					hinzufügen
				</Button>
				<p v-if="productQuantity > remainingOutdoorProducts" class="text-red-900"> max : {{
					remainingOutdoorProducts }}</p>
			</div>
		</div>
	</Card>
</template>

<script lang="ts" setup>
// variables
const props = defineProps(['product'])
const productQuantity = ref(0);
const currentStageStore = useCurrentStageStore();
const { currentStage } = storeToRefs(currentStageStore)
const visitedStore = useVisitedStore();
const selectedProductsStore = useSelectedProductsStore();
const { selectedProducts } = storeToRefs(selectedProductsStore)
const remainingOutdoorProducts = computed(() => {
	return selectedProducts.value.outdoorProducts.neededQuantity - selectedProducts.value.outdoorProducts.SelectedQuantity
})
const goToStage: Function = inject(`goToStage`)
//function
function addProduct(product) {
	const isAddedProduct = selectedProducts.value.outdoorProducts.products.find((p) => p.MNR === product.MNR)
	if (isAddedProduct) {
		isAddedProduct.quantity += productQuantity.value
		selectedProducts.value.outdoorProducts.SelectedQuantity += productQuantity.value
		productQuantity.value = 0;
		console.log(isAddedProduct)
	}
	else if (!isAddedProduct && productQuantity.value > 0 && productQuantity.value <= remainingOutdoorProducts.value) {
		selectedProductsStore.addOneOutdoorProduct({ ...product, quantity: productQuantity.value });
		productQuantity.value = 0;
	}
	if (!visitedStore.visited.includes('Innenstation'))
		visitedStore.visited.push('Innenstation')
	if (remainingOutdoorProducts.value == 0)
		goToStage('Innenstation')
}
</script>

<style></style>