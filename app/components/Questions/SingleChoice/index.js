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

class Choice extends React.Component {

    constructor(props) {
        super();
        this.state.selected = props.initialState;
    }

    state = {
        selected: null
    }

    renderChoices() {
        return this.props.settings.choices.map((ele, key) => {
            return (
                <RadioButton
                    key={key}
                    label={ele[0]}
                    style={style.radioButton}
                    value={ele[1]}/>
            );
        });
    }

    updateAnswer = (event, value) => {
        this.props.updateAnswer(value);
        this.setState({selected: value});
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
                        name="group"
                        onChange={this.updateAnswer}
                        valueSelected={this.state.selected}>
                        {
                            this.renderChoices()
                        }
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
    updateAnswer: PropTypes.func.isRequired,
    initialState: PropTypes.any,
};

// Choice.propTypes = PropTypes.any;

// Choice.defaultProps = {
//     settings: {
//         next_text: 'Next'
//     }
// };

export default Choice;
