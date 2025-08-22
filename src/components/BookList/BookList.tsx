import BookCard, { BookResult } from "../BookCard/BookCard";

function BookList({
    bookResults,
    title,
}: {
    bookResults: BookResult[];
    title: string;
}) {
    return (
        <div>
            <div>{title}</div>
            <div>
                {bookResults.map((bookResult: BookResult, idx: number) => {
                    return (
                        <BookCard
                            key={`${idx}-${bookResult.title}`}
                            bookResult={bookResult}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default BookList;
