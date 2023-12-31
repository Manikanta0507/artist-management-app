import { createContext, useReducer } from "react";
import { reducer } from "./reducer";
import { artists } from '../mocks';

const intialState = {
    artistId: '',
    artists,
    notificationData: {
        show: false,
        message: '',
        type: ''
    }
}

export const Context = createContext(intialState);

export function ContextWrapper({ children }) {
    const [state, dispatch] = useReducer(reducer, intialState);

    return (
        <Context.Provider value={[state, dispatch]}>
            {children}
        </Context.Provider>
    )
}