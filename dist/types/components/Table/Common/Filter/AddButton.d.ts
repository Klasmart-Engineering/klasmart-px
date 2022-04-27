import { Filter, FilterLocalization } from './Filters';
import React from 'react';
interface Props {
    disabled: boolean;
    localization?: FilterLocalization;
    filters: Filter[];
    onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}
export default function AddButton(props: Props): JSX.Element;
export {};
