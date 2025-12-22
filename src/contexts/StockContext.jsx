import { createContext, useState } from "react";
import PropTypes from "prop-types";

// Cria o contexto do estoque, que será compartilhado em toda a aplicação
export const StockContext = createContext({
  items: [],            // Lista de itens do estoque
  addItem: () => {},    // Função para adicionar um item
  getItem: () => {},    // Função para buscar um item específico
  updateItem: () => {}, // Função para atualizar um item
  deleteItem: () => {}, // Função para remover um item
});

// Define que o Provider deve receber componentes filhos
StockContextProvider.propTypes = {
  children: PropTypes.node,
};

export function StockContextProvider({ children }) {

  // Estado global que armazena os itens do estoque
  // Ele começa lendo os dados do localStorage
  const [items, setItems] = useState(() => {
    const storedItems = localStorage.getItem("obc-react-stock");

    // Se não existir nada salvo, inicia com array vazio
    if (!storedItems) return [];

    // Converte o JSON salvo em objeto JavaScript
    const items = JSON.parse(storedItems);

    // Converte datas que estavam como string para Date
    items.forEach((item) => {
      item.createdAt = new Date(item.createdAt);
      item.updatedAt = new Date(item.updatedAt);
    });

    return items;
  });

  // Adiciona um novo item ao estoque
  const addItem = (item) => {
    setItems((current) => {
      // Cria um novo array adicionando o item no início
      const updatedItems = [item, ...current];

      // Salva os dados atualizados no localStorage
      localStorage.setItem(
        "obc-react-stock",
        JSON.stringify(updatedItems)
      );

      return updatedItems;
    });
  };

  // Retorna um item específico pelo id
  const getItem = (itemId) => {
    // O + converte o id da URL para número
    return items.find((i) => i.id === +itemId);
  };

  // Atualiza os dados de um item existente
  const updateItem = (itemId, newAttributes) => {
    setItems((current) => {
      // Encontra o índice do item que será atualizado
      const itemIndex = current.findIndex(
        (i) => i.id === itemId
      );

      // Cria uma cópia do array de itens
      const updatedItems = [...current];

      // Atualiza apenas os dados necessários
      Object.assign(
        updatedItems[itemIndex],
        newAttributes,
        { updatedAt: new Date() } // Atualiza a data de modificação
      );

      // Salva as alterações no localStorage
      localStorage.setItem(
        "obc-react-stock",
        JSON.stringify(updatedItems)
      );

      return updatedItems;
    });
  };

  // Remove um item do estoque
  const deleteItem = (itemId) => {
    setItems((current) => {
      // Filtra removendo o item com o id informado
      const updatedItems = current.filter(
        (item) => item.id !== itemId
      );

      // Atualiza o localStorage
      localStorage.setItem(
        "obc-react-stock",
        JSON.stringify(updatedItems)
      );

      return updatedItems;
    });
  };

  // Objeto que será disponibilizado globalmente
  const stock = {
    items,
    addItem,
    getItem,
    updateItem,
    deleteItem,
  };

  // Provider libera o acesso ao estoque para toda a aplicação
  return (
    <StockContext.Provider value={stock}>
      {children}
    </StockContext.Provider>
  );
}
