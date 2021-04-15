import api from './api'

export default {
    fetchComments() {
        return api().get('comments');
    },

    fetchAnswers() {
        return api().get('answers');
    },
}  