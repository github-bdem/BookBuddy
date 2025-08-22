import BookCard, { BookResult } from "../BookCard/BookCard";

function BookList({
    bookResults,
    title,
}: {
    bookResults: BookResult[];
    title: string;
}) {
    return (
        <div className="flex flex-grow flex-col">
            <div className="mb-6">{title}</div>
            <div className="flex flex-row flex-wrap items-center justify-center gap-6">
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
