import { Test, TestingModule } from '@nestjs/testing'
import { TranslateWorkerController } from './translate-worker.controller'
import { TranslateWorkerService } from './translate-worker.service'

jest.mock('./translate-worker.service')

describe('TranslateWorkerController', () => {
    let controller: TranslateWorkerController
    let service: TranslateWorkerService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [TranslateWorkerService],
            controllers: [TranslateWorkerController],
        }).compile()

        controller = module.get(TranslateWorkerController)
        service = module.get(TranslateWorkerService)
    })

    it('sends parsed data to service and acks message', async () => {
        const parsedMessage = {
            filmId: '123',
            quoteId: '321',
            quote: 'May the force be with you.',
        }
        const message: any = {
            ack: jest.fn(),
            data:
                '{"filmId":"123","quoteId":"321","quote":"May the force be with you."}',
        }

        const processSpy = jest
            .spyOn(service, 'process')
            .mockResolvedValue(undefined)

        await controller.translateQuote(message)

        expect(message.ack).toBeCalled()
        expect(processSpy).toBeCalledWith(parsedMessage)
    })
})
