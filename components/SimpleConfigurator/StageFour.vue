<template>
  <div class="w-full flex  flex-col justify-end items-end gap-1">
    <Table  id="stückliste" class="bg-white">
      <TableCaption>Ihre Stückliste</TableCaption>
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

    <div class=" bg-white  px-4 py-6 h-max shadow-sm">
      <table id="total" class="text-gray-800 space-y-4">
        <hr>
        <tr class="flex flex-wrap gap-4 text-sm font-bold">
          <td>Gesamtpreis :</td>
          <td class="ml-auto">{{ total }}€</td>
        </tr>
      </table>
    </div>
  </div>

  <div class="cart-actions flex gap-1 mt-2">
    <button @click="generatePDFHTML">Stückliste als PDF</button>
    <button @click="htmlToExcel">Stückliste als Excel</button>
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
import ProductRow from './ProductRow.vue';
import { utils, writeFileXLSX } from "xlsx";

const { data: base64 } = await useFetch('/api/base64')
const dataURI = base64.value

function generatePDFHTML() {
  const doc = new jsPDF()
  doc.setProperties({
    title: "Stückliste"
  })
  doc.text('Ihre Stückliste', 90, 30)
  const tableStyles = {
    margin: 100,
    fontSize: 14,
    headStyles: {
      fontSize: 12,
      fontStyle: 'bold',
      fillColor: [18, 11, 160],
      textColor: [255, 255, 255],
      lineColor: [0, 0, 0],
      valign: 'middle',
    },
  };
  doc.autoTable({
    startY: 40,
    html: '#stückliste',
    theme: 'grid',
    headStyles: tableStyles.headStyles
  })
  const finalY = doc.lastAutoTable.finalY += 10
  console.log(finalY)
  doc.autoTable({
    startY: finalY,
    StartX: 15,
    html: '#total',
    theme: 'grid',
    tableWidth: 'wrap',
    usecss: true,
    margin: { left: 157, right: 0 },
  })
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
console.log(selectedProducts.value)
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
console.log(total.value)

// onMounted(() => {
//   const tableSelect = document.getElementById("stückliste");
//   const tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');
//   console.log(tableHTML)
// }  )
</script>
