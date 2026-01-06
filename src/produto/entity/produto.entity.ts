import { ItemPedidoEntity } from '../../pedidos/entity/itemPedido.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'produtos' })
export class ProdutoEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'nome', length: '255', nullable: true })
    nome: string;

    @Column({ name: 'valor', nullable: true })
    valor: number;

    @Column({ name: 'quantidade', nullable: true })
    quantidade: number;

    @Column({ name: 'descricao', length: '255', nullable: true })
    descricao: string;

    @Column({ name: 'categoria', length: '100', nullable: true })
    categoria: string;
    @Column({ name: 'created_at', type: 'timestamp', nullable: true })
    created_at;

    @Column({ name: 'updated_at', type: 'timestamp', nullable: true })
    updated_at;

    @Column({ name: 'deleted_at', type: 'timestamp', nullable: true })
    deleted_at;

    @OneToMany(() => ItemPedidoEntity, (itemPedido) => itemPedido.pedido)
    itemPedido: ItemPedidoEntity[];
}
