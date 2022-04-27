import ImagePicker,
{ Props } from './ImagePicker';
import { Story } from '@storybook/react';

export default {
    title: `ImagePicker`,
    component: ImagePicker,
};

//👇 We create a “template” of how args map to rendering
const Template: Story<Props> = (args) => <ImagePicker {...args} />;

export const Primary = Template.bind({});

Primary.args = {
    isZoomDisabled: false,
    isRotationDisabled: false,
    imageToBeCropped: `https://img.huffingtonpost.com/asset/5ab4d4ac2000007d06eb2c56.jpeg?cache=sih0jwle4e&ops=1910_1000`,
    dialogTitle: `Crop it, baby`,
    isCropperOpen: true,
    zoomLabel: `Zoom`,
    rotateLabel: `Rotate`,
    cancelLabel: `Cancel`,
    okLabel: `OK`,
    aspect: 4 / 3,
    onImageCropComplete: ((image) => {
        console.log(image.file);
    }),
};
