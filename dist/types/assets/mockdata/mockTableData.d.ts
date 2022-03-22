import { TableFilter } from "../../components/Table/Common/Filter/Filters";
import { TableColumn } from "../../components/Table/Common/Head";
export declare const mockOrgId = "c19de3cc-aa01-47f5-9f87-850eb70ae073";
export declare const user1Id = "p19de3cc-aa01-47f5-9f87-850eb70ae071";
export declare const user2Id = "p19de3cc-aa01-47f5-9f87-850eb70ae072";
export declare const user3Id = "p19de3cc-aa01-47f5-9f87-850eb70ae073";
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
export declare const users: UserNode[];
export declare const mockPaginatedUsers: {
    usersConnection: {
        edges: {
            node: {
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
            };
        }[];
        pageInfo: {
            endCursor: string;
            hasNextPage: boolean;
            hasPreviousPage: boolean;
            startCursor: string;
        };
        totalCount: number;
    };
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
export declare const userRows: UserRow[];
export declare const columns: TableColumn<UserRow>[];
export declare const filters: TableFilter<UserRow>[];
export declare const comboBoxFilters: TableFilter<UserRow>[];
