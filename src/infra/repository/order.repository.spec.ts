import { Sequelize } from "sequelize-typescript";
import OrderRepository from "./order.repository";
import Order from "../../domain/entity/order";
import Address from "../../domain/entity/address";
import ProductModel from "../db/sequelize/model/product.model";
import CustomerRepository from "./customer.repository";
import Customer from "../../domain/entity/customer";
import ProductRepository from "./product.repository";
import OrderItem from "../../domain/entity/order_item";
import Product from "../../domain/entity/product";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import CustomerModel from "../db/sequelize/model/customer.model";
import OrderModel from "../db/sequelize/model/order.model";

describe("Order repository tests", () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        sequelize.addModels([CustomerModel, OrderModel, OrderItemModel, ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a new order", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("161acd1a-c46c-4da0-878c-3c5a375bb928", "John Doe");
        const address = new Address("Street 1", 123, "City", "ZipCode");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product(
            "0db6a3f0-1092-496a-80e3-9cdaa0083b76",
            "Product 1",
            100,
        );
        await productRepository.create(product);

        const orderItem = new OrderItem("932316bf-ef56-4f03-94b8-0596f6a0f7e5", "Product 1", 100, "0db6a3f0-1092-496a-80e3-9cdaa0083b76", 2);
        const order = new Order("7ceb3894-32b7-4f3b-a141-73df8f83667b", customer.id, [orderItem]);

        const orderRepository = new OrderRepository();
        await orderRepository.create(order);

        const orderModel = await OrderModel.findOne({ where: { id: order.id }, include: ["items"] }); // O include serve para trazer os dados relacionados

        expect(orderModel.toJSON()).toStrictEqual({
            id: order.id,
            customer_id: customer.id,
            total: order.total(),
            items: [
                {
                    id: orderItem.id,
                    product_id: orderItem.productId,
                    order_id: order.id,
                    name: orderItem.name,
                    price: orderItem.price,
                    quantity: orderItem.quantity,
                },
            ], 
        });
    });
});