import { Schedule } from "@jamieowen/motion-layout";
import { Group } from "../../src/scheduler/Group";

const Test = () => {
  console.log("TEST : ", this);
  return <div>Test</div>;
};
export default function BasicMount() {
  return (
    <div>
      Hello this is test
      <h1>Some Heading</h1>
      <p>Some paragraph</p>
      <Schedule>{(state) => <h1>Outside State {state}</h1>}</Schedule>
      <Group groupName="group1">
        <Schedule>{(state) => <h1>Hello State 1 {state}</h1>}</Schedule>
        <Schedule>{(state) => <h1>Hello State 2 {state}</h1>}</Schedule>
        <Schedule>{(state) => <h1>Hello State 3 {state}</h1>}</Schedule>
      </Group>
      <Group groupName="group2">
        <Schedule>{(state) => <h1>Hello State 1 {state}</h1>}</Schedule>
        <Schedule>{(state) => <h1>Hello State 2 {state}</h1>}</Schedule>
        <Schedule>{(state) => <h1>Hello State 3 {state}</h1>}</Schedule>
      </Group>
      <Test />
    </div>
  );
}
