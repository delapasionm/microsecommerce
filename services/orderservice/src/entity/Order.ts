import {BeforeInsert, Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm"
// import {User} from './User'

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number

    @CreateDateColumn()
    dateOrder: Date;

    @Column()
    orderStatus: string

    @Column()
    userId: number

    // @OneToOne(() => User)
    // @JoinColumn()
    // user: User

    @BeforeInsert()
    async setOrderStatus() {
        this.orderStatus = "In attesa di elaborazione"
    }
}
