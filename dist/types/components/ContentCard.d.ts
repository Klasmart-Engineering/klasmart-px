/// <reference types="react" />
interface ContentItem {
    published: boolean;
    contentId: string;
    description: string;
    link: string;
    image: string;
    title: string;
    type?: "lesson-plan" | "lesson-material" | undefined;
}
declare type LibraryContentType = "OwnedContent" | "Marketplace";
interface Props {
    content: ContentItem;
    type: LibraryContentType;
}
export default function BaseCard(props: Props): JSX.Element;
export {};
