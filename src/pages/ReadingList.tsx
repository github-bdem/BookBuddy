import BookList from "src/components/BookList/BookList";
import { useReadingListContext } from "src/components/ReadingList/ReadingListContext";

function ReadingListPage() {
    const { state } = useReadingListContext();

    return (
        <div className="p-6">
            <h1 className="mb-6 text-3xl">Reading List</h1>
            <div>
                <BookList bookResults={state.readingList} title="Favorites" />
            </div>
        </div>
    );
}

export default ReadingListPage;
