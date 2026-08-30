import { useCallback } from "react";
import { useNotificationStore } from "@/store/notificationStore";

export default function useNotification() {
    const { showNotification, hideNotification } = useNotificationStore();

    const notify = useCallback(
        (type, message, options = {}) => {
            showNotification({
                type,
                message,
                title: options?.title,
                duration: options?.duration ?? 3000,
            });
        },
        [showNotification]
    );

    return {
        success: (message, options) => notify("success", message, options),
        error: (message, options) => notify("error", message, options),
        info: (message, options) => notify("info", message, options),
        warning: (message, options) => notify("warning", message, options),
        hide: hideNotification,
    };
}
