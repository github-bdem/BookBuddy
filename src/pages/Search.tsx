import { useState } from "react";
import { BookResult } from "src/components/BookCard/BookCard";
import BookList from "src/components/BookList/BookList";

interface SearchFormData {
    q: string;
    author: string;
}

const defaultSearchResults = {
    numFound: 0,
    start: 0,
    numFoundExact: false,
    num_found: 0,
    offset: null,
    docs: [] as BookResult[],
    q: "string",
    documentation_url: "https://openlibrary.org/dev/docs/api/search",
};

interface SearchResults {
    numFound: number;
    start: number;
    numFoundExact: boolean;
    num_found: number;
    offset: null;
    docs: BookResult[];
    q: string;
    documentation_url: string;
}

function SearchPage() {
    const [searchFormData, setSearchFormData] = useState<SearchFormData>({
        q: "",
        author: "",
    });
    const [searchResults, setSearchResults] =
        useState<SearchResults>(defaultSearchResults);

    const constructSearchUrl = (formData: SearchFormData) => {
        const filtered = Object.fromEntries(
            Object.entries(formData)
                .filter(([_, value]) => value != null && value !== "")
                .map(([key, value]) => [key, String(value)]),
        );

        const searchParams = new URLSearchParams(filtered);

        return `https://openlibrary.org/search.json?${searchParams}`;
    };

    const handleFormDataChange = (
        formUpdateEvent: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const { name, value } = formUpdateEvent.target;
        setSearchFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmitEvent = async (formSubmissionEvent: React.FormEvent) => {
        formSubmissionEvent.preventDefault();

        const rawFormData = new FormData(formSubmissionEvent.currentTarget);

        const formData: SearchFormData = {
            q: rawFormData.get("q") as string,
            author: rawFormData.get("author") as string,
        };

        if (formData.q === "" && formData.author === "") {
            // This should be inline in the form
            window.alert("Please enter at least one search parameter");
        }

        const searchUrl = constructSearchUrl(formData);
        const response = await fetch(searchUrl);

        let results = defaultSearchResults;
        try {
            results = (await response.json()) as SearchResults;
        } catch (e) {
            console.error(e);
        }

        console.log(results);
        setSearchResults(results);
    };

    return (
        <div className="p-6">
            <h1 className="mb-6 text-3xl">Search</h1>
            <form
                className="mb-6 flex flex-col border-2 p-6"
                onSubmit={handleSubmitEvent}
            >
                <div className="mb-6">
                    <div className="mb-6 flex flex-col">
                        <label htmlFor="q" className="mb-2">
                            Title
                        </label>
                        <input
                            className="border-2 bg-white p-2"
                            id="q"
                            name="q"
                            value={searchFormData.q}
                            onChange={handleFormDataChange}
                            type="text"
                            placeholder="Book Title"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="author" className="mb-2">
                            Author
                        </label>
                        <input
                            className="border-2 bg-white p-2"
                            onChange={handleFormDataChange}
                            value={searchFormData.author}
                            id="author"
                            name="author"
                            type="text"
                            placeholder="Author Name"
                        />
                    </div>
                </div>
                <button type="submit">Submit</button>
            </form>
            <div>
                <BookList
                    bookResults={searchResults.docs}
                    title="Search Results"
                />
            </div>
        </div>
    );
}

export default SearchPage;
