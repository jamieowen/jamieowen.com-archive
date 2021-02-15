import { Layout, LayoutGroup } from "@jamieowen/motion-layout";

const Heading = ({ children }) => (
  <Layout>
    {({ state, ref }) => (
      <h1 ref={ref} className={state.visibility}>
        {children} ({state.visibility.toString()})
      </h1>
    )}
  </Layout>
);

export default function BasicMount() {
  return (
    <div>
      Hello this is test
      <h1>Some Heading</h1>
      <p>Some paragraph</p>
      <Heading>Outside State 1</Heading>
      <LayoutGroup groupName="group1">
        <Heading>Hello State 1</Heading>
        <Heading>Hello State 2</Heading>
        <Heading>Hello State 3</Heading>
      </LayoutGroup>
      <LayoutGroup groupName="group2">
        <Heading>Hello State 1</Heading>
        <Heading>Hello State 2</Heading>
        <Heading>Hello State 3</Heading>
      </LayoutGroup>
    </div>
  );
}
