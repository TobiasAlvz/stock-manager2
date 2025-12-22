import { useContext } from "react";
import { StockContext } from "../contexts/StockContext";

// Hook customizado para acessar o contexto do estoque
// Evita repetir useContext em vários componentes
export default function useStock() {
  return useContext(StockContext);
}
