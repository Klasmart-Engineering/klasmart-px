import React from "react";
interface Props {
    disabled: boolean;
    deviceType: "video" | "audio";
    deviceId?: string;
    devices: MediaDeviceInfo[];
    onChange: ((event: React.ChangeEvent<{
        name?: string | undefined;
        value: unknown;
    }>, child: React.ReactNode) => void) | undefined;
}
export default function MediaDeviceSelect(props: Props): JSX.Element;
export {};
