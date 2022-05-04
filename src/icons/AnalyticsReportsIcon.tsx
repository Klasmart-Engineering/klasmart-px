import { ReactComponent } from "./svg/AnalyticsReports.svg";
import { SvgIconComponent } from "@mui/icons-material";
import SvgIcon,
{ SvgIconProps } from "@mui/material/SvgIcon";

const AnalyticsReportsIcon: React.VFC<SvgIconProps> = (props) => {
    return (
        <SvgIcon
            {...props}
            component={ReactComponent}
        />
    );
};

export default AnalyticsReportsIcon as SvgIconComponent;
