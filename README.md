# react viewable
A react wrapper component that renders it's children only once the component
is in view. Takes several optional props for timing customization.

See it in action [here](http://www.arjundutta.codes)

--- 

# Props
```js
once         : PropTypes.bool,
reactionTime : PropTypes.number,
buffer       : PropTypes.number,
delay        : PropTypes.number,
children     : PropTypes.node,
onViewEnter  : PropTypes.func,
onViewLeave  : PropTypes.func,

// animation/style props
fade    : PropTypes.bool,
fadeDir : PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
```

### once `bool` _optional_
#### default `false`
Whether the children only come into view once - if false, the children will animate 
out as soon as they are off screen, and then re-animate in next time they are on screen

### reactionTime `number` _optional_
#### default `500`
How often the wrapper checks to see whether it's in the viewport in ms

### buffer `number` _optional_
#### default `100`
The amount of pixels the wrapper allows to be in view, a larger number will start the transition before the element is in the viewport

### delay `number` _optional_
#### default `500`
The time in milliseconds before which the transition starts once the component is in the viewport

### onViewEnter `func` _optional_
A function that is called every time the component transitions from out of view to into view. Is passed the html element

### onViewLeave `func` _optional_
A function that is called every time the component transitions from into view to out of view. Is passed the html element

### children `node` _optional_
The content to render

---

# Usage

`npm install react-viewable`


Here is an example integration:

```js
import Viewable from 'react-viewable';

const MyApp = () => {
  return (
    <Viewable
      once={true}
      reactionTime={500}
      buffer={100}
      delay={500}
      onViewEnter={el => console.log(el)}
      onViewLeave={el => console.log(el)}
    >
      <MyComponent />
    </Viewable>
  )
}

export default MyApp;
```



## Development
* clone repo && `npm install`
* Development server `npm start`.
* Build `npm run build`;
