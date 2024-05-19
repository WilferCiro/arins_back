import { Sale } from "src/sale/domain/entities/sale.type";

export const getTotalSales = (sale: Sale) => {
  const prods = sale.sales.flatMap((s) => s.products);
  return prods.reduce((accumulator, dt) => {
    return dt.quantity * dt.price + accumulator;
  }, 0);
};
export const getTotalSalesIva = (sale: Sale) => {
  const prods = sale.sales.flatMap((s) => s.products);
  return prods.reduce((accumulator, dt) => {
    return dt.quantity * dt.price * (dt.iva / 100) + accumulator;
  }, 0);
};
export const getTotalOrders = (sale: Sale) => {
  return sale.orders.reduce((accumulator, dt) => {
    return dt.price + accumulator;
  }, 0);
};
