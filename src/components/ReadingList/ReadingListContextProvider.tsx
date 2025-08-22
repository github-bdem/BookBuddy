import React, { useEffect } from "react";

import {
    readingListReducer,
    initialReadingListState,
    ReadingListContext,
    State,
} from "./ReadingListContext";

const ReadingListContextProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const existingReadingListState = localStorage.getItem("readingListState");

    const applicableInitialState = existingReadingListState
        ? (JSON.parse(existingReadingListState) as State)
        : initialReadingListState;

    const [state, dispatch] = React.useReducer(
        readingListReducer,
        applicableInitialState,
    );

    // updating localstorage when state updates
    useEffect(() => {
        if (state) {
            localStorage.setItem("readingListState", JSON.stringify(state));
        } else {
            localStorage.removeItem("readingListState");
        }
    }, [state]);

    return (
        <ReadingListContext.Provider value={{ state, dispatch }}>
            {children}
        </ReadingListContext.Provider>
    );
};

export default ReadingListContextProvider;
