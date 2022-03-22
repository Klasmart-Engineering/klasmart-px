/* eslint-disable react/no-multi-comp */
import { sleep } from '../../utils';
import { Primary as Button } from "../Button/Button.stories";
import Select,
{ Props } from './Select';
import { Story } from '@storybook/react';
import React,
{ useState } from 'react';

export default {
    title: `Select`,
    component: Select,
};

const Template: Story<Props<string>> = (args) => <Select {...args} />;

export const Primary = Template.bind({});

Primary.args = {
    fullWidth: true,
    multiple: true,
    label:`Label`,
    value:``,
    disabled: false,
    loading: false,
    placeholder:`Placeholder`,
    variant: `outlined`,
    items: [
        `This`,
        `Is`,
        `A`,
        `Value`,
    ],
};

Primary.argTypes = {
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

export const ExampleInFormLoading = () => {
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
    const [ items, setItems ] = useState<string[]>([]);
    const [ loading, setLoading ] = useState(true);
    const [ isValid, setIsValid ] = useState(true);
    const [ serverError, setServerError ] = useState<string | undefined>(undefined);

    (() => {
        setTimeout(() => {
            setItems([
                `one`,
                `two`,
                `three`,
            ]);
        }, 3000);
        setTimeout(() => {
            setValue(`two`);
            setLoading(false);
        }, 5000);
    })();

    return (
        <form
            style={{
                display: `grid`,
                gridGap: `10px`,
            }}
            onSubmit={handleSubmit}
        >
            <Select
                label={`Value`}
                value={value}
                items={items}
                loading={loading}
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
