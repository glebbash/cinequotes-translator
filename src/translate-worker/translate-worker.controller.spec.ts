import { Test, TestingModule } from '@nestjs/testing'
import { TranslateWorkerController } from './translate-worker.controller'

describe('TranslateWorkerController', () => {
    let controller: TranslateWorkerController

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [TranslateWorkerController],
        }).compile()

        controller = module.get<TranslateWorkerController>(
            TranslateWorkerController,
        )
    })

    it('should be defined', () => {
        expect(controller).toBeDefined()
    })
})
