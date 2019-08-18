

# Notes

Cases when we may be running a transfrom update

1. With Transform Feedback ( on the vertex shader )
2. On the CPU via transpilation
3. By ping ponging textures ( on the fragment shader )

## Stages

1. Read the input attributes 
 - on the vertex shader they will be attributes
 - on the fragment shader they will be varyings

2. Perform some operations

3. Write the output 

- with transform feedback we are writing to varyings
- with cpu we can write to varyings. ( this inlines with TF )
- via fragment shader, we write to gl_Position
- in the case of MRT we write to gl_Position[0], gl_Position[1], etc
