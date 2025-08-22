import BookList from "src/components/BookList/BookList";
import { useReadingListContext } from "src/components/ReadingList/ReadingListContext";

function ReadingListPage() {
    const { state } = useReadingListContext();

    return (
        <div>
            <BookList bookResults={state.readingList} title="Reading List" />
        </div>
    );
}

export default ReadingListPage;
