export function walletCreate(address) {
    return {
      type: 'KEY_CREATE',
      address
    }
  }

  export function walletLoaded(address) {
    return {
      type: 'KEY_LOADED',
      address
    }
  }
  export function wallet(address) {
    return {
      type: 'WALLET_LOADED',
      address
    }
  }


  export function mnemonicLoad(mnemonic) {
    return {
      type: 'MNEMONIC_LOADED',
      mnemonic
    }
  }



  export function sysLang(lang) {
    return {
      type: 'SYS_LANG',
      lang
    }
  }

  export function sysLoaded() {
    return {
      type: 'SYS_LOADED'
     
    }
  }


  export function passwordChanged(password) {
    return {
      type: 'PASSWORD_CHANGED',
      password
     
    }
  }

  export function passwordConfirmChanged(passwordConfirm) {
    return {
      type: 'PASSWORD_CONFIRM_CHANGED',
      passwordConfirm
     
    }
  }