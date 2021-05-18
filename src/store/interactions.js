import {
    walletCreate,
    walletLoaded,
    wallet,
    sysLang,
    mnemonicLoad,


} from './actions'



const  {ipcRenderer}  = window.require("electron");



export const loadWallet = async (dispatch,lang) => {
    // INIT THE WALLET IT EXIST OR NOT /data/.keystone
      await ipcRenderer.invoke('init',lang).then((result) => {
           if(result.response){
                console.log(result)

            //load the wallet
          dispatch(walletLoaded())

           }else{
          console.log(result.mnemonic)
          // create the wallet
       

          dispatch(mnemonicLoad(result.mnemonic)) 
          dispatch(walletCreate(result.address))

           }
       }) 
   }


   export const unlockWallet = async (dispatch,password) => {
    // INIT THE WALLET IT EXIST OR NOT /data/.keystone
      await ipcRenderer.invoke('unlock',password).then((result) => {
           if(result.response){
                console.log(result)

            //load the wallet
          dispatch(wallet(result.address))

           }else{
          console.log('COULD NOT UNLOCK WALLET')
    
             
           }
       }) 
   }









   /// THIS IS THE LANGUAGE FOR THE MNEMONIC
   /// NEED MORE
   const formatLang = (lang) =>{
    switch(lang){
     case 'en' :return('en')
     case 'fr' :return('fr')
     case 'es' :return('es')
     default :return('en')
    }
     }









export const setLang = async (dispatch) => {
    var userLang = navigator.language || navigator.userLanguage;
     dispatch(sysLang(formatLang(userLang)))
    return formatLang(userLang)
}

export const saveWallet = async (dispatch,mnemonic,password,lang) => {
    await ipcRenderer.invoke('saveWallet',mnemonic,password,lang).then((result) => {
     console.log('SAVE RESULT', result.response)
    return true
    })
}