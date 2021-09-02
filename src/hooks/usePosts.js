import axios from "axios";
import { ref, onMounted } from 'vue';

export function usePosts(limit) {
    const posts = ref([])
    const totalPages = ref(0)
    const isPostsLoading = ref(true)
    const fetching = async () => {
        try {
            const link = 'https://jsonplaceholder.typicode.com/posts';
            const response = await axios.get(link, {
                params: {
                    _page: 1, // hardcoded
                    _limit: limit
                }
            });
            totalPages.value = Math.ceil(response.headers['x-total-count'] / limit)
            posts.value = response.data;
        } catch (e) {
            alert('Ошибка')
        } finally {
            isPostsLoading.value = false;
        }
    }

    onMounted(fetching)

    return {
        posts, isPostsLoading, totalPages
    }
}
