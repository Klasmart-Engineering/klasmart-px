import {
    KeyboardArrowDown as KeyboardArrowDownIcon,
    KeyboardArrowUp as KeyboardArrowUpIcon,
} from '@mui/icons-material';
import {
    Button,
    Chip,
    Collapse,
    Theme,
} from '@mui/material';
import {
    createStyles,
    makeStyles,
} from '@mui/styles';
import { uniqueId } from 'lodash-es';
import {
    useEffect,
    useState,
} from "react";

export interface Props {
    items: string[];
    maxPreview?: number;
    moreLabel?: (count: number) => string;
    closeLabel?: string;
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    chip: {
        margin: theme.spacing(.4, 0.25),
    },
}));

export default function TruncateChipGroup (props: Props) {
    const {
        items = [],
        maxPreview = 3,
        closeLabel = `close`,
        moreLabel = (count) => `+${count} more`,
    } = props;
    const classes = useStyles();
    const [ id, setId ] = useState(``);
    const [ isOpen, setIsOpen ] = useState(false);
    const truncateItems = items.length > maxPreview;
    const showMoreCount = truncateItems ? items.length - maxPreview : 0;

    const previewItems = items.slice(0, maxPreview);
    const collapsedItems = items.slice(maxPreview, items.length);

    useEffect(() => {
        setId(uniqueId());
    }, []);

    return (
        <div role="list">
            <div>
                { previewItems.map((item) => (
                    <Chip
                        key={`${id}-item-${item}`}
                        role="listitem"
                        label={item}
                        className={classes.chip}
                    />
                ))}
            </div>

            <Collapse
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                id={`${ id }-collapsable`}
                in={isOpen}
                aria-hidden={!isOpen}
            >
                { collapsedItems.map((item) => (
                    <Chip
                        key={`${id}-item-${item}`}
                        role="listitem"
                        label={item}
                        className={classes.chip}
                    />
                ))}
            </Collapse>

            {
                truncateItems &&
                    <Button
                        aria-controls={`${ id }-collapsable`}
                        aria-expanded={isOpen}
                        variant="text"
                        size="small"
                        endIcon={isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        onClick={() => { setIsOpen(!isOpen); }}
                    >
                        { isOpen ? closeLabel : moreLabel(showMoreCount) }
                    </Button>
            }
        </div>

    );
}
