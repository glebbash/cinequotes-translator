process.env.FIRESTORE_EMULATOR_HOST = 'localhost:8505'
process.env.PUBSUB_EMULATOR_HOST = 'localhost:8085'
process.env.FIRESTORE_PROJECT_ID = 'dummy-prod'

import { GCloudPubSubServer } from '@ecobee/nodejs-gcloud-pubsub-module/dist/microservice/gcloud-pub-sub.server'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { PUBSUB_SUBSCRIPTION } from './common/constants'
import { setupPubSub } from './common/setup-pub-sub'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)

    const pubsub = new GCloudPubSubServer({
        authOptions: {
            projectId: 'dummy',
            uri: process.env.PUBSUB_EMULATOR_HOST,
        },
        subscriptionIds: [PUBSUB_SUBSCRIPTION],
    })

    app.connectMicroservice({
        strategy: pubsub,
    })

    await app.startAllMicroservicesAsync()
    await setupPubSub(pubsub.client as any)
}
bootstrap()
