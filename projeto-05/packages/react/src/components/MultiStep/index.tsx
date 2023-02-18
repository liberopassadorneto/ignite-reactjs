import { Label, MultiStepContainer, Step, Steps } from './styles';

export interface MultiStepProps {
  steps: number;
  currentStep?: number;
}

export function MultiStep({ steps, currentStep = 1 }: MultiStepProps) {
  return (
    <MultiStepContainer>
      <Label>
        {currentStep} of {steps}
      </Label>

      <Steps css={{ '--steps-size': steps }}>
        {Array.from({ length: steps }, (_, i) => i + 1).map((step) => {
          return <Step key={step} active={currentStep >= step} />;
        })}
      </Steps>
    </MultiStepContainer>
  );
}

MultiStep.displayName = 'MultiStep';

// Array.from({ length: 4 }, (_, i) => i + 1)
// [1, 2, 3, 4]
