import React, { FunctionComponent } from 'react';
import { Stimulus } from '../models/stimulus';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

interface Props {
    onAnswer: (event: React.FormEvent<HTMLFormElement>) => void;
    stimulus: Stimulus;
}

export const StimulusForm: FunctionComponent<Props> = ({
    onAnswer,
    stimulus
}) => (
    <div>
        <TextField value={stimulus.name}/>
        <form onSubmit={onAnswer}>
            <table>
                <tr>
                    <td><Button type="submit" variant="contained">czerwony</Button></td>
                    <td><Button type="submit" variant="contained">zielony</Button></td>
                </tr>
                <tr>
                    <td><Button type="submit" variant="contained">niebieski</Button></td>
                    <td><Button type="submit" variant="contained">fioletowy</Button></td>
                </tr>
            </table>
        </form>
        
    </div>
)