import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import wrench from './img/wrench.png';
import wheel from './img/wheel.png';
import compass from './img/compass.png';
import tea from './img/tea.png';
import duck from './img/duck.png';
import chemistry from './img/chemistry.png';
import robot from './img/robot.png';
import communicator from './img/communicator.png';
import rocket from './img/rocket.png';
import star from './img/star.png';

class Icon extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: ['wrench'],
            active: [],
        };

        this.icons = {
            'wrench': wrench,
            'wheel': wheel,
            'compass': compass,
            'tea': tea,
            'duck': duck,
            'chemistry': chemistry,
            'robot': robot,
            'communicator': communicator,
            'rocket': rocket,
            'star': star,
        };

        this.iconCombinations = {
            'wrench': 'wheel',

            'wrench,wheel': 'compass',
            'wheel,wrench': 'compass',

            'compass': 'tea',

            'wheel,tea': 'duck',
            'tea,wheel': 'duck',

            'wrench,tea': 'chemistry',
            'tea,wrench': 'chemistry',

            'wrench,wheel,chemistry': 'robot',
            'wrench,chemistry,wheel': 'robot',
            'wheel,wrench,chemistry': 'robot',
            'wheel,chemistry,wrench': 'robot',
            'chemistry,wrench,wheel': 'robot',
            'chemistry,wheel,wrench': 'robot',

            'robot,tea': 'communicator',
            'tea,robot': 'communicator',

            'wrench,wheel,compass,chemistry,robot,communicator': 'rocket',
            'communicator,robot,chemistry,compass,wheel,wrench': 'rocket',

            'rocket,communicator': 'star',
            'communicator,rocket': 'star',
        };

        this.handleActivation = this.handleActivation.bind(this);
        this.stopAll = this.stopAll.bind(this);
    }

    stopAll(e) {
        e.preventDefault();
        this.setState({active: []});
    }

    handleActivation(i) {
        let itemName = this.state.items[i];

        this._toggleActive(itemName);
        this._revealIcons(itemName);
    }

    _toggleActive(itemName) {
        let newActive = [];
        let activeItemIndex = this.state.active.indexOf(itemName);

        if (activeItemIndex >= 0) {
            newActive = this.state.active.slice();
            newActive.splice(activeItemIndex, 1);
        } else {
            newActive = this.state.active.concat([itemName]);
        }

        this.setState({active: newActive});
    }

    _revealIcons(itemName) {
        let currentlyActive = this.state.active;
        let combinationKey = currentlyActive.concat([itemName]).join(',');
        let newItem = this.iconCombinations[combinationKey];
        let updatedItems = this.state.items;

        if (newItem && this.state.items.indexOf(newItem) === -1) {
            updatedItems = this.state.items.concat([newItem]);
            this.props.instruct(newItem);
        }

        this.setState({items: updatedItems});
    }

    _setClassName(item) {
        let className = "";
        if (this.state.active.indexOf(item) >= 0) {
            className = "animated";
        }

        return className;
    }

    render() {
        const items = this.state.items.map((item, i) => (
          <div key={i} onClick={() => this.handleActivation(i)} className={this._setClassName(item)}>
              <img
                  src={this.icons[item]}
                  alt={item}
              />
          </div>
        ));

        let button = "";
        if (this.state.items.indexOf('compass') >= 0) {
            button = <button onClick={(e) => this.stopAll(e)} className="stopButton">Stop all</button>;
        }

        return (
          <div>
            <div className="iconsContainer">
                <ReactCSSTransitionGroup
                  transitionName="transitionGroup"
                  transitionAppear={true}
                  transitionAppearTimeout={500}
                  transitionEnterTimeout={3000}
                  transitionLeaveTimeout={300}>
                  {items}
                </ReactCSSTransitionGroup>
              </div>
              <div className="buttonContainer">
              <ReactCSSTransitionGroup
                transitionName="transitionGroup"
                transitionAppear={true}
                transitionAppearTimeout={500}
                transitionEnterTimeout={3000}
                transitionLeaveTimeout={300}>
                    {button}
                </ReactCSSTransitionGroup>
              </div>
          </div>
        );
    }
}

export default Icon;
