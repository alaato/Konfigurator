import { toast } from "vue-sonner";
import { utils } from "xlsx";
import jsPDF from "jspdf";
import { applyPlugin } from "jspdf-autotable";
import logo from "@/data/logo.json";
import { font } from "@/fonts/BAHNSCHRIFT-normal";
applyPlugin(jsPDF);

const addFooters = (doc) => {
  const pageCount = doc.internal.getNumberOfPages();
  let finalY = (doc.lastAutoTable.finalY += 10);
  for (var i = 1; i <= pageCount; i++) {
    doc.setFontSize(6);
    doc.setFont("BAHNSCHRIFT", "normal");
    doc.setPage(i);
    doc.text(
      "seite " + String(i) + " of " + String(pageCount),
      doc.internal.pageSize.width / 2,
      270,
      {
        align: "center",
      }
    );
    doc.line(15, 275, 200, 275, "F");

    doc.text(
      "TCS TürControlSysteme AG\nGeschwister-Scholl-Str. 7\n39307 Genthin\nE-Mail: info@tcsag.de\nInternet: www.tcsag.de",
      20,
      280
    );
    doc.text(
      "Vorstand:\nDipl.-Ing. Otto Duffner (Vorsitzender)\nJohannes Duffner",
      50,
      280
    );
    doc.text(
      "Spk MagdeBurg\nIBAN: DE07 8105 3272 0711 0006 89\nBIC | SWIFT: NOLADE21MDG",
      90,
      280
    );
    doc.text(
      "Commerzbank Potsdam\nIBAN: DE37 1604 0000 0259 0495 00\nBIC | SWIFT: COBADEFFXXX",
      130,
      280
    );
    doc.text(
      "Sitz der Gesellschaft Genthin\nAmtsgericht Stendal\nHRB 3909\nSteuernummer: 10311116806 \nUSt-ID-Nr: DE 811838548 \n",
      170,
      280
    );
  }
};

export async function generatePDF() {
  const dataURI = logo.base64;
  const doc = new jsPDF();
  doc.setProperties({
    title: "Stückliste",
  });
  doc.addFileToVFS("BAHNSCHRIFT-normal.ttf", font);
  doc.addFont("BAHNSCHRIFT-normal.ttf", "BAHNSCHRIFT", "normal");
  doc.setFont("BAHNSCHRIFT", "normal");

  //ADD IMAGE
  if (dataURI) doc.addImage(dataURI, "JPEG", 160, 10, 40, 20);
  // Sender section
  doc.setFontSize(10);
  // doc.text("TCS TürControlSysteme AG · Geschwister-Scholl-Str. 7 · 39307 Genthin", 20, 40, { align: 'left' });
  doc.text("TCS TürControlSysteme AG", 200, 40, { align: "right" });
  doc.text("Geschwister-Scholl-Str. 7", 200, 45, { align: "right" });
  doc.text("39307 Genthin", 200, 50, { align: "right" });
  doc.text("Tel.: +49 3933 8799-10", 200, 55, { align: "right" });
  doc.text("E-Mail: info@tcsag.de", 200, 60, { align: "right" });
  doc.text("Internet: www.tcsag.de", 200, 65, { align: "right" });
  doc.setFont("times", "bold");

  doc.text(`Genthin, ${new Date().toLocaleDateString()}`, 200, 75, {
    align: "right",
  });
  //subject line
  doc.setFontSize(15);
  doc.text("Ihre Stückliste", 20, 90);

  // Recipient details - Top Left

  // main body- table
  const headStyles = {
    font: "BAHNSCHRIFT",
    fontSize: 10,
    fontStyle: "bold",
    fillColor: [18, 11, 160],
    textColor: [255, 255, 255],
    lineColor: [0, 0, 0],
  };
  const bodyStyles = {
    font: "BAHNSCHRIFT",
    fontSize: 10,
    minCellWidth: 10,
    minCellHeight: 10,
    valign: "center",
  };
  doc.autoTable({
    startY: 100,
    pageBrake: "auto",
    html: "#stückliste",
    headStyles: { ...headStyles },
    bodyStyles: bodyStyles,
    theme: "plain",
    margin: { left: 20, right: 20, bottom: 30 },
    didDrawCell: (data) => {
      if (data.section === "body" && data.column.index === 0) {
        var td = data.cell.raw;
        var img = td.getElementsByTagName("img")[0];
        const url = img?.src
          ? "https://corsproxy.io/?" + encodeURIComponent(img.src)
          : null;
        var dim = data.cell.height - data.cell.padding("vertical");
        var x = data.cell.x;
        const y = data.cell.y;
        if (url) doc.addImage(url, x - 2, y, data.cell.height, data.cell.width);
      }
    },
  });

  let finalY = (doc.lastAutoTable.finalY += 10);
  doc.autoTable({
    startY: finalY,
    bodyStyles: {
      ...headStyles,
      cellWidth: 35,
      lineWidth: 0,
    },
    html: "#total",
    margin: { left: 120, right: 20 },
  });

  // footer
  addFooters(doc);
  const savedPdf = doc.output("dataurlnewwindow");

  if (savedPdf) {
    toast.success("Datei wurde heruntergeladen", {
      description: new Date().toLocaleString(),
      action: {
        label: "Ok",
        onClick: () => null,
      },
    });
  } else {
    toast.error("Fehler", {
      description: new Date().toLocaleString(),
      action: {
        label: "Fehler",
        onClick: () => null,
      },
    });
  }
}
export async function generateEXCEL() {
  const table_elt = document.getElementById("stückliste");
  const total = document.getElementById("total");

  const listsheet = utils.table_to_sheet(table_elt);
  const totalSheet = utils.table_to_sheet(total);
  const listJson = utils.sheet_to_json(listsheet, { header: 1 });
  const totalJson = utils.sheet_to_json(totalSheet, { header: 1 });
  const completeJson = listJson.concat([[]]).concat(totalJson);

  const response: Blob = await $fetch("/api/excel", {
    method: "POST",
    body: completeJson,
  });

  if (response) {
    const url = window.URL.createObjectURL(response);
    const a = document.createElement("a");
    a.href = url;
    a.download = "stückliste.xlsx";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    toast.success("Datei wurde heruntergeladen", {
      description: new Date().toLocaleString(),
      action: {
        label: "Ok",
        onClick: () => null,
      },
    });
  } else {
    toast.error("Fehler", {
      description: new Date().toLocaleString(),
      action: {
        label: response.message,
        onClick: () => null,
      },
    });
  }
}
