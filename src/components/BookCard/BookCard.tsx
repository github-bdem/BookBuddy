import { useState } from "react";

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

    const constructCoverUrl = (cover_i: number) => {
        return `https://covers.openlibrary.org/b/id/${cover_i}-M.jpg`;
    };

    return (
        <div className="border-2">
            <img src={constructCoverUrl(bookResult.cover_i)} />
            <div>Title: {bookResult.title}</div>
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
