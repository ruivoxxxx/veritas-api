import { Module } from '@nestjs/common';
import { PedidosServiceModule } from './services/pedidosService.module';

@Module({
    imports: [PedidosServiceModule],
    exports: [PedidosServiceModule],
})
export class PedidosModule {}
