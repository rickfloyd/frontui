import { useState } from "react";

export default function useLivePopup() {
  const [popup, setPopup] = useState<{ message: string; color?: string }>({ 
    message: "", 
    color: "cyan" 
  });

  const triggerPopup = (message: string, color?: string) => {
    setPopup({ message, color });
  };

  return { popup, triggerPopup };
}
