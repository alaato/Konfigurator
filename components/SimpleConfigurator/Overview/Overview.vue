<template>
	<div class="w-full flex flex-col justify-end items-end gap-1 overflow-y-scroll max-h-[500px]">

		<Card class="px-4 py-3 shadow-sm w-full">
			<Table id="stückliste">
				<TableCaption class="self-start">Ihre Stückliste</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead>
							Article
						</TableHead>
						<TableHead>Menge</TableHead>
						<TableHead>Preis</TableHead>
						<TableHead class="text-right">
							Total
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					<ProductRow :products="selectedProducts.indoorProducts.products" />
					<ProductRow :products="selectedProducts.outdoorProducts.products" />
					<ProductRow :products="selectedProducts.accessories.products" />
					<ProductRow :products="[controlUnit]" />
				</TableBody>
			</Table>
		</Card>


		<Card class="px-4 py-3 h-max shadow-sm">
			<hr>
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
} from '@/components/ui/table'
import { toast } from 'vue-sonner'
import { Toaster } from '@/components/ui/sonner'
import jsPDF from 'jspdf'
import { applyPlugin } from 'jspdf-autotable'
import ProductRow from './ProductRow.vue';
import { utils } from "xlsx";
applyPlugin(jsPDF)


// Function to update the theme based on the <html> class
function updateToasterTheme() {
	const isDarkTheme = document.documentElement.classList.contains('dark');
	toasterTheme.value = isDarkTheme ? 'dark' : 'light';
}


onMounted(() => {
	updateToasterTheme();
	const observer = new MutationObserver(updateToasterTheme);
	observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

	onUnmounted(() => observer.disconnect());
});
//consts
const toasterTheme = ref('light');
const selectedProductsStore = useSelectedProductsStore();
const { selectedProducts } = storeToRefs(selectedProductsStore)
const controlUnit = selectedProducts.value.controlUnit

const total = computed(() => {
	let sum = 0
	selectedProducts.value.outdoorProducts.products.forEach((product) => {
		sum += product.PERIODE1 * selectedProducts.value.outdoorProducts.SelectedQuantity
	})
	selectedProducts.value.indoorProducts.products.forEach((product) => {
		sum += product.quantity * product?.PERIODE1
	})
	sum += selectedProducts.value.controlUnit?.PERIODE1
	return sum
})

const { data } = await useFetch('/api/base64')
const dataURI = data.value.base64

//functions

function generatePDF() {
	const doc = new jsPDF()
	doc.setProperties({
		title: "Stückliste"
	})
	doc.setFont("times-roman", "normal");

	//ADD IMAGE
	if (dataURI)
		doc.addImage(dataURI, "JPEG", 183, 10, 20, 15,);
	// Sender section 
	doc.setFontSize(10);
	// doc.text("TCS TürControlSysteme AG · Geschwister-Scholl-Str. 7 · 39307 Genthin", 20, 40, { align: 'left' });
	doc.text("TCS TürControlSysteme AG", 200, 40, { align: 'right' });
	doc.text("Geschwister-Scholl-Str. 7", 200, 45, { align: 'right' });
	doc.text("39307 Genthin", 200, 50, { align: 'right' });
	doc.text("Tel.: +49 3933 8799-10", 200, 55, { align: 'right' });
	doc.text("E-Mail: info@tcsag.de", 200, 60, { align: 'right' });
	doc.text("Internet: www.tcsag.de", 200, 65, { align: 'right' });
	doc.setFont("times-roman", "bold");

	doc.text(`Genthin, ${new Date().toLocaleDateString()}`, 200, 75, { align: 'right' });

	//subject line
	doc.setFontSize(15);
	doc.text('Ihre Stückliste', 20, 90)


	// Recipient details - Top Left

	// main body- table
	const headStyles = {
		font: 'courier',
		fontSize: 12,
		fontStyle: 'bold',
		fillColor: [18, 11, 160],
		textColor: [255, 255, 255],
		lineColor: [0, 0, 0],
	}
	const bodyStyles = {
		font: 'courier',
	}
	doc.autoTable({
		startY: 100,
		html: '#stückliste',
		theme: 'grid',
		headStyles: headStyles,
		bodyStyles: bodyStyles,
		margin: { left: 20, right: 20 },
	})

	let finalY = doc.lastAutoTable.finalY += 10
	doc.autoTable({
		startY: finalY,
		bodyStyles: { ...bodyStyles, cellWidth: 35 },
		html: '#total',
		theme: 'grid',
		margin: { left: 120, right: 20 },
	})

	// footer 
	doc.line(15, 275, 200, 275, 'F')
	doc.setFontSize(6);
	doc.setFont("times-roman", "normal");
	doc.text("TCS TürControlSysteme AG\nGeschwister-Scholl-Str. 7\n39307 Genthin\nE-Mail: info@tcsag.de\nInternet: www.tcsag.de", 20, 280);
	doc.text("Vorstand:\nDipl.-Ing. Otto Duffner (Vorsitzender)\nJohannes Duffner", 50, 280);
	doc.text("Spk MagdeBurg\nIBAN: DE07 8105 3272 0711 0006 89\nBIC | SWIFT: NOLADE21MDG", 85, 280);
	doc.text("Commerzbank Potsdam\nIBAN: DE37 1604 0000 0259 0495 00\nBIC | SWIFT: COBADEFFXXX", 130, 280);
	doc.text("Sitz der Gesellschaft Genthin\nAmtsgericht Stendal\nHRB 3909\nSteuernummer: 10311116806 \nUSt-ID-Nr: DE 811838548 \n", 170, 280);

	const savedPdf = doc.output('dataurlnewwindow');

	if (savedPdf) {
		toast.success('Datei wurde heruntergeladen', {
			description: new Date().toLocaleString(),
			action: {
				label: 'Ok',
				onClick: () => null,
			},
		})
	}
	else {
		toast.error('Fehler', {
			description: new Date().toLocaleString(),
			action: {
				label: response.message,
				onClick: () => null,
			},
		})
	}
}

async function generateEXCEL() {

	const table_elt = document.getElementById("stückliste");
	const total = document.getElementById("total");

	const listsheet = utils.table_to_sheet(table_elt);
	const totalSheet = utils.table_to_sheet(total);
	const listJson = utils.sheet_to_json(listsheet, { header: 1 })
	const totalJson = utils.sheet_to_json(totalSheet, { header: 1 })
	const completeJson = listJson.concat([[]]).concat(totalJson)

	const response = await $fetch('/api/excel', {
		method: 'POST',
		body: completeJson
	})

	if (response.status != 500) {
		console.log(response)
		const url = window.URL.createObjectURL(response.buffer);
		const a = document.createElement('a');
		a.href = url;
		a.download = 'stückliste.xlsx';
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		window.URL.revokeObjectURL(url);
		toast.success('Datei wurde heruntergeladen', {
			description: new Date().toLocaleString(),
			action: {
				label: 'Ok',
				onClick: () => null,
			},
		})
	}
	else {
		toast.error('Fehler', {
			description: new Date().toLocaleString(),
			action: {
				label: response.message,
				onClick: () => null,
			},
		})
	}
}
</script>
