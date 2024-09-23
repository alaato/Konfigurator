import { toast } from "vue-sonner";
import { utils } from "xlsx";
import jsPDF from "jspdf";
import { applyPlugin } from "jspdf-autotable";
applyPlugin(jsPDF);

const toDataURL = (url: string) =>
  fetch(url, {
    mode: "no-cors",
    method: "GET",
  })
    .then((response) => response.blob())
    .then(
      (blob) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        })
    );

export async function generatePDF() {
  const res = await fetch("/api/base64");
  const dataURI = await res.json().then((data) => data.base64);
  console.log(dataURI);
  const doc = new jsPDF();
  doc.setProperties({
    title: "Stückliste",
  });
  doc.setFont("times", "normal");

  //ADD IMAGE
  if (dataURI) doc.addImage(dataURI, "JPEG", 183, 10, 20, 15);
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
    font: "courier",
    fontSize: 12,
    fontStyle: "bold",
    fillColor: [18, 11, 160],
    textColor: [255, 255, 255],
    lineColor: [0, 0, 0],
  };
  const bodyStyles = {
    font: "courier",
  };
  doc.autoTable({
    startY: 100,
    html: "#stückliste",
    theme: "grid",
    headStyles: headStyles,
    bodyStyles: bodyStyles,
    margin: { left: 20, right: 20 },
    didDrawCell: (data) => {
      if (data.section === "body" && data.column.index === 0) {
        var td = data.cell.raw;
        var img = td.getElementsByTagName("img")[0];
        var dim = data.cell.height - data.cell.padding("vertical");
        var x = data.cell.x;
        var y = data.cell.y;
        toDataURL(img.src).then((dataUrl : string) => {
          doc.addImage(dataUrl, "JPEG", x+2, y+2, 20, 20);
        });
      }
    },
  });

  let finalY = (doc.lastAutoTable.finalY += 10);
  doc.autoTable({
    startY: finalY,
    bodyStyles: { ...bodyStyles, cellWidth: 35 },
    html: "#total",
    theme: "grid",
    margin: { left: 120, right: 20 },
  });

  // footer
  doc.line(15, 275, 200, 275, "F");
  doc.setFontSize(6);
  doc.setFont("times", "normal");
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
    85,
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

  if (response.type) {
    console.log(response);
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
