import TextField,
{
    inputTypes,
    Props,
} from '../components/Input/TextField';
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

export const Primary = Template.bind({});

Primary.args = {
    fullWidth: true,
    type: `text`,
    label:`Label`,
    value:`Value`,
    disabled: false,
    placeholder:`Placeholder`,
    loading: false,
    variant: `outlined`,
};

Primary.argTypes = {
    type: {
        options: inputTypes,
        control: {
            type: `radio`,
        },
    },
    variant: {
        options: [
            `filled`,
            `standard`,
            `outlined`,
        ],
        control: {
            type: `radio`,
        },
    },
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

    return (
        <form
            style={{
                display: `grid`,
                gridGap: `10px`,
            }}
            onSubmit={handleSubmit}
        >
            <TextField
                label={`Country Code`}
                value={value}
                error={serverError}
                validations={[ validations.required(), validations.max(3) ]}
                onChange={handleChange}
                onValidate={setIsValid}
            />
            <Button
                label={`Submit`}
                type={`submit`}
                disabled={!isValid}
            />
        </form>
    );
};
