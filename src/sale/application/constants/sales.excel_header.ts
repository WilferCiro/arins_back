import { ExcelHeaderInterface } from "src/modules/files/application/interfaces/excel_header.interface";

export const salesExcelHeaders: ExcelHeaderInterface[] = [
  {
    header: "Fecha de creación",
    key: "createdAt",
  },
  {
    header: "Dinero inicial",
    key: "initialMoney",
  },
  {
    header: "Total ventas",
    key: "totalSales",
  },
  {
    header: "Total pedidos",
    key: "totalOrders",
  },
  {
    header: "Dinero final",
    key: "finalMoney",
  },
  {
    header: "Nro. ventas",
    key: "countSales",
  },
  {
    header: "Nro. pedidos",
    key: "countOrders",
  },
];
