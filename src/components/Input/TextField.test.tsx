/* eslint-disable testing-library/no-node-access */
/* eslint-disable jest/no-mocks-import */
import { email } from "../../validations";
import {
    failingValidation,
    passingValidation,
    VALIDATION_FAILED_MESSAGE,
} from "../../validations/__mocks__";
import TextField,
{ Props } from "./TextField";
import {
    render,
    screen,
} from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import React from "react";

const mockHandlers = {
    onChange: jest.fn(),
    onValidate: jest.fn(),
    onError: jest.fn(),
};

function clearMockHandlers () {
    Object.values(mockHandlers).forEach(mock => mock.mockClear());
}

beforeEach(clearMockHandlers);

function expectOnValueChange (value: Props["value"]) {
    const {
        onChange,
        onValidate,
        onError,
    } = mockHandlers;
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(value);
    expect(onValidate).toHaveBeenCalledTimes(1);
    expect(onValidate).toHaveBeenCalledWith(true);
    expect(onError).toHaveBeenCalledTimes(1);
    expect(onError).toHaveBeenCalledWith(undefined);
}

function expectOnValueChangeWithError ({ value, error }: {
    value: Props["value"];
    error: string;
}) {

    const {
        onChange,
        onValidate,
        onError,
    } = mockHandlers;
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(value);
    expect(onValidate).toHaveBeenCalledTimes(1);
    expect(onValidate).toHaveBeenCalledWith(false);
    expect(onError).toHaveBeenCalledTimes(1);
    expect(onError).toHaveBeenCalledWith(error);
}

function expectOnErrorChange (error: string | undefined) {
    const {
        onChange,
        onValidate,
        onError,
    } = mockHandlers;
    expect(onChange).not.toHaveBeenCalled();
    expect(onValidate).toHaveBeenCalledTimes(1);
    expect(onValidate).toHaveBeenCalledWith(!error);
    expect(onError).toHaveBeenCalledTimes(1);
    expect(onError).toHaveBeenCalledWith(error);
}

function expectError ({ container, error }: { container: HTMLElement; error: string}) {
    expect(container.querySelector(`.MuiInputBase-root`)).toHaveClass(`Mui-error`);

    const helperText = container.querySelector(`.MuiFormHelperText-root`);
    expect(helperText).toBeInTheDocument();
    expect(helperText).toHaveTextContent(error);
    expect(helperText).toHaveClass(`Mui-error`);
}

function expectNoError (container: HTMLElement) {
    expect(container.querySelector(`.MuiInputBase-root`)).not.toHaveClass(`Mui-error`);
    expect(container.querySelector(`.MuiFormHelperText-root`)).toHaveTextContent(`\u200b`);
}

function expectValue ({ container, value }: {container: HTMLElement; value: string}) {
    expect(container.querySelector(`input`)).toHaveValue(value);
}

function expectErrorWithoutHelperText (container: HTMLElement) {
    expect(container.querySelector(`.MuiInputBase-root`)).toHaveClass(`Mui-error`);

    expect(container.querySelector(`.MuiFormHelperText-root`)).not.toBeInTheDocument();
}

test.each([ undefined, false ])(`displays validation errors when hideHelperText=%s`, (hideHelperText) => {
    const { container } = render((
        <TextField
            value="Test"
            validations={[ failingValidation ]}
            hideHelperText={hideHelperText}
        />
    ));

    expectError({
        container,
        error: VALIDATION_FAILED_MESSAGE,
    });
});

test(`doesn't show validation errors if hideHelperText=true`, () => {
    const { container } = render((
        <TextField
            hideHelperText
            value="Test"
            validations={[ failingValidation ]}
        />
    ));

    expectErrorWithoutHelperText(container);
});

test.each([
    undefined,
    [ passingValidation ],
    [ failingValidation ],
])(`overrides validations=%s if error is specified`, (validations) => {
    const error = `Incorrect`;
    const { container } = render((
        <TextField
            value="Test"
            validations={validations}
            error={error}
        />
    ));

    expectError({
        container,
        error,
    });
});

test(`calls onChange, onValidate and onError on mount`, () => {
    const value = `1`;

    render((
        <TextField
            value={value}
            validations={[ failingValidation ]}
            {...mockHandlers}
        />
    ));

    expectOnValueChangeWithError({
        value,
        error: VALIDATION_FAILED_MESSAGE,
    });
});

test(`calls onChange, onValidate and onError with error prop on mount`, () => {
    const value = `1`;
    const error = `Incorrect`;

    render((
        <TextField
            value={value}
            error={error}
            validations={[ failingValidation ]}
            {...mockHandlers}
        />
    ));

    expectOnValueChangeWithError({
        value,
        error,
    });
});

test(`calls onChange with a number if type='number'`, () => {
    const value = `1`;

    render((
        <TextField
            value={value}
            type={`number`}
            {...mockHandlers}
        />
    ));

    clearMockHandlers();

    userEvent.type(document.querySelector(`input`) as HTMLElement, `2`);

    expect(mockHandlers.onChange).toHaveBeenLastCalledWith(12);
});

test(`updates value and helperText, and calls onChange, onValidate and onError on rerender`, () => {
    const { container, rerender } = render((
        <TextField
            value="1"
            validations={[ failingValidation ]}
            {...mockHandlers}
        />
    ));

    clearMockHandlers();

    const newValue = `2`;

    rerender((
        <TextField
            validations={[ failingValidation ]}
            value={newValue}
            {...mockHandlers}
        />
    ));

    expectError({
        container,
        error: VALIDATION_FAILED_MESSAGE,
    });

    expectValue({
        container,
        value: newValue,
    });

    expectOnValueChangeWithError({
        value: newValue,
        error: VALIDATION_FAILED_MESSAGE,
    });
});

test(`does not update helperText, but calls onChange, onValidate and onError on rerender, when error is provided`, () => {
    const error = `Invalid`;

    const { container, rerender } = render((
        <TextField
            value="1"
            error={error}
            validations={[ failingValidation ]}
            {...mockHandlers}
        />
    ));

    clearMockHandlers();

    const newValue = `2`;

    rerender((
        <TextField
            validations={[ failingValidation ]}
            value={newValue}
            error={error}
            {...mockHandlers}
        />
    ));

    expectValue({
        container,
        value: newValue,
    });

    expectError({
        container,
        error,
    });

    expectOnValueChangeWithError({
        value: newValue,
        error,
    });
});

test(`falls back to passing validation after error is cleared on rerender`, () => {
    const props = {
        value: `joe.bloggs@calmid.com`,
        validations: [ email() ],
        ...mockHandlers,
    };

    const { container, rerender } = render(<TextField {...props} />);

    expectNoError(container);

    expectOnValueChange(props.value);

    clearMockHandlers();

    const error = `Invalid`;

    rerender((
        <TextField
            {...props}
            error={error}
        />
    ));

    expectError({
        container,
        error,
    });

    expectOnErrorChange(error);

    clearMockHandlers();

    rerender((
        <TextField
            {...props}
        />
    ));

    expectNoError(container);

    expectOnErrorChange(undefined);
});

test(`falls back to failing validation after error is cleared on rerender`, () => {
    const validationError = `Invalid email`;

    const props = {
        value: `not-an-email`,
        validations: [ email(validationError) ],
        ...mockHandlers,
    };

    const { container, rerender } = render(<TextField {...props} />);

    expectOnValueChangeWithError({
        value: props.value,
        error: validationError,
    });

    clearMockHandlers();

    const error = `Invalid`;

    rerender((
        <TextField
            {...props}
            error={error}
        />
    ));

    expectError({
        container,
        error,
    });

    expectOnErrorChange(error);

    clearMockHandlers();

    rerender((
        <TextField
            {...props}
        />
    ));

    expectError({
        container,
        error: validationError,
    });

    expectOnErrorChange(validationError);
});

test.each([ [ `me@company.com`, true ], [ `not-an-email`, false ] ])(`input %s calls onValidate with "%s"`, (value, result) => {
    const props = {
        value: ``,
        label: `Email`,
        id: `Email`,
        validations: [ email(`Invalid email`) ],
        ...mockHandlers,
    };

    render(<TextField {...props} />);

    clearMockHandlers();

    userEvent.type(screen.getByLabelText(props.label, {
        selector: `input`,
    }), value);

    expect(mockHandlers.onValidate).toHaveBeenCalledTimes(value.length);
    expect(mockHandlers.onValidate).toHaveBeenCalledWith(result);
});
