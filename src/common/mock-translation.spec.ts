import { TranslationServiceClient } from '@google-cloud/translate'
import { mockTranslation } from './mock-translation'

jest.mock('@google-cloud/translate')

describe('mock-translation', () => {
    const originalFunction = TranslationServiceClient.prototype.translateText

    afterEach(() => {
        TranslationServiceClient.prototype.translateText = originalFunction
    })

    it('monkey patches original class', () => {
        mockTranslation()

        expect(TranslationServiceClient.prototype.translateText).not.toBe(
            originalFunction,
        )
    })

    it('`s mokey patched function translates example data', async (done) => {
        const enQuote = 'May the force be with you.'
        const mockFrQuote = 'Que la force soit avec toi.'

        mockTranslation()

        const client = new TranslationServiceClient()
        const [res] = await client.translateText({
            contents: [enQuote],
        })
        const frQuote = res.translations[0].translatedText

        expect(frQuote).toEqual(mockFrQuote)
        done()
    })

    it('`s mokey patched function returns original quote for other data', async (done) => {
        const enQuote = 'Unknown quote'

        console.warn = jest.fn()

        mockTranslation()

        const client = new TranslationServiceClient()
        const [res] = await client.translateText({
            contents: [enQuote],
        })
        const frQuote = res.translations[0].translatedText

        expect(console.warn).toBeCalled()
        expect(frQuote).toEqual(enQuote)
        done()
    })
})
