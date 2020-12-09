import { Schedule } from "@jamieowen/motion-layout";
import { Group } from "../../src/scheduler/Group";

const Heading = ({ children }) => (
  <Schedule>
    {({ state, group }) => (
      <h1 className={state === "mount" ? "visible" : "hidden"}>
        {children} ({state}) ({group})
      </h1>
    )}
  </Schedule>
);

export default function BasicMount() {
  return (
    <div>
      Hello this is test
      <h1>Some Heading</h1>
      <p>Some paragraph</p>
      <Heading>Outside State 1</Heading>
      <Group groupName="group1">
        <Heading>Hello State 1</Heading>
        <Heading>Hello State 2</Heading>
        <Heading>Hello State 3</Heading>
      </Group>
      <Group groupName="group2">
        <Heading>Hello State 1</Heading>
        <Heading>Hello State 2</Heading>
        <Heading>Hello State 3</Heading>
      </Group>
    </div>
  );
}

// Add fields?
// Sort fields, will sort schedule items differently
// Some examples would be, x, y, width, height, area
// Sorting is specified on Group. sort=['area','tag1', 'tag2' ]], sorting groups are inherited
// fields can be value fields or sort fields.
// IntersectionObserver. ( intersection ratio, )
// scrolling,  ( top of page, bottom of page )

// TAGS & FIELDS?
// Tags are a grouping mechanism, [ 'topbar','navigation', 'hero', 'visible' ],
// Sort [ visible, hero ]
// Tags are committed to components, asynchronously, via a delay, changes to tags during a commit process, will cause the delay to be reset.
// Fields.
// Fields are value fields that can be sorted and updated frequently.
// They are committed immediately and do not reset the commit process.
// Bare in mind, that if a field has been used to determine delays and is updated, it won't
// May be this isn't right???
