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
  _active: boolean = false;

  constructor(id: string, name: string, address: string) {
    this._id = id;
    this._name = name;
    this._address = address;
    this.validate();
  }

  validate(): void {
    if (!this._id) {
      throw new Error('ID is required');
    }
    if (!this._name) {
      throw new Error('Name is required');
    }
    if (!this._address) {
      throw new Error('Address is required');
    }
  }

  changeName(name: string): void {
    this._name = name;
    this.validate();
  }

  changeAddress(address: string): void {
    this._address = address;
    this.validate();
  }

  activate(): void {
    if (this._address.length === 0) {
        throw new Error('Cannot activate customer without address');
    }
    this._active = true;
  }

  deactivate(): void {
    this._active = false;
  }
}
