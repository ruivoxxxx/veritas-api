import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConfigService } from './config/postgres.config.service';
import { ConfigModule } from '@nestjs/config';
import { ProdutoModule } from './produto/produto.module';
import { UsuarioModule } from './usuario/usuario.module';
import { PedidosModule } from './pedidos/pedidos.module';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        TypeOrmModule.forRootAsync({
            useClass: PostgresConfigService,
            inject: [PostgresConfigService],
        }),
        ProdutoModule,
        UsuarioModule,
        PedidosModule,
        CacheModule.registerAsync({
            useFactory: async () => ({
                store: await redisStore({
                    socket: {
                        host: '127.0.0.1',
                        port: 6379,
                    },
                    ttl: 3600 * 1000,
                }),
            }),
            isGlobal: true,
        }),
        AuthModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
