<template>
    <div class="app">
      <h1>Страница с постами</h1>
      <div class="app__btns">
        <my-button
        @click="showDialog"
        >
        Создать пост
        </my-button>
        <my-select 
          v-model="selectedSort"
          :options="sortOptions"
        />
      </div>      
      <my-dialog v-model="dialogVisible">
        <post-form 
        @create="createPost" 
      />
      </my-dialog>
      <post-list
        :posts="posts"
        @remove="removePost"
        v-if="!isPostsLoading"      
      />
      <div v-else>Идет загрузка...</div>
    </div>
</template>

<script>
import PostForm from "@/components/PostForm";
import PostList from "@/components/PostList";
import axios from "axios";

export default {
  // регистрация компонентов
  components: {
    PostForm,
    PostList
  },
  data() {
    return {
      posts: [],
      dialogVisible: false,
      isPostsLoading: false,
      selectedSort: "",
      sortOptions: [
        { value: "title", name: "По названию" },
        { value: "body", name: "По содержанию" }
      ]
    };
  },
  methods: {
    createPost(post) {
      this.posts.push(post);
      this.dialogVisible = false;
    },
    removePost(post) {
      this.posts = this.posts.filter(p => p.id !== post.id);
    },
    showDialog() {
      this.dialogVisible = true;
    },
    async fetchPosts() {
      try {
        this.isPostsLoading = true;
        setTimeout(async () => {
          const link = "https://jsonplaceholder.typicode.com/posts?_limit=10";
          const response = await axios.get(link);
          this.posts = response.data;
        }, 1000);
      } catch (e) {
        alert("Ошибка");
      } finally {
        this.isPostsLoading = false;
      }
    }
  },
  mounted() {
    this.fetchPosts();
  },
  watch: {
    // такое же название, как и модель которая объявлена в компоненте
    selectedSort(newValue) {
      this.posts.sort((post1, post2) => {
        return post1[newValue].localeCompare(post2[newValue]);
      });
    }
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.app {
  padding: 20px;
}
.app__btns {
  margin: 15px 0;
  display: flex;
  justify-content: space-between;
}
</style>
