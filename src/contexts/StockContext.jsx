import PropTypes from "prop-types";
import { createContext } from "react";

// Cria o contexto do estoque, que será compartilhado em toda a aplicação
export const StockContext = createContext({
  items: [], // Lista de itens do estoque
  addItem: () => {}, // Função para adicionar um item
  getItem: () => {}, // Função para buscar um item específico
  updateItem: () => {}, // Função para atualizar um item
  deleteItem: () => {}, // Função para remover um item
});

// Define que o Provider deve receber componentes filhos
StockContextProvider.propType = {
  children: PropTypes.node,
};

export function StockContextProvider({ children }) {
  // Estado global que armazena os itens do estoque
  // Ele começa lendo os dados do localStorage
  const [items, setItems] = useState(() => {
    const storedItems = localStorage.getItem("obc-react-stock");
  });
}
