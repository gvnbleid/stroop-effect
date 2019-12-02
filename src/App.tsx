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
      },
      {
        name: "zielony",
        color: 'green'
      },
      {
        name: "zielony",
        color: 'blue'
      },
      {
        name: "czerwony",
        color: 'red'
      },
      {
        name: "czerwony",
        color: 'green'
      },
      {
        name: "surykatka",
        color: 'red'
      },
      {
        name: "surykatka",
        color: 'purple'
      },
      {
        name: "fioletowy",
        color: 'purple'
      },
      {
        name: "fioletowy",
        color: 'green'
      },
    ]
  };
  
  private onAnswer = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    this.setState(previousState => {
      var x = previousState.stimuli.shift();
      
      if(x == null) {
        return;
      }

      this.stopwatch.slice();

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
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <table>
          <tr>
            <td>
              <StimulusForm stimulus={this.state.stimulus} onAnswer={this.onAnswer}/>
            </td>
          </tr>

          <tr>
            <td>
              <ol>
                {this.stopwatch.getCompletedSlices().map(slice => {
                  return (<li>{slice.startTime}; {slice.endTime}; {slice.duration}</li>);
                  })
                }
              </ol>
            </td>
          </tr>
        </table>
      </div>
    );
  };
}

export default App;
