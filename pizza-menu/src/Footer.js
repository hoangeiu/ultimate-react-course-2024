import { useEffect, useState } from "react";
import Order from "./Order";

export default function Footer() {
  const localTime = new Date().toLocaleTimeString();
  const openHour = 12;
  const closeHour = 22;

  const [isOpen, setIsOpen] = useState(true);

  const createMessage = () => {
    const hour = new Date().getHours();
    if (hour >= openHour && hour <= closeHour) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    createMessage();
  }, []);

  return (
    <footer className="footer">
      {isOpen ? (
        <Order
          localTime={localTime}
          openHour={openHour}
          closeHour={closeHour}
        />
      ) : (
        <p>{localTime}. Sorry we're closed</p>
      )}
    </footer>
  );
}
