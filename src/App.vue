<template>
    <div class="app">
        <form>
            <h4>Создание поста</h4>
            <input class="input" type="text" placeholder="Название">
            <input class="input" type="text" placeholder="Описание">
            <button class="btn" type="submit">Создать</button>
        </form>
        <div class="post" v-for="post in posts">
            <div><strong>Название: </strong>{{post.title}}</div>
            <div><strong>Описание: </strong>{{post.body}}</div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      posts: [
        { id: 1, title: "Javascript", body: "Описание поста JavaScript" },
        { id: 2, title: "Java", body: "Описание поста Java" },
        { id: 3, title: "Swift", body: "Описание поста Swift" }
      ]
    };
  },
  methods: {}
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

form {
  display: flex;
  flex-direction: column;
}

.post {
  padding: 15px;
  border: 2px solid teal;
  margin-top: 15px;
}

.input {
  width: 100%;
  border: 2px solid teal;
  padding: 10px 15px;
  margin-top: 15px;
}

.btn {
  margin-top: 15px;
  align-self: center;
  padding: 10px 15px;
  background: none;
  color: teal;
  border: 1px solid teal;
}
</style>
