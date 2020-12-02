import { Module } from '@nestjs/common'
import { TranslateWorkerModule } from './translate-worker/translate-worker.module'
import { TranslatorModule } from './translator/translator.module'

@Module({
    imports: [TranslateWorkerModule, TranslatorModule],
})
export class AppModule {}
