process.env.FIRESTORE_EMULATOR_HOST = 'localhost:8505'
process.env.PUBSUB_EMULATOR_HOST = 'localhost:8085'
process.env.FIRESTORE_PROJECT_ID = 'dummy-test'

import { AppModule } from '@/app.module'
import {
    FS_FILMS_COL,
    FS_QUOTES_COL,
    PUBSUB_SUBSCRIPTION,
} from './common/constants'
// import { mockTranslation, translate } from './common/mock-translation'
import { FirestoreService } from './firestore/firestore.service'
import { Test } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import { GCloudPubSubServer } from '@ecobee/nodejs-gcloud-pubsub-module/dist/microservice'
import { TranslateWorkerService } from './translate-worker/translate-worker.service'
import { setupPubSub } from './common/setup-pub-sub'
import fetch from 'node-fetch'

describe('translate-worker', () => {
    let app: INestApplication

    beforeEach(async () => {
        await clearDb()

        const testModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile()
        app = testModule.createNestApplication()

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
        await app.init()
        await setupPubSub(pubsub.client as any)
    })

    afterEach(async () => {
        await app.close()
    })

    it('works', () => {
        expect(1).toBe(1)
    })

    describe('Firestore', () => {
        it('connects successfuly', async (done) => {
            const firestore = app.get(FirestoreService)

            const res = await firestore.db
                .collection(FS_FILMS_COL)
                .limit(1)
                .get()

            expect(res).toBeDefined()
            done()
        })
    })

    it('updates db', async (done) => {
        const firestore = app.get(FirestoreService)
        const filmRef = await firestore.db
            .collection(FS_FILMS_COL)
            .add({ title: 'Star Wars' })

        const quoteRef = await filmRef.collection(FS_QUOTES_COL).add({
            actor: 'Harrison Ford',
            quote: {
                en: 'May the force be with you.',
                fr: 'May the force be with you.',
            },
        })

        const translateWorker = app.get(TranslateWorkerService)

        await translateWorker.process({
            filmId: filmRef.id,
            quoteId: quoteRef.id,
            quote: 'May the force be with you.',
        })

        const updatedQuoteRef = await quoteRef.get()
        const updatedQuote = updatedQuoteRef.data()

        expect(updatedQuote).toEqual({
            actor: 'Harrison Ford',
            quote: {
                en: 'May the force be with you.',
                fr: 'Que la force soit avec toi.',
            },
        })
        done()
    })
})

async function clearDb() {
    await fetch(
        `http://localhost:8505/emulator/v1/projects/dummy-test/databases/(default)/documents`,
        { method: 'DELETE' },
    )
}
