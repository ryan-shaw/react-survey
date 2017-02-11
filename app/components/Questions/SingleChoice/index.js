import React, { PropTypes } from 'react';
import {
    Step,
    StepLabel,
    StepContent
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';


class Choice extends React.Component {

    constructor() {
        super();
    }

    render() {
        const {
            active,
            completed,
            disabled,
            index,
            last,
        } = this.props;
        return (
            <Step
                active={active}
                completed={completed}
                disabled={disabled}
                index={index}
                last={last}>
                <StepLabel>{this.props.settings.title}</StepLabel>
                <StepContent>
                    <div style={{ margin: '12px 0' }}>
                        <RaisedButton
                            label={this.props.settings.next_text || 'Next'}
                            disableTouchRipple
                            disableFocusRipple
                            primary
                            onTouchTap={this.props.next}
                            style={{ marginRight: 12 }} />
                    </div>
                </StepContent>
            </Step>
        );
    }
}

Choice.propTypes = {
    active: PropTypes.bool,
    completed: PropTypes.bool,
    disabled: PropTypes.bool,
    index: PropTypes.number,
    last: PropTypes.bool,
    settings: PropTypes.shape({
        title: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        next_text: PropTypes.string,
        choices: PropTypes.array.isRequired,
    }),
    next: PropTypes.func,
    back: PropTypes.func,
};

// Choice.propTypes = PropTypes.any;

// Choice.defaultProps = {
//     settings: {
//         next_text: 'Next'
//     }
// };

export default Choice;
