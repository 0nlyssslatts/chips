import { useState } from "react";
import ChipList from "components/ChipsList/ChipsList";
import "./index.scss";

const chips = [
    { id: "1", label: "Chip 1" },
    { id: "2", label: "Chip 2" },
    { id: "3", label: "Chip 3" },
    { id: "4", label: "Chip 4" },
    { id: "5", label: "Chip 5" },
    { id: "6", label: "Chip 6" },
    { id: "7", label: "Chip 7" },
    { id: "8", label: "Chip 8" },
    { id: "9", label: "Chip 9" },
    { id: "10", label: "Chip 10" },
    { id: "11", label: "Chip 11" },
];

const App = () => {
    const [selectedId, setSelectedId] = useState<string | null>(null);

    return (
        <div className="app">
            <ChipList chips={chips} selectedId={selectedId} onSelect={setSelectedId} />
        </div>
    );
};

export default App;
