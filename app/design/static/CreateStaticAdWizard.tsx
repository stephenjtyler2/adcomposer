import React, { useState } from 'react';
import { Box, Button, Stepper, Step, StepLabel, Typography } from '@mui/material';
import { ApiImage, ImageAspectRatio } from '@backend/apitypes';
import { BackgroundMaker } from '../BackgroundMaker';


type PageProps = {

}

const steps = [
    'Background',
    'Objects',
    'Text',
];

export default function CreateStaticAdWizard(props: PageProps) {
    const [activeStep, setActiveStep] = useState<number>(0);

    const handleStepperReset = (event: React.MouseEvent<HTMLButtonElement>) => {
        setActiveStep(0);
    }

    const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setActiveStep(activeStep + 1);
    }

    const handleSkipButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setActiveStep(activeStep + 1);
    }

    const handleBackgroundImageGenerated = (prompt: string, imageAspectRatio: ImageAspectRatio): void => {
        console.log("Image generated - handler not implemented yet");
    }

    const renderStepper = () => {
        return (
            <Box sx={{ display:"flex", justifyContent:"center", p: 1,width:"100%" }}>
                <Box sx={{ width:600 }}>
                    <Stepper activeStep={activeStep} alternativeLabel>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </Box>
            </Box >
        );
    }

    const renderStep0 = () => {
        console.log("renderStep0");
        return (
            <Box sx={{ p: 4, border: 1 }}>
                <BackgroundMaker onBackgroundSet={(newBackground: ApiImage | null) => { console.log("background set"); }} />
            </Box>
        );
    }
    const renderStep1 = () => {
        return (
            <Box>

            </Box>
        );
    }

    const renderStep2 = () => {
        return (
            <Box>

            </Box>
        );
    }


    return (
        <Box sx={{ width: '100%' }}>
            <Box mt={2} mb={4} width="100%"><center><Typography variant="h4">Create an Ad</Typography></center></Box>
            <Box mt={2} mb={4} width="100%">
                {renderStepper()}
            </Box>
            {activeStep == 0 && renderStep0()}
            {activeStep == 1 && renderStep1()}
            {activeStep == 2 && renderStep2()}
            <Box sx={{ mt: 3, display: "flex", width: "100%", border: 0, alignItems: "flex-end" }}>
                <Button sx={{ ml: "auto", mt: 3 }} variant="contained" color="secondary" onClick={handleStepperReset}>Start Over</Button>
                <Button sx={{ ml: 2, mt: 3 }} variant="contained" color="secondary" onClick={handleSkipButtonClick}>Skip Step</Button>
                <Button sx={{ ml: 2, mr: 2, mt: 3 }} variant="contained" color="primary" onClick={handleNextButtonClick}>Next Step</Button>
            </Box>

        </Box>
    );
}