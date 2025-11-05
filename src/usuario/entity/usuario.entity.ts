import { PedidoEntity } from '../../pedidos/entity/pedido.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'usuarios' })
export class UsuarioEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    // @Column({ name: 'nome_usuario', length: 100, nullable: false })
    // nome_usuario: string;

    @Column({ name: 'nome', length: 255, nullable: true })
    nome: string;

    @Column({ name: 'email', length: 255, nullable: true })
    email: string;

    @Column({ name: 'senha', length: 255, nullable: true })
    senha: string;

    @Column({ name: 'created_at', type: 'timestamp', nullable: true })
    created_at;

    @Column({ name: 'updated_at', type: 'timestamp', nullable: true })
    updated_at;

    @Column({ name: 'deleted_at', type: 'timestamp', nullable: true })
    deleted_at;

    @OneToMany(() => PedidoEntity, (pedido) => pedido.usuario)
    pedidos: PedidoEntity[];
}
