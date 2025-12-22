import PropTypes from "prop-types";
import StockItem, { CATEGORIES } from "../entities/StockItem";
import { useRef, useState } from "react";
import useStock from "../hooks/useStock";

ItemForm.propTypes = {
  itemToUpdate: PropTypes.object,
};

export default function ItemForm({ itemToUpdate }) {
  // Modelo padrão usado ao criar um novo item
  const defaultItem = {
    name: "",
    description: "",
    quantity: 0,
    price: 0,
    category: "",
  };

  // Estado do formulário (criação ou edição)
  const [item, setItem] = useState(itemToUpdate ?? defaultItem);

  // Funções vindas do contexto de estoque
  const { addItem, updateItem } = useStock();

  // Referência para focar o input após salvar
  const inputRef = useRef(null);

  // Atualiza o estado conforme o usuário digita
  const handleChange = (ev) => {
    setItem((current) => ({
      ...current,
      [ev.target.name]: ev.target.value,
    }));
  };

  // Envio do formulário
  const handleSubmit = (ev) => {
    ev.preventDefault();

    try {
      // Se existir itemToUpdate, estamos editando
      if (itemToUpdate) {
        updateItem(itemToUpdate.id, item);
        alert("Item atualizado com sucesso!");
      }
      // Caso contrário, estamos criando
      else {
        const validItem = new StockItem(item);
        addItem(validItem);
        setItem(defaultItem);
        alert("Item cadastrado com sucesso!");
      }
    } catch {
      alert("Ocorreu um erro.");
    } finally {
      // Volta o foco para o primeiro input
      inputRef.current.focus();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Campos principais do item */}
      <div className="row">
        <div>
          <label htmlFor="name">Nome</label>
          <input
            type="text"
            name="name"
            id="name"
            required
            ref={inputRef}
            value={item.name}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="quantity">Quantidade</label>
          <input
            type="number"
            name="quantity"
            id="quantity"
            required
            min={0}
            step={1}
            value={item.quantity}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="price">Preço</label>
          <input
            type="number"
            name="price"
            id="price"
            required
            min={0}
            step={0.01}
            value={item.price}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="category">Categoria</label>
          <select
            name="category"
            id="category"
            required
            value={item.category}
            onChange={handleChange}
          >
            <option disabled value="">
              Selecione uma categoria...
            </option>

            {/* Renderiza as categorias permitidas */}
            {CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Campo de descrição */}
      <div className="form-control">
        <label htmlFor="description">Descrição</label>
        <textarea
          name="description"
          id="description"
          required
          rows={6}
          value={item.description}
          onChange={handleChange}
        ></textarea>
      </div>

      <button className="button is-primary is-large">Salvar</button>
    </form>
  );
}
