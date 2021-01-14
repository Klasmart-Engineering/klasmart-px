import React,
{ useState } from "react";
import {
    Avatar,
    Box,
    Button,
    createStyles,
    makeStyles,
    Theme,
    Typography,
} from "@material-ui/core";
import { Table } from 'kidsloop-px'
import {
    Add as AddIcon,
    CloudDownload as CloudDownloadIcon,
    CloudUpload as CloudUploadIcon,
    Delete as DeleteIcon,
    Edit as EditIcon,
    FileCopy as FileCopyIcon,
    OpenInNew as OpenInNewIcon,
} from "@material-ui/icons";
import { TableColumn } from "kidsloop-px/dist/types/components/Table/Head";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({}),
);

interface NutritionData {
    calories: number;
    carbs: number;
    fat: number;
    name: string;
    protein: number;
    metaData: string;
    schools: string;
    date: string;
    role: string;
}

const metaData = {
    hello: `Hello`,
    nice: `Nice`,
};

const schools = [
    {
        title: `Stockholm Universitet`,
        code: `SU`,
    },
    {
        title: `Kungliga Tekniska Högskolan`,
        code: `KTH`,
    },
];

const today = new Intl.DateTimeFormat(`en-US`).format(new Date());

const rows: NutritionData[] = [
    {
        name: `Cupcake`,
        calories: 305,
        fat: 3.7,
        carbs: 67,
        protein: 4.3,
        metaData: JSON.stringify(metaData),
        schools: JSON.stringify(schools),
        date: today,
        role: `Student`,
    },
    {
        name: `Donut`,
        calories: 452,
        fat: 25.0,
        carbs: 51,
        protein: 4.9,
        metaData: JSON.stringify(metaData),
        schools: JSON.stringify(schools),
        date: today,
        role: `Teacher`,
    },
    {
        name: `Eclair`,
        calories: 262,
        fat: 16.0,
        carbs: 24,
        protein: 6.0,
        metaData: JSON.stringify(metaData),
        schools: JSON.stringify(schools),
        date: today,
        role: `Parent`,
    },
    {
        name: `Frozen yoghurt`,
        calories: 159,
        fat: 6.0,
        carbs: 24,
        protein: 4.0,
        metaData: JSON.stringify(metaData),
        schools: JSON.stringify(schools),
        date: today,
        role: `Organization Admin`,
    },
    {
        name: `Gingerbread`,
        calories: 356,
        fat: 16.0,
        carbs: 49,
        protein: 3.9,
        metaData: JSON.stringify(metaData),
        schools: JSON.stringify(schools),
        date: today,
        role: `School Admin`,
    },
    {
        name: `Honeycomb`,
        calories: 408,
        fat: 3.2,
        carbs: 87,
        protein: 6.5,
        metaData: JSON.stringify(metaData),
        schools: JSON.stringify(schools),
        date: today,
        role: `Student`,
    },
    {
        name: `Ice cream sandwich`,
        calories: 237,
        fat: 9.0,
        carbs: 37,
        protein: 4.3,
        metaData: JSON.stringify(metaData),
        schools: JSON.stringify(schools),
        date: today,
        role: `Teacher`,
    },
    {
        name: `Jelly Bean`,
        calories: 375,
        fat: 0.0,
        carbs: 94,
        protein: 0.0,
        metaData: JSON.stringify(metaData),
        schools: JSON.stringify(schools),
        date: today,
        role: `Organization Admin`,
    },
    {
        name: `KitKat`,
        calories: 518,
        fat: 26.0,
        carbs: 65,
        protein: 7.0,
        metaData: JSON.stringify(metaData),
        schools: JSON.stringify(schools),
        date: today,
        role: `School Admin`,
    },
    {
        name: `Lollipop`,
        calories: 392,
        fat: 0.2,
        carbs: 98,
        protein: 0.0,
        metaData: JSON.stringify(metaData),
        schools: JSON.stringify(schools),
        date: today,
        role: `Parent`,
    },
    {
        name: `Marshmallow`,
        calories: 318,
        fat: 0,
        carbs: 81,
        protein: 2.0,
        metaData: JSON.stringify(metaData),
        schools: JSON.stringify(schools),
        date: today,
        role: `School Admin`,
    },
    {
        name: `Nougat`,
        calories: 360,
        fat: 19.0,
        carbs: 9,
        protein: 37.0,
        metaData: JSON.stringify(metaData),
        schools: JSON.stringify(schools),
        date: today,
        role: `Student`,
    },
    {
        name: `Oreo`,
        calories: 437,
        fat: 18.0,
        carbs: 63,
        protein: 4.0,
        metaData: JSON.stringify(metaData),
        schools: JSON.stringify(schools),
        date: today,
        role: `Student`,
    },
];

const columns: TableColumn<NutritionData>[] = [
    {
        id: `name`,
        align: `left`,
        label: `Dessert (100g serving)`,
        persistent: true,
        groupable: true,
        render: (row) => <Box
            flexDirection="row"
            display="flex"
            alignItems="center"
        >
            <Avatar
                component="span"
                style={{
                    width: 24,
                    height: 24,
                }}
            />
            <span style={{
                marginLeft: 8,
            }}>{row.name}</span>
        </Box>,
    },
    {
        id: `calories`,
        align: `right`,
        label: `Calories`,
        hidden: true,
    },
    {
        id: `fat`,
        align: `center`,
        label: `Fat (g)`,
        hidden: true,
    },
    {
        id: `carbs`,
        align: `center`,
        label: `Carbs (g)`,
        hidden: true,
        // groupable: true,
    },
    {
        id: `protein`,
        align: `center`,
        label: `Protein (g)`,
    },
    {
        id: `metaData`,
        align: `left`,
        label: `Meta data`,
        disableSort: true,
    },
    {
        id: `schools`,
        align: `center`,
        label: `Schools`,
        disableSort: true,
    },
    {
        id: `date`,
        align: `left`,
        label: `Date`,
    },
    {
        id: `role`,
        align: `left`,
        label: `Role`,
        groups: [
            {
                text: `Organization Admin`,
            },
            {
                text: `School Admin`,
            },
            {
                text: `Teacher`,
            },
            {
                text: `Parent`,
            },
            {
                text: `Student`,
            },
            {
                text: `Super Heroes`
            }
        ],
        render: (row) => <Typography variant="overline">{row.role}</Typography>
    },
];

export default function TableExample () {
    const classes = useStyles();
    const [ loading, setLoading ] = useState(false);

    return (
        <>
            <Button onClick={() => setLoading(!loading)}>Toggle loading</Button>
            <Table
                columns={columns}
                rows={rows}
                idField={`name`}
                loading={loading}
                primaryAction={{
                    label: `Create`,
                    icon: AddIcon,
                    disabled: true,
                    onClick: (tableData) => { console.log(`create`, tableData); },
                }}
                secondaryActions={[
                    {
                        label: `Import`,
                        icon: CloudUploadIcon,
                        disabled: true,
                        onClick: (tableData) => { console.log(`import`, tableData); },
                    },
                    {
                        label: `Export`,
                        icon: CloudDownloadIcon,
                        onClick: (tableData) => { console.log(`export`, tableData); },
                    },
                ]}
                selectActions={[
                    {
                        label: `Export`,
                        icon: CloudDownloadIcon,
                        disabled: true,
                        onClick: (tableData) => { console.log(`export`, tableData); },
                    },
                ]}
                rowActions={(row) => [
                    {
                        label: `View`,
                        icon: OpenInNewIcon,
                        disabled: row.name === "Frozen yoghurt",
                        onClick: (row) => { console.log(`view`, row); },
                    },
                    {
                        label: `Edit`,
                        icon: EditIcon,
                        disabled: row.name === "Donut",
                        onClick: (row) => { console.log(`edit`, row); },
                    },
                    {
                        label: `Copy`,
                        icon: FileCopyIcon,
                        disabled: row.name === "Eclair",
                        onClick: (row) => { console.log(`copy`, row); },
                    },
                    {
                        label: `Delete`,
                        icon: DeleteIcon,
                        disabled: row.name === "Ice cream sandwich",
                        onClick: (row) => { console.log(`delete`, row); },
                    },
                ]}
                onChange={(data) => {console.log(data);}}
            />
        </>
    );
}