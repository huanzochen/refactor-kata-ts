import { useState } from "react";


export function useToggle(initialValue: boolean): [boolean, () => void]{
    const [value, setOpen] = useState(initialValue);
    const toggle = () => setOpen((v) => !v);
    return [value, toggle];
}