import { formatNumber } from "@/components/CarDetails";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

const ExcellReport = async (data: any[]) => {
  if (!data || data.length === 0) {
    console.error("No data to export");
    return;
  }

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Sheet1");

  const headers = [
    "Покупатель",
    "Машина",
    "Стоимость",
    "Первоначальный взнос",
    "Остаток",
  ];
  let count = 14;

  const rows: any[][] = [];
  data.forEach((item: any) => {
    let tmpCount = 0;
    let summa = 0;
    const payments: string[] = [];

    item.payments.forEach((payment: any) => {
      if (payment.sum != null) {
        tmpCount++;
        summa += payment.sum;
        payments.push(`${formatNumber(payment.sum)} ${payment.date}`);
      }
    });

    count = Math.max(tmpCount, count);
    rows.push([
      item.customer_name,
      item.latestnumber,
      item.summa_sell,
      formatNumber(item.first_payment),
      item.summa_sell - summa - item.first_payment,
      ...payments,
    ]);
  });

  for (let i = 1; i <= count; i++) {
    headers.push(i.toString());
  }

  // Add header row
  worksheet.addRow(headers);

  // Add data rows
  rows.forEach((row) => worksheet.addRow(row));

  // Column Widths
  worksheet.columns = [
    { width: 20 },
    { width: 15 },
    { width: 15 },
    { width: 15 },
    { width: 15 },
    ...Array(count).fill({ width: 10 }),
  ];

  // Apply text wrapping to all cells
  worksheet.eachRow((row) => {
    row.eachCell((cell) => {
      cell.alignment = {
        wrapText: true,
        vertical: "middle",
        horizontal: "center",
      };
    });
  });

  const startRow = 1,
    endRow = 1 + data.length;
  const startCol = 1,
    endCol = 5 + count;

  for (let row = startRow; row <= endRow; row++) {
    for (let col = startCol; col <= endCol; col++) {
      const cell = worksheet.getCell(row, col);
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
    }
  }
  worksheet.getColumn(3).numFmt = "#,##0"; // Applies to column C
  worksheet.getColumn(4).numFmt = "#,##0"; // Applies to column D

  // Generate Excel file
  const buffer = await workbook.xlsx.writeBuffer();
  const fileBlob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  // Download file
  saveAs(fileBlob, "data.xlsx");
};

export default ExcellReport;
