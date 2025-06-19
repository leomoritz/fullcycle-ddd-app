import Product from "../../domain/entity/product";
import ProductRepositoryInterface from "../../domain/repository/product-repository.interface";
import ProductModel from "../db/sequelize/model/product.model";

export default class ProductRepository implements ProductRepositoryInterface {

    async create(entity: Product): Promise<void> {
        await ProductModel.create({
            id: entity.id,
            name: entity.name,
            price: entity.price,
        })
    }

    async update(entity: Product): Promise<void> {
        await ProductModel.update(
            {
                name: entity.name,
                price: entity.price,
            },
            {
                where: {
                    id: entity.id,
                },
            });
    }

    async findById(id: string): Promise<Product> {
        const productModel = await ProductModel.findByPk(id);

        if (!productModel) {
            throw new Error("Product not found");
        }

        return new Product(
            productModel.id,
            productModel.name,
            productModel.price
        );
    }

    async findAll(): Promise<Product[]> {
        return await ProductModel.findAll().then(
            (products) => products.map((product) => {
                return new Product(
                    product.id,
                    product.name,
                    product.price
                );
            })
        );
    }

}