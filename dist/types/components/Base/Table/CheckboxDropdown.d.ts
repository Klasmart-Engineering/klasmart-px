import React from "react";
export declare type CheckboxDropdownValue = "all" | "allPages" | "none" | "page";
export interface CheckboxDropdownAction {
    label: string;
    value: CheckboxDropdownValue;
}
interface Props {
    indeterminate: boolean;
    checked: boolean;
    hasGroups: boolean;
    onSelectAllClick: (event: React.MouseEvent<HTMLLIElement>, value: CheckboxDropdownValue) => void;
    onSelectAllPageClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
export default function BaseTableCheckboxDropdown(props: Props): JSX.Element;
export {};
