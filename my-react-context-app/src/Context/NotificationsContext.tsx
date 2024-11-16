import React, { createContext, useState } from "react"

interface NotificationContextType {
  message: string | null;
  showNotification: (msg: string) => void;
  hideNotification: () => void;
}

export const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export const NotificationProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [message, setMessage] = useState<string | null>(null);

  const hideNotification = () => {
    setMessage(null);
  }

  const showNotification = (msg: string) => {
    setMessage(msg);
    setTimeout(() => {
        hideNotification();
    }, 3000)
  }

  return (
    <NotificationContext.Provider 
    value={{ message, showNotification, hideNotification }}>
        {children}
    </NotificationContext.Provider>
  )
}