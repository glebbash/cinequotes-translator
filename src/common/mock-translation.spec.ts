import { MockedTranslator } from './mock-translation'

describe('mock-translation', () => {
    const translator = new MockedTranslator()

    it('translates example quotes', async (done) => {
        const enQuote = 'May the force be with you.'
        const mockFrQuote = 'Que la force soit avec toi.'

        const [res] = await translator.translateText({
            contents: [enQuote],
        })
        const frQuote = res.translations[0].translatedText

        expect(frQuote).toEqual(mockFrQuote)
        done()
    })

    it('returns originals for unknown quotes', async (done) => {
        const enQuote = 'Unknown quote'

        console.warn = jest.fn()

        const [res] = await translator.translateText({
            contents: [enQuote],
        })
        const frQuote = res.translations[0].translatedText

        expect(console.warn).toBeCalled()
        expect(frQuote).toEqual(enQuote)
        done()
    })
})
