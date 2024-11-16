import { useNotification } from "../Hooks/useNotification"

const Notification: React.FC = () => {
    const { message } = useNotification();

    if (!message) {
        return null
    }

  return (
    <aside>
      <p>{message}</p>
    </aside>
  )
}

export default Notification