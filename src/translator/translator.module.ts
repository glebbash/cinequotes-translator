import { Module } from '@nestjs/common'
import { TranslatorService } from './translator.service'
import { TranslationServiceClient } from '@google-cloud/translate'
import { MockedTranslator } from '@/common/mock-translation'

@Module({
    providers: [
        {
            provide: TranslationServiceClient,
            useValue: new MockedTranslator(),
        },
        TranslatorService,
    ],
    exports: [TranslatorService],
})
export class TranslatorModule {}
