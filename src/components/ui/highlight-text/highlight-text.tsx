import { TextLink } from "@/components/ui/link/text-link/text-link";

type Props = {
    text: string;
    className?: string;
    linkClassName?: string;
    linkArrow?: boolean;
    linkHasUnderline?: boolean;
};

// Matches, in order of priority:
// [highlighted text]
// {br}
// {link:https://example.com}link text{/link}
const TOKEN_REGEX = /(\[.*?\]|\{br\}|\{link:[^}]*\}.*?\{\/link\})/g;
const LINK_REGEX = /^\{link:([^}]*)\}([\s\S]*)\{\/link\}$/;

export default function HighlightText({
    text,
    className,
    linkClassName,
    linkArrow = false,
    linkHasUnderline = false,
}: Props) {
    const parts = text.split(TOKEN_REGEX);

    return (
        <>
            {parts.map((part, index) => {
                if (part === "{br}") {
                    return <br key={`${part}-${index.toString()}`} />;
                }

                if (part.startsWith("[") && part.endsWith("]")) {
                    return (
                        <span key={`${part}-${index.toString()}`} className={className}>
                            {part.slice(1, -1)}
                        </span>
                    );
                }

                const linkMatch = part.match(LINK_REGEX);
                if (linkMatch) {
                    const [, href, label] = linkMatch;

                    return (
                        <TextLink
                            key={`${part}-${index.toString()}`}
                            href={href}
                            className={linkClassName}
                            arrow={linkArrow}
                            hasUnderline={linkHasUnderline}
                        >
                            {label}
                        </TextLink>
                    );
                }

                return part;
            })}
        </>
    );
}
