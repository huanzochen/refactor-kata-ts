import { useState } from "react";


export function useToggle(initialValue: boolean): [boolean, () => void]{
    const [open, setOpen] = useState(initialValue);
    const toggle = () => setOpen((v) => !v);
    return [open, toggle];
}