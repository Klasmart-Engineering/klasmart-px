import { Props as DialogOptions } from "./Dialog";
import { createContext } from "react";

// TODO (Henrik): create proper and safe type
// @ts-ignore
// eslint-disable-next-line
export default createContext<((options: DialogOptions) => Promise<any | undefined>)>(undefined);
