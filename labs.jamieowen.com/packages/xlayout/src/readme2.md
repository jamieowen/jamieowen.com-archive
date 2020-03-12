
# Some Examples

Generate a point, give it a color attribute,and
add a child rect object.

```typescript
gen.point([0,0],[  
  op.color(i=>0xff0000),
  gen.rect({ w:100,h:100 },[
    
  ])
])
// returns PointNode
```

Generate 100 points, assign a random color and a random position.

```javascript
gen.points(100,[
  op.color(i=>Math.random()*0xffffff),
  op.position(i=>[Math.random(),Math.random(),Math.random()])
])
// returns SeedNode? // or a GroupNode
```

Generate an area bounds of 100,100. Subdivide the area into 5x5 and generate a rect in every even cell.

```typescript
gen.bounds({w:100,h:100},[
  gen.subdivide({r:5,c:5},[
    gen.rect(i=>i%2==0)
  ])
])
// returns a BoundsNode
```

Create a group at 0,0. Rotate 45deg. Create a 10x10 grid and generate a circle in every even cell and rect in every odd cell.

```typescript
gen.group([0,0],[
  op.rotate(Math.PI*0.5),
  gen.grid({r:10,c:10},[
    gen.circle(i=>i%2==0),
    gen.rect(i=>i%2==1),
  ])
])
// return GroupNode
```