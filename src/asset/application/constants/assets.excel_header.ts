import { ExcelHeaderInterface } from "src/modules/files/application/interfaces/excel_header.interface";

export const assetsExcelHeaders: ExcelHeaderInterface[] = [
  {
    header: "Nombre",
    key: "name",
  },
  {
    header: "Placa",
    key: "plate",
  },
  {
    header: "Serial",
    key: "serial",
  },
  {
    header: "Precio",
    key: "price",
  },
  {
    header: "Categoría",
    key: "category",
  },
  {
    header: "Dependencia",
    key: "dependency",
  },
  {
    header: "Valoración",
    key: "assessment",
  },
  {
    header: "Estado",
    key: "status",
  },
  {
    header: "Adquirida en",
    key: "acquisitionDate",
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
