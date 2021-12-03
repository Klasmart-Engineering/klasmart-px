/* eslint-disable react/no-multi-comp */
import ComboBox,
{
    AutoCompleteOption,
    Props,
} from "../components/Input/ComboBox";
import { sleep } from '../utils';
import validations from '../validations';
import BADA_CHARACTERS from "./assets/testdata/BADA_CHARACTERS";
import { Primary as Button } from "./Button.stories";
import { Story } from '@storybook/react';
import React,
{ useState }from "react";

export default {
    title: `ComboBox`,
    component: ComboBox,
};

const Template: Story<Props> = (args) => <ComboBox {...args} />;

export const SingleItem = Template.bind({});
SingleItem.args = {
    fullWidth: true,
    label:`Label`,
    disabled: false,
    placeholder:`Placeholder`,
    loading: false,
    variant: `outlined`,
    options: BADA_CHARACTERS,
    optionsLimit: 5,
};
SingleItem.argTypes = {
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

export const MultiItem = Template.bind({});
MultiItem.args = {
    fullWidth: true,
    label:`Label`,
    disabled: false,
    placeholder:`Placeholder`,
    loading: false,
    variant: `outlined`,
    multiple: true,
    size: `medium`,
    options: BADA_CHARACTERS,
    optionsLimit: 10,
};
MultiItem.argTypes = {
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
    size: {
        options: [ `small`, `medium` ],
        control: {
            type: `radio`,
        },
    },
};

const OPTIONS_LIMIT = 10;

const customFilterOnServer = async (inputValue: string) => {
    await sleep(1000);
    return BADA_CHARACTERS
        .filter(option => new RegExp(`${inputValue}`, `i`).test(option.text))
        .slice(0, OPTIONS_LIMIT);
};

export const FilterFromServer = () => {
    const [ selectValue, setSelectValue ] = useState<AutoCompleteOption | AutoCompleteOption[]>([]);
    const [ inputValue, setInputValue ] = useState(``);
    const [ isValid, setIsValid ] = useState(true);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ error, setError ] = useState<string | undefined>(undefined);
    const [ filteredList, setFilteredList ] = useState<AutoCompleteOption[]>([]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await sleep(1000);
        setIsValid(false);
        setError(`Server says no can do`);
    };

    const handleInputChange = async (newValue: string) => {
        setInputValue(newValue);
        setIsLoading(true);
        const filteredList = await customFilterOnServer(newValue);
        setIsLoading(false);
        setFilteredList(filteredList);
    };

    const handleSelectChange = (newValue: AutoCompleteOption[] | AutoCompleteOption) => {
        setSelectValue(newValue);
    };

    return (
        <form
            style={{
                display: `grid`,
                gridGap: `10px`,
            }}
            onSubmit={handleSubmit}
        >
            <ComboBox
                multiple
                loading={isLoading}
                options={filteredList}
                label={`Bada and Friends`}
                value={selectValue}
                inputValue={inputValue}
                error={error}
                optionsLimit={OPTIONS_LIMIT}
                validations={[ //validations for text input
                    validations.max(10, `search string is too long`),
                ]}
                selectValidations={[ //validations for select
                    validations.required(`please select at least one option`), validations.max(3, `you may only select up to 3 options`),
                ]}
                onInputChange={handleInputChange}
                onChange={handleSelectChange}
                onValidate={setIsValid}
                onError={setError}
                onFocus={() => handleInputChange(inputValue)}
            />
            <Button
                label={`Submit`}
                type={`submit`}
                disabled={!isValid}
            />
        </form>
    );
};
