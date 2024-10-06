<template>
	<div class="w-full flex flex-col justify-end items-end gap-1 overflow-y-scroll">
		<Card class="px-4 py-3 h-max shadow-sm overflow-y-scroll w-full max-h-[500px]">
			<Table class="" id="stückliste">
				<TableCaption class="self-start">Ihre Stückliste</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead> Article </TableHead>
						<TableHead> Bezeichnung </TableHead>
						<TableHead class="text-center">Menge</TableHead>
						<TableHead>Preis</TableHead>
						<TableHead class="text-right"> Total </TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					<ProductRow :products="selectedProducts.indoorProducts.products" />
					<ProductRow :products="selectedProducts.outdoorProducts.products" />
					<ProductRow :products="selectedProducts.accessories.products" />
					<ProductRow :products="selectedProducts.extensions.products" />
					<ProductRow :products="[controlUnit]" />
				</TableBody>
			</Table>
		</Card>

		<Card class="px-4 py-3 h-max shadow-sm">
			<hr />
			<table id="total" class="space-y-4 my-1">
				<tbody>
					<tr class="flex flex-wrap gap-4 text-sm font-bold">
						<td>Gesamtpreis :</td>
						<td class="ml-auto">{{ total }}€</td>
					</tr>
				</tbody>
			</table>
		</Card>
	</div>

	<div class="cart-actions flex gap-1 mt-2">
		<Button class="bg-arapawa-950 hover:bg-arapawa-900" @click="generatePDF">Stückliste als PDF</Button>
		<Button class="bg-arapawa-950 hover:bg-arapawa-900" @click="generateEXCEL">Stückliste als Excel</Button>
		<Toaster :theme="toasterTheme" />
	</div>
</template>

<script lang="ts" setup>
//import
import {
	Table,
	TableBody,
	TableCaption,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Toaster } from "@/components/ui/sonner";
import ProductRow from "./ProductRow.vue";
import { generateEXCEL, generatePDF } from "@/utils/ConfiguratorUtils/generatingExcelAndPDF";
// Function to update the theme based on the <html> class
function updateToasterTheme() {
	const isDarkTheme = document.documentElement.classList.contains("dark");
	toasterTheme.value = isDarkTheme ? "dark" : "light";
}
onMounted(() => {
	updateToasterTheme();
	const observer = new MutationObserver(updateToasterTheme);
	observer.observe(document.documentElement, {
		attributes: true,
		attributeFilter: ["class"],
	});

	onUnmounted(() => observer.disconnect());
});
//consts
const toasterTheme = ref("light");
const selectedProductsStore = useSelectedProductsStore();
const { selectedProducts, getAllSelectedProducts } = storeToRefs(selectedProductsStore);
const controlUnit = selectedProducts.value.controlUnit;
const totalSum = getAllSelectedProducts.value.reduce((sum, product) => {
	return sum + (product.PERIODE1 * product.quantity);
}, 0)
const total = computed(() => {
	let sum = 0;
	selectedProducts.value.outdoorProducts.products.forEach((product) => {
		sum +=
			product.PERIODE1 *
			selectedProducts.value.outdoorProducts.SelectedQuantity;
	});
	selectedProducts.value.indoorProducts.products.forEach((product) => {
		sum += product.quantity * product?.PERIODE1;
	});
	sum += controlUnit?.PERIODE1 * selectedProducts.value.controlUnit.quantity;
	return sum;
});

//functions


</script>
