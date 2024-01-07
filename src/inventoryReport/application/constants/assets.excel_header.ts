import { ExcelHeaderInterface } from "src/modules/files/application/interfaces/excel_header.interface";

export const contableExcelHeaders: ExcelHeaderInterface[] = [
  {
    header: "Dependencia",
    key: "name",
  },
  {
    header: "Activos(nro)",
    key: "active_number",
  },
  {
    header: "Activos(%)",
    key: "active_percent",
  },
  {
    header: "Inactivos(nro)",
    key: "inactive_number",
  },
  {
    header: "Inactivos(%)",
    key: "inactive_percent",
  },
  {
    header: "Dados de baja(nro)",
    key: "baja_number",
  },
  {
    header: "Dados de baja(%)",
    key: "baja_percent",
  },
  {
    header: "Total",
    key: "total",
  },
];
