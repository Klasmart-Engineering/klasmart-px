import { ReactComponent } from "./svg/MoreHorizontalDown.svg";
import { SvgIconComponent } from "@mui/icons-material";
import SvgIcon,
{ SvgIconProps } from "@mui/material/SvgIcon";

const MoreHorizontalDownIcon: React.VFC<SvgIconProps> = (props) => {
    return (
        <SvgIcon
            {...props}
            component={ReactComponent}
        />
    );
};

export default MoreHorizontalDownIcon as SvgIconComponent;
