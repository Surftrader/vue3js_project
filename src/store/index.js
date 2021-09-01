import { createStore } from "vuex";

export default createStore({
    // состояние -> описывает данные, которые будут в приложении
    state: {
        likes: 4,
        isAuth: false
    },
    // кэшируемые вычисляемые значения
    getters: {
        doubleLikes(state) {
            return state.likes * 2;
        }
    },
    // функции в которых мы меняем значения поля
    mutations: {
        incrementLikes(state) {
            state.likes += 1;
        },
        decrementLikes(state) {
            state.likes -= 1;
        }
    },
    // функции которые используют мутации (не рекомендуется здесь изменять состояния объектов напрямую)
    actions: {

    },
    modules: {

    }
})
