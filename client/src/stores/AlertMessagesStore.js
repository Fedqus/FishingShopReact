import { create } from 'zustand';
import withStore from '../decorators/StoreDecorator';

const useAlertMessagesStore = create((set) => ({
    messages: [],
    nextId: 1,
    addMessage: (message, variant) => set((state) => ({
        messages: [...state.messages, { id: state.nextId, message, variant }],
        nextId: state.nextId + 1
    })),
    removeMessage: (id) => set((state) => ({
        messages: state.messages.filter(message => message.id !== id)
    }))
}));

const withAlertMessagesStore = withStore({useAlertMessagesStore})

export { useAlertMessagesStore, withAlertMessagesStore };
