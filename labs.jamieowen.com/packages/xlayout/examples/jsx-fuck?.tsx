

const Template = null;
const Group;

export const gem = ()=>{

  const {
    width,height
  } = params;

  // JSX Will not defer the instantiation of the tree..
  // which would be handy for subdviing based on current 
  // ops on other parts of the tree. ( breadth first traversal )
  
  return (
    <Template>
      <Group position={[0,0]}>

      </Group>
      <Grid>

      </Grid>
    </Template>
  )
}