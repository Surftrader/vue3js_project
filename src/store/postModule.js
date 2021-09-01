import axios from "axios";

export const postModule = {
    // состояние -> описывает данные, которые будут в приложении
    state: () => ({
        posts: [],
        isPostsLoading: false,
        selectedSort: "",
        searchQuery: "",
        page: 1,
        limit: 10,
        totalPages: 0,
        sortOptions: [
            { value: "title", name: "По названию" },
            { value: "body", name: "По содержанию" }
        ]
    }),
    // кэшируемые вычисляемые значения
    getters: {
        sortedPosts(state) {
            return [...state.posts].sort((post1, post2) =>
                post1[state.selectedSort] ?.localeCompare(post2[state.selectedSort])
            );
        },
        sortedAndSearchedPosts(state, getters) {
            return getters.sortedPosts.filter(post =>
                post.title.toLowerCase().includes(state.searchQuery.toLowerCase())
            );
        }
    },
    // функции в которых мы меняем значения поля
    mutations: {
        setPosts(state, posts) {
            state.posts = posts;
        },
        setLoading(state, bool) {
            state.isPostsLoading = bool;
        },
        setSelectedSort(state, selectedSort) {
            state.selectedSort = selectedSort;
        },
        setSearchQuery(state, searchQuery) {
            state.searchQuery = searchQuery;
        },
        setPage(state, page) {
            state.page = page;
        },
        setTotalPages(state, totalPages) {
            state.totalPages = totalPages;
        },
    },
    // функции которые используют мутации (не рекомендуется здесь изменять состояния объектов напрямую)
    actions: {
        async fetchPosts({ state, commit }) {
            try {
                commit('setLoading', true);
                const link = "https://jsonplaceholder.typicode.com/posts?";
                const response = await axios.get(link, {
                    params: {
                        _page: state.page,
                        _limit: state.limit
                    }
                });
                commit('setTotalPages', Math.ceil(
                    response.headers["x-total-count"] / state.limit
                ));
                // перезаписываем посты
                commit('setPosts', response.data);
            } catch (e) {
                alert("Ошибка");
            } finally {
                commit('setLoading', false);
            }
        },
        async loadMorePosts({ state, commit }) {
            try {
                commit('setPage', state.page + 1)
                const link = "https://jsonplaceholder.typicode.com/posts?";
                const response = await axios.get(link, {
                    params: {
                        _page: state.page,
                        _limit: state.limit
                    }
                });
                commit('setTotalPages', Math.ceil(
                    response.headers["x-total-count"] / state.limit
                ));
                // добавляем посты в конец массива
                commit('setPosts', [...state.posts, ...response.data]);
            } catch (e) {
                alert("Ошибка");
            }
        }
    },
    namespaced: true
}
