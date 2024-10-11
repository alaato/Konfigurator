<template>
	<div class="w-full flex flex-col justify-end items-end gap-1 overflow-y-scroll py-4">
		<Card class="px-4 py-3 h-max shadow-sm overflow-y-scroll w-screen max-w-screen-md max-h-[500px]">
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
					<ProductRow v-if="paket" :products="[paket]" />
					<ProductRow :products="selectedProducts.outdoorProducts.products" :noPrice="paket ? true : false" />
					<ProductRow :noPrice="paket ? true : false" :products="selectedProducts.indoorProducts.products" />
					<ProductRow :noPrice="paket ? true : false" :products="[controlUnit]" />
					<ProductRow :products="selectedProducts.accessories.products" />
					<ProductRow :products="selectedProducts.extensions.products" />
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

	<div class="cart-actions flex gap-1 my-2">
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
import {
	generateEXCEL,
	generatePDF,
} from "@/utils/ConfiguratorUtils/generatingExcelAndPDF";
import Pakets from "@/data/pakets.json";
import Steuer from "@/data/steuer.json";
// Function to update the theme based on the <html> class
function updateToasterTheme() {
	const isDarkTheme = document.documentElement.classList.contains("dark");
	toasterTheme.value = isDarkTheme ? "dark" : "light";
}

//consts
const toasterTheme = ref("light");
const selectedProductsStore = useSelectedProductsStore();
const { replaceControlUnit } = selectedProductsStore
const { selectedProducts } = storeToRefs(
	selectedProductsStore
);
const controlUnit = computed(() => selectedProducts.value.controlUnit);

const paket = computed(() => {
	if (
		selectedProducts.value.outdoorProducts.SelectedQuantity == 1 &&
		selectedProducts.value.indoorProducts.SelectedQuantity <= 20
	) {
		const packet = findPacket() as any
		packet.quantity = 1;
		return packet
	} else null;
});
const total = computed(() => {
	let sum = 0;
	if (paket.value) sum += paket.value.PERIODE1;
	else {
		selectedProducts.value.outdoorProducts.products.forEach((product) => {
			sum +=
				product.PERIODE1 *
				selectedProducts.value.outdoorProducts.SelectedQuantity;
		});
		selectedProducts.value.indoorProducts.products.forEach((product) => {
			sum += product.quantity * product?.PERIODE1;
		});
		sum += controlUnit?.value.PERIODE1 * selectedProducts.value.controlUnit.quantity;
	}
	selectedProducts.value.accessories.products.forEach((product) => {
		sum += product.quantity * product?.PERIODE1;
	})
	selectedProducts.value.extensions.products.forEach((product) => {
		sum += product.quantity * product?.PERIODE1;
	})
	return sum;
});

onMounted(() => {
	updateToasterTheme();
	const observer = new MutationObserver(updateToasterTheme);
	observer.observe(document.documentElement, {
		attributes: true,
		attributeFilter: ["class"],
	});
	onUnmounted(() => observer.disconnect());
	if (paket.value.Paket[2].MNR !== controlUnit.value.MNR) {
		const newUnit = Steuer.find((unit) => unit.MNR == paket.value.Paket[2].MNR);
		replaceControlUnit(newUnit);
	}
});
//functions
function findPacket() {
	const packet = Pakets.find((paket) => {
		if (
			paket.AnzahlISPaket ==
			selectedProducts.value.indoorProducts.SelectedQuantity.toString() &&
			paket.Paket[0].MNR ==
			selectedProducts.value.outdoorProducts.products[0].MNR &&
			paket.Paket[1].MNR == selectedProducts.value.indoorProducts.products[0]?.MNR
		)
			return true;
	});
	if (!packet) return null;
	return packet
}
</script>
