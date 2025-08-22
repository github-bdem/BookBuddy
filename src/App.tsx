import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home";
import SearchPage from "./pages/Search";
import ReadingListPage from "./pages/ReadingList";

function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/reading-list" element={<ReadingListPage />} />
            </Routes>
        </div>
    );
}

export default App;
