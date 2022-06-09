import Fab,
{ Props } from './Fab';
import { Add } from '@mui/icons-material';
import { Story } from '@storybook/react';

export default {
    title: `Fab`,
    component: Fab,
};

const Template: Story<Props> = (args) => <Fab {...args} />;

export const Primary = Template.bind({});

Primary.args = {
    icon: Add,
    color: `primary`,
    label: `Button`,
    variant: `circular`,
};
