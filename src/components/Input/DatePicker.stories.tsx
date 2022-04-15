/* eslint-disable react/no-multi-comp */
import { sleep } from '../../utils';
import validations from '../../validations';
import { Primary as Button } from "../Button/Button.stories";
import LocalizationProvider,
{ LocaleCode } from '../LocalizationProvider';
import DatePicker,
{ Props } from './DatePicker';
import Select from './Select';
import { Story } from '@storybook/react';
import dayjs from "dayjs";
import React,
{ useState } from 'react';

export default {
    title: `DatePicker`,
    component: DatePicker,
};

//👇 We create a “template” of how args map to rendering
const Template: Story<Props> = (args) => {
    const [ value, setValue ] = useState<Date | null>(args.value ?? null);

    return(
        <LocalizationProvider locale={`en`}>
            <DatePicker
                {...args}
                value={value}
                placeholder={`DD/MM/YYYY`}
                minDate={dayjs().subtract(80, `year`).toDate()}
                onChange={setValue}
            />
        </LocalizationProvider>);
};

export const Primary = Template.bind({});

Primary.args = {
    fullWidth: true,
    value: new Date(),
    label: `Label`,
    disabled: false,
    loading: false,
    variant: `outlined`,
    views: [
        `day`,
        `month`,
        `year`,
    ],
};

Primary.argTypes = {
    type: {
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

    const handleChange = (newValue: Date | null) => {
        setValue(newValue);
        if (serverError) setServerError(undefined);
    };

    const handleLangChange = (val: LocaleCode) => {
        setLocale(val);
    };

    const languages = [
        `en`,
        `es`,
        `id`,
        `ko`,
        `th`,
        `vi`,
        `zh-cn`,
    ];
    const [ value, setValue ] = useState<Date | null>(null);
    const [ isValid, setIsValid ] = useState(true);
    const [ serverError, setServerError ] = useState<string | undefined>(undefined);
    const [ loading, setLoading ] = useState(true);
    const [ locale, setLocale ] = useState<LocaleCode>(`en`);

    // Simulate loading.
    setTimeout(() => {
        setLoading(false);
    }, 3000);

    return (
        <LocalizationProvider locale={locale}>
            <form
                style={{
                    display: `grid`,
                    gridGap: `10px`,
                }}
                onSubmit={handleSubmit}
            >
                <DatePicker
                    loading={loading}
                    label={`Date of birth`}
                    value={value}
                    views={[
                        `day`,
                        `month`,
                        `year`,
                    ]}
                    error={serverError}
                    validations={[ validations.beforeDate(new Date(), `Date needs to be before today`), validations.afterDate(new Date(`1920-01`), `Date needs to be after 1920`) ]}
                    maxDate={dayjs().toDate()}
                    minDate={dayjs().subtract(100, `year`).toDate()}
                    placeholder={`-------- ----`}
                    onChange={handleChange}
                    onValidate={setIsValid}
                />
                <Select
                    label={`Select Language Code`}
                    value={locale}
                    items={languages}
                    loading={loading}
                    onChange={handleLangChange}
                />
                <Button
                    label={`Submit`}
                    type={`submit`}
                    disabled={!isValid}
                />
            </form>
        </LocalizationProvider>
    );
};
