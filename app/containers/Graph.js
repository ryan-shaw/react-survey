import React, { PropTypes } from 'react';
import cytoscape from 'cytoscape';
import { forEach } from 'lodash/collection';

const style = {
    width: 300,
    height: 300,
    display: 'block'
};
class Graph extends React.Component {

    componentDidMount() {
        const nodes = this.props.survey.questions[0].map((q) => {
            return {
                data: { id: q.id }
            };
        });
        // const edges = this.props.survey.edges.map((edge) => {
        //     console.log(edge);
        //     return {};
        // });
        const edges = [];
        let weight = 1;
        forEach(this.props.survey.edges, (value, key) => {
            weight++;
            if (typeof value === 'object') {
                edges.push({
                    data: {
                        id: key,
                        weight,
                        source: key.split(':')[1],
                        target: value.next.split(':')[1]
                    }
                });
                weight ++;
                edges.push({
                    data: {
                        id: `${key}.1`,
                        weight,
                        source: key.split(':')[1],
                        target: value.else.split(':')[1]
                    }
                });
            } else if (typeof value === 'string') {
                edges.push({
                    data: {
                        id: key,
                        weight,
                        source: key.split(':')[1],
                        target: value.split(':')[1]
                    }
                });
            }
        });
        cytoscape({
            container: document.getElementById('cy'),

            boxSelectionEnabled: false,
            autounselectify: true,

            style: cytoscape.stylesheet()
                .selector('node')
                .css({
                    'content': 'data(id)'
                })
                .selector('edge')
                .css({
                    'target-arrow-shape': 'triangle',
                    'width': 4,
                    'line-color': '#ddd',
                    'target-arrow-color': '#ddd',
                    'curve-style': 'bezier'
                })
                .selector('.highlighted')
                .css({
                    'background-color': '#61bffc',
                    'line-color': '#61bffc',
                    'target-arrow-color': '#61bffc',
                    'transition-property': 'background-color, line-color, target-arrow-color',
                    'transition-duration': '0.5s'
                }),

            elements: {
                nodes,
                edges
            },

            layout: {
                name: 'breadthfirst',
                directed: true,
                roots: '#1',
                padding: 10
            }
        });
    }

    render() {
        return <div id="cy" style={style} />;
    }
}

Graph.propTypes = {
    survey: PropTypes.object
};

export default Graph;
