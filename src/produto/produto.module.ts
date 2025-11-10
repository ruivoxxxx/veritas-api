import { Module } from '@nestjs/common';
import { ProdutoServiceModule } from './services/produtoService.module';

@Module({
    imports: [ProdutoServiceModule],
    exports: [ProdutoServiceModule],
})
export class ProdutoModule {}
