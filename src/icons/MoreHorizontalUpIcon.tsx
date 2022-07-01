import { ReactComponent } from "./svg/MoreHorizontalUp.svg";
import { SvgIconComponent } from "@mui/icons-material";
import SvgIcon,
{ SvgIconProps } from "@mui/material/SvgIcon";

const MoreHorizontalUpIcon: React.VFC<SvgIconProps> = (props) => {
    return (
        <SvgIcon
            {...props}
            component={ReactComponent}
        />
    );
};

export default MoreHorizontalUpIcon as SvgIconComponent;
