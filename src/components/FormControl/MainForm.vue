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
      <AccountForm
        v-for="(account, index) in accounts"
        :key="index"
        :account="account"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import iconPlus from "../icons/iconPlus.vue";
import AccountForm from "./AccountForm.vue";
import { useAccountStore } from "@/stores/account";

const store = useAccountStore();
store.loadData();

const accounts = store.accounts;

function addEmpty() {
  store.addAccountStart();
}
</script>

<style lang="sass" scoped>
.container
  @apply max-w-[900px] mx-auto my-[30px]
h1
  @apply text-black text-[30px] uppercase font-extrabold
.accounts-info
  @apply my-[40px]
</style>
