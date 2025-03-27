import React from "react";
import { Button, View } from "react-native";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const ExcellReport = (data: any[]) => {
  const exportToExcel = () => {
    if (!data || data.length === 0) {
      console.error("No data to export");
      return;
    }
  

    const headers = ['Покупатель', 'Машина', 'Стоимость', 'Остаток'];
    const rows: any[][] = [];
    let count = 14
    data.forEach((item: any) => {
      let tmpCount = 0
      let summa = 0
      const payments: string[] = []
      item.payments.forEach((payment: any) => {
        if(payment.sum != null) {
          tmpCount++; 
          summa += payment.sum
          payments.push(`${payment.sum} ${payment.date}`)
        }
      });
      count = tmpCount > count ? tmpCount : count;
      rows.push([item.customerName, item.latestNumber, item.summa_sell, item.summa_sell - summa, ...payments]);
    });

    for (let index = 1; index <= count; index++) {
      headers.push(index.toString())
    }
         
    const worksheet = XLSX.utils.aoa_to_sheet([headers]);
    XLSX.utils.sheet_add_aoa(worksheet, rows, { origin: -1 });
  
    const cols = [ {wch: 20}, { wch: 15 }, { wch: 15 }, { wch: 15 } ]

    for (let index = 0; index < count; index++) {
      cols.push({ wch: 10 });  
    }

    worksheet["!cols"] = cols;
    
    const colLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""); // Generate column letters dynamically

    for (let rowIndex = 1; rowIndex < 2 + data.length; rowIndex++) {
      for (let index = 0; index < 4 + count; index++) {
        const cell = `${colLetters[index]}${rowIndex}`;
        console.log(cell);
        if (worksheet[cell]) { // Ensure the cell exists before applying styles
          worksheet[cell].s = { alignment: { wrapText: true } };
        }
      }
    } 
    
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    // Create Excel file
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    // Convert to Blob for download
    const fileBlob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    // Download file (Web only)
    saveAs(fileBlob, "data.xlsx");
  };
  exportToExcel()
};

export default ExcellReport;
