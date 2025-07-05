import { prepareOptions } from "sequelize-typescript";
import Order from "../entity/order";
import OrderItem from "../entity/order_item";

interface OrderFactoryProps {
    id: string;
    customerId: string;
    items: Array<{
        id: string;
        name: string;
        productId: string;
        quantity: number;
        price: number;
    }>;
}

export default class OrderFactory {
    static create(orderProps: OrderFactoryProps): Order {
        const items = orderProps.items.map(item => {
            return new OrderItem(
                item.id,
                item.name,
                item.price,
                item.productId,
                item.quantity
            );
        });

        return new Order(orderProps.id, orderProps.customerId, items);
    }
}