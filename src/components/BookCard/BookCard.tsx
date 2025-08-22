import { useState } from "react";
import {
    ReadingListAction,
    useReadingListContext,
} from "../ReadingList/ReadingListContext";

export interface BookResult {
    cover_i: number;
    has_fulltext: boolean;
    edition_count: number;
    title: string;
    author_name: string[];
    first_publish_year: number;
    key: string;
    ia: string[];
    author_key: string[];
    public_scan_b: true;
    language: string[];
    ebook_access: string;
}

function BookCard({ bookResult }: { bookResult: BookResult }) {
    const [isExpanded, setIsExpanded] = useState(false);

    const { state, dispatch } = useReadingListContext();

    const constructCoverUrl = (cover_i: number) => {
        return `https://covers.openlibrary.org/b/id/${cover_i}-M.jpg`;
    };

    const addBookToReadingList = () => {
        dispatch({
            type: ReadingListAction.ADD_BOOK_TO_READING_LIST,
            payload: {
                bookToAdd: bookResult,
            },
        });
    };

    const isFavorited =
        state.readingList
            .map((book) => book.cover_i)
            .findIndex((cover_i) => cover_i === bookResult.cover_i) !== -1;

    return (
        <div className="border-2">
            <div>
                <div>Title: {bookResult.title}</div>
                {isFavorited ? (
                    <div>(On Reading List)</div>
                ) : (
                    <button onClick={addBookToReadingList}>
                        Add to Reading List
                    </button>
                )}
            </div>
            <img src={constructCoverUrl(bookResult.cover_i)} />
            <div>Author: {bookResult.author_name}</div>
            <button onClick={() => setIsExpanded(!isExpanded)}>
                {`More (${isExpanded ? "-" : "+"})`}
            </button>
            {isExpanded ? (
                <div>
                    <div>Ebook Available: {bookResult.ebook_access}</div>
                    <div>Publish Year: {bookResult.first_publish_year}</div>
                    <div>
                        Languages Available:{" "}
                        {`${bookResult.language.join(", ")}`}
                    </div>
                </div>
            ) : null}
        </div>
    );
}

export default BookCard;
