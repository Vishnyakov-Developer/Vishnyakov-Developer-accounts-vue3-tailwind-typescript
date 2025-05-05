import { defineStore } from "pinia";

export type AccountType = 'LDAP' | 'Local'

export interface Account {
  id: string,
  labels: string[],
  type: AccountType,
  login: string,
  password: string | null,
  isValid: boolean
}

export const useAccountStore = defineStore('account', {
  state: () => ({
    accounts: [] as Account[]
  }),
  actions: {
    addAccountStart() {
      this.accounts.push({
        id: Date.now().toString(),
        labels: [],
        login: '',
        password: null,
        type: 'Local',
        isValid: false
      })
      this.saveData()
    },
    updateAccount(id: string, { password, login, labels, type } : { password: string | null, login: string, labels: string, type: String }) {
      const index = this.accounts.findIndex(a => a.id === id)
      if (index === -1) return
      console.log(id)
      const acc = this.accounts[index]

      acc.password = password
      acc.login = login
      if (labels === '') {
        acc.labels = []
      } else {
          try {
            acc.labels = labels.split('; ')
          } catch {}
      }
      acc.type = type == 'LDAP' ? 'LDAP' : 'Local'


      this.saveData()
    },
    loadData() {
      try {
        const raw = localStorage.getItem('accounts')
        if (raw) {
          const parsed = JSON.parse(raw)
          for (const account of parsed as Account[]) {
            this.accounts.push(account)
          }
        }
      } catch (err) {
        console.log('ошибочка ', err)
      }
    },
    saveData() {
      localStorage.setItem('accounts', JSON.stringify(this.accounts))
    }
  },
  
})