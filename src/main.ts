import { GCloudPubSubServer } from '@ecobee/nodejs-gcloud-pubsub-module/dist/microservice/gcloud-pub-sub.server'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { PUBSUB_SUBSCRIPTION } from './common/constants'
import { mockTranslation } from './common/mock-translation'

async function bootstrap() {
    // uncomment to use real cloud translation
    mockTranslation()

    const app = await NestFactory.create(AppModule)

    app.connectMicroservice({
        strategy: new GCloudPubSubServer({
            authOptions: {
                projectId: 'dummy',
                uri: process.env.PUBSUB_EMULATOR_HOST,
            },
            subscriptionIds: [PUBSUB_SUBSCRIPTION],
        }),
    })

    await app.startAllMicroservicesAsync()
}
bootstrap()
