import { Model } from '@vuex-orm/core'
import Article from './Article'

export default class User extends Model {
    static entity = 'users'

    static fields() {
        return {
            id: this.attr(null),
            name: this.string(''),
            articles: this.hasMany(Article, 'user_id')
        }
    }
}
