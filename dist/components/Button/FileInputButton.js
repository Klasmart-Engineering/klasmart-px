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
const Button_1 = __importDefault(require("./Button"));
const react_1 = __importStar(require("react"));
function FileInputButton(props) {
    const { accept = [], label, variant = `outlined`, size = `large`, color = `primary`, fileSizeLimitInKB = 2097152, errorMessages = {
        noFileError: `No File Found`,
        fileSizeTooBigError: `The maximum file size is 2MB`,
        wrongFileTypeUploadError: `This image file must be in the correct format`,
    }, onClick, onFileChange, onError, } = props;
    const [errorMessage, setErrorMessage] = (0, react_1.useState)(``);
    const acceptedMimeTypes = Array.isArray(accept) ? accept : [accept];
    const hiddenFileInput = react_1.default.useRef(null);
    const handleClick = (event) => {
        onClick?.(event);
        hiddenFileInput.current?.click();
    };
    const handleFileChange = (event) => {
        try {
            const file = event.target.files?.[0];
            if (!file)
                return setErrorMessage(errorMessages?.noFileError);
            if (!acceptedMimeTypes.some(extension => extension === file.type))
                return setErrorMessage(errorMessages?.wrongFileTypeUploadError);
            if (file.size > fileSizeLimitInKB)
                return setErrorMessage(errorMessages?.fileSizeTooBigError);
            setErrorMessage(``);
            return onFileChange(file);
        }
        catch (e) {
            onError?.(errorMessages?.noFileError);
        }
    };
    (0, react_1.useEffect)(() => {
        onError?.(errorMessage);
    }, [errorMessage]);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("input", { ref: hiddenFileInput, hidden: true, type: "file", accept: acceptedMimeTypes.join(`,`), onChange: handleFileChange }),
        react_1.default.createElement(Button_1.default, { label: label, variant: variant, color: color, size: size, onClick: handleClick })));
}
exports.default = FileInputButton;
