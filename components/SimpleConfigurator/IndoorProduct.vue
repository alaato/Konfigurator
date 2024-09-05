<template>
	<Card class=" min-w-[360px] max-w-sm">
		<img :src="'https://g-0f4zqqgpsyi.vusercontent.net/placeholder.svg?height=200&width=200'" alt="Product Image"
			width="300" height="300" class="w-full h-64 object-cover" />
		<div class="p-6 flex flex-col">
			<h3 class="text-xl border-b pb-2 font-bold mb-2"> Serie: {{ product?.parent?.MNR }}</h3>
			<h3 class=" MNR text-l font-bold mb-2">Article : {{ product.MNR }}</h3>
			<p class="text-muted-foreground mb-4">{{ product.Geraeteart4077 }}</p>
			<p class=" mb-4 font-bold">Preis: {{ product?.PERIODE1 }}€</p>
			<Card class="h-32">
				<CardHeader>
					<CardDescription>Wählen Sie aus, wie viele Innenstationen</CardDescription>
				</CardHeader>
				<CardContent>
					<NumberField v-model="productQuantity" :default-value="0" :min="0" :max="remainingIndoorProducts">
						<NumberFieldContent class="h-10">
							<NumberFieldDecrement />
							<NumberFieldInput class="h-10" />
							<NumberFieldIncrement />
						</NumberFieldContent>
					</NumberField>
				</CardContent>

			</Card>
			<Button class=" disabled:bg-slate-500 my-2 justify-self-center" :disabled="remainingIndoorProducts == 0"
				@click="addProduct(product, productQuantity)">
				hinzufügen
			</Button>
			<p v-if="productQuantity > remainingIndoorProducts" class="text-red-900"> max : {{ remainingIndoorProducts
				}}
			</p>
		</div>
	</Card>
</template>

<script lang="ts" setup>
// variables
const props = defineProps(['product'])
const currentStageStore = useCurrentStageStore();
const { currentStage } = storeToRefs(currentStageStore)
const visitedStore = useVisitedStore();
const selectedProductsStore = useSelectedProductsStore();
const { selectedProducts } = storeToRefs(selectedProductsStore)
const productQuantity = ref(0);
const remainingIndoorProducts = computed(() => {
	return selectedProducts.value.indoorProducts.neededQuantity - selectedProducts.value.indoorProducts.SelectedQuantity
})
const goToStage: Function = inject(`goToStage`)
//function
const addProduct = (product, quantity) => {
	const isAddedProduct = selectedProducts.value.indoorProducts.products.find((p) => p.MNR === product.MNR)
	if (isAddedProduct) {
		isAddedProduct.quantity += quantity
		selectedProducts.value.indoorProducts.SelectedQuantity += quantity
		productQuantity.value = 0;
	}
	if (!isAddedProduct && quantity > 0 && quantity <= remainingIndoorProducts.value) {
		selectedProducts.value.indoorProducts.products.push({ ...product, quantity })
		selectedProducts.value.indoorProducts.SelectedQuantity += quantity
		productQuantity.value = 0;
	}
	if (selectedProducts.value.indoorProducts.SelectedQuantity == selectedProducts.value.indoorProducts.neededQuantity) {
		goToStage("Zubehör")
		if (!visitedStore.visited.includes("Zubehör"))
			visitedStore.visited.push("Zubehör")
	}
}

</script>

<style></style>