import { DynamicModule, Module } from '@nestjs/common'
import { TranslatorService } from './translator.service'
import { TranslationServiceClient } from '@google-cloud/translate'

@Module({})
export class TranslatorModule {
    static forRoot(): DynamicModule {
        const client = new TranslationServiceClient()

        return {
            module: TranslatorModule,
            providers: [
                TranslatorService,
                { provide: 'TRANSLATOR_CLIENT', useValue: client },
            ],
            exports: [TranslatorService],
        }
    }
}
