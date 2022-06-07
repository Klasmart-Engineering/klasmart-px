import Button,
{ Props } from './Button';
import { Story } from '@storybook/react';

export default {
    title: `Button`,
    component: Button,
};

//👇 We create a “template” of how args map to rendering
const Template: Story<Props> = (args) => <Button {...args} />;

export const Primary = Template.bind({});

Primary.args = {
    rounded: true,
    color: `primary`,
    variant: `contained`,
    label: `Button`,
};
