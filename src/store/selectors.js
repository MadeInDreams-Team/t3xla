import { createSelector } from 'reselect'
import { get } from 'lodash'



// Wallet Init
const walletLoaded = state => get(state, 'key.loaded', false)
export const walletLoadedSelector = createSelector(walletLoaded, kl => kl)
const addressLoaded = state => get(state, 'key.address', [])
export const addressLoadedSelector = createSelector(addressLoaded, al => al)
const mnemonicLoaded = state => get(state, 'key.mnemonic',[])
export const mnemonicLoadedSelector = createSelector(mnemonicLoaded, ml => ml)
const password = state => get(state, 'key.password',[])
export const passwordSelector = createSelector(password, pw => pw)
const passwordConfirm = state => get(state, 'key.passwordConfirm',[])
export const passwordConfirmSelector = createSelector(passwordConfirm, pw => pw)
const wallet = state => get(state, 'key.address', false)
export const walletSelector = createSelector(wallet, kl => kl)

const lang = state => get(state, 'system.lang',[])
export const langSelector = createSelector(lang, pw => pw)