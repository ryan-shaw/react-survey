import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import {
    Stepper,
} from 'material-ui/Stepper';
import styles from './styles.scss';
import Message from '../../components/Questions/Message';
import Boolean from '../../components/Questions/Boolean';
import SingleChoice from '../../components/Questions/SingleChoice';
import survey from '../../survey.json';
import { find } from 'lodash/collection';
import { extend } from 'lodash/object';
import Graph from '../Graph';

class Survey extends Component {

    state = {
        stepIndex: 0,
        answers: {}
    }

    handleNext = (key) => {
        return () => {
            if(!survey.edges[`q:${key}`]) {
                console.log('Finished!');
            }
            const {stepIndex} = this.state;
            this.setState({
                stepIndex: stepIndex + 1,
            });
        };
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
                        next={this.handleNext(key)}
                        back={this.handlePrev}/>
                );
            case 'boolean':
                return (
                    <Boolean
                        key={key}
                        updateAnswer={this.updateAnswer(key, 'boolean')}
                        initialState={this.state.answers[`a:q:${key}`]}
                        settings={question}
                        next={this.handleNext(key)}
                        back={this.handlePrev}/>
                );
            case 'single_choice':
                return (
                    <SingleChoice
                        key={key}
                        updateAnswer={this.updateAnswer(key, 'single_choice')}
                        initialState={this.state.answers[`a:q:${key}`]}
                        settings={question}
                        next={this.handleNext(key)}
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

    conditionCheck(arg1, operator, arg2) {
        if(operator === '==') {
            return arg1 === arg2;
        }else if(operator === '!=') {
            return arg1 !== arg2;
        }
        if(typeof arg1 === 'number' && typeof arg2 === 'number') {
            if(operator === '>=') {
                return arg1 >= arg2;
            }else if(operator === '<=') {
                return arg1 <= arg2;
            }
        }
        return false;
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
            let qnext = find(survey.questions[0], {id: edge.else.split(':')[1]});
            const conditions = edge.conditions;
            const condition = this.state.answers[conditions[0][0]];
            const operator = conditions[0][1];
            if(this.conditionCheck(condition, operator, conditions[0][2])) {
                qnext = find(survey.questions[0], {id: edge.next.split(':')[1]});
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
                <Graph survey={survey}/>
                <pre>{JSON.stringify(this.state.answers)}</pre>
            </div>
        );
    }
}

export default Survey;
