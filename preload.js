const dog = () =>{
  console.log('Hello from Preload!')
  const root = document.getElementById('root')
  if(root){
    root.innerText = 'Cheese Doodles'
  }else{
    console.error(`no #root`)
  }
}

process.once('loaded', () => {
  // process is loaded, now we load the webpage
})

window.onload = () => {
  // webpage is completely loaded
  console.log(process)
  dog()
}

// window.onbeforeunload = (e) => {
//   console.log('I do not want to be closed')

//   // Unlike usual browsers that a message box will be prompted to users, returning
//   // a non-void value will silently cancel the close.
//   // It is recommended to use the dialog API to let the user confirm closing the
//   // application.
//   e.returnValue = false // equivalent to `return false` but not recommended
// }