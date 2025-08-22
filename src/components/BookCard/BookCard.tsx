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
        <div className="border-2 p-6">
            <div className="mb-6 flex min-h-[320px] w-full items-center justify-center bg-gray-500">
                <img src={constructCoverUrl(bookResult.cover_i)} />
            </div>
            <div className="mb-6 flex flex-col justify-between">
                <div>Title: {bookResult.title}</div>
                <div>Author: {bookResult.author_name}</div>
            </div>
            <div className="mb-6">
                <button onClick={() => setIsExpanded(!isExpanded)}>
                    {`More Details (${isExpanded ? "-" : "+"})`}
                </button>

                {isExpanded ? (
                    <div className="mt-6">
                        <div>Ebook Available: {bookResult.ebook_access}</div>
                        <div>Publish Year: {bookResult.first_publish_year}</div>
                    </div>
                ) : null}
            </div>
            <div className="flex flex-row justify-end">
                {isFavorited ? (
                    <div className="bg-yellow-300 p-2 text-black">
                        (On Reading List)
                    </div>
                ) : (
                    <button onClick={addBookToReadingList}>
                        Add to Reading List
                    </button>
                )}
            </div>
        </div>
    );
}

export default BookCard;
