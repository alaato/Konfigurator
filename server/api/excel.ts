import ExcelJS from 'exceljs';
import logo from "@/data/logo.json"


export default defineEventHandler(async (event) => {
  try {
  const body : any[]= await readBody(event)
  body.splice(0,1)
  const workbook = new ExcelJS.Workbook();
  workbook.creator = 'TCS TürControlSysteme AG';
  const sheet = workbook.addWorksheet('Stückliste', {
    properties:{tabColor:{argb:'040372'}},
    headerFooter:{firstHeader: "Stuckliste", firstFooter: "TCS TürControlSysteme AG"},
    pageSetup:{paperSize: 9, orientation:'portrait'}
  });
  if(logo.base64){
    const imageId1 = workbook.addImage({
      base64: logo.base64,
      extension: 'jpeg',
    });
    sheet.addImage(imageId1, 'A1:C6');
  }

  const Stückliste = sheet.addTable({
    name: 'Stückliste',
    ref: 'A8',
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
  sheet.getColumn(1).width = 30
  const buffer = await workbook.xlsx.writeBuffer();
  event.node.res.setHeader('Content-Disposition', 'attachment; filename="Stuckliste.xlsx"');
  event.node.res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  send(event, buffer)
  return {message: buffer, status:200, buffer}
}
  catch (error) {
    console.log(error.message)
    return {message: error.message, status: 500}
  }
});

