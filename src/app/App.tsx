import "./index.scss";
import Chips from "components/Chips/Chips";

const App = () => {
    return (
        <div className="app">
            <Chips label="Chips" selected={false} onClick={() => {}} />
        </div>
    );
};

export default App;
