import React, { Component } from 'react';
import PrimarySearchAppBar from './menu';
import VerticalTabs from './veriticalTab';

export class Main extends Component {
 render() {
  return (
 <div>
<PrimarySearchAppBar />
<VerticalTabs />
 </div>
  );
  }
}
export default Main;
