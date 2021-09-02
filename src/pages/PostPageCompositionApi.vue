<template>
    <div>
      <h1>{{likes}}</h1>
      <button @click="addLike">add like</button>
      <h1>Страница с постами</h1>
      <!-- <my-input
        v-model="searchQuery"
        placeholder="Поиск..."
        v-focus
      />
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
      <my-dialog v-model:show="dialogVisible">
        <post-form 
        @create="createPost" 
      />
      </my-dialog>
      <post-list
        :posts="sortedAndSearchedPosts"
        @remove="removePost"
        v-if="!isPostsLoading"      
      />
      <div v-else>Идет загрузка...</div>
      <div v-intersection="loadMorePosts" class="observer"></div> -->
      <!-- <div class="page__wrapper">
        <div
          class="page" 
          :class="{
            'current-page': page === pageNumber
          }"
          @click="changePage(pageNumber)"
          v-for="pageNumber in totalPages" 
          :key="pageNumber"
          >{{pageNumber}}
        </div>
      </div> -->
    </div>
</template>

<script>
import PostForm from "@/components/PostForm";
import PostList from "@/components/PostList";
import MyButton from "@/components/UI/MyButton";
import axios from "axios";
import MySelect from "@/components/UI/MySelect";
import MyInput from "@/components/UI/MyInput";
import { ref } from "vue";

export default {
  // регистрация компонентов
  components: {
    PostForm,
    PostList,
    MyButton,
    MySelect,
    MyInput
  },
  data() {
    return {
      dialogVisible: false,
      sortOptions: [
        { value: "title", name: "По названию" },
        { value: "body", name: "По содержанию" }
      ]
    };
  },
  setup(props) {
    const likes = ref(2);

    const addLike = () => {
      likes.value += 1;
    };
    return {
      likes,
      addLike
    };
  }
};
</script>

<style>
.app__btns {
  margin: 15px 0;
  display: flex;
  justify-content: space-between;
}
.page__wrapper {
  display: flex;
  margin-top: 15px;
}
.page {
  border: 1px solid black;
  padding: 10px;
}
.current-page {
  border: 2px solid teal;
}
.observer {
  height: 30px;
  background: green;
}
</style>
