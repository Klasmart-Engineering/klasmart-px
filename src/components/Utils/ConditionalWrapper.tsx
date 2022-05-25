/* eslint-disable react/prop-types */
interface ConditionalWrapperProps {
    condition: boolean;
    wrapper: (child: React.ReactNode) => React.ReactNode;
}

const ConditionalWrapper: React.FC<ConditionalWrapperProps> = (props) => {
    if (!props.condition) return props.children as any;
    return props.wrapper(props.children);
};

export default ConditionalWrapper;
