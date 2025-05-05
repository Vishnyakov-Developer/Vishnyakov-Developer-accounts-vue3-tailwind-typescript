<template>
  <div class="container">
    <div class="flex items-center gap-[20px]">
      <h1>Учётные записи</h1>
      <button
        @click="addEmpty"
        class="h-[40px] border-[1px] select-none hover:scale-95 cursor-pointer hover:opacity-70 border-black text-[30px] w-[40px] shrink-0 flex justify-center items-center text-black"
      >
        <iconPlus />
      </button>
    </div>
    <div class="accounts-info">
      {{ accounts }}
      <AccountForm
        v-for="account in accounts"
        :key="account.id"
        :account="account"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import iconPlus from "../icons/iconPlus.vue";
import AccountForm from "./AccountForm.vue";
import { useAccountStore } from "@/stores/account";

const store = useAccountStore();
store.loadData();

const accounts = ref(store.accounts);
console.log(accounts);

function addEmpty() {
  store.addAccountStart();
}
</script>

<style lang="sass" scoped>
.container
  @apply max-w-[1100px] mx-auto my-[30px]
h1
  @apply text-black text-[30px] uppercase font-extrabold
.accounts-info
  @apply my-[40px]
</style>
