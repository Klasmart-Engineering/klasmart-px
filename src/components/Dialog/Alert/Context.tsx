import { Props as DialogOptions } from "./Dialog";
import { createContext } from "react";

// TODO (Henrik): create proper and safe type
// @ts-ignore
export default createContext<((options: DialogOptions) => Promise<boolean | undefined>)>(undefined);
