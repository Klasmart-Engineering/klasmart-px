"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageTableFilter = exports.CursorTableServer = exports.PageTableLocal = exports.PageTableServer = void 0;
const Table_1 = __importDefault(require("../components/Table/Cursor/Table"));
const Table_2 = __importDefault(require("../components/Table/Page/Table"));
const utils_1 = require("../utils");
const validations_1 = require("../validations");
const core_1 = require("@material-ui/core");
const styles_1 = require("@material-ui/core/styles");
const icons_1 = require("@material-ui/icons");
const react_1 = __importStar(require("react"));
exports.default = {
    title: `Table`,
    component: Table_2.default,
};
var StarWarsTrilogy;
(function (StarWarsTrilogy) {
    StarWarsTrilogy["ORIGINAL"] = "original";
    StarWarsTrilogy["PREQUALS"] = "prequels";
    StarWarsTrilogy["SEQUALS"] = "sequels";
})(StarWarsTrilogy || (StarWarsTrilogy = {}));
const data = [
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
const dataSearchSort = (data, orderBy, order, search) => {
    return data
        .filter((d) => search ? Object.values(d).some((value) => String(value).includes(String(search))) : true)
        .sort((a, b) => {
        const aValue = a[orderBy];
        const bValue = b[orderBy];
        if (typeof aValue === `string` && typeof bValue === `string`)
            return order === `desc` ? bValue.localeCompare(aValue) : aValue.localeCompare(bValue);
        return order === `desc`
            ? ((bValue > aValue)
                ? 1
                : -1)
            : ((aValue > bValue)
                ? 1
                : -1);
    });
};
const loadData = async (request) => {
    const { page, rowsPerPage, subgroupBy, search, order, orderBy, } = request;
    await (0, utils_1.sleep)(500);
    let filteredData = data
        .filter((d) => subgroupBy ? Object.values(d).some((value) => String(value) === String(subgroupBy)) : true);
    filteredData = dataSearchSort(filteredData, orderBy, order, search);
    return {
        items: filteredData.slice(rowsPerPage * page, rowsPerPage * (page + 1)),
        total: filteredData.length,
    };
};
const loadCursorData = async (request) => {
    const { cursor, rowsPerPage, search, order, orderBy, page, } = request;
    await (0, utils_1.sleep)(500);
    const filteredData = dataSearchSort(data, orderBy, order, search);
    let index = cursor ? filteredData.findIndex(d => d.id === cursor) : 0;
    switch (page) {
        case `previous`: {
            index = index - rowsPerPage >= 0 ? index - rowsPerPage : 0;
            break;
        }
        case `last`: {
            index = filteredData.length % rowsPerPage ? filteredData.length - (filteredData.length % rowsPerPage) : filteredData.length - rowsPerPage;
            break;
        }
        case `first`: {
            index = 0;
        }
    }
    const endCursor = filteredData.length > index + rowsPerPage ? filteredData[index + rowsPerPage].id : filteredData[filteredData.length - 1].id;
    const items = filteredData.slice(index, index + rowsPerPage);
    return {
        items: items,
        total: filteredData.length,
        paginationInfo: {
            startCursor: filteredData[index].id,
            endCursor,
            hasNextPage: filteredData.length - 1 > index + rowsPerPage,
            hasPreviousPage: index > 0,
        },
    };
};
const loadGroups = async (request) => {
    const { search } = request;
    await (0, utils_1.sleep)(500);
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
const PageTableServer = () => {
    const [page, setPage] = (0, react_1.useState)(0);
    const [loadingData, setLoadingData] = (0, react_1.useState)(false);
    const [loadingGroups, setLoadingGroups] = (0, react_1.useState)(false);
    const [total, setTotal] = (0, react_1.useState)(0);
    const [noGroupTotal, setNoGroupTotal] = (0, react_1.useState)(0);
    const [yearGroups, setYearGroups] = (0, react_1.useState)([]);
    const [happyEndingGroups, setHappyEndingGroups] = (0, react_1.useState)([]);
    const [trilogyGroups, setTrilogyGroups] = (0, react_1.useState)([]);
    const [rows, setRows] = (0, react_1.useState)([]);
    const [subgroupBy, setSubgroupBy] = (0, react_1.useState)();
    const [search, setSearch] = (0, react_1.useState)(``);
    const [order, setOrder] = (0, react_1.useState)(`desc`);
    const [orderBy, setOrderBy] = (0, react_1.useState)(`id`);
    const columns = [
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
            align: `center`,
            render: (row) => row.happyEnding ? react_1.default.createElement(icons_1.Check, { color: "action" }) : react_1.default.createElement(icons_1.Close, { color: "error" }),
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
    (0, react_1.useEffect)(() => {
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
    (0, react_1.useEffect)(() => {
        (async () => {
            setLoadingGroups(true);
            const { yearGroups, happyEndingGroups, trilogyGroups, noGroupTotal, } = await loadGroups({
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
    }, [search]);
    return (react_1.default.createElement(Table_2.default, { hideNoGroupOption: true, idField: "id", loading: loadingData || loadingGroups, columns: columns, rows: rows, page: page, total: total, noGroupTotal: noGroupTotal, search: search, subgroupBy: subgroupBy, order: order, orderBy: orderBy, rowsPerPage: ROWS_PER_PAGE, rowsPerPageOptions: [ROWS_PER_PAGE], primaryAction: {
            label: `Next Page`,
            onClick: updatePage,
        }, onChange: (tableData) => {
            setPage(tableData.page);
            setSubgroupBy(tableData.subgroupBy);
            setSearch(tableData.search);
            setOrder(tableData.order);
            setOrderBy(tableData.orderBy);
        } }));
};
exports.PageTableServer = PageTableServer;
const PageTableLocal = () => {
    const columns = [
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
            render: (row) => row.happyEnding ? react_1.default.createElement(icons_1.Check, { color: "action" }) : react_1.default.createElement(icons_1.Close, { color: "error" }),
        },
        {
            id: `realeaseYear`,
            label: `Year`,
            groups: [
                {
                    text: `1977`,
                    value: 1977,
                    count: true,
                },
                {
                    text: `1999`,
                    value: 1999,
                    count: true,
                },
            ],
        },
    ];
    return (react_1.default.createElement(Table_2.default, { hideNoGroupOption: true, hideSelectAll: true, showSelectables: true, idField: "id", columns: columns, rows: data, rowsPerPage: ROWS_PER_PAGE, rowsPerPageOptions: [ROWS_PER_PAGE] }));
};
exports.PageTableLocal = PageTableLocal;
const CursorTableServer = () => {
    const [startCursor, setStartCursor] = (0, react_1.useState)(``);
    const [endCursor, setEndCursor] = (0, react_1.useState)(``);
    const [loadingData, setLoadingData] = (0, react_1.useState)(false);
    const [loadingGroups, setLoadingGroups] = (0, react_1.useState)(false);
    const [total, setTotal] = (0, react_1.useState)(0);
    const [noGroupTotal, setNoGroupTotal] = (0, react_1.useState)(0);
    const [yearGroups, setYearGroups] = (0, react_1.useState)([]);
    const [happyEndingGroups, setHappyEndingGroups] = (0, react_1.useState)([]);
    const [trilogyGroups, setTrilogyGroups] = (0, react_1.useState)([]);
    const [rows, setRows] = (0, react_1.useState)([]);
    const [subgroupBy, setSubgroupBy] = (0, react_1.useState)();
    const [search, setSearch] = (0, react_1.useState)(``);
    const [order, setOrder] = (0, react_1.useState)(`desc`);
    const [orderBy, setOrderBy] = (0, react_1.useState)(`id`);
    const [hasPreviousPage, setHasPreviousPage] = (0, react_1.useState)(false);
    const [hasNextPage, setHasNextPage] = (0, react_1.useState)(false);
    const filters = [
        {
            id: `realeaseYear`,
            label: `Release Year`,
            operators: [
                {
                    label: `Equals`,
                    value: `equals`,
                    multipleValues: true,
                    validations: [(0, validations_1.required)()],
                    options: data.map(data => {
                        return {
                            label: data.realeaseYear.toString(),
                            value: data.id,
                        };
                    }),
                },
            ],
        },
    ];
    const columns = [
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
            render: (row) => row.happyEnding ? react_1.default.createElement(icons_1.Check, { color: "action" }) : react_1.default.createElement(icons_1.Close, { color: "error" }),
        },
        {
            id: `realeaseYear`,
            label: `Year`,
            groups: yearGroups,
        },
    ];
    const fetch = async (page) => {
        setLoadingData(true);
        const { items, total, paginationInfo, } = await loadCursorData({
            cursor: startCursor,
            rowsPerPage: ROWS_PER_PAGE,
            search,
            order,
            orderBy,
            page: page ?? `next`,
        });
        setStartCursor(paginationInfo.startCursor);
        setEndCursor(paginationInfo.endCursor);
        setRows(items);
        setTotal(total);
        setLoadingData(false);
        setHasNextPage(paginationInfo.hasNextPage);
        setHasPreviousPage(paginationInfo.hasPreviousPage);
    };
    (0, react_1.useEffect)(() => {
        fetch();
    }, [
        startCursor,
        subgroupBy,
        search,
        order,
        orderBy,
    ]);
    const updatePage = (page) => {
        if (page === `next`) {
            setStartCursor(endCursor);
        }
        else {
            fetch(page);
        }
    };
    (0, react_1.useEffect)(() => {
        (async () => {
            setLoadingGroups(true);
            const { yearGroups, happyEndingGroups, trilogyGroups, noGroupTotal, } = await loadGroups({
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
    }, [search]);
    return (react_1.default.createElement(Table_1.default, { idField: "id", loading: loadingData || loadingGroups, columns: columns, hasNextPage: hasNextPage, hasPreviousPage: hasPreviousPage, rows: rows, filters: filters, startCursor: startCursor, endCursor: endCursor, cursor: endCursor, total: total, noGroupTotal: noGroupTotal, search: search, subgroupBy: subgroupBy, order: order, orderBy: orderBy, rowsPerPage: ROWS_PER_PAGE, rowsPerPageOptions: [ROWS_PER_PAGE], onChange: (tableData) => {
            setOrder(tableData.order);
            setSubgroupBy(tableData.subgroupBy);
            setSearch(tableData.search);
            setOrderBy(tableData.orderBy);
        }, onPageChange: (tableData) => {
            updatePage(tableData);
        } }));
};
exports.CursorTableServer = CursorTableServer;
const useStyles = (0, styles_1.makeStyles)((theme) => (0, core_1.createStyles)({
    root: {
        width: `100%`,
    },
    chip: {
        margin: theme.spacing(0.25),
    },
}));
const programsRows = [
    {
        id: `7a8c5021-142b-44b1-b60b-275c29d132fe`,
        name: `Bada Read`,
        grades: [`None Specified`],
        ageRanges: [
            `5 - 6 Year(s)`,
            `7 - 8 Year(s)`,
            `3 - 4 Year(s)`,
            `4 - 5 Year(s)`,
        ],
        subjects: [`Language/Literacy`],
        system: true,
    },
    {
        id: `93f293e8-2c6a-47ad-bc46-1554caac99e4`,
        name: `Bada Rhyme`,
        grades: [`None Specified`],
        ageRanges: [
            `5 - 6 Year(s)`,
            `3 - 4 Year(s)`,
            `4 - 5 Year(s)`,
        ],
        subjects: [`Language/Literacy`],
        system: true,
    },
    {
        id: `56e24fa0-e139-4c80-b365-61c9bc42cd3f`,
        name: `Bada Sound`,
        grades: [`None Specified`],
        ageRanges: [
            `5 - 6 Year(s)`,
            `7 - 8 Year(s)`,
            `3 - 4 Year(s)`,
            `4 - 5 Year(s)`,
        ],
        subjects: [`Language/Literacy`],
        system: true,
    },
    {
        id: `d1bbdcc5-0d80-46b0-b98e-162e7439058f`,
        name: `Bada STEM`,
        grades: [
            `PreK-1`,
            `PreK-2`,
            `K`,
            `Grade 1`,
            `Grade 2`,
        ],
        ageRanges: [
            `5 - 6 Year(s)`,
            `6 - 7 Year(s)`,
            `7 - 8 Year(s)`,
            `3 - 4 Year(s)`,
            `4 - 5 Year(s)`,
        ],
        subjects: [`Science`],
        system: true,
    },
    {
        id: `d1bbdcc5-0d80-46b0-b98e-162e7439058g`,
        name: `Bada STEM 5`,
        grades: [
            `PreK-1`,
            `PreK-2`,
            `K`,
            `Grade 1`,
            `Grade 2`,
        ],
        ageRanges: [
            `5 - 6 Year(s)`,
            `6 - 7 Year(s)`,
            `7 - 8 Year(s)`,
            `3 - 4 Year(s)`,
            `4 - 5 Year(s)`,
        ],
        subjects: [`Science`],
        system: true,
    },
    {
        id: `d1bbdcc5-0d80-46b0-b98e-162e7439058h`,
        name: `Bada STEM 6`,
        grades: [
            `PreK-1`,
            `PreK-2`,
            `K`,
            `Grade 1`,
            `Grade 2`,
        ],
        ageRanges: [
            `5 - 6 Year(s)`,
            `6 - 7 Year(s)`,
            `7 - 8 Year(s)`,
            `3 - 4 Year(s)`,
            `4 - 5 Year(s)`,
        ],
        subjects: [`Science`],
        system: true,
    },
];
const grades = [
    {
        node: {
            id: `100f774a-3d7e-4be5-9c2c-ae70f40f0b50`,
            name: `Grade 1`,
            status: `active`,
            system: true,
            fromGrade: {
                id: `81dcbcc6-3d70-4bdf-99bc-14833c57c628`,
                name: `K`,
                status: `active`,
                system: true,
            },
            toGrade: {
                id: `9d3e591d-06a6-4fc4-9714-cf155a15b415`,
                name: `Grade 2`,
                status: `active`,
                system: true,
            },
        },
    },
    {
        node: {
            id: `e4d16af5-5b8f-4051-b065-13acf6c694be`,
            name: `Grade 1`,
            status: `active`,
            system: true,
            fromGrade: {
                id: `a9f0217d-f7ec-4add-950d-4e8986ab2c82`,
                name: `Kindergarten`,
                status: `active`,
                system: true,
            },
            toGrade: {
                id: `98461ca1-06a1-432a-97d0-4e1dff33e1a5`,
                name: `None Specified`,
                status: `active`,
                system: true,
            },
        },
    },
    {
        node: {
            id: `9d3e591d-06a6-4fc4-9714-cf155a15b415`,
            name: `Grade 2`,
            status: `active`,
            system: true,
            fromGrade: {
                id: `100f774a-3d7e-4be5-9c2c-ae70f40f0b50`,
                name: `Grade 1`,
                status: `active`,
                system: true,
            },
            toGrade: {
                id: `98461ca1-06a1-432a-97d0-4e1dff33e1a5`,
                name: `None Specified`,
                status: `active`,
                system: true,
            },
        },
    },
    {
        node: {
            id: `81dcbcc6-3d70-4bdf-99bc-14833c57c628`,
            name: `K`,
            status: `active`,
            system: true,
            fromGrade: {
                id: `3e7979f6-7375-450a-9818-ddb09b250bb2`,
                name: `PreK-2`,
                status: `active`,
                system: true,
            },
            toGrade: {
                id: `100f774a-3d7e-4be5-9c2c-ae70f40f0b50`,
                name: `Grade 1`,
                status: `active`,
                system: true,
            },
        },
    },
    {
        node: {
            id: `a9f0217d-f7ec-4add-950d-4e8986ab2c82`,
            name: `Kindergarten`,
            status: `active`,
            system: true,
            fromGrade: {
                id: `66fcda51-33c8-4162-a8d1-0337e1d6ade3`,
                name: `PreK-2`,
                status: `active`,
                system: true,
            },
            toGrade: {
                id: `e4d16af5-5b8f-4051-b065-13acf6c694be`,
                name: `Grade 1`,
                status: `active`,
                system: true,
            },
        },
    },
    {
        node: {
            id: `98461ca1-06a1-432a-97d0-4e1dff33e1a5`,
            name: `None Specified`,
            status: `active`,
            system: true,
            fromGrade: {
                id: `98461ca1-06a1-432a-97d0-4e1dff33e1a5`,
                name: `None Specified`,
                status: `active`,
                system: true,
            },
            toGrade: {
                id: `98461ca1-06a1-432a-97d0-4e1dff33e1a5`,
                name: `None Specified`,
                status: `active`,
                system: true,
            },
        },
    },
    {
        node: {
            id: `0ecb8fa9-d77e-4dd3-b220-7e79704f1b03`,
            name: `PreK-1`,
            status: `active`,
            system: true,
            fromGrade: {
                id: `98461ca1-06a1-432a-97d0-4e1dff33e1a5`,
                name: `None Specified`,
                status: `active`,
                system: true,
            },
            toGrade: {
                id: `66fcda51-33c8-4162-a8d1-0337e1d6ade3`,
                name: `PreK-2`,
                status: `active`,
                system: true,
            },
        },
    },
    {
        node: {
            id: `d7e2e258-d4b3-4e95-b929-49ae702de4be`,
            name: `PreK-1`,
            status: `active`,
            system: true,
            fromGrade: {
                id: `98461ca1-06a1-432a-97d0-4e1dff33e1a5`,
                name: `None Specified`,
                status: `active`,
                system: true,
            },
            toGrade: {
                id: `3e7979f6-7375-450a-9818-ddb09b250bb2`,
                name: `PreK-2`,
                status: `active`,
                system: true,
            },
        },
    },
    {
        node: {
            id: `3e7979f6-7375-450a-9818-ddb09b250bb2`,
            name: `PreK-2`,
            status: `active`,
            system: true,
            fromGrade: {
                id: `d7e2e258-d4b3-4e95-b929-49ae702de4be`,
                name: `PreK-1`,
                status: `active`,
                system: true,
            },
            toGrade: {
                id: `81dcbcc6-3d70-4bdf-99bc-14833c57c628`,
                name: `K`,
                status: `active`,
                system: true,
            },
        },
    },
    {
        node: {
            id: `66fcda51-33c8-4162-a8d1-0337e1d6ade3`,
            name: `PreK-2`,
            status: `active`,
            system: true,
            fromGrade: {
                id: `0ecb8fa9-d77e-4dd3-b220-7e79704f1b03`,
                name: `PreK-1`,
                status: `active`,
                system: true,
            },
            toGrade: {
                id: `a9f0217d-f7ec-4add-950d-4e8986ab2c82`,
                name: `Kindergarten`,
                status: `active`,
                system: true,
            },
        },
    },
].map((grade) => {
    return {
        value: grade.node.id,
        label: grade.node.name,
    };
});
const subjects = [
    {
        id: `5e9a201e-9c2f-4a92-bb6f-1ccf8177bb71`,
        name: `None Specified`,
    },
    {
        id: `20d6ca2f-13df-4a7a-8dcb-955908db7baa`,
        name: `Language/Literacy`,
    },
    {
        id: `fab745e8-9e31-4d0c-b780-c40120c98b27`,
        name: `Science`,
    },
    {
        id: `66a453b0-d38f-472e-b055-7a94a94d66c4`,
        name: `Language/Literacy`,
    },
    {
        id: `36c4f793-9aa3-4fb8-84f0-68a2ab920d5a`,
        name: `Math`,
    },
    {
        id: `b997e0d1-2dd7-40d8-847a-b8670247e96b`,
        name: `Language/Literacy`,
    },
    {
        id: `49c8d5ee-472b-47a6-8c57-58daf863c2e1`,
        name: `Language/Literacy`,
    },
    {
        id: `b19f511e-a46b-488d-9212-22c0369c8afd`,
        name: `Language/Literacy`,
    },
    {
        id: `29d24801-0089-4b8e-85d3-77688e961efb`,
        name: `Science`,
    },
    {
        id: `f037ee92-212c-4592-a171-ed32fb892162`,
        name: `Language/Literacy`,
    },
    {
        id: `26d7044a-5d81-4e5b-99c7-6d761bc11236`,
        name: `Subject for CVS`,
    },
    {
        id: `a52ca967-b9a8-4217-baf4-27c8dd01569c`,
        name: `physics`,
    },
    {
        id: `d40e5de2-247d-4d76-a73a-8589988ba0d9`,
        name: `Subject for CVS 2`,
    },
    {
        id: `7cf8d3a3-5493-46c9-93eb-12f220d101d0`,
        name: `Math`,
    },
    {
        id: `b9c455a3-d5a1-4064-a7c4-926f965eea2f`,
        name: `Subject for CVS [Please change name]`,
    },
    {
        id: `e9be3e69-49bd-453a-b137-b9e9b8a4dcce`,
        name: `Subject for CVS [Please change name][2]`,
    },
    {
        id: `5e1d3c09-3dc2-4ab3-ae2b-5982fb310fbe`,
        name: `asdf`,
    },
    {
        id: `efcb008e-f9dd-4af9-bbf1-9756eb494856`,
        name: `Smoke subject from school`,
    },
].map((subject) => {
    return {
        value: subject.id,
        label: subject.name,
    };
});
const ageRanges = [
    {
        id: `023eeeb1-5f72-4fa3-a2a7-63603607ac2b`,
        name: `None Specified`,
    },
    {
        id: `7965d220-619d-400f-8cab-42bd98c7d23c`,
        name: `3 - 4 year(s)`,
    },
    {
        id: `bb7982cd-020f-4e1a-93fc-4a6874917f07`,
        name: `4 - 5 year(s)`,
    },
    {
        id: `fe0b81a4-5b02-4548-8fb0-d49cd4a4604a`,
        name: `5 - 6 year(s)`,
    },
    {
        id: `145edddc-2019-43d9-97e1-c5830e7ed689`,
        name: `6 - 7 year(s)`,
    },
    {
        id: `21f1da64-b6c8-4e74-9fef-09d08cfd8e6c`,
        name: `7 - 8 year(s)`,
    },
].map((ageRange) => {
    return {
        value: ageRange.id,
        label: ageRange.name,
    };
});
const loadProgramsData = async (request) => {
    const { page, rowsPerPage, subgroupBy, search, order, orderBy, } = request;
    await (0, utils_1.sleep)(500);
    const filteredData = programsRows
        .filter((d) => subgroupBy
        ? Object.values(d).some((value) => String(value) === String(subgroupBy))
        : true)
        .filter((d) => search
        ? Object.values(d).some((value) => String(value).includes(String(search)))
        : true)
        .sort((a, b) => {
        const aValue = a[orderBy];
        const bValue = b[orderBy];
        if (typeof aValue === `string` && typeof bValue === `string`)
            return order === `desc`
                ? bValue.localeCompare(aValue)
                : aValue.localeCompare(bValue);
        return order === `desc`
            ? bValue > aValue
                ? 1
                : -1
            : aValue > bValue
                ? 1
                : -1;
    });
    return {
        items: filteredData.slice(rowsPerPage * page, rowsPerPage * (page + 1)),
        total: filteredData.length,
    };
};
const PageTableFilter = () => {
    const classes = useStyles();
    const [page, setPage] = (0, react_1.useState)(0);
    const [loadingData, setLoadingData] = (0, react_1.useState)(false);
    const [total, setTotal] = (0, react_1.useState)(0);
    const [rows, setRows] = (0, react_1.useState)([]);
    const [subgroupBy, setSubgroupBy] = (0, react_1.useState)();
    const [search, setSearch] = (0, react_1.useState)(``);
    const [order, setOrder] = (0, react_1.useState)(`desc`);
    const [orderBy, setOrderBy] = (0, react_1.useState)(`id`);
    const columns = [
        {
            id: `id`,
            label: `ID`,
            hidden: true,
            disableSearch: false,
            disableSort: false,
        },
        {
            id: `name`,
            label: `Name`,
            persistent: true,
            disableSearch: false,
            disableSort: false,
        },
        {
            id: `grades`,
            label: `Grades`,
            disableSearch: false,
            disableSort: true,
            render: (row) => (react_1.default.createElement(react_1.default.Fragment, null, row.grades.map((grade, i) => (react_1.default.createElement(core_1.Chip, { key: `grade-${i}`, label: grade, className: classes.chip }))))),
        },
        {
            id: `ageRanges`,
            label: `Age Ranges`,
            disableSearch: false,
            disableSort: true,
            render: (row) => (react_1.default.createElement(react_1.default.Fragment, null, row.ageRanges.map((ageRange, i) => (react_1.default.createElement(core_1.Chip, { key: `ageRange-${i}`, label: ageRange, className: classes.chip }))))),
        },
        {
            id: `subjects`,
            label: `Subjects`,
            disableSearch: false,
            disableSort: true,
            render: (row) => (react_1.default.createElement(react_1.default.Fragment, null, row.subjects.map((subject, i) => (react_1.default.createElement(core_1.Chip, { key: `subject-${i}`, label: subject, className: classes.chip }))))),
        },
    ];
    const filters = [
        {
            id: `grades`,
            label: `Grades`,
            operators: [
                {
                    label: `Equals`,
                    value: `equals`,
                    multipleValues: true,
                    validations: [(0, validations_1.required)()],
                    options: grades,
                    chipLabel: (column, value) => (react_1.default.createElement(react_1.default.Fragment, null,
                        column,
                        ` equals `,
                        value)),
                },
            ],
        },
        {
            id: `ageRanges`,
            label: `Age Ranges`,
            operators: [
                {
                    label: `Equals`,
                    value: `equals`,
                    validations: [(0, validations_1.required)()],
                    options: ageRanges,
                },
                {
                    label: `Contains`,
                    value: `contains`,
                    validations: [(0, validations_1.required)(), (0, validations_1.max)(3)],
                },
            ],
        },
        {
            id: `subjects`,
            label: `Subjects`,
            operators: [
                {
                    label: `Equals`,
                    value: `equals`,
                    multipleValues: true,
                    validations: [(0, validations_1.required)()],
                    options: subjects,
                },
            ],
        },
    ];
    const updatePage = () => {
        setPage((page) => page + 1);
    };
    (0, react_1.useEffect)(() => {
        (async () => {
            setLoadingData(true);
            const { items, total } = await loadProgramsData({
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
    return (react_1.default.createElement(Table_2.default, { idField: "id", loading: loadingData, columns: columns, rows: rows, page: page, total: total, search: search, filters: filters, order: order, orderBy: orderBy, rowsPerPage: ROWS_PER_PAGE, rowsPerPageOptions: [ROWS_PER_PAGE], primaryAction: {
            label: `Next Page`,
            onClick: updatePage,
        }, onChange: (tableData) => {
            setPage(tableData.page);
            setSubgroupBy(tableData.subgroupBy);
            setSearch(tableData.search);
            setOrder(tableData.order);
            setOrderBy(tableData.orderBy);
        } }));
};
exports.PageTableFilter = PageTableFilter;