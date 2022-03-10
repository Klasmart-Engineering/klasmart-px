import { TableFilter } from "../../components/Table/Common/Filter/Filters";
import { TableColumn } from "../../components/Table/Common/Head";

export const mockOrgId = `c19de3cc-aa01-47f5-9f87-850eb70ae073`;
export const user1Id = `p19de3cc-aa01-47f5-9f87-850eb70ae071`;
export const user2Id = `p19de3cc-aa01-47f5-9f87-850eb70ae072`;
export const user3Id = `p19de3cc-aa01-47f5-9f87-850eb70ae073`;

export interface RoleSummaryNode {
    id: string;
    name: string;
    status: string;
    organizationId: string | null;
    schoolId: string | null;
}

export interface UserNode {
    id: string;
    avatar: string | null;
    contactInfo: {
        email: string | null;
        phone: string | null;
    };
    givenName: string | null;
    familyName: string | null;
    organizations: {
        userStatus: string;
        userShortCode: string;
        joinDate: string;
    }[];
    roles: RoleSummaryNode[];
    schools: {
        id: string;
        name: string;
        status: string;
    }[];
    dateOfBirth: string;
    gender: string;
}

const mockRolesFilterList = [
    {
        label: `Test Organization Admin`,
        value: `87aca549-fdb6-4a63-97d4-d563d4a4690a`,
    },
    {
        label: `Test School Admin`,
        value: `87aca549-fdb6-4a63-97d4-d563d4a4690b`,
    },
    {
        label: `Test Parent`,
        value: `87aca549-fdb6-4a63-97d4-d563d4a4690c`,
    },
];

export const users: UserNode[] = [
    {
        id: user1Id,
        avatar: null,
        contactInfo: {
            email: `johnsmith@calmid.com`,
            phone: `01012345678`,
        },
        givenName: `John`,
        familyName: `Smith`,
        organizations: [
            {
                userStatus: `active`,
                joinDate: `2021-06-15T09:46:54.573Z`,
                userShortCode: `FEBJFBSJFBJE`,
            },
        ],
        roles: [
            {
                id: `87aca549-fdb6-4a63-97d4-d563d4a4690a`,
                organizationId: mockOrgId,
                schoolId: `87aca549-fdb6-4a63-97d4-d563d4a4665f`,
                name: `Organization Admin`,
                status: `active`,
            },
        ],
        schools: [
            {
                id: `87aca549-fdb6-4a63-97d4-d563d4a4665f`,
                name: `Mock Data School`,
                status: `active`,
            },
        ],
        dateOfBirth: `210910`,
        gender: `male`,
    },
    {
        id: user2Id,
        avatar: null,
        contactInfo: {
            email: `andrewheath@calmid.com`,
            phone: `01087654321`,
        },
        givenName: `Andrew`,
        familyName: `Heath`,
        organizations: [
            {
                userStatus: `inactive`,
                joinDate: `2021-06-15T09:46:54.573Z`,
                userShortCode: `BFJEABFNEA`,
            },
        ],
        roles: [
            {
                id: `87aca549-fdb6-4a63-97d4-d563d4a4690b`,
                organizationId: mockOrgId,
                schoolId: `87aca549-fdb6-4a63-97d4-d563d4a4687g`,
                name: `School Admin`,
                status: `active`,
            },
        ],
        schools: [
            {
                id: `87aca549-fdb6-4a63-97d4-d563d4a4687g`,
                name: `Mock Data Academy`,
                status: `active`,
            },
        ],
        dateOfBirth: `210910`,
        gender: `male`,
    },
];

export const mockPaginatedUsers = {
    usersConnection: {
        edges: [
            {
                node: {
                    ...users[0],
                },
            },
            {
                node: {
                    ...users[1],
                },
            },
        ],
        pageInfo: {
            endCursor: user3Id,
            hasNextPage: false,
            hasPreviousPage: false,
            startCursor: ``,
        },
        totalCount: 1,
    },
};

export interface UserRow {
    id: string;
    givenName: string;
    familyName: string;
    avatar: string;
    contactInfo?: string;
    email: string;
    phone: string;
    roleNames: string[];
    schoolNames: string[];
    status: string;
    joinDate?: Date;
}

export const userRows: UserRow[] = [
    {
        id: `2128d1d6-16b9-5df2-927b-3f2b9ed947d4`,
        givenName: `Andres 09`,
        familyName: `09`,
        avatar: ``,
        email: `john@09.com`,
        phone: ``,
        roleNames: [ `Organization Admin`, `Student` ],
        schoolNames: [],
        status: `active`,
    },
    {
        id: `7f4d5778-f512-5253-b456-47c4e80f9cf6`,
        givenName: `John`,
        familyName: `Petrucci`,
        avatar: ``,
        email: `andresp+09@bluetrailsoft.com`,
        phone: ``,
        roleNames: [ `Role 12`, `Student` ],
        schoolNames: [ `BTS University`, `San Javier University` ],
        status: `active`,
    },
    {
        id: `7a9e443c-d986-5cb0-94e5-30ed3f597ed3`,
        givenName: `Mike`,
        familyName: `Portnoy`,
        avatar: ``,
        email: `mike@09.com`,
        phone: ``,
        roleNames: [ `Teacher`, `Student` ],
        schoolNames: [ `BTS University`, `San Javier University` ],
        status: `inactive`,
    },
    {
        id: `4b1503a1-1b0b-57ec-b05c-dddd8fe78bc9`,
        givenName: `Stephen`,
        familyName: `King`,
        avatar: ``,
        email: `stephen@09.com`,
        phone: ``,
        roleNames: [ `Teacher`, `Student` ],
        schoolNames: [ `BTS University` ],
        status: `inactive`,
    },
];

export const columns: TableColumn<UserRow>[] = [
    {
        id: `id`,
        label: `ID`,
        disableSort: true,
        secret: true,
    },
    {
        id: `givenName`,
        persistent: true,
        label: `First Name`,
    },
    {
        id: `familyName`,
        persistent: true,
        label: `Last Name`,
    },
    {
        id: `roleNames`,
        disableSort: true,
        label: `Organization Roles`,
    },
    {
        id: `schoolNames`,
        disableSort: true,
        label: `Schools`,
    },
    {
        id: `contactInfo`,
        disableSort: true,
        label: `Contact Info`,
    },
    {
        id: `status`,
        disableSort: true,
        label: `Status`,
    },
    {
        id: `joinDate`,
        disableSort: true,
        label: `Join Date`,
    },
];

export const filters: TableFilter<UserRow>[] = [
    {
        id: `roleNames`,
        label: `Organization Roles`,
        operators: [
            {
                label: `equals`,
                value: `eq`,
                multipleValues: true,
                options: mockRolesFilterList,
            },
        ],
    },
    {
        id: `status`,
        label: `Status`,
        operators: [
            {
                label: `equals`,
                value: `eq`,
                options: [
                    {
                        value: `active`,
                        label: `Active`,
                    },
                    {
                        value: `inactive`,
                        label:`Inactive`,
                    },
                ],
            },
        ],
    },
];
