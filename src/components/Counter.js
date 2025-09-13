import {Component} from 'react'
import {useDispatch, useSelector, connect} from 'react-redux'
import classes from './Counter.module.css';
import {counterActions} from '../store/counter'

// Counter with Functional Component
const Counter = () => {
  const counter = useSelector(state => state.counter.counter)
  const show = useSelector(state => state.counter.showCounter)
  const dispatch = useDispatch()
  const incrementHandler = () => {
    dispatch(counterActions.increment())
  }
    const increaseHandler = () => {
    dispatch(counterActions.increase(5))
  }
  const decrementHandler = () => {
    dispatch(counterActions.decrement())
  }
  const toggleCounterHandler = () => {
    dispatch(counterActions.toggleCounter())
  };

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      { show && <div className={classes.value}>{counter}</div>}
      <div>
        <button onClick={incrementHandler}>Increment</button>
        <button onClick={increaseHandler}>Increment By 5</button>
        <button onClick={decrementHandler}>Decrement</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};
export default Counter;

// Counter with Class-based Component
// class Counter extends Component {
//   incrementHandler(){
//     this.props.increment()
//   }
//   decrementHandler(){
//     this.props.decrement()

//   }
//   toggleCounterHandler(){}
//   render(){
//     return (
//     <main className={classes.counter}>
//       <h1>Redux Counter</h1>
//       <div className={classes.value}>{this.props.counter}</div>
//       <div>
//         <button onClick={this.incrementHandler.bind(this)}>Increment</button>
//         <button onClick={this.decrementHandler.bind(this)}>Decrement</button>
//       </div>
//       <button onClick={this.toggleCounterHandler}>Toggle Counter</button>
//     </main>
//   );
//   }
// }
// const mapStatetoProps = state => {
//   return {
//     counter : state.counter
//   }
// }
// const mapDispatchToProps = dispatch => {
//   return {
//     increment : () => dispatch({type : 'increment'}),
//     decrement : () => dispatch({type : 'decrement'})
//   }
// }
// export default connect(mapStatetoProps,mapDispatchToProps)(Counter);
