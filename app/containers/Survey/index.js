import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import {
    Stepper,
} from 'material-ui/Stepper';
import styles from './styles.scss';
import Message from '../../components/Questions/Message';
import Boolean from '../../components/Questions/Boolean';
import survey from '../../survey.json';
import { find } from 'lodash/collection';
import { extend } from 'lodash/object';

class Survey extends Component {

    state = {
        stepIndex: 0,
        answers: {}
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

    /**
     * Return component based on type
     */
    getComponent(question, key) {
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
                    <Boolean
                        key={key}
                        updateAnswer={this.updateAnswer(key, 'boolean')}
                        settings={question}
                        next={this.handleNext}
                        back={this.handlePrev}/>
                );
            default:
                return null;
        }
    }

    updateAnswer = (id, type) => {
        return (rawValue) => {
            let value = rawValue;
            if(type === 'boolean') {
                value = rawValue === 'true';
            }
            const answers = this.state.answers;
            answers[`a:q:${id}`] = value;
            this.setState(extend(this.state, { answers }));
        };
    }

    /**
     * Recursively render edges based on answer
     * @param question
     *          the question to render
     * @returns list of question components
     */
    renderEdges(question, questions = []) {
        const id = question.id;
        const q = find(survey.questions[0], {id});
        if(!q) {
            return questions;
        }
        const edge = survey.edges[`q:${id}`];
        questions.push(this.getComponent(q, id));
        if(typeof edge === 'string') {
            const qnext = find(survey.questions[0], {id: edge.split(':')[1]});
            if(qnext) {
                questions.concat(this.renderEdges(qnext, questions));
            }
        }else if(typeof edge === 'object') {
            let qnext = find(survey.questions[0], {id: edge.else});
            const conditions = edge.conditions;
            const condition = this.state.answers[conditions[0][0]];
            if(condition === conditions[0][2]) {
                qnext = find(survey.questions[0], {id: edge.next});
            }
            if(qnext) {
                questions.concat(this.renderEdges(qnext, questions));
            }
        }
        return questions;
    }

    /**
     * Start recursive building of questions
     */
    renderQuestions(id = survey.start) {
        const q = find(survey.questions[0], {id});
        return this.renderEdges(q);
    }

    render() {
        const { stepIndex } = this.state;
        return (
            <div>
                <Paper zDepth={1} className={styles.container}>
                    <Stepper activeStep={stepIndex} orientation="vertical">
                        {
                            this.renderQuestions()
                        }
                    </Stepper>
                </Paper>
            </div>
        );
    }
}

export default Survey;
