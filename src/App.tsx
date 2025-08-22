import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home";
import SearchPage from "./pages/Search";
import ReadingListPage from "./pages/ReadingList";
import ReadingListContextProvider from "./components/ReadingList/ReadingListContextProvider";

function App() {
    return (
        <div className="min-h-screen">
            <ReadingListContextProvider>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/search" element={<SearchPage />} />
                    <Route path="/reading-list" element={<ReadingListPage />} />
                </Routes>
            </ReadingListContextProvider>
        </div>
    );
}

export default App;
