import { Model } from '@vuex-orm/core'
import User from './User'

export default class Article extends Model {
    static entity = 'articles'

    static fields() {
        return {
            id: this.attr(null),
            title: this.string(''),
            content: this.string(''),
            user_id: this.attr(null),
            user: this.belongsTo(User, 'user_id')
        }
    }
}
