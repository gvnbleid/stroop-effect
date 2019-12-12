import React, { FunctionComponent } from 'react';
import { Stimulus } from '../models/stimulus';
import Button from '@material-ui/core/Button';

interface Props {
    onAnswer: (event: React.FormEvent<HTMLFormElement>) => void;
    stimulus: Stimulus;
}


export const StimulusForm: FunctionComponent<Props> = ({
    onAnswer,
    stimulus
}) => {
    const styles = {
        "color": stimulus.color,
        "text-align": "center",
        "font-size": "400%"
    }

    const buttonStyles = {
        "width": "100%",
        "height": "100%",
    }
    return (
        <div style={{width: "100%"}}>
            <form onSubmit={onAnswer}>
                <table style={{width: "100%"}}>
                    <tr>
                        <td colSpan={2}>
                            <p style={styles}> {stimulus.name}</p>
                        </td>
                    </tr>
                    <tr>
                        <td><Button type="submit" variant="contained" style={buttonStyles}>czerwony</Button></td>
                        <td><Button type="submit" variant="contained" style={buttonStyles}>zielony</Button></td>
                    </tr>
                    <tr>
                        <td><Button type="submit" variant="contained" style={buttonStyles}>niebieski</Button></td>
                        <td><Button type="submit" variant="contained" style={buttonStyles}>fioletowy</Button></td>
                    </tr>
                </table>
            </form>
        </div>
    );
}