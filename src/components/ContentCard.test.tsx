import { render } from '../../test/themeProviderRender';
import { nameToInitials } from '../utils';
import ContentCard from './ContentCard';
import { Add as AddIcon } from '@mui/icons-material';
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { cloneElement } from 'react';

const consoleLog = console.log;
beforeEach(() => {
    console.log = jest.fn();
});
afterEach(() => {
    console.log = consoleLog;
});

describe(`ContentCard`, () => {
    const author = `Sven Svensson`;
    const description = `Here is a long description that probably won't fit on just two lines so it needs to be truncated in the end.`;
    const title = `This is a title that will get truncated because it's too long`;
    const imageUrl = `https://d17fnq9dkz9hgj.cloudfront.net/uploads/2020/04/shelter-dog-cropped-1.jpg`;
    const contentCard = (
        <ContentCard
            author={author}
            description={description}
            title={title}
            imageUrl={imageUrl}
        />
    );

    test(`display props`, () => {
        render(contentCard);
        screen.getByText(author);
        screen.getByText(nameToInitials(author, 3));
        screen.getByText(description);
        screen.getByText(title);
        expect((screen.getByTestId(`card-media`) as HTMLImageElement).src).toBe(imageUrl);
    });

    test(`click card`, () => {
        const logValue = `Hello, world`;
        render(cloneElement(contentCard, {
            onClick: () => {
                console.log(logValue);
            },
        }));
        userEvent.click(screen.getByTestId(`card-action-area`));
        expect(console.log).toHaveBeenCalledWith(logValue);
    });

    test(`action buttons`, () => {
        const logValues = [ `Button 1`, `Button 2` ];
        render(cloneElement(contentCard, {
            actions: logValues.map((button) => ({
                icon: <AddIcon />,
                label: button,
                color: `primary`,
                onClick: () => {
                    console.log(button);
                },
            })),
        }));
        for (const i in logValues) {
            const value = logValues[i];
            const button = screen.getByTestId(`${i}-action-button`) as HTMLButtonElement;
            expect(button.getAttribute(`aria-label`)).toBe(value);
            userEvent.click(button);
            expect(console.log).toHaveBeenCalledWith(value);
        }
    });

    test(`select card`, () => {
        let checked = false;
        const setChecked = (value: boolean) => {
            checked = value;
        };
        const { rerender } = render(cloneElement(contentCard, {
            checkbox: {
                checked,
                onChange: () => setChecked(!checked),
            },
        }));
        const checkbox = screen.getByRole(`checkbox`) as HTMLInputElement;
        const cardActionArea = screen.getByTestId(`card-action-area`);
        expect(cardActionArea).not.toHaveClass(`selected`);
        expect(checkbox.checked).toBe(false);
        userEvent.click(checkbox);
        rerender(cloneElement(contentCard, {
            checkbox: {
                checked,
                onChange: () => setChecked(!checked),
            },
        }));
        expect(cardActionArea).toHaveClass(`selected`);
        expect(checkbox.checked).toBe(true);
    });
});
