import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import {
    Stepper,
} from 'material-ui/Stepper';
import styles from './styles.scss';
import Message from '../../components/Questions/Message';
import survey from '../../survey.json';

class Survey extends Component {

    state = {
        stepIndex: 0
    }

    handleNext = () => {
        const {stepIndex} = this.state;
        this.setState({
            stepIndex: stepIndex + 1,
            finished: stepIndex >= 2,
        });
    };

    handlePrev = () => {
        const {stepIndex} = this.state;
        if (stepIndex > 0) {
            this.setState({ stepIndex: stepIndex - 1 });
        }
    };

    renderQuestion(question, key) {
        switch(question.type) {
            case 'message':
                return (
                    <Message
                        key={key}
                        settings={question}
                        next={this.handleNext}
                        back={this.handlePrev}/>
                );
            case 'boolean':
                return (
                    <Message
                        key={key}
                        settings={question}
                        next={this.handleNext}
                        back={this.handlePrev}/>
                );
            default:
                return null;
        }
    }

    render() {
        const { stepIndex } = this.state;
        return (
            <div>
                <Paper zDepth={1} className={styles.container}>
                    <Stepper activeStep={stepIndex} orientation="vertical">
                        {
                            survey.questions[0].map((question, key) => {
                                return this.renderQuestion(question, key);
                            })
                        }
                    </Stepper>
                </Paper>
            </div>
        );
    }
}

export default Survey;
