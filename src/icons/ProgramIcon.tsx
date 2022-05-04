import { ReactComponent } from "./svg/Program.svg";
import { SvgIconComponent } from "@mui/icons-material";
import SvgIcon,
{ SvgIconProps } from "@mui/material/SvgIcon";

const ProgramIcon: React.VFC<SvgIconProps> = (props) => {
    return (
        <SvgIcon
            {...props}
            component={ReactComponent}
        />
    );
};

export default ProgramIcon as SvgIconComponent;
