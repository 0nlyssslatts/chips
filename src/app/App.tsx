import ChipList from "components/ChipsList/ChipsList";
import "./index.scss";

const chips = [
    { id: "1", label: "Чипс 111111111111111111" },
    { id: "2", label: "Чипс 222222222222222222" },
    { id: "3", label: "Чипс 333333333333333333" },
    { id: "4", label: "Чипс 444444444444444444" },
    { id: "5", label: "Чипс 5" },
    { id: "6", label: "Чипс 6" },
    { id: "7", label: "Чипс 7" },
    { id: "8", label: "Чипс 8" },
    { id: "9", label: "Чипс 9" },
    { id: "10", label: "Чипс 10" },
    { id: "11", label: "Чипс 11" },
    { id: "12", label: "Чипс 12" },
];

const App = () => {
    return (
        <div className="app">
            <ChipList chips={chips} chipsWidth={120} />
        </div>
    );
};

export default App;
