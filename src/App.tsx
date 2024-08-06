import { useState } from "react";
import { Dialog } from "./stories/components/dialog";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(true);
  };

  const onRequestClsoe = () => {
    setIsOpen(false);
  };
  return (
    <div>
      <button onClick={handleClick}>Open</button>
      <Dialog
        isOpen={isOpen}
        title="sample"
        size="large"
        onRequestClose={onRequestClsoe}
        action={() => {}}
      >
        hi
      </Dialog>
    </div>
  );
}

export default App;
