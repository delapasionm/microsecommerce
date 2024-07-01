import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique} from "typeorm"
// import {Product} from './Product'
import {Order} from "./Order";

@Entity()
@Unique(['order', 'productId'])
export class OrderProduct {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    quantity: number

    @Column('decimal', {precision: 10, scale: 2})
    unitPrice: number

    @Column('decimal', {precision: 10, scale: 2})
    totalPrice: number;

    @ManyToOne(() => Order)
    @JoinColumn()
    order: Order
    //
    // @ManyToOne(() => Product)
    // @JoinColumn()
    // product: Product

    @Column()
    productId: number
}
