import { Module } from '@nestjs/common'
import { TranslatorService } from './translator.service'
import { TranslationServiceClient } from '@google-cloud/translate'

@Module({
    providers: [
        {
            provide: TranslationServiceClient,
            useValue: new TranslationServiceClient(),
        },
        TranslatorService,
    ],
    exports: [TranslatorService],
})
export class TranslatorModule {}
