import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export class Produto {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    name: string;
    
    @Column('decimal')
    value: number;
}
