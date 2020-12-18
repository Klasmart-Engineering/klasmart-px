import React,
{ useState } from "react";
import {
    Avatar,
    Box,
    Button,
    createStyles,
    makeStyles,
    Theme,
} from "@material-ui/core";
import { BaseTable } from 'kidsloop-px'

import {
    Add as AddIcon,
    CloudDownload as CloudDownloadIcon,
    CloudUpload as CloudUploadIcon,
    Delete as DeleteIcon,
    Edit as EditIcon,
    FileCopy as FileCopyIcon,
    OpenInNew as OpenInNewIcon,
} from "@material-ui/icons";
import { GroupSelectMenuItem } from "kidsloop-px/dist/types/components/Base/Table/GroupTabs";
import { HeadCell } from "kidsloop-px/dist/types/components/Base/Table/Head";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({}),
);

interface MetaData {
    hello: string;
    nice: string;
}

interface School {
    title: string;
    code: string;
}

interface NutritionData {
    calories: number;
    carbs: number;
    fat: number;
    name: string;
    protein: number;
    metaData: MetaData;
    schools: School[];
    date: Date;
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

const today = new Date();

const student = `Student`;
const teacher = `Teacher`;
const parent = `Parent`;
const orgAdmin = `Organization Admin`;
const schoolAdmin = `School Admin`;

const rows: NutritionData[] = [
    {
        name: `Cupcake`,
        calories: 305,
        fat: 3.7,
        carbs: 67,
        protein: 4.3,
        metaData,
        schools,
        date: today,
        role: student,
    },
    {
        name: `Donut`,
        calories: 452,
        fat: 25.0,
        carbs: 51,
        protein: 4.9,
        metaData,
        schools,
        date: today,
        role: teacher,
    },
    {
        name: `Eclair`,
        calories: 262,
        fat: 16.0,
        carbs: 24,
        protein: 6.0,
        metaData,
        schools,
        date: today,
        role: parent,
    },
    {
        name: `Frozen yoghurt`,
        calories: 159,
        fat: 6.0,
        carbs: 24,
        protein: 4.0,
        metaData,
        schools,
        date: today,
        role: orgAdmin,
    },
    {
        name: `Gingerbread`,
        calories: 356,
        fat: 16.0,
        carbs: 49,
        protein: 3.9,
        metaData,
        schools,
        date: today,
        role: schoolAdmin,
    },
    {
        name: `Honeycomb`,
        calories: 408,
        fat: 3.2,
        carbs: 87,
        protein: 6.5,
        metaData,
        schools,
        date: today,
        role: student,
    },
    {
        name: `Ice cream sandwich`,
        calories: 237,
        fat: 9.0,
        carbs: 37,
        protein: 4.3,
        metaData,
        schools,
        date: today,
        role: teacher,
    },
    {
        name: `Jelly Bean`,
        calories: 375,
        fat: 0.0,
        carbs: 94,
        protein: 0.0,
        metaData,
        schools,
        date: today,
        role: orgAdmin,
    },
    {
        name: `KitKat`,
        calories: 518,
        fat: 26.0,
        carbs: 65,
        protein: 7.0,
        metaData,
        schools,
        date: today,
        role: schoolAdmin,
    },
    {
        name: `Lollipop`,
        calories: 392,
        fat: 0.2,
        carbs: 98,
        protein: 0.0,
        metaData,
        schools,
        date: today,
        role: parent,
    },
    {
        name: `Marshmallow`,
        calories: 318,
        fat: 0,
        carbs: 81,
        protein: 2.0,
        metaData,
        schools,
        date: today,
        role: schoolAdmin,
    },
    {
        name: `Nougat`,
        calories: 360,
        fat: 19.0,
        carbs: 9,
        protein: 37.0,
        metaData,
        schools,
        date: today,
        role: student,
    },
    {
        name: `Oreo`,
        calories: 437,
        fat: 18.0,
        carbs: 63,
        protein: 4.0,
        metaData,
        schools,
        date: today,
        role: student,
    },
];

const columns: HeadCell<NutritionData>[] = [
    {
        id: `name`,
        align: `left`,
        label: `Dessert (100g serving)`,
        persistent: true,
    },
    {
        id: `calories`,
        align: `right`,
        label: `Calories`,
    },
    {
        id: `fat`,
        align: `center`,
        label: `Fat (g)`,
    },
    {
        id: `carbs`,
        align: `center`,
        label: `Carbs (g)`,
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
    },
    {
        id: `schools`,
        align: `center`,
        label: `Schools`,
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
    },
];

const groups: GroupSelectMenuItem<NutritionData>[] = [
    {
        id: `role`,
        label: `Role`,
    },
    {
        id: `name`,
        label: `Name`,
    },
];

const createCellLayouts = (data: NutritionData) => ({
    ...data,
    name:
        <Box
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
            }}>{data.name}</span>
        </Box>,
    // metaData:
    //     <Box
    //         flexDirection="column"
    //         display="flex"
    //     >
    //         <div>{metaData.hello}</div>
    //         <div>{metaData.nice}</div>
    //     </Box>,
    // schools: data.schools.join("\n")
    date: new Intl.DateTimeFormat(`en-US`).format(data.date),
});

export default function TableExample () {
    const classes = useStyles();
    const [ loading, setLoading ] = useState(false);

    return (
        <>
            <Button onClick={() => setLoading(!loading)}>Toggle loading</Button>
            <BaseTable
                groups={groups}
                columns={columns}
                rows={rows}
                rowBuilder={createCellLayouts}
                idField={`name`}
                title="Nutrition"
                loading={loading}
                primaryAction={{
                    label: `Create`,
                    icon: <AddIcon />,
                    onClick: (tableData) => { console.log(`create`, tableData); },
                }}
                secondaryActions={[
                    {
                        label: `Import`,
                        icon: <CloudUploadIcon />,
                        onClick: (tableData) => { console.log(`import`, tableData); },
                    },
                    {
                        label: `Export`,
                        icon: <CloudDownloadIcon />,
                        onClick: (tableData) => { console.log(`export`, tableData); },
                    },
                ]}
                searchFields={[ `name` ]}
                selectActions={[
                    {
                        label: `Export`,
                        icon: <CloudDownloadIcon />,
                        onClick: (tableData) => { console.log(`export`, tableData); },
                    },
                ]}
                selectedColumns={[ `name`, `calories` ]}
                rowActions={[
                    {
                        label: `View`,
                        icon: <OpenInNewIcon />,
                        onClick: (item) => { console.log(`view`, item); },
                    },
                    {
                        label: `Edit`,
                        icon: <EditIcon />,
                        onClick: (item) => { console.log(`edit`, item); },
                    },
                    {
                        label: `Copy`,
                        icon: <FileCopyIcon />,
                        onClick: (item) => { console.log(`copy`, item); },
                    },
                    {
                        label: `Delete`,
                        icon: <DeleteIcon />,
                        onClick: (item) => { console.log(`delete`, item); },
                    },
                ]}
                onChange={(data) => {console.log(data);}}
            />
        </>
    );
}