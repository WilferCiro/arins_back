import { ExcelHeaderInterface } from "src/modules/files/application/interfaces/excel_header.interface";

export const saleIdExcelHeaders: ExcelHeaderInterface[] = [
  {
    header: "Fecha de creación",
    key: "createdAt",
  },
  {
    header: "Producto",
    key: "product",
  },
  {
    header: "Precio",
    key: "productPrice",
  },
  {
    header: "Cantidad",
    key: "productQuantity",
  },
  {
    header: "Total",
    key: "productTotal",
  },
  {
    header: "Valor del pedido",
    key: "orderPrice",
  },
  {
    header: "fecha del pedido",
    key: "orderPrice",
  },
];
