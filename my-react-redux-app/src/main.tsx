import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import './index.css'
import TodoList from '../src/Components/TodoList'
import { store } from './App/store'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
    <TodoList />
    </Provider>
  </StrictMode>,
)
