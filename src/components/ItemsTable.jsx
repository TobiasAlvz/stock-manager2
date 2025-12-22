import { Link } from "react-router-dom";
import useStock from "../hooks/useStock";

export default function ItemsTable() {
  // Obtém os itens do estoque a partir do contexto
  const { items } = useStock();

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Em Estoque</th>
          <th>Categoria</th>
          <th>Ações</th>
        </tr>
      </thead>

      <tbody>
        {items.map((item) => (
          <tr key={item.id}>
            {/* Exibe os dados do item */}
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.quantity} unid.</td>
            <td>{item.category}</td>

            {/* Botões de ação para cada item */}
            <td>
              {/* Navega para a tela de visualização */}
              <Link
                to={`/items/${item.id}`}
                className="button is-primary is-small"
              >
                Ver
              </Link>

              {/* Navega para a tela de edição */}
              <Link to={`/items/${item.id}/update`} className="button is-small">
                Atualizar
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
