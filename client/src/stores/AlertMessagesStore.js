import { create } from 'zustand';
import withStore from '../decorators/StoreDecorator';

const useAlertMessagesStore = create((set) => ({
    messages: [],
    addMessage: (message, variant) => set((state) => ({
        messages: [...state.messages, { id: Date.now(), message, variant }]
    })),
    removeMessage: (id) => set((state) => ({
        messages: state.messages.filter(message => message.id !== id)
    }))
}));

const withAlertMessagesStore = withStore({useAlertMessagesStore})

export { useAlertMessagesStore, withAlertMessagesStore };
