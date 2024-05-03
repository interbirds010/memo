<template>
  <div class="memo">
    <div style="margin: 10px 10px 0 0; text-align: right">
      <button @click="add">추가</button>
    </div>
    <ul>
      <li v-for="(item, key) in data" :key="key" @click="edit(key, item.idx)">{{ item.content }}</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";

const data = ref(
    []
);

// const axiosResult = async () => {
//   try {
//     const response = await axios.get("/api/");
//     data.value = response.data;
//   } catch (error) {
//     console.error(error);
//   }
// };

// axiosResult();

axios.get("/api/").then((res) => {
  data.value = res.data;
});

const add = () => {
  const content = prompt("내용을 입력해주세요.");
  axios.post("/api/", { content }).then((res) => {
    data.value = res.data;
  });
}

const edit = (key, idx) => {
  const content = prompt("내용을 입력해주세요.", data.value[key].content);
  if (content !== null) {
    axios.put("/api/" + idx, {content}).then((res) => {
      data.value = res.data;
    });
  }
}
</script>

<style lang="scss" scoped>
  .memo ul {
    list-style: none;
    margin: 15px 5px;
    padding: 0;

    li {
      border: 1px solid #eee;
      font-size: 13px;
      padding: 10px 15px;
      margin: 5px;
    }
  }
</style>
