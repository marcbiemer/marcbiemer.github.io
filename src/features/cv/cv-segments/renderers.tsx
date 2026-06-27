import { TextLink } from "@/components/ui/link/text-link/text-link";
import { WorkItem, ContentItem } from "@/data/cv";

const OptionalLink = ({
  href,
  children,
}: {
  href?: string;
  children: React.ReactNode;
}) =>
  href ? (
    <TextLink href={href} newTab hasUnderline>{children}</TextLink>
  ) : (
    <>{children}</>
  );

export const renderTitle = {
  professionalExperience: (item: WorkItem) => (
    <>
      <span>{item.title}</span>
    </>
  ),

  selectedWork: (item: WorkItem) => (
    <>
      <span>{item.type}, </span>
      <OptionalLink href={item.link}>{item.title}</OptionalLink>
    </>
  ),

  education: (item: WorkItem) => (
    <>
      <span>{item.title}</span>
    </>
  ),

  talks: (item: ContentItem) => (
    <>
      <span>{item.type}, </span>
      <span>{item.title}</span>
    </>
  ),

  lectures: (item: ContentItem) => (
    <>
      <span>{item.title}</span>
    </>
  ),

  professionalService: (item: WorkItem) => (
    <>
      <span>{item.type}, </span>
      <OptionalLink href={item.link}>{item.title}</OptionalLink>
    </>
  ),

  collaborations: (item: WorkItem) => (
    <>
      <span>{item.type}, </span>
      <OptionalLink href={item.link}>{item.title}</OptionalLink>
    </>
  ),
};

export const renderSubtitle = {
  professionalExperience: (item: WorkItem) => (
    <>
      <span>{item.institution}, </span>
      <span>{item.location}</span>
    </>
  ),

  selectedWork: (item: WorkItem) => (
    <>
      <span>{item.institution}, </span>
      <span>{item.location}</span>
    </>
  ),

  education: (item: WorkItem) => (
    <>
      <span>{item.institution}, </span>
      <span>{item.location}</span>
    </>
  ),

  talks: (item: ContentItem) => (
    <>
      <OptionalLink href={item.event?.link}>{item.event?.title}</OptionalLink>
      <span>, {item.location} </span>
      {item.recording && (
        <span>
          | <OptionalLink href={item.recording}>Recording</OptionalLink>
        </span>
      )}
    </>
  ),

  lectures: (item: ContentItem) => (
    <>
      <span>{item.institution}, </span>
      <span>{item.location}</span>
      {item.detail && <span>{` | ${item.detail}`}</span>}
    </>
  ),

  professionalService: (item: WorkItem) => (
    <>
      {item.institution && <span>{item.institution}, </span>}
      <span>{item.location}</span>
    </>
  ),

  collaborations: (item: WorkItem) => (
    <>
      <span>{item.institution}, </span>
      <span>{item.location}</span>
    </>
  ),
};

export type SectionKey = keyof typeof renderTitle;
