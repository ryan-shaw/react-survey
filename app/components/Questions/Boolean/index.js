import React, { PropTypes } from 'react';
import {
    Step,
    StepLabel,
    StepContent
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import RadioButton, { RadioButtonGroup } from 'material-ui/RadioButton';

const style = {
    radioButton: {
        paddingBottom: 10
    }
};

class Boolean extends React.Component {

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
                    <RadioButtonGroup style={{padding: 13}}
                        name="group">
                        <RadioButton
                            label={this.props.settings.text_false}
                            style={style.radioButton}
                            value="false"/>
                        <RadioButton
                            label={this.props.settings.text_true}
                            value="true"/>
                    </RadioButtonGroup>
                    <div style={{ margin: '12px 0' }}>
                        <RaisedButton
                            label={this.props.settings.next_text || 'Next'}
                            disableTouchRipple
                            disableFocusRipple
                            primary
                            onTouchTap={this.props.next}
                            style={{ marginRight: 12 }} />
                        <FlatButton
                            label="Back"
                            disableTouchRipple
                            disableFocusRipple
                            onTouchTap={this.props.back}
                            style={{ marginRight: 12 }} />
                    </div>
                </StepContent>
            </Step>
        );
    }
}

Boolean.propTypes = {
    active: PropTypes.bool,
    completed: PropTypes.bool,
    disabled: PropTypes.bool,
    index: PropTypes.number,
    last: PropTypes.bool,
    settings: PropTypes.shape({
        title: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        next_text: PropTypes.string,
        text_true: PropTypes.string,
        text_false: PropTypes.string,
    }),
    next: PropTypes.func,
    back: PropTypes.func,
};

// Boolean.propTypes = PropTypes.any;

Boolean.defaultProps = {
    settings: {
        text_true: 'Yes',
        text_false: 'No'
    }
};

export default Boolean;
