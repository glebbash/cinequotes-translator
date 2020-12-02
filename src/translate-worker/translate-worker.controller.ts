import { PUBSUB_SUBSCRIPTION } from '@/common/constants'
import { Message } from '@google-cloud/pubsub'
import { Controller } from '@nestjs/common'
import { EventPattern } from '@nestjs/microservices'
import { TranslateWorkerService } from './translate-worker.service'

@Controller('translate-worker')
export class TranslateWorkerController {
    constructor(private worker: TranslateWorkerService) {}

    @EventPattern(PUBSUB_SUBSCRIPTION)
    async translateQuote(message: Message) {
        const { data } = message
        const messageData = JSON.parse(data.toString())
        await this.worker.process(messageData)
        message.ack()
    }
}
