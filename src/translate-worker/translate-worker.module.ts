import { FirestoreModule } from '@/firestore/firestore.module'
import { TranslatorModule } from '@/translator/translator.module'
import { Module } from '@nestjs/common'
import { TranslateWorkerController } from './translate-worker.controller'
import { TranslateWorkerService } from './translate-worker.service'

@Module({
    imports: [FirestoreModule, TranslatorModule],
    controllers: [TranslateWorkerController],
    providers: [TranslateWorkerService],
})
export class TranslateWorkerModule {}
