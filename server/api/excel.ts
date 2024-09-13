import ExcelJS from 'exceljs';
import fs from 'fs';

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

  const imageId1 = workbook.addImage({
    buffer: fs.readFileSync('public/TCS_Logo_RGB.jpg'),
    extension: 'jpeg',
  });
  sheet.addImage(imageId1, 'A1:C6');
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
  const string = JSON.stringify(buffer)
  return {buffer: string, status: 200, message: 'ok'}
}
  catch (error) {
    return {message: error, status: 500}
  }
});

