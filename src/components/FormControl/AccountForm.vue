<template>
  <div class="grid grid-cols-5 w-full gap-[10px] items-center" v-if="loaded">
    <input
      autocomplete="off"
      type="text"
      class="input"
      :value="labels.join('; ')"
      placeholder="Значение"
    />
    <!-- select: -->
    <select class="input" autocomplete="off">
      <option value="Local">Локальная</option>
      <option value="LDAP">LDAP</option>
    </select>
    <input
      name="no-autocomplete-field"
      autocomplete="off"
      type="text"
      class="input"
      placeholder="Значение"
      @input="login = $event?.target?.value || ''"
      :value="login || ''"
    />
    <input
      name="no-autocompletefield"
      autocomplete="off"
      type="password"
      class="input"
      placeholder="Значение"
      @input="password = $event?.target?.value || '***********'"
      :value="password || '***********'"
    />
    <iconTrash class="transition-all hover:scale-105 cursor-pointer" />
  </div>
</template>

<script setup lang="ts">
import { defineProps, onMounted, ref, watch } from "vue";
import iconTrash from "../icons/iconTrash.vue";
import { useAccountStore } from "@/stores/account";
const props = defineProps({
  account: {
    type: Object,
    required: true,
  },
});

const loaded = ref(false);
onMounted(() => {
  setTimeout(() => (loaded.value = true), 100);
});

const password: any = ref(props.account.password);
const login: any = ref(props.account.login);
const labels: any = ref(props.account.labels);

watch(
  () => [password.value, login.value, labels.value],
  () => {
    const accountWroten = {
      ...props.account,
      password: password.value,
      login: login.value,
      labels: labels.value,
    };
    console.log(accountWroten);
    useAccountStore().updateAccount(props.account.id, {
      login: login.value,
      password: password.value,
      labels: labels.value.join("; "),
    });
  }
);
</script>

<style lang="sass" scoped>
.input
  @apply border-[1px] border-[#000] rounded-sm outline-none indent-2 py-[5px]
</style>
