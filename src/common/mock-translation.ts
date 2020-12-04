const mockedTranslations = {
    'Say hello to my little friend.': 'Dis bonjour à mon petit ami.',
    "Toto, I've got a feeling we're not in Kansas anymore.":
        "Toto, j'ai le sentiment que nous ne sommes plus au Kansas.",
    'May the force be with you.': 'Que la force soit avec toi.',
    'You talking to me?': 'Tu me parle?',
    'You had me at hello.': 'Vous me avez eu à bonjour.',
}

function translate(text: string) {
    let translatedText = mockedTranslations[text]
    if (translatedText === undefined) {
        console.warn('Skipping unmocked translations')
        translatedText = text
    }
    return [
        {
            translations: [
                {
                    detectedSourceLanguage: 'en',
                    translatedText,
                },
            ],
        },
    ]
}

export class MockedTranslator {
    translateText({ contents }) {
        return translate(contents[0]) as any
    }
}
