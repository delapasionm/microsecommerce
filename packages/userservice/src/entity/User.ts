import {BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm"
import bcrypt from 'bcryptjs';

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    username: string

    @Column()
    email: string

    @Column()
    password: string

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    age: number

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }

    // @OneToMany(() => Cart, cart => cart.user)
    // cart: Cart[];
}
