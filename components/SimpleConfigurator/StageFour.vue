<template>
  <div class="w-full flex flex-col justify-end items-end gap-1 overflow-y-scroll max-h-[400px]">
    <TableCaption class="self-start">Ihre Stückliste</TableCaption>

    <Table  id="stückliste" class="bg-white">
      <TableHeader>
        <TableRow >
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

    <div class=" bg-white  px-4 py-3 h-max shadow-sm">
      <hr>
      <table id="total" class="text-gray-800 space-y-4 my-1">
        <tr class="flex flex-wrap gap-4 text-sm font-bold">
          <td>Gesamtpreis :</td>
          <td class="ml-auto">{{ total }}€</td>
        </tr>
      </table>
    </div>
  </div>

  <div class="cart-actions flex gap-1 mt-2">
    <Button class="bg-arapawa-950 hover:bg-arapawa-900" @click="generatePDFHTML">Stückliste als PDF</Button>
    <Button class="bg-arapawa-950 hover:bg-arapawa-900" @click="htmlToExcel">Stückliste als Excel</Button>
  </div>

</template>

<script setup>
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import jsPDF from 'jspdf'
import { applyPlugin } from 'jspdf-autotable'
import ProductRow from './ProductRow.vue';
import { utils, writeFileXLSX } from "xlsx";

applyPlugin(jsPDF)

const { data: base64 } = await useFetch('/api/base64')
const dataURI = base64.value
console.log(dataURI)
function generatePDFHTML() {
  const doc = new jsPDF()
  const headStyles = {
      fontSize: 12,
      fontStyle: 'bold',
      fillColor: [18, 11, 160],
      textColor: [255, 255, 255],
      lineColor: [0, 0, 0],
      valign: 'middle',
  }
  doc.setProperties({
    title: "Stückliste"
  })
  doc.text('Ihre Stückliste', 90, 30)
  doc.autoTable({
    startY: 40,
    html: '#stückliste',
    theme: 'grid',
    headStyles: headStyles
  })
  
  let finalY = doc.lastAutoTable.finalY += 10
  doc.autoTable({
    startY: finalY,
    StartX: 15,
    html: '#total',
    theme: 'grid',
    tableWidth: 'wrap',
    usecss: true,
    margin: { left: 157, right: 0 },
  })
  console.log(doc)
  if(dataURI)
    doc.addImage(dataURI, "JPEG", 15, 10, 20, 20);
  doc.save('Stückliste');
}

function htmlToExcel() {
  const table_elt = document.getElementById("stückliste");
  const total = document.getElementById("total");

  const listsheet = utils.table_to_sheet(table_elt);
  const totalSheet = utils.table_to_sheet(total);
  const listJson = utils.sheet_to_json(listsheet, { header: 1 })
  const totalJson = utils.sheet_to_json(totalSheet, { header: 1 })
  const completeJson = listJson.concat(['']).concat(totalJson)
  const completeSheet = utils.json_to_sheet(completeJson, { skipHeader: true })

  const workbook = utils.book_new()
  utils.sheet_add_aoa(completeSheet, [["Created " + new Date().toISOString()]], { origin: -1 });
  utils.sheet_add_aoa(completeSheet, [["TCS Ag"]], { origin: -1 });

  utils.book_append_sheet(workbook, completeSheet, "Stückliste")
  if (!workbook.Props) workbook.Props = {};
  workbook.Props.Title = "Stückliste";
  workbook.Props.Company = "TCS";

  writeFileXLSX(workbook, "stückliste.xlsx");
}

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

// onMounted(() => {
//   const tableSelect = document.getElementById("stückliste");
//   const tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');
//   console.log(tableHTML)
// }  )
</script>
