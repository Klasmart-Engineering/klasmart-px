import {
    createStyles,
    makeStyles,
} from '@mui/styles';
import {
    useEffect,
    useState,
} from "react";
import {
    ChromePicker,
    Color,
} from "react-color";

const useStyles = makeStyles((theme) => createStyles({}));

interface Props {
    color: Color | undefined;
    width?: number;
    onChange: (color: string) => void;
}

export default function SaturationPicker (props: Props) {
    const {
        color,
        width,
        onChange,
    } = props;
    const classes = useStyles();
    const [ color_, setColor ] = useState(color);

    useEffect(() => {
        setColor(color);
    }, [ color ]);

    return (
        <ChromePicker
            disableAlpha
            color={color_}
            // how to costumize can be found here: https://github.com/casesandberg/react-color/blob/master/src/components/chrome/Chrome.js
            styles={{
                disableAlpha: {
                    color: {
                        width: 0,
                    },
                },
                default: {
                    swatch: {
                        display: `none`,
                    },
                    picker: {
                        width,
                        borderRadius: 0,
                        boxShadow: `none`,
                    },
                },
            }}
            onChange={(colorResult) => setColor(colorResult.hex)}
            onChangeComplete={(colorResult) => onChange(colorResult.hex)}
        />
    );
}
