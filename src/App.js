import './App.css';
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { useTranslation } from 'react-i18next';

import {
  loadWallet, 
  setLang,
  saveWallet,
  unlockWallet
} from './store/interactions'

import {
walletLoadedSelector,
mnemonicLoadedSelector,
addressLoadedSelector,
passwordSelector,
passwordConfirmSelector,
langSelector,
walletSelector
} from './store/selectors'
import { 
  passwordChanged,
  passwordConfirmChanged
 } from './store/actions';




const ShowWallet = (props) =>{
  const { t } = useTranslation('common');
  const { address } = props
  return (
    <div>
      <h1>
       {t('wallet.name')}
      </h1>
     {address}

      </div>
 )
}


const ShowMnemonic = (props) =>{
  const { t } = useTranslation('common');
  const { mnemonic} = props
  
  return (
    <div className="mnemonic">
      <p>
      {t('wallet.mnemonic')}
      </p>
      <textarea id="w3review" name="w3review" rows="4" cols="50" value={mnemonic} readOnly></textarea> 
    </div>
    
 )
}

const ShowUnlock = (props) =>{
  const { t } = useTranslation('common');
  const {dispatch,password} = props

  return (
    <div className="address">

      {t('wallet.unlock')}
      <input 
        type="password"
        onChange={ (e) => dispatch(passwordChanged(e.target.value))}
     
      /><br/>
      <button onClick={ () => unlockWallet(dispatch,password)}>{t('wallet.unlock')}</button>

    </div>
    
 )
}

const ShowSaveWallet = (props) => {
  const { t } = useTranslation('common');
  const {dispatch,password, passwordConfirm,mnemonic,lang} = props
return (

  <div>
     {t('wallet.password')}<br/>
     <input 
      type="password"
      onChange={ (e) => dispatch(passwordChanged(e.target.value))}
     
     /><br/>


     {t('wallet.passwordRepeat')}<br/>
     <input
      type="password"
      onChange={ (e) => dispatch(passwordConfirmChanged(e.target.value))}
      /><br/>
     
    {password === passwordConfirm ? <button onClick={ () => saveWallet(dispatch,mnemonic,password,lang)}>{t('wallet.save')}</button>: "no match"}

  </div>
)


}



class App extends Component {  

  componentDidMount(){
    this.loadAppData(this.props)

  }
  async loadAppData(props) {
    const { dispatch} = props
    const lang = await setLang(dispatch)
    await loadWallet(dispatch,lang)
  
 
   
  }
 
  render() {
    
    return (
      <main>
       
        {this.props.walletExist && this.props.mnemonic !== null ? <ShowMnemonic mnemonic={this.props.mnemonic}/> : null}
        {this.props.walletExist && !this.props.wallet ? <ShowUnlock dispatch={this.props.dispatch} password={this.props.password} /> : null}
        {this.props.walletExist && this.props.mnemonic !== null ? <ShowSaveWallet password={this.props.password} passwordConfirm={this.props.passwordConfirm} dispatch={this.props.dispatch} mnemonic={this.props.mnemonic} lang={this.props.lang}/> : null}
        {this.props.wallet ? <ShowWallet  address={this.props.address}/> : null}
      </main>
    );
  }
}
function mapStateToProps(state) {

  return {
    wallet: walletSelector(state),
    walletExist: walletLoadedSelector(state),
    address: addressLoadedSelector(state),
    mnemonic: mnemonicLoadedSelector(state),
    password: passwordSelector(state),
    passwordConfirm: passwordConfirmSelector(state),
    lang: langSelector(state)

  }
}

export default connect(mapStateToProps)(App)

