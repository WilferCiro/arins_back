import { ExcelHeaderInterface } from "src/modules/files/application/interfaces/excel_header.interface";

export const productExcelHeaders: ExcelHeaderInterface[] = [
  {
    header: "Código de barras",
    key: "barcode",
  },
  {
    header: "Nombre",
    key: "name",
  },
  {
    header: "Precio",
    key: "price",
  },
  {
    header: "Cantidad",
    key: "quantity",
  },
  {
    header: "Iva",
    key: "iva",
  },
  {
    header: "Presentación",
    key: "presentation",
  },
  {
    header: "Descripción",
    key: "description",
  },
  {
    header: "Bodega",
    key: "store",
  },
  {
    header: "Creado en",
    key: "createdAt",
  },
  {
    header: "Actualizado en",
    key: "updatedAt",
  },
];
