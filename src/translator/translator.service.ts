import { Injectable } from '@nestjs/common'
import { TranslationServiceClient } from '@google-cloud/translate'

@Injectable()
export class TranslatorService {
    constructor(private translator: TranslationServiceClient) {}

    async translate(text: string, from: string, to: string): Promise<string> {
        const [res] = await this.translator.translateText({
            contents: [text],
            sourceLanguageCode: from,
            targetLanguageCode: to,
        })
        return res.translations[0].translatedText
    }
}
