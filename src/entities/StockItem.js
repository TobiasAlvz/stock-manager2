// Lista de categorias permitidas no sistema
export const CATEGORIES = ["Jogos", "Livros", "Brinquedos", "Acessórios"];

// Classe que representa um item do estoque
export default class StockItem {
  constructor({ name, description, quantity, price, category }) {
    // Gera um id aleatório para o item
    this.id = Math.floor(Math.random() * 10000000);

    // Atribui os valores recebidos
    this.name = name;
    this.description = description;

    // Converte valores numéricos
    this.quantity = +quantity;
    this.price = +price;

    this.category = category;

    // Datas de criação e atualização
    this.createdAt = new Date();
    this.updatedAt = new Date();

    // Valida os dados antes de permitir a criação
    this.#validate();
  }

  // Método privado responsável pela validação
  #validate() {
    // Verifica se os tipos são válidos
    const validName = typeof this.name === "string";
    const validDescription = typeof this.description === "string";
    const validQuantity =
      typeof this.quantity === "number" && Number.isInteger(this.quantity);
    const validPrice = typeof this.price === "number";
    const validCategory = CATEGORIES.includes(this.category);

    // Se algum dado for inválido, lança erro
    if (
      !(
        validName &&
        validDescription &&
        validQuantity &&
        validPrice &&
        validCategory
      )
    ) {
      throw new Error("Invalid item!");
    }
  }
}
