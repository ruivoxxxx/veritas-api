import { Module } from '@nestjs/common';
import { AuthModuleService } from './services/login/authService.module';

@Module({
    imports: [AuthModuleService],
    exports: [AuthModuleService],
})
export class AuthModule {}
