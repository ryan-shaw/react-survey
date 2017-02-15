import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Example from './containers/Example';

export default (
	<Route path="/" component={Example}>
		<IndexRoute component={Example} />
		{/* <Route path="/about" component={About} /> */}
	</Route>
);
