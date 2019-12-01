import React, { Component } from 'react';
import { StimulusForm } from './components/StimulusForm';
import { Stimulus } from './models/stimulus';

interface State {
  stimulus: Stimulus;
  stimuli: Stimulus[];
}

class App extends Component<{}, State> {
  state = {
    stimulus: {
      name: "słoń",
      color: "czerwony"
    },
    stimuli: []
  };

  render() {
    return (
      <div>
        <StimulusForm stimulus={this.state.stimulus}/>
      </div>
    );
  };
}

export default App;
