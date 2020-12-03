import { FS_FILMS_COL, FS_QUOTES_COL } from '@/common/constants'
import { FirestoreService } from '@/firestore/firestore.service'
import { TranslatorService } from '@/translator/translator.service'
import { Injectable } from '@nestjs/common'
import { TranslateReq } from './translate-req.model'

@Injectable()
export class TranslateWorkerService {
    constructor(
        private fireStore: FirestoreService,
        private translator: TranslatorService,
    ) {}

    async process({ filmId, quoteId, quote }: TranslateReq) {
        const translated = await this.translator.translate(quote, 'en', 'fr')

        await this.fireStore.db
            .collection(FS_FILMS_COL)
            .doc(filmId)
            .collection(FS_QUOTES_COL)
            .doc(quoteId)
            .update({ 'quote.fr': translated })
    }
}
