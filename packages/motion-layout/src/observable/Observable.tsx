import React, {
  FC,
  MutableRefObject,
  ReactNode,
  useLayoutEffect,
  useRef,
} from "react";
import { Schedule, ScheduleRenderChildState } from "../scheduler";
import { useObserver } from "./Observer";

export interface ObservableRenderChildState extends ScheduleRenderChildState {
  ref: MutableRefObject<HTMLElement>;
}

export const Observable: FC<{
  children: (state: ObservableRenderChildState) => ReactNode;
}> = ({ children }) => {
  const ref = useRef<HTMLElement>(undefined!);
  const observer = useObserver();
  useLayoutEffect(() => {
    observer.observe(ref.current, (entry) => {
      console.log("update:", entry.intersectionRatio, entry.isIntersecting);
    });
    return () => {
      observer.unobserve(ref.current);
    };
  }, []);

  // Schedule should accept a tags array.
  // This will be implemented as a Set which can toggle on/off tags.
  // ANY changes to tags will result in a state change on that component, allowing the component
  // to respond accordingly.
  // Fields is an object that can contain arbritary key values to store number / string types.
  // Changes to fields also trigger state changes.
  // Both Tags and Fields can be searched / sorted.

  // Why the difference betwern tags and fields??

  // BOTH trigger changes in state, but ONLY tags are changed / can be changed asyncrously with delays.
  // tags are committed gradually, so animations / events can be triggered
  // When determining delays, fields can be used for sorting & delay purposes.

  return (
    <Schedule>
      {(state) =>
        children({
          ...state,
          ref,
        })
      }
    </Schedule>
  );
};

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

// const Observable = ()=>{

//   const children: (ratio: )=> ReactNode;
//   const ref = {}
//   const [ ratio,setRatio ] = useState();
//   useResizeObserver = ()=>{
//     const tagss = [ 'visible', 'intersecting', 'hidden' ];
//     const ratio = [];
//   }

//   <Schedule tags={['visible']}>
//     {
//       ({})=>{

//       }
//     }
//   </Schedule>
// }
