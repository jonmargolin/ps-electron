import * as React from 'react';
import ProgressBar from './ui/progress-bar/progress-bar';

let styles = require('./Counter.scss');

export interface IProps {
  reset(): void,
  counter: number
}

export class Counter extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }
  render() {
    return (
      <div className="home-container" data-class="home-container">
          <div className={`${styles.counter}`} data-tid="counter">
            {this.props.counter}
          </div>
          <ProgressBar progress={this.props.counter}/>
    <button className={styles.btn} onClick={this.props.reset} data-tclass="btn">
           <i className="fa fa-minus" />
    </button>
        <div className="progress-bar"></div>
      </div>
      // <div>
      //   <div className={styles.backButton} data-tid="backButton">
      //     <Link to="/">
      //       <i className="fa fa-arrow-left fa-3x" />
      //     </Link>
      //   </div>
      //   <div className={styles.btnGroup}>
      //     <button className={styles.btn} onClick={increment} data-tclass="btn">
      //       <i className="fa fa-plus" />
      //     </button>
      //     <button className={styles.btn} onClick={incrementIfOdd} data-tclass="btn">odd</button>
      //     <button className={styles.btn} onClick={() => incrementAsync()} data-tclass="btn">async</button>
      //   </div>
      // </div>
    );
  }
}

export default Counter;