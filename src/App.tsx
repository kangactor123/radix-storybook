import { useState } from "react";
import { Button } from "./stories/components/button/Button";
import { Dialog } from "./stories/components/dialog/Dialog";

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
      <Button onClick={handleClick}>Open</Button>
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
