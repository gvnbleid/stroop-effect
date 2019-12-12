import React, { FunctionComponent } from 'react';

import Button from '@material-ui/core/Button';

interface Props {
    onClick: () => void;
}

export const InstructionScreen: FunctionComponent<Props> = ({
    onClick
}) => {
    return (
        <div style={{
            width: '65%',
            textAlign: "center"
        }}>
            <div style={{fontSize: '160%', textAlign: "left", marginBottom: "5%", height: "100%"}}>
                Przystąpi Pan/i teraz do wykonywania 3 zadań. Każde zadanie będzie polegało na tym samym, 
                a między zadaniami będzie 5 minut przerwy. Podczas zadania na ekranie wyświetlane będą 
                słowa, jedno po drugim, napisane jednym z czterech kolorów: czerwonym, zielonym, 
                niebieski lub żółtym. Prosimy o jak najszybsze wskazanie koloru czcionki wyświetlonego 
                słowa. Żeby udzielić odpowiedzi należy dotknąć pole z nazwą odpowiedniego koloru. 
                (Prosiła żeby było próbne jak to wygląda/screen czy coś)
            </div>
            <Button variant="contained" text-align="center" onClick={onClick}>Dalej</Button>
        </div>
    );
}