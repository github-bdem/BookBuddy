import React from "react";

import { BookResult } from "../BookCard/BookCard";

interface State {
    readingList: BookResult[];
}

enum ReadingListAction {
    ADD_BOOK_TO_READING_LIST = "ADD_BOOK_TO_READING_LIST",
}

interface Action {
    type: ReadingListAction.ADD_BOOK_TO_READING_LIST;
    payload?: {
        bookToAdd?: BookResult;
    };
}

const readingListReducer = (state: State, action: Action): State => {
    switch (action.type) {
        case ReadingListAction.ADD_BOOK_TO_READING_LIST: {
            const newReadingList = [...state.readingList];
            if (action.payload?.bookToAdd) {
                newReadingList.push(action.payload.bookToAdd);
            }
            return {
                ...state,
                readingList: newReadingList,
            };
        }
        default:
            return state;
    }
};

interface ContextProps {
    state: State;
    dispatch: React.Dispatch<Action>;
}

const initialReadingListState = {
    readingList: [],
};

const ReadingListContext = React.createContext<ContextProps>(
    {} as ContextProps,
);

const useReadingListContext = () => {
    const context = React.useContext(ReadingListContext);
    if (!context) {
        throw new Error(
            "useReadingListContext must be used within a ReadingListContextProvider",
        );
    }
    return context;
};

export {
    useReadingListContext,
    initialReadingListState,
    readingListReducer,
    ReadingListContext,
    ReadingListAction,
};
