import { ProdutoCaracteristicaEntity } from '../produto/entity/produto-caracteristica.entity';
import { ProdutoImagemEntity } from '../produto/entity/produto-imagem.entity';
import { ProdutoEntity } from '../produto/entity/produto.entity';
import { UsuarioEntity } from '../usuario/entity/usuario.entity';
import { DataSource, DataSourceOptions } from 'typeorm';
import 'dotenv/config';
import { PedidoEntity } from '../pedidos/entity/pedido.entity';
import { ItemPedidoEntity } from '../pedidos/entity/itemPedido.entity';

const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [
        ProdutoEntity,
        UsuarioEntity,
        ProdutoImagemEntity,
        ProdutoCaracteristicaEntity,
        PedidoEntity,
        ItemPedidoEntity,
    ],
    synchronize: false,
    migrations: ['src/db/migrations/*.{js,ts}'],
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
