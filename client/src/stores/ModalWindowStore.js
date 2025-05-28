import React, { Fragment } from 'react';
import { create } from 'zustand';
import withStore from '../decorators/StoreDecorator';

const useModalWindowStore = create((set) => ({
    visible: false,
    title: '',
    body: <Fragment />,
    show: (title, body) => set({
        visible: true, 
        title: title, 
        body: body, 
    }),
    hide: () => set({
        visible: false
    }),
}));

const withModalWindowStore = withStore({ useModalWindowStore })

export { useModalWindowStore, withModalWindowStore };
