import React, { FunctionComponent, useState } from 'react';

import Button from '@material-ui/core/Button';
import { Stopwatch } from "ts-stopwatch"

interface Props {
    breakTime: number;
    onTimePassed: () => void;
}

export const BreakScreen: FunctionComponent<Props> = ({
    breakTime,
    onTimePassed
}) => {

    const [state, setState] = useState(
        {
            text: "Zakończyłeś odpowiadanie na zestaw. Poczekaj 2 min i kliknij w przycisk, aby przejść do następnego zestawu.",
            stopwatch: new Stopwatch()
        });

    const styles = {
        "text-align": "center"
    }

    state.stopwatch.start();

    const onClick = () => {
        if(state.stopwatch.getTime() < breakTime) {
            setState({
                text: `Jeszcze nie upłynęły 2 min. Pozostało ${Math.floor((breakTime - state.stopwatch.getTime()) / 1000)}s`,
                stopwatch: state.stopwatch
            });
        } else {
            onTimePassed();
        }
    };

    const buttonStyles = {
        "width": "100%",
        "height": "100%"
    }
    return (
        <div style={{
            width: '65%',
            textAlign: "center"
        }}>
            <p style={{fontSize: '160%', textAlign: "center", marginBottom: "5%", height: "100%"}}>{state.text}</p>
            <Button variant="contained" style={{display: "inline-block", float: "none"}} onClick={onClick}>Następny zestaw</Button>
        </div>
    );
}