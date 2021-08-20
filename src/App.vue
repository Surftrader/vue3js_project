<template>
    <div class="app">
      <post-form 
        @create="createPost" 
      />
      <post-list 
        :posts="posts" 
        @remove="removePost"
      />
    </div>
</template>

<script>
import PostForm from "@/components/PostForm";
import PostList from "@/components/PostList";
export default {
  // регистрация компонентов
  components: {
    PostForm,
    PostList
  },
  data() {
    return {
      posts: [
        { id: 1, title: "Javascript", body: "Описание поста JavaScript" },
        { id: 2, title: "Java", body: "Описание поста Java" },
        { id: 3, title: "Swift", body: "Описание поста Swift" }
      ]
    };
  },
  methods: {
    createPost(post) {
      this.posts.push(post);
    },
    removePost(post) {
      this.posts = this.posts.filter(p => p.id !== post.id);
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
</style>
