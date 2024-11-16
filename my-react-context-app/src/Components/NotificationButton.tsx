import { useNotification } from "../Hooks/useNotification"

const NotificationButton: React.FC = () => {
    const { showNotification } = useNotification();

  return (
    <button onClick={() => showNotification('Transaccion exitosa !')}>
      Confirmar Transaccion 
    </button>
  )
}

export default NotificationButton
