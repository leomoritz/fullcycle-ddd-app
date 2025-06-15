import Address from './entity/address';
import Customer from './entity/customer';
import Order from './entity/order';
import OrderItem from './entity/order_item';

// Relação de agregação entre Customer e Address
// Customer contém um Address, mas Address não depende de Customer para existir
// Address é uma entidade independente que pode existir sem Customer
// Customer é uma entidade anêmica, onde a classe só carrega dados e o identificador é o único atributo que define a identidade do cliente
let customer = new Customer('18948747-3b9c-4d5d-be0b-b00b56812954', 'John Doe');
const address = new Address('Main St', 2, 'Springfield', 'IL', '62701');
customer.changeAddress(address);
customer.activate();

// Relação de agregação entre Order e OrderItem
// Order contém uma lista de OrderItem, mas OrderItem não depende de Order para existir
// OrderItem é uma entidade independente que pode existir sem Order
// A relação entre Order e Customer é uma relação de ID.
const item1 = new OrderItem('637c32cf-418f-4051-ae38-b40ea0bdade3', 'Mouse', 50, "b46938cd-b1b1-4815-8acc-aef4c28da8bf", 1);
const item2 = new OrderItem('9f015c73-602f-4780-bfcc-907b9d0d02a3', 'Keyboard', 100, "5e1e57d4-683c-495e-bec0-55c3393b1cf6", 2);
const order = new Order('fb5bee13-5251-4674-9144-7a66a12729f8', customer.id, [item1, item2]);