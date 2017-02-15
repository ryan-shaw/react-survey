import React from 'react';
import survey from '../../survey.json';
import Survey from '../Survey';
import Graph from '../Graph';

class Example extends React.Component {

    state = {
        answers: {}
    };

    finish = (answers) => {
        this.setState({
            answers,
        });
    }

    render() {
        return (
            <div>
                <Survey
                    survey={survey}
                    onFinish={this.finish}/>
                <Graph survey={survey}/>
                <span>{JSON.stringify(this.state.answers)}</span>
            </div>
        );
    }
}

export default Example;
