import { combineReducers } from 'redux'


function key(state = {}, action) {
    switch(action.type){
        case 'KEY_CREATE':
            return  { ...state, loaded: true ,  address: action.address }
        case 'KEY_LOADED':
            return  { ...state, loaded: true , mnemonic: null, address: action.address }
        case 'MNEMONIC_LOADED':
            return  { ...state,  mnemonic: action.mnemonic}
        case 'PASSWORD_CHANGED':
            return  { ...state,  password: action.password}
        case 'PASSWORD_CONFIRM_CHANGED':
            return  { ...state,  passwordConfirm: action.passwordConfirm}
            case 'WALLET_LOADED':
                return  { ...state, loaded: true , mnemonic: null, address: action.address }
        default:
            return state
    }
  }


  function system(state = {}, action) {
    switch(action.type){
        case 'SYS_LOADED':
        return  { ...state, loaded: true }
        case 'SYS_LANG':
        return  { ...state, lang: action.lang }
        case 'SYS_TIME':
            return  { ...state, lang: action.lang }
        default:
            return state
    }
  }


const rootReducer = combineReducers({
    key,
    system
  })
  
  //exporting combined reducers
  
  export default rootReducer