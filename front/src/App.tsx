import React, { Component } from 'react';
import { StimulusForm } from './components/StimulusForm';
import { Stimulus } from './models/stimulus';
import { Stopwatch } from "ts-stopwatch"
import Button from '@material-ui/core/Button';
import * as request from 'request'
import { returnStatement } from '@babel/types';

interface State {
  stimulus: Stimulus;
  stimuli: Stimulus[];
}

const numberOfSets = 3;

class App extends Component<{}, State> {
  stopwatch = new Stopwatch();

  state = {
    stimulus: {
      name: "tygrys",
      color: 'blue'
    },
    stimuli: []
  };

  shouldLoadNextSet: boolean = false;
  testOver: boolean = false;
  currentSet: number = 0;
  
  private onAnswer = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    this.setState(previousState => {
      var x = previousState.stimuli.shift();
      
      if(x == null) {
        console.log("set finished");
        if(this.currentSet < numberOfSets) {
          this.shouldLoadNextSet = true;
        } else {
          this.testOver = true;
        }
        
        this.forceUpdate();
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

  private getSet = (index: number) => {
    request.get(`http://localhost:3001/stimuli/getPackage?field=${index}`, (request:any, response: any) => {
      const stimuli : {name: string, color: string}[] = JSON.parse(response.body);
      console.log(stimuli);
      this.setState((prevState) => {
        const stimulus : {name:string, color: string} = stimuli.shift() as {name:string, color: string};
        return({
          stimulus: stimulus,
          stimuli: stimuli
        });
      });
    })
    this.currentSet++;
  };

  private onClick = () => {
    this.shouldLoadNextSet = false;
    this.getSet(this.currentSet);
  };

  private loadNextSet = () => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <p>Zakończyłeś odpowiadanie na zestaw. Kliknij w przycisk aby przejść do następnego zestawu</p>
        <Button type="submit" variant="contained" text-align="center" onClick={this.onClick}>Następny zestaw</Button>
      </div>
    );
  };

  private finishTest = () => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <p>Gratulacje, zakończyłeś test!</p>
      </div>
    )
  }

  componentDidMount() {
    console.log('triggered');
    this.getSet(this.currentSet);
  }

  render() {   
    if(this.testOver) {
      return this.finishTest();
    }

    if(this.shouldLoadNextSet) {
      return this.loadNextSet();

    }
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
