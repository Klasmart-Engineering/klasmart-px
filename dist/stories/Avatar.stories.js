"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.Organization = void 0;
const OrganizationAvatar_1 = __importDefault(require("../components/OrganizationAvatar"));
const UserAvatar_1 = __importDefault(require("../components/UserAvatar"));
const react_1 = __importDefault(require("react"));
exports.default = {
    title: `Avatar`,
    argTypes: {
        size: {
            options: [
                `small`,
                `medium`,
                `large`,
            ],
            control: {
                type: `radio`,
            },
        },
    },
};
const OrganizationAvatarTemplate = (args) => {
    return react_1.default.createElement(OrganizationAvatar_1.default, { ...args });
};
exports.Organization = OrganizationAvatarTemplate.bind({});
exports.Organization.args = {
    name: `Kidsloop`,
    size: `large`,
    color: `purple`,
};
const UserAvatarTemplate = (args) => {
    return react_1.default.createElement(UserAvatar_1.default, { ...args });
};
exports.User = UserAvatarTemplate.bind({});
exports.User.args = {
    name: `Joe Bloggs`,
    size: `large`,
    color: `red`,
};
