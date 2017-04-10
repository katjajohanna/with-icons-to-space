import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Icon from './Icon.js';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            help: ["What is that? A wrench?"],
        }

        this.instructions = {
            'wheel': 'We invented a wheel! What if we tried the wrench and the wheel together?',
            'compass': 'Nice, a compass! You can stop swinging the wrench and wheel around now. Where would the compass lead us to?',
            'tea': 'A warm cup of tea! Just what we needed to relax. But wait, could we make something out of this with one of the other icons?',
            'duck': 'Umm, I don\'t think we\'re gonna need that.',
            'chemistry': 'Experiments! Let\'s try to combine three of these together.',
            'robot': 'A real robot! Wanna have a cup of tea with it?',
            'communicator': 'OK, tea time is over. Time to reach the space! I think we might need a lot of stuff for it. Try to be orderly and choose icons from left to right.',
            'rocket': 'Alright! The crew is ready, just make sure you can contact them with a communicator while they are exploring the final frontier in their space rocket.',
            'star': 'You made it! Congratulations!',
        };

        this.updateInstructions = this.updateInstructions.bind(this);
    }

    updateInstructions(key) {
        if (this.instructions[key]) {
            let newHelp = this.state.help;
            newHelp.unshift(this.instructions[key]);
            this.setState({help: newHelp});
        }
    }

    render() {
        let helpLength = this.state.help.length;
        const instructions = this.state.help.map((item, i) => (
          <div key={helpLength-i}>
              <p>{item}</p>
          </div>
        ));

        return (
            <div className="App">
                <div className="App-inventory">
                    <Icon name="wrench" instruct={this.updateInstructions} />
                </div>
                <div className="App-instruction">
                    <ReactCSSTransitionGroup
                      transitionName="transitionGroup"
                      transitionAppear={true}
                      transitionAppearTimeout={500}
                      transitionEnterTimeout={3000}
                      transitionLeaveTimeout={300}>
                        {instructions}
                    </ReactCSSTransitionGroup>
                </div>
            </div>
        );
    }
}

export default App;
