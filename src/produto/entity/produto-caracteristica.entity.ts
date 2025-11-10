import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { ProdutoEntity } from './produto.entity';

@Entity('produto_caracteristica')
export class ProdutoCaracteristicaEntity {
    @PrimaryColumn('uuid')
    id: string;

    @Column({ name: 'nome', length: 100, nullable: false })
    nome: string;

    @Column({ name: 'descricao', length: 255, nullable: false })
    descricao: string;

    // @ManyToOne(() => ProdutoEntity, (produto) => produto.caracteristica, {
    //     orphanedRowAction: 'delete',
    //     onDelete: 'CASCADE',
    //     onUpdate: 'CASCADE',
    // })
    // produto: ProdutoEntity;
}
