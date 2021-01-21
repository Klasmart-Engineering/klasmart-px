import { createContext } from "react";
import { Props as DialogOptions } from "./Dialog";

// TODO (Henrik): create proper and safe type
// @ts-ignore
export default createContext<((options: DialogOptions) => Promise<boolean | undefined>)>(undefined);
