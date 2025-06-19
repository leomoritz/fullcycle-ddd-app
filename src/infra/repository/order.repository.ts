import Order from "../../domain/entity/order";
import OrderRepositoryInterface from "../../domain/repository/order-repository.interface";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderModel from "../db/sequelize/model/order.model";

export default class OrderRepository implements OrderRepositoryInterface {

    async create(entity: Order): Promise<void> {
        await OrderModel.create(
            {
                id: entity.id,
                customer_id: entity.customerId,
                total: entity.total(),
                items: entity.items.map((item) => ({
                    id: item.id,
                    product_id: item.productId,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity
                })),
            },
            {
                include: [{ model: OrderItemModel }], // Para incluir os itens do pedido junto com o pedido
            });
    }

    async update(entity: Order): Promise<void> {
        // Update the order in the database
    }

    async findById(id: string): Promise<Order> {
        // Find the order by ID
        return null;
    }

    async findAll(): Promise<Order[]> {
        // Find all
        return null;
    }

}