import React from "react";
export declare enum CheckboxDropdownValue {
    ALL = "all",
    ALL_PAGES = "all-pages",
    NONE = "none",
    PAGE = "page"
}
export interface CheckboxDropdownAction {
    label: string;
    value: CheckboxDropdownValue;
}
export interface CheckboxDropdownLocalization {
    allGroupsPages?: string;
    allPages?: string;
    thisPage?: string;
    none?: string;
}
interface Props {
    indeterminate: boolean;
    checked: boolean;
    hasGroups: boolean;
    hideSelectAll?: boolean;
    disabled?: boolean;
    localization?: CheckboxDropdownLocalization;
    onSelectAllClick: (event: React.MouseEvent<HTMLLIElement>, value: CheckboxDropdownValue) => void;
    onSelectAllPageClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
export default function BaseTableCheckboxDropdown(props: Props): JSX.Element;
export {};
