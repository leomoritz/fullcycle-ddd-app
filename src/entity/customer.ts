/**
 * Entidade Customer
 * Representa um cliente com propriedades de identificação, nome e endereço.
 * Fornece métodos para acessar e modificar essas propriedades.
 * Trata-se de uma entidade anêmica, onde a classe só carrega dados e o identificador é o único atributo que define a identidade do cliente.
 * @class Customer
 * @property {string} _id - Identificador único do cliente.
 * @property {string} _name - Nome do cliente.
 * @property {string} _address - Endereço do cliente.
 */
class Customer {
  _id: string;
  _name: string;
  _address: string;
  _active: boolean = true;

  constructor(id: string, name: string, address: string) {
    this._id = id;
    this._name = name;
    this._address = address;
  }
  
  changeName(name: string): void {
    this._name = name;
  }

  activate(): void {
    this._active = true;
  }

  deactivate(): void {
    this._active = false;
  }
}
