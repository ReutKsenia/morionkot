import api from './api'

export default {
    fetchComments() {
        return api().get('comments');
    },
}  