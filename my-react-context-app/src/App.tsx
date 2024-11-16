import { NotificationProvider } from "./Context/NotificationsContext"
import Notification from "./Components/Notification"
import NotificationButton from "./Components/NotificationButton"

function App() {

  return (
    <NotificationProvider>
      <h1>Transaccion casi lista</h1>
      <p>¿Estas seguro que deseas completar esta transaccion?</p>
      <NotificationButton />
      <Notification />
    </NotificationProvider>
  )
}

export default App
