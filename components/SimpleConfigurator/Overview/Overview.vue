<template>
	<div class="w-full flex flex-col justify-end items-end gap-1 overflow-y-scroll ">
		<Card class="px-4 py-3 h-max shadow-sm overflow-scroll w-[400px] md:w-full max-w-screen-lg max-h-[500px]">
			<Table class="" id="stückliste">
				<TableCaption class="self-start">Ihre Stückliste</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead> Bild </TableHead>
						<TableHead> Article </TableHead>
						<TableHead> Bezeichnung </TableHead>
						<TableHead> PG </TableHead>
						<TableHead class="text-center">Menge</TableHead>
						<TableHead>Preis</TableHead>
						<TableHead class="text-right"> Total </TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					<ProductRow v-if="paket" :isPack="true" :products="[paket]" />
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
		<Button @click="generatePDF">Stückliste als PDF</Button>
		<Button @click="generateEXCEL">Stückliste als Excel</Button>
		<form id="elbridge_form" @submit.prevent="submitForm()" method="POST"
			enctype="multipart/form-data">
			<input type="hidden" name="version" value="2.0">
			<input type="hidden" name="country" value="DE">
			<input type="hidden" name="language" value="deu">
			<input type="hidden" name="result" value="">
			<Button> Übertragen an Großhandel</Button>
		</form>
		<Toaster :theme="toasterTheme" />
	</div>
</template>

<script lang="ts" setup>
//import
import StageTrackerMobile from "../general/stageTracker/stageTrackerMobile.vue";
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
import type { Packet } from "~/utils/interfaces/interfaces";
import type { Item } from "~/utils/interfaces/eltbridgeInterface";
// Function to update the theme based on the <html> class

//consts
const toasterTheme = ref("light");
const selectedProductsStore = useSelectedProductsStore();
const { replaceControlUnit, addPaket, getAllSelectedProducts} = selectedProductsStore
const { selectedProducts } = storeToRefs(
	selectedProductsStore
);

const result = ref({
	CONFIGURATION_URL: "https://konfigurator-smoky.vercel.app/",
	ITEM: []
});
const controlUnit = computed(() => selectedProducts.value.controlUnit);

const paket = computed(() => {
	if (
		selectedProducts.value.outdoorProducts.SelectedQuantity == 1 &&
		selectedProducts.value.indoorProducts.SelectedQuantity <= 20
	) {
		const packet: Packet = findPacket() as any
		if (packet)
			packet.quantity = packet?.quantity ? packet?.quantity : 1;
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

/// functions 
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
	if (paket.value && paket.value.Paket[2].MNR !== controlUnit.value.MNR) {
		const newUnit = Steuer.find((unit) => unit.MNR == paket.value.Paket[2].MNR);
		replaceControlUnit(newUnit);
	}
	if (paket.value) {
		addPaket(paket.value);
	}
	onUnmounted(() => observer.disconnect());

});

function findPacket() {
	const packet = Pakets.find((paket) => {
		if (
			paket.AnzahlISPaket ==
			selectedProducts.value.indoorProducts.SelectedQuantity.toString() &&
			paket.Paket[0].MNR ==
			selectedProducts.value.outdoorProducts.products[0].MNR &&
			paket.Paket[1].MNR == selectedProducts.value.indoorProducts.products[0]?.MNR
			&& selectedProducts.value.indoorProducts.products.length < 2
		)
			return true;
	});
	if (!packet) return null;
	return packet
}

async function submitForm() {
	result.value.ITEM = getAllSelectedProducts.map(product => {
		const item: Item = {
			SUPPLIER_ID_GLN: "4035138000000",
			MANUFACTURER_PID: product.MNR,
			DESCRIPTION_SHORT: product.KTXT,
			PRICE_AMOUNT: product.PERIODE1.toString(),
			CURRENCY: "EUR",
			PRICE_QUANTITY: `1`,
			QUANTITY: product.quantity.toString(),
			ORDER_UNIT: "C62",
			UDX_EDXF_DISCOUNT_GROUP_MANUFACTURER: `PG${product.PREISKNZ ? product.PREISKNZ - 200 : ""}`
		}
		return item
	})
	const data = await fetch("https://interface.elbridge2.itek.de/",{
		method: "POST",
		body: JSON.stringify(result.value)
	})
	console.log(data)
}
</script>
