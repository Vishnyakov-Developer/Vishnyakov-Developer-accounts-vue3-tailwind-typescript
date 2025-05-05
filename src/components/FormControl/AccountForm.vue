<template>
  <div class="grid w-full gap-[10px] items-center grid-cols-4" v-if="loaded">
    <input
      autocomplete="off"
      type="text"
      class="input"
      :value="
        account.labels.reduce((a, b) => a + '; ' + b, '').replace('; ', '')
      "
      @input="labels = $event?.target?.value"
      :placeholder="'Значение'"
    />
    <!-- select: -->
    <select
      class="input"
      @change="type = $event?.target?.value"
      autocomplete="off"
    >
      <option :selected="account.type === 'Local'" value="Local">
        Локальная
      </option>
      <option :selected="account.type === 'LDAP'" value="LDAP">LDAP</option>
    </select>
    <div
      class="grid gap-[15px]"
      :class="account.type === 'Local' ? ' grid-cols-2' : ''"
    >
      <input
        name="no-autocomplete-field"
        autocomplete="off"
        type="text"
        class="input w-full"
        placeholder="Значение"
        @input="login = $event?.target.value || ''"
        :value="login || ''"
      />
      <div
        class="input relative overflow-hidden flex items-center"
        v-if="account.type === 'Local'"
      >
        <input
          name="no-autocompletefield"
          autocomplete="off"
          class="outline-none w-full h-full border-noe"
          type="password"
          placeholder="Значение"
          @input="password = $event?.target?.value || '***********'"
          :value="password || '***********'"
        />
        <div>SEE</div>
      </div>
    </div>

    <div class="flex justify-start">
      <iconTrash
        class="transition-all mr-left hover:scale-105 cursor-pointer"
      />
    </div>
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
const labels: any = ref(props.account.labels || []);
const type: any = ref(props.account.type);

watch(
  () => [password.value, login.value, labels.value, type.value],
  () => {
    const accountWroten = {
      ...props.account,
      password: password.value,
      login: login.value,
      labels: labels.value,
      type: type.value,
    };
    console.log(props.account.id);
    useAccountStore().updateAccount(props.account.id, {
      login: login.value,
      password: password.value,
      labels: labels.value,
      type: type.value,
    });
  }
);
</script>

<style lang="sass" scoped>
.input
  @apply border-[1px] border-[#000] rounded-sm outline-none indent-2 py-[5px]
</style>
