import React, { Component } from 'react';
import { StimulusForm } from './components/StimulusForm';
import { Stimulus } from './models/stimulus';
import { Stopwatch } from "ts-stopwatch"

interface State {
  stimulus: Stimulus;
  stimuli: Stimulus[];
}

class App extends Component<{}, State> {
  stopwatch = new Stopwatch();
  state = {
    stimulus: {
      name: "tygrys",
      color: 'blue'
    },
    stimuli: [
      {
        name: "słoń",
        color: 'red'
      },
      {
        name: "zielony",
        color: 'green'
      }
    ]
  };
  
  private onAnswer = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    this.setState(previousState => {
      var x = previousState.stimuli.shift();
      
      if(x == null) {
        return;
      }

      return ({
        stimulus: {
          name: x.name,
          color: x.color
        },
        stimuli: [...previousState.stimuli]
      })
    });
  };

  render() {
    this.stopwatch.start();
    return (
      <div>
        <StimulusForm stimulus={this.state.stimulus} onAnswer={this.onAnswer}/>
        <p>{this.stopwatch.getTime()}</p>
      </div>
    );
  };
}

export default App;
