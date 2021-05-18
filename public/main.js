const { app, BrowserWindow, Notification, ipcMain, session } = require('electron')
const { Blockchain } = require('./class/Blockchain')
const { Transaction } = require('./class/Transaction')
const EdDSA = require('elliptic').eddsa
const ec = new EdDSA('ed25519')
const bip39 = require('bip39')
const base64 = require('base-64');
const path = require('path')
const url = require('url')
const fs = require('fs')
const fsp = require('fs').promises
const ethers = require('ethers')

//////////////////////////// THE WINDOW
const startUrl = process.env.ELECTRON_START_URL || url.format({
  pathname: path.join(__dirname, '/../build/index.html'),
  protocol: 'file:',
  slashes: true
});


app.on('ready', () => {
  let loading = new BrowserWindow({  /// SPLASH SCREEN
    show: false,
    frame: false,
    transparent: true,
    icon: './build/icon.ico',
    webPreferences: {
      preload: '.build/preload.js',
      nodeIntegration: true,
      contextIsolation: false
    }
  })

  loading.once('show', () => {
    main = new BrowserWindow({          /// MAIN WINDOW
      frame: true,
      show: false,
      transparent: true,
      
      setResizable:true,
      icon: './build/icon.ico',
      webPreferences: {
        preload: '.build/preload.js',
        nodeIntegration: true,
        contextIsolation: false
      }
    })
    main.on('ready-to-show', () => {
      main.show()
      loading.hide()
      main.webContents.openDevTools()
    })
    setTimeout(async () => { main.loadURL(startUrl) }, 2000) // SPLASH SCREEN TIMEOUT
  })
  loading.loadURL(path.join(__dirname, '/loading.html'))
  loading.show()






})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})




ipcMain.handle('init', async (event,lang) => {
  console.log('INIT')

  let output = []

  if (fs.existsSync('/t3xlaData/.keystore')) {


    output['response'] = true
  
  
   }
   else{
   console.log(lang)
    const path = "m/44'/3333'/0'/0";
  const wallet = await ethers.Wallet.createRandom({locale: ethers.wordlists[lang], path:path})
  console.log(wallet.mnemonic)
  const t3xlaWallet = await  ethers.Wallet.fromMnemonic(wallet.mnemonic.phrase, path, ethers.wordlists[lang]) 
 
    output['response'] = false
    output['mnemonic'] = wallet.mnemonic.phrase
    output['address'] = wallet.address


  
     
   }

return output
 
 })
 



 ipcMain.handle('saveWallet', async (event,mnemonic,password,lang) => {
  let output = []
  console.log('MNEMONIC :',mnemonic)
  console.log('PASSWORD :',password)
  console.log('LANG :',lang)
  const hdpath = "m/44'/3333'/0'/0";
  const t3xlaWallet = await  ethers.Wallet.fromMnemonic(mnemonic, hdpath, ethers.wordlists[lang]) 
  const keystore = await t3xlaWallet.encrypt(password)

    fsp.mkdir(path.join('/t3xlaData'),  (e) => {
      if (!e || (e && e.code === 'EEXIST')) {
        console.log('WRITTEING')
        output['response'] = true
         fsp.writeFile('/t3xlaData/.keystore', JSON.stringify(keystore), async (err) => {
        
          if (err) throw err;
          console.log('File written')
          // success case, the file was saved
          console.log("\x1b[32m%s\x1b[0m", "KEYSTORE GENERATED :", keystore.toString())
          // file get writen but this code is not executed
        }) 
      } else {
        console.log("\x1b[32m%s\x1b[0m", "! ERROR -- KEYSTORE FILEPATH -- ERROR!")
        output['response'] = false
        output['address'] = 'ERROR ON SAVE'
        
      }
      return output  
    })

 })


 ipcMain.handle('unlock', async (event,password) => { 
  let output = []

  if (fs.existsSync('/t3xlaData/.keystore')) {
    //file exists
    
    const encryptedWallet = fsp.readFile('/t3xlaData/.keystore')
    const keystore = JSON.parse(await encryptedWallet);
    console.log(password)
    try{await ethers.Wallet.fromEncryptedJson( (keystore).toString(), password )}
    catch{
      console.log('ERROR DECRYPTION')
      output['response'] = false
      output['address'] = 'BAD PASSWORD' 
     return output

    }
    const wallet = await ethers.Wallet.fromEncryptedJson( (keystore).toString(), password )
    output['response'] = true
    output['address'] = wallet.address
   return output
  }else{
    console.log('ERROR NO FILE')
    output['response'] = false
    output['address'] = 'BAD PASSWORD' 
   return output
  }
 })




