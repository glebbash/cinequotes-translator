import { FirestoreService } from '@/firestore/firestore.service'
import { TranslatorService } from '@/translator/translator.service'
import { Test, TestingModule } from '@nestjs/testing'
import { TranslateReq } from './translate-req.model'
import { TranslateWorkerService } from './translate-worker.service'

describe('TranslateWorkerService', () => {
    const mockQuoteDoc = {
        update: jest.fn(),
    }
    const mockQuotesCol = {
        doc: jest.fn().mockReturnValue(mockQuoteDoc),
    }
    const mockFilmDoc = {
        collection: jest.fn().mockReturnValue(mockQuotesCol),
    }
    const mockFilmsCol = {
        doc: jest.fn().mockReturnValue(mockFilmDoc),
    }
    const mockFirestore = {
        db: { collection: jest.fn().mockReturnValue(mockFilmsCol) },
    }
    const mockTranslator = {
        translate: jest.fn(),
    }
    let service: TranslateWorkerService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                { provide: FirestoreService, useValue: mockFirestore },
                { provide: TranslatorService, useValue: mockTranslator },
                TranslateWorkerService,
            ],
        }).compile()

        service = module.get<TranslateWorkerService>(TranslateWorkerService)
    })

    it('calls translator api and updates quote in db', async (done) => {
        const translateReq: TranslateReq = {
            filmId: '123',
            quoteId: '321',
            quote: 'May the force be with you.',
        }
        const translatedText = 'Que la force soit avec toi.'
        mockTranslator.translate.mockResolvedValue(translatedText)

        await service.process(translateReq)

        expect(mockTranslator.translate).toBeCalledWith(
            translateReq.quote,
            'en',
            'fr',
        )
        expect(mockQuoteDoc.update).toBeCalledWith({
            'quote.fr': translatedText,
        })
        done()
    })
})
