import ExcelJS from 'exceljs';
import fs from 'fs';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineEventHandler(async (event) => {
  try {
  const body : any[]= await readBody(event)
  body.splice(0,1)
  const workbook = new ExcelJS.Workbook();
  workbook.creator = 'TCS TürControlSysteme AG';
  const sheet = workbook.addWorksheet('Stückliste', {
    properties:{tabColor:{argb:'040372'}},
    headerFooter:{firstHeader: "Stückliste", firstFooter: "TCS TürControlSysteme AG"},
    pageSetup:{paperSize: 9, orientation:'portrait'}
  });
  const filePath = resolve(__dirname + `/assests/TCS_Logo_RGB.jpg`);
  if(filePath){
    const imageId1 = workbook.addImage({
      buffer: fs.readFileSync(filePath),
      extension: 'jpeg',
    });
    sheet.addImage(imageId1, 'A1:C6');
  }

  const Stückliste = sheet.addTable({
    name: 'Stückliste',
    ref: 'F7',
    style: {
      showRowStripes: true,
    },
    columns: [
      {name: 'Article', totalsRowLabel: 'Totals:', filterButton: true},
      {name: 'Menge', totalsRowFunction: 'sum', filterButton: false},
      {name: 'Preis'},
      {name: 'Total'},
    ],
    rows: body,

  });
  sheet.getColumn(6).width = 30
  const buffer = await workbook.xlsx.writeBuffer();
  event.node.res.setHeader('Content-Disposition', 'attachment; filename="Stückliste.xlsx"');
  event.node.res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  send(event, buffer)
  return {message: buffer, status:200, buffer}
}
  catch (error) {
    console.log(error.message)
    return {message: error.message, status: 500}
  }
});

