import React, { Component } from 'react';
import { StimulusForm } from './components/StimulusForm';
import { BreakScreen } from './components/BreakScreen';
import { InfoScreen } from './components/InfoScreen';
import { InstructionScreen } from './components/InstructionScreen';
import { Stimulus } from './models/stimulus';
import { Stopwatch } from "ts-stopwatch"
import Button from '@material-ui/core/Button';
import * as request from 'request'

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
    stimuli: [],
  };

  shouldLoadNextSet: boolean = false;
  testState: number = 0;
  currentSet: number = 0;

  set_1: {id: number, time: number}[] = [];
  set_2: {id: number, time: number}[] = [];
  set_3: {id: number, time: number}[] = [];
  email: string = "";

  currentQuestion: number = 0;
  
  private onAnswer = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    this.setState(previousState => {
      var x = previousState.stimuli.shift();
      
      if(x == null) {
        console.log("set finished");
        if(this.currentSet < numberOfSets) {
          this.shouldLoadNextSet = true;
        } else {
          this.testState++;
        }
        
        this.forceUpdate();
        return;
      }

      const slice = this.stopwatch.slice();

      switch(this.currentSet) {
        case 1:
          this.set_1.push({id: this.currentQuestion, time: slice.duration});
          break;
        case 2:
          this.set_2.push({id: this.currentQuestion, time: slice.duration});
          break;
        case 3:
          this.set_3.push({id: this.currentQuestion, time: slice.duration});
          break;
      }

      this.currentQuestion++;

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

  private sendData = () => {
    const jsonData = {
      set_1: this.set_1,
      set_2: this.set_2,
      set_3: this.set_3,
      email: this.email
    }

    const stringified = JSON.stringify(jsonData);
    console.log(stringified);

    const options = {
      body: stringified,
      headers: {'Content-Type' : 'application/json'},
    }
    request.post('http://localhost:3001/answers/addUserData', options);
  }

  private onClick = () => {
    this.shouldLoadNextSet = false;
    this.getSet(this.currentSet);
    this.testState++;
  };

  private setEmail = (email: string) => {
    this.email = email;
    console.log(this.email);
  }

  private finishTest = () => {
    this.sendData();

    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <p style={{fontSize: '160%', textAlign: "center", marginBottom: "5%"}}>
          Dziękujemy za udział w badaniu! W razie jakichkolwiek pytań prosimy o kontakt:
          a.bialokozowi2@student.uw.edu.pl 
        </p>
      </div>
    )
  }

  componentDidMount() {
    console.log('triggered');
    this.getSet(this.currentSet);
  }

  private onInfoClick = () => {
    this.testState++;
    this.forceUpdate();
  }

  render() {   
    switch(this.testState) {
      case 0:
        return (
          <div
          style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
          }}
          >
            <InfoScreen onClick={this.onInfoClick} onEmail={this.setEmail}/>
          </div>
        );
      case 1:
        return (
          <div
          style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
          }}
          >
            <InstructionScreen onClick={this.onInfoClick}/>
          </div>
        );
      case 2:
      case 3:
      case 4:
        if(this.shouldLoadNextSet) {
          return (
            <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
            >
              <BreakScreen breakTime={1000} onTimePassed={this.onClick}/>
            </div>
          );
        }
        this.stopwatch.start();
        return (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%"
            }}
          >
            <StimulusForm stimulus={this.state.stimulus} onAnswer={this.onAnswer}/>
          </div>
        );
      case 5:
          return this.finishTest();
    }
  };
}

export default App;
