

import { useState } from "react";

export function useSensei() {
  const [context, setContext] = useState<string[]>([]);

  const remember = (msg: string) =>
    setContext((c) => [...c.slice(-9), msg]); // keep last 10 lines
  const getMemory = () => context.join(" \n ");

  return { remember, getMemory, context };
}
