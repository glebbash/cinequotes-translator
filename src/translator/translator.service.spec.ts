import { TranslationServiceClient } from '@google-cloud/translate'
import { Test, TestingModule } from '@nestjs/testing'
import { TranslatorService } from './translator.service'

jest.mock('@google-cloud/translate')

describe('TranslatorService', () => {
    let service: TranslatorService
    let googleTranslator: TranslationServiceClient

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                {
                    provide: 'TRANSLATOR_CLIENT',
                    useClass: TranslationServiceClient,
                },
                TranslatorService,
            ],
        }).compile()

        service = module.get(TranslatorService)
        googleTranslator = module.get('TRANSLATOR_CLIENT')
    })

    it(`calls google translate api with correct params
        and returns string`, async (done) => {
        const enQuote = 'May the force be with you.'
        const mockFrQuote = 'Que la force soit avec toi.'
        const translateRequest = {
            contents: [enQuote],
            sourceLanguageCode: 'en',
            targetLanguageCode: 'fr',
        }
        const translateResponse = [
            {
                translations: [
                    {
                        translatedText: mockFrQuote,
                    },
                ],
            },
        ]

        const translateTextSpy = jest
            .spyOn(googleTranslator, 'translateText')
            .mockResolvedValue(translateResponse as never)

        const frQuote = await service.translate(enQuote, 'en', 'fr')

        expect(translateTextSpy).toBeCalledWith(translateRequest)
        expect(frQuote).toEqual(mockFrQuote)
        done()
    })
})
