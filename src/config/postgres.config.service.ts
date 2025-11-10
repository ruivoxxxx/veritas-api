import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Pool } from 'pg';
import { ItemPedidoEntity } from 'src/pedidos/entity/itemPedido.entity';
import { PedidoEntity } from 'src/pedidos/entity/pedido.entity';
import { ProdutoCaracteristicaEntity } from 'src/produto/entity/produto-caracteristica.entity';
import { ProdutoImagemEntity } from 'src/produto/entity/produto-imagem.entity';
import { ProdutoEntity } from 'src/produto/entity/produto.entity';
import { UsuarioEntity } from 'src/usuario/entity/usuario.entity';
@Injectable()
export class PostgresConfigService implements TypeOrmOptionsFactory {
    constructor(private readonly configService: ConfigService) {}
    createTypeOrmOptions():
        | Promise<TypeOrmModuleOptions>
        | TypeOrmModuleOptions {
        return {
            type: 'postgres',
            host: this.configService.get<string>('DB_HOST'),
            port: this.configService.get<number>('DB_PORT'),
            username: this.configService.get<string>('DB_USERNAME'),
            password: this.configService.get<string>('DB_PASSWORD'),
            database: this.configService.get<string>('DB_NAME'),
            entities: [
                ProdutoEntity,
                UsuarioEntity,
                ProdutoImagemEntity,
                ProdutoCaracteristicaEntity,
                PedidoEntity,
                ItemPedidoEntity,
            ],
            synchronize: false,
            logging: true,
        };
    }
}
export const pool = new Pool({
    user: 'DB_USERNAME',
    host: 'DB_HOST',
    database: 'DB_NAME',
    password: 'DB_PASSWORD',
    port: 5432,
});
