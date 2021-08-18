import TextField,
{ Props } from '../components/Input/TextField';
import { sleep } from '../utils';
import validations from '../validations';
import { Primary as Button } from "./Button.stories";
import { Story } from '@storybook/react';
import React,
{ useState } from 'react';

export default {
    title: `TextField`,
    component: TextField,
};

//👇 We create a “template” of how args map to rendering
const Template: Story<Props> = (args) => <TextField {...args} />;

export const Outline = Template.bind({});

Outline.args = {
    fullWidth: false,
    label:`Outline`,
    value:`Outline`,
    disabled: false,
    placeholder:`Outline`,
};

export const Standard = Template.bind({});

Standard.args = {
    fullWidth: true,
    variant: `standard`,
    label:`Standard`,
    value:`Standard`,
    disabled: false,
    placeholder:`Standard`,
};

export const Filled = Template.bind({});

Filled.args = {
    fullWidth: true,
    variant: `filled`,
    label:`Filled`,
    value:`Filled`,
    disabled: false,
    placeholder:`Filled`,
};

export const Number = Template.bind({});

Number.args = {
    type:`number`,
    fullWidth: true,
    variant: `filled`,
    label:`Number`,
    value:`Number`,
    disabled: false,
    placeholder:`Number`,
};

export const Password = Template.bind({});

Password.args = {
    type:`password`,
    fullWidth: true,
    variant: `standard`,
    label:`Password`,
    value:``,
    disabled: false,
    placeholder:`Password`,
};

export const ExampleInForm = () => {
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await sleep(1000);
        setIsValid(false);
        setServerError(`Computer says no`);
    };

    const handleChange = (newValue: string) => {
        setValue(newValue);
        if (serverError) setServerError(undefined);
    };

    const [ value, setValue ] = useState(``);
    const [ isValid, setIsValid ] = useState(true);
    const [ serverError, setServerError ] = useState<string | undefined>(undefined);

    return <form
        style={{
            display: `grid`,
            gridGap: `10px`,
        }}
        onSubmit={handleSubmit}><TextField
            label={`Country Code`}
            value={value}
            error={serverError}
            validations={[ validations.required(), validations.max(3) ]}
            onChange={handleChange}
            onValidate={setIsValid}/>
        <Button
            label={`Submit`}
            type={`submit`}
            disabled={!isValid}/></form>;
};
