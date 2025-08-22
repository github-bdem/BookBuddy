import React from "react";

import {
    readingListReducer,
    initialReadingListState,
    ReadingListContext,
} from "./ReadingListContext";

const ReadingListContextProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [state, dispatch] = React.useReducer(
        readingListReducer,
        initialReadingListState,
    );

    return (
        <ReadingListContext.Provider value={{ state, dispatch }}>
            {children}
        </ReadingListContext.Provider>
    );
};

export default ReadingListContextProvider;
