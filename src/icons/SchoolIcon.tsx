import { ReactComponent } from "./svg/School.svg";
import { SvgIconComponent } from "@mui/icons-material";
import SvgIcon,
{ SvgIconProps } from "@mui/material/SvgIcon";

const SchoolIcon: React.VFC<SvgIconProps> = (props) => {
    return (
        <SvgIcon
            {...props}
            component={ReactComponent}
        />
    );
};

export default SchoolIcon as SvgIconComponent;
