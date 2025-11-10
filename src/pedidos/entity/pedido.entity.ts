import { StatusPedido } from '../../enum/statuspedido.enum';
import { UsuarioEntity } from '../../usuario/entity/usuario.entity';
import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { ItemPedidoEntity } from './itemPedido.entity';

@Entity({ name: 'pedidos' })
export class PedidoEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'valor_total', nullable: true })
    valor_total: number;

    @Column({ name: 'status', enum: StatusPedido, nullable: true })
    status: StatusPedido;

    @Column({ name: 'created_at', type: 'timestamp', nullable: true })
    created_at;

    @Column({ name: 'updated_at', type: 'timestamp', nullable: true })
    updated_at;

    @Column({ name: 'deleted_at', type: 'timestamp', nullable: true })
    deleted_at;

    @ManyToOne(() => UsuarioEntity, (usuario) => usuario.pedidos, {
        eager: true,
    })
    usuario: UsuarioEntity;

    @OneToMany(() => ItemPedidoEntity, (itemPedido) => itemPedido.pedido, {
        cascade: true,
    })
    itemPedido: ItemPedidoEntity[];
}
