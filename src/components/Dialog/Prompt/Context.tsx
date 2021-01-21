import { createContext } from "react";
import { Props as DialogOptions } from "./Dialog";

// TODO (Henrik): create proper and safe type
// @ts-ignore
// eslint-disable-next-line
export default createContext<((options: DialogOptions) => Promise<any | undefined>)>(undefined);
