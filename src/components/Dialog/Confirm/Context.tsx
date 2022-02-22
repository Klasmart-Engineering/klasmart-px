import { Props as DialogOptions } from "./Dialog";
import { createContext } from "react";

// TODO (Henrik): create proper and safe type
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default createContext<((options: DialogOptions) => Promise<boolean | undefined>)>(undefined);
