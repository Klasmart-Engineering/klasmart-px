import { SubgroupTab } from '../components/Table/Common/GroupTabs';
import {
    Order,
    TableColumn,
} from '../components/Table/Common/Head';
import PageTable from '../components/Table/Page/Table';
import { sleep } from '../utils';
import {
    Check,
    Close,
} from '@material-ui/icons';
import React,
{
    useEffect,
    useState,
} from 'react';

export default {
    title: `Table`,
    component: PageTable,
};

enum StarWarsTrilogy {
    ORIGINAL = `original`,
    PREQUALS = `prequels`,
    SEQUALS = `sequels`,
}

interface StarWarsRow {
    id: string;
    movieTitle: string;
    realeaseYear: number;
    happyEnding: boolean;
    trilogy: StarWarsTrilogy;
}

const data: StarWarsRow[] = [
    {
        id: `1`,
        movieTitle: `Star Wars: Episode IV – A New Hope`,
        happyEnding: true,
        realeaseYear: 1977,
        trilogy: StarWarsTrilogy.ORIGINAL,
    },
    {
        id: `2`,
        movieTitle: `Star Wars: Episode V – The Empire Strikes Back`,
        happyEnding: false,
        realeaseYear: 1980,
        trilogy: StarWarsTrilogy.ORIGINAL,
    },
    {
        id: `3`,
        movieTitle: `Star Wars: Episode VI – Return of the Jedi`,
        happyEnding: true,
        realeaseYear: 1983,
        trilogy: StarWarsTrilogy.ORIGINAL,
    },
    {
        id: `4`,
        movieTitle: `Star Wars: Episode I – The Phantom Menace`,
        happyEnding: true,
        realeaseYear: 1999,
        trilogy: StarWarsTrilogy.PREQUALS,
    },
    {
        id: `5`,
        movieTitle: `Star Wars: Episode II – Attack of the Clones`,
        happyEnding: false,
        realeaseYear: 2002,
        trilogy: StarWarsTrilogy.PREQUALS,
    },
    {
        id: `6`,
        movieTitle: `Star Wars: Episode III – Revenge of the Sith`,
        happyEnding: false,
        realeaseYear: 2005,
        trilogy: StarWarsTrilogy.PREQUALS,
    },
    {
        id: `7`,
        movieTitle: `Star Wars: Episode VII – The Force Awakens`,
        happyEnding: true,
        realeaseYear: 2015,
        trilogy: StarWarsTrilogy.SEQUALS,
    },
    {
        id: `8`,
        movieTitle: `Star Wars: Episode VIII – The Last Jedi`,
        happyEnding: false,
        realeaseYear: 2017,
        trilogy: StarWarsTrilogy.SEQUALS,
    },
    {
        id: `9`,
        movieTitle: `Star Wars: Episode IX – The Rise of Skywalker`,
        happyEnding: true,
        realeaseYear: 2019,
        trilogy: StarWarsTrilogy.SEQUALS,
    },
];

interface LoadDataPageRequest extends LoadDataRequest {
    page: number;
    rowsPerPage: number;
    subgroupBy?: string;
    order: Order;
    orderBy: keyof StarWarsRow;
}

interface LoadDataRequest {
    search?: string;
}

const loadData = async (request: LoadDataPageRequest) => {
    const {
        page,
        rowsPerPage,
        subgroupBy,
        search,
        order,
        orderBy,
    } = request;
    await sleep(500);
    const filteredData = data
        .filter((d) => subgroupBy ? Object.values(d).some((value) => String(value) === String(subgroupBy)) : true)
        .filter((d) => search ? Object.values(d).some((value) => String(value).includes(String(search))) : true)
        .sort((a, b) => {
            const aValue = a[orderBy];
            const bValue = b[orderBy];
            if (typeof aValue === `string` && typeof bValue === `string`) return order === `desc` ? bValue.localeCompare(aValue) : aValue.localeCompare(bValue);
            return order === `desc`
                ? ((bValue > aValue)
                    ? 1
                    : -1
                )
                : ((aValue > bValue)
                    ? 1
                    : -1
                );
        });
    return {
        items: filteredData.slice(rowsPerPage * page, rowsPerPage * (page + 1)),
        total: filteredData.length,
    };
};

const loadGroups = async (request: LoadDataRequest) => {
    const { search } = request;
    await sleep(500);
    const filteredData = data.filter((d) => search ? Object.values(d).some((value) => String(value).includes(String(search))) : true);
    return {
        yearGroups: [
            {
                value: 1977,
                count: filteredData.filter((d) => d.realeaseYear === 1977).length,
            },
            {
                value: 1999,
                count: filteredData.filter((d) => d.realeaseYear === 1999).length,
            },
        ],
        happyEndingGroups: [
            {
                value: true,
                count: filteredData.filter((d) => d.happyEnding === true).length,
            },
            {
                value: false,
                count: filteredData.filter((d) => d.happyEnding === false).length,
            },
        ],
        trilogyGroups: [
            {
                value: StarWarsTrilogy.PREQUALS,
                count: filteredData.filter((d) => d.trilogy === StarWarsTrilogy.PREQUALS).length,
            },
            {
                value: StarWarsTrilogy.ORIGINAL,
                count: filteredData.filter((d) => d.trilogy === StarWarsTrilogy.ORIGINAL).length,
            },
            {
                value: StarWarsTrilogy.SEQUALS,
                count: filteredData.filter((d) => d.trilogy === StarWarsTrilogy.SEQUALS).length,
            },
        ],
        noGroupTotal: filteredData.length,
    };
};

const ROWS_PER_PAGE = 5;

export const PageTableServer = () => {
    const [ page, setPage ] = useState(0);
    const [ loadingData, setLoadingData ] = useState(false);
    const [ loadingGroups, setLoadingGroups ] = useState(false);
    const [ total, setTotal ] = useState(0);
    const [ noGroupTotal, setNoGroupTotal ] = useState(0);
    const [ yearGroups, setYearGroups ] = useState<SubgroupTab[]>([]);
    const [ happyEndingGroups, setHappyEndingGroups ] = useState<SubgroupTab[]>([]);
    const [ trilogyGroups, setTrilogyGroups ] = useState<SubgroupTab[]>([]);
    const [ rows, setRows ] = useState<StarWarsRow[]>([]);
    const [ subgroupBy, setSubgroupBy ] = useState<string>();
    const [ search, setSearch ] = useState(``);
    const [ order, setOrder ] = useState<Order>(`desc`);
    const [ orderBy, setOrderBy ] = useState<keyof StarWarsRow>(`id`);

    const columns: TableColumn<StarWarsRow>[] = [
        {
            id: `id`,
            label: `ID`,
        },
        {
            id: `movieTitle`,
            label: `Title`,
        },
        {
            id: `trilogy`,
            label: `Trilogy`,
            groups: trilogyGroups,
            render: (row) => `${row.trilogy.slice(0, 1).toUpperCase()}${row.trilogy.slice(1).toLowerCase()}`,
        },
        {
            id: `happyEnding`,
            label: `Happy Ending`,
            groups: happyEndingGroups,
            render: (row) => row.happyEnding ? <Check color="action" /> : <Close color="error" />,
        },
        {
            id: `realeaseYear`,
            label: `Year`,
            groups: yearGroups,
        },
    ];

    const updatePage = () => {
        setPage((page) => page + 1);
    };

    useEffect(() => {
        (async () => {
            setLoadingData(true);
            const { items, total } = await loadData({
                page,
                rowsPerPage: ROWS_PER_PAGE,
                subgroupBy,
                search,
                order,
                orderBy,
            });
            setRows(items);
            setTotal(total);
            setLoadingData(false);
        })();
    }, [
        page,
        subgroupBy,
        search,
        order,
        orderBy,
    ]);

    useEffect(() => {
        (async () => {
            setLoadingGroups(true);
            const {
                yearGroups,
                happyEndingGroups,
                trilogyGroups,
                noGroupTotal,
            } = await loadGroups({
                search,
            });
            setYearGroups(yearGroups.map((group) => ({
                ...group,
                text: group.value.toString().toUpperCase(),
            })));
            setHappyEndingGroups(happyEndingGroups.map((group) => ({
                ...group,
                text: group.value ? `Yes` : `No`,
            })));
            setTrilogyGroups(trilogyGroups.map((group) => ({
                ...group,
                text: group.value.toString().toUpperCase(),
            })));
            setNoGroupTotal(noGroupTotal);
            setLoadingGroups(false);
        })();
    }, [ search ]);

    return (
        <PageTable
            idField="id"
            loading={loadingData || loadingGroups}
            columns={columns}
            rows={rows}
            page={page}
            total={total}
            noGroupTotal={noGroupTotal}
            search={search}
            subgroupBy={subgroupBy}
            order={order}
            orderBy={orderBy}
            rowsPerPage={ROWS_PER_PAGE}
            rowsPerPageOptions={[ ROWS_PER_PAGE ]}
            primaryAction={{
                label: `Next Page`,
                onClick: updatePage,
            }}
            onChange={(tableData) => {
                setPage(tableData.page);
                setSubgroupBy(tableData.subgroupBy);
                setSearch(tableData.search);
                setOrder(tableData.order);
                setOrderBy(tableData.orderBy);
            }}
        />
    );
};

export const PageTableLocal = () => {
    const columns: TableColumn<StarWarsRow>[] = [
        {
            id: `id`,
            label: `ID`,
        },
        {
            id: `movieTitle`,
            label: `Title`,
        },
        {
            id: `trilogy`,
            label: `Trilogy`,
            groups: [
                {
                    text: StarWarsTrilogy.PREQUALS.toUpperCase(),
                    value: StarWarsTrilogy.PREQUALS,
                },
                {
                    text: StarWarsTrilogy.ORIGINAL.toUpperCase(),
                    value: StarWarsTrilogy.ORIGINAL,
                },
                {
                    text: StarWarsTrilogy.SEQUALS.toUpperCase(),
                    value: StarWarsTrilogy.SEQUALS,
                },
            ],
            render: (row) => `${row.trilogy.slice(0, 1).toUpperCase()}${row.trilogy.slice(1).toLowerCase()}`,
        },
        {
            id: `happyEnding`,
            label: `Happy Ending`,
            groups: [
                {
                    text: `Yes`,
                    value: true,
                },
                {
                    text: `No`,
                    value: false,
                },
            ],
            render: (row) => row.happyEnding ? <Check color="action" /> : <Close color="error" />,
        },
        {
            id: `realeaseYear`,
            label: `Year`,
            groups: [
                {
                    text: `1977`,
                    value: 1977,
                },
                {
                    text: `1999`,
                    value: 1999,
                },
            ],
        },
    ];

    return (
        <PageTable
            idField="id"
            columns={columns}
            rows={data}
            rowsPerPage={ROWS_PER_PAGE}
            rowsPerPageOptions={[ ROWS_PER_PAGE ]}
        />
    );
};
