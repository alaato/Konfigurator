function generatePDF() {
  const doc = new jsPDF();

  // Define the table columns and data
  const tableColumns = ['Article', 'Menge', 'Preis', 'Total'];
  const tableData = [
    ...selectedProducts.value.outdoorProducts.products.map((product) => [
      product.MNR,
      selectedProducts.value.outdoorProducts.SelectedQuantity,
      product.PERIODE1,
      selectedProducts.value.outdoorProducts.SelectedQuantity * product.PERIODE1
    ]),
    ...selectedProducts.value.indoorProducts.products.map((product) => [
      product.MNR,
      selectedProducts.value.indoorProducts.SelectedQuantity,
      product.PERIODE1,
      selectedProducts.value.indoorProducts.SelectedQuantity * product.PERIODE1
    ]),
    [controlUnit.MNR, 1, controlUnit.PERIODE1, controlUnit?.PERIODE1]
  ];

  // Calculate the table widths and headers
  const tableWidths = tableColumns.map(() => 40);
  const tableHeaders = tableColumns.map((column) => ({
    content: column,
    styles: { halign: 'center' }
  }));

  // Convert the table data to a format suitable for jsPDF AutoTable
  const tableBody = tableData.map((row) => ({
    qty: row[1],
    price: row[2],
    total: row[3]
  }));

  // Define the table styles
  const tableStyles = {
    margin: 10,
    fontSize: 8,
    headStyles: {
      fillColor: [255, 255, 255],
      textColor: [0, 0, 0]
    },
    bodyStyles: {
      fillColor: [240, 240, 240],
      textColor: [0, 0, 0]
    }
  };

  // Generate the PDF
  doc.autoTable(tableColumns, tableData, {
    theme: 'grid',
    showHead: 'everyPage',
    styles: tableStyles,
    columnStyles: {
      qty: { halign: 'right' },
      price: { halign: 'right' },
      total: { halign: 'right' }
    },
    startY: 40
  });

  // Add a footer to the PDF
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.text('Seite ' + i + ' von ' + pageCount, doc.internal.pageSize.width / 2, 287, { align: 'center' });
  }

  // Save the PDF
  doc.save('Stückliste.pdf');
}
