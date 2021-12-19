import { useState } from "react";

export default function useStorage(data) {
  const [store, setStore] = useState(data)

  return [store, setStore]
}