import {Column, Entity, PrimaryGeneratedColumn} from "typeorm"

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column({nullable: true})
    description: string

    @Column({type: 'decimal', precision: 10, scale: 2})
    price: number

    @Column({type: 'int', default: 0})
    stock: number
}
