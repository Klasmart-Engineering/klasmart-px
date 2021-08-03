import { Props } from '../components/Input/File/Spreadsheet/Preview';
import { Meta, Story } from '@storybook/react';
declare const _default: Meta<import("@storybook/react").Args>;
export default _default;
export declare const Valid: Story<Omit<Props, "file" | "onParseFile">>;
export declare const Invalid: Story<Omit<Props, "file" | "onParseFile">>;
