<template>
  <div class="container">
    <div class="flex items-center gap-[20px]">
      <h1>Учётные записи</h1>
      <div
        class="h-[40px] border-[1px] hover:scale-95 cursor-pointer hover:opacity-70 border-black text-[30px] w-[40px] shrink-0 flex justify-center items-center text-black"
      >
        <iconPlus />
      </div>
    </div>
    <div class="accounts-info">
      <AccountForm />
    </div>
  </div>
</template>

<script setup>
import iconPlus from "../icons/iconPlus.vue";
import AccountForm from "./AccountForm.vue";
</script>

<style lang="sass" scoped>
.container
  @apply max-w-[900px] mx-auto my-[30px]
h1
  @apply text-black text-[30px] uppercase font-extrabold
.accounts-info
  @apply my-[40px]
</style>
