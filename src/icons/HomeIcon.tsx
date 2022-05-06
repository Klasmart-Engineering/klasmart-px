import { ReactComponent } from "./svg/Home.svg";
import { SvgIconComponent } from "@mui/icons-material";
import SvgIcon,
{ SvgIconProps } from "@mui/material/SvgIcon";

const HomeIcon: React.VFC<SvgIconProps> = (props) => {
    return (
        <SvgIcon
            {...props}
            component={ReactComponent}
        />
    );
};

export default HomeIcon as SvgIconComponent;
