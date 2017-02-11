import React, { Component, PropTypes } from 'react';
// import DevTools from './DevTools';
import { Router } from 'react-router';
import routes from '../routes';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


export default class Root extends Component {
    render() {
        const { history } = this.props;
        return (
            <MuiThemeProvider>
                    <Router history={history}>
                        {routes}
                    </Router>
            </MuiThemeProvider>
        );
    }
}

Root.propTypes = {
    history: PropTypes.object.isRequired
};
