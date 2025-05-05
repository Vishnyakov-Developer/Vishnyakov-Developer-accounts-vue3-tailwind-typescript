<template>
  <div class="grid w-full gap-[10px] items-center grid-cols-4" v-if="loaded">
    <input
      autocomplete="off"
      type="text"
      class="input"
      :value="
        account.labels.reduce((a, b) => a + '; ' + b, '').replace('; ', '')
      "
      maxlength="50"
      @input="labels = $event?.target?.value"
      :class="
        account.labels.reduce((a, b) => a + '; ' + b, '').replace('; ', '')
          ?.length > 50
          ? '!border-red-400'
          : ''
      "
      :placeholder="'Значение'"
    />
    <!-- select: -->
    <select
      maxlength="100"
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
        maxlength="100"
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
          maxlength="100"
          name="no-autocompletefield"
          autocomplete="off"
          class="outline-none w-full h-full border-noe"
          :type="showPassword ? 'text' : 'password'"
          placeholder="Значение"
          @input="password = $event?.target?.value"
          :value="password || ' '"
        />
        <iconSee
          class="mx-[5px] cursor-pointer"
          @click="showPassword = !showPassword"
        />
      </div>
    </div>

    <div class="flex justify-start">
      <iconTrash
        @click="deleteAccount"
        class="transition-all mr-left hover:scale-105 cursor-pointer"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, onMounted, ref, watch } from "vue";
import iconTrash from "../icons/iconTrash.vue";
import { useAccountStore } from "@/stores/account";
import iconSee from "../icons/iconSee.vue";
const props = defineProps({
  account: {
    type: Object,
    required: true,
  },
});

function deleteAccount() {
  useAccountStore().deleteAccount(props.account.id);
}

const loaded = ref(false);
onMounted(() => {
  setTimeout(() => (loaded.value = true), 100);
});

const password: any = ref(props.account.password);
const login: any = ref(props.account.login);
const labels: any = ref(props.account.labels || []);
const type: any = ref(props.account.type);
const showPassword = ref(false);

watch(
  () => [password.value, login.value, labels.value, type.value],
  () => {
    if (labels.value.length > 50) {
      labels.value = labels.value.slice(0, 50);
    }

    if (login.value.length > 50) {
      login.value = login.value.slice(0, 50);
    }

    if (password.value.length > 50) {
      password.value = password.value.slice(0, 50);
    }

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
