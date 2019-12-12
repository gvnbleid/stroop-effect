import React, { FunctionComponent } from 'react';

import Button from '@material-ui/core/Button';
import { Input, InputLabel } from '@material-ui/core';

interface Props {
    onClick: () => void;
    onEmail: (email: string) => void;
}

export const InfoScreen: FunctionComponent<Props> = ({
    onClick,
    onEmail
}) => {

    return (
        <div style={{
            width: '65%',
            textAlign: "center"
        }}>
            <div style={{fontSize: '160%', textAlign: "left", marginBottom: "5%", height: "50%"}}>
                Nazywamy się Anna Białokozowicz, Katarzyna Wójcik i Maciej Krawczyk i jesteśmy studentami I i IV roku
                kognitywistyki na UW. Prowadzimy badanie w ramach przedmiotu Psychologia Eksperymentalna. Interesuje 
                nas wpływ wprawy w wykonywaniu zadania na czas jego wykonania. Badanie jest w pełni anonimowe, a wyniki 
                będą rozpatrywane wyłącznie grupowo. Badanie polega na wykonaniu trzech zadań polegających na określaniu 
                koloru, którym są napisane wyrazy i zajmie ono około x minut(musimy zrobić próbne). Może Pan/i wycofać się 
                z udziału w badaniu w dowolnym momencie, bez konieczności podawania powodów swojej decyzji. Osoby 
                zainteresowane raportem z badań proszone są o podanie swojego adresu mailowego w odpowiednim polu.
            </div>
            <div style={{textAlign: "left"}}>
                <InputLabel  htmlFor="email">Email</InputLabel>
            </div>
            <div style={{textAlign: "left"}}>
                <Input style={{display: "inline-block", float: "none",  marginBottom: "5%"}} type="email" name="email" id="email" onChange={event => onEmail(event.target.value)}/>
            </div>
            <div>
                <Button style={{display: "inline-block", float: "none"}} variant="contained" text-align="center" onClick={onClick}>Dalej</Button>
            </div>
        </div>
    );
}