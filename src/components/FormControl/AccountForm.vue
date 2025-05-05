<template>
  <div class="grid grid-cols-5 w-full gap-[10px] items-center">
    <input type="text" class="input" placeholder="Значение" />
    <!-- select: -->
    <select class="input">
      <option value="Local">Локальная</option>
      <option value="LDAP">LDAP</option>
    </select>
    <input type="text" class="input" placeholder="Значение" />
    <input type="password" class="input" placeholder="Значение" />
    <iconTrash class="transition-all hover:scale-105 cursor-pointer" />
  </div>
</template>

<script setup>
import iconTrash from "../icons/iconTrash.vue";
</script>

<style lang="sass" scoped>
.input
  @apply border-[1px] border-[#000] rounded-sm outline-none indent-2 py-[5px]
</style>
