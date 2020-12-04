import { Module } from '@nestjs/common'
import { TranslateWorkerModule } from './translate-worker/translate-worker.module'

@Module({
    imports: [TranslateWorkerModule],
})
export class AppModule {}
