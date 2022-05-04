import { ReactComponent } from "./svg/Subject.svg";
import { SvgIconComponent } from "@mui/icons-material";
import SvgIcon,
{ SvgIconProps } from "@mui/material/SvgIcon";

const SubjectIcon: React.VFC<SvgIconProps> = (props) => {
    return (
        <SvgIcon
            {...props}
            component={ReactComponent}
        />
    );
};

export default SubjectIcon as SvgIconComponent;
