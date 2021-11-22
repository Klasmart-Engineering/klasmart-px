import useIsMounted from "./useIsMounted";
import {
    act,
    renderHook,
} from "@testing-library/react-hooks";

function mount () {
    const { result, unmount } = renderHook(() => useIsMounted());
    return {
        isMounted: result.current,
        unmount,
    };
}

test(`returns true when mounted`, () => {
    const { isMounted } = mount();
    expect(isMounted()).toBe(true);
});

test(`returns false when unmounted`, () => {
    const { isMounted, unmount } = mount();
    expect(isMounted()).toBe(true);

    act(() => unmount());
    expect(isMounted()).toBe(false);
});
