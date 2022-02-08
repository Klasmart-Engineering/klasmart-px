/// <reference types="react" />
import ComboBox, { Props } from "../components/Input/ComboBox";
import { Story } from '@storybook/react';
declare const _default: {
    title: string;
    component: typeof ComboBox;
};
export default _default;
export declare const SingleItem: Story<Props>;
export declare const MultiItem: Story<Props>;
export declare const FilterFromServer: () => JSX.Element;
