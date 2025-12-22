// Importa o hook useNavigate do react-router-dom
// Ele permite fazer navegação programática entre rotas
import { useNavigate } from "react-router-dom";

// Importa um hook personalizado que gerencia o estoque
// Esse hook provavelmente vem de um Context (useContext)
import useStock from "../hooks/useStock";

// Importa o PropTypes para validação das props do componente
import PropTypes from "prop-types";

// Define as validações das props que o componente espera receber
// Isso ajuda a evitar erros e facilita o entendimento do componente
DeleteButton.propTypes = {
  // itemId deve ser um número e é obrigatório
  itemId: PropTypes.number.isRequired,

  // itemName deve ser uma string e é obrigatório
  itemName: PropTypes.string.isRequired,
};

// Componente responsável por excluir um item do estoque
// Ele recebe o id do item e o nome do item via props
export default function DeleteButton({ itemId, itemName }) {
  // Extrai a função deleteItem do hook useStock
  // Essa função será usada para remover o item do estado/global
  const { deleteItem } = useStock();

  // Inicializa o navigate para redirecionar o usuário após a exclusão
  const navigate = useNavigate();

  // Função chamada quando o usuário clica no botão "Excluir"
  const handleDelete = () => {
    // Exibe uma caixa de confirmação no navegador
    // confirm retorna true se o usuário clicar em "OK"
    if (confirm(`Tem certeza que deseja excluir ${itemName}?`)) {
      // Remove o item do estoque usando o id recebido por props
      deleteItem(itemId);

      // Após excluir, redireciona o usuário para a rota /items
      navigate("/items");
    }
  };

  // Retorna o botão que dispara a exclusão
  return (
    <button
      // Classes de estilo (provavelmente do Bulma ou CSS semelhante)
      className="button is-danger is-small"
      // Ao clicar no botão, executa a função handleDelete
      onClick={handleDelete}
    >
      Excluir
    </button>
  );
}
