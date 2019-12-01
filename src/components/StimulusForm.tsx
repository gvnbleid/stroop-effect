import React, { FunctionComponent } from 'react';
import { Stimulus } from '../models/stimulus';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

interface Props {
    stimulus: Stimulus;
}

export const StimulusForm: FunctionComponent<Props> = ({
    stimulus
}) => (
    <div>
        <TextField value={stimulus.name}/>
        <table>
            <tr>
                <td><Button variant="contained">czerwony</Button></td>
                <td><Button variant="contained">zielony</Button></td>
            </tr>
            <tr>
                <td><Button variant="contained">niebieski</Button></td>
                <td><Button variant="contained">fioletowy</Button></td>
            </tr>
        </table>
    </div>
)