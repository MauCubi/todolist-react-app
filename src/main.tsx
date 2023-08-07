import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import { Provider } from 'react-redux'
import { TodoListApp } from './TodoListApp.tsx'
import { store } from './store/store.ts'
import { Socials } from './components/Socials.tsx'



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>    
      <Provider store={ store }>      
        <TodoListApp />   
        <Socials />     
      </Provider>    
  </React.StrictMode>,
)
