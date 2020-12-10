import { Schedule } from "@jamieowen/motion-layout";
import { ReactNode, useState } from "react";
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
