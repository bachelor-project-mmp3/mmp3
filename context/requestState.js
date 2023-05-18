import React, { createContext, useState } from 'react';

const NotificationsContext = createContext();

export function RequestNotificationsProvider({ children }) {
    const [currentRequestNotifications, setCurrentRequestNotifications] =
        useState(0);

    return (
        <NotificationsContext.Provider
            value={{
                currentRequestNotifications,
                setCurrentRequestNotifications,
            }}>
            {children}
        </NotificationsContext.Provider>
    );
}
export default NotificationsContext;
