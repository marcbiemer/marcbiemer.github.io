"use client";

import {
    createContext,
    type Dispatch,
    type ReactNode,
    type SetStateAction,
    useContext,
    useState,
} from "react";

type MenuContextValue = {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const MenuContext = createContext<MenuContextValue | null>(null);

export function MenuProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);

    return <MenuContext.Provider value={{ isOpen, setIsOpen }}>{children}</MenuContext.Provider>;
}

export function useMenu() {
    const context = useContext(MenuContext);

    if (!context) {
        throw new Error("useMenu must be used within MenuProvider");
    }

    return context;
}
