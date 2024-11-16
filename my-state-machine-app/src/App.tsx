import { useState } from 'react';

interface StateMachineConfig<StateType, StepNames extends string> {
  initialStep: StepNames;
  steps: {
    [key in StepNames]: {
      canAdvance: (state: StateType) => boolean;
    };
  };
  views: {
    [key in StepNames]: React.ComponentType<{
      state: StateType;
      setState: React.Dispatch<React.SetStateAction<StateType>>;
    }>;
  };
}

type WizardState = {
  name: string;
  age: number | undefined;
};

type StepNames = 'step1' | 'step2' | 'confirmation';

const stateMachineConfig: StateMachineConfig<WizardState, StepNames> = {
  initialStep: 'step1',
  steps: {
    step1: {
      canAdvance: (state) => !!state.name,
    },
    step2: {
      canAdvance: (state) => state.age !== undefined && state.age > 0,
    },
    confirmation: {
      canAdvance: () => true,
    },
  },
  views: {
    step1: ({ state, setState }) => (
      <div>
        <input
          type="text"
          value={state.name}
          onChange={(e) =>
            setState((prev) => ({ ...prev, name: e.target.value }))
          }
          placeholder="Full name"
        />
      </div>
    ),
    step2: ({ state, setState }) => (
      <div>
        <input
          type="number"
          value={state.age ?? ''}
          onChange={(e) =>
            setState((prev) => ({
              ...prev,
              age: e.target.value ? parseInt(e.target.value) : undefined,
            }))
          }
          placeholder="Age"
        />
      </div>
    ),
    confirmation: ({ state }) => (
      <div>
        <p>
          {state.name} is {state.age} years old
        </p>
      </div>
    ),
  },
};

const getStateview = <T, V extends string>(
  config: StateMachineConfig<T, V>,
  stepName: V
): React.ComponentType<{
  state: T;
  setState: React.Dispatch<React.SetStateAction<T>>;
}> => config.views[stepName];

const StateMachineWizard = () => {
  const [wizardState, setWizardState] = useState<WizardState>({
    name: '',
    age: undefined,
  });
  const [currentStep, setCurrentStep] = useState<StepNames>(
    stateMachineConfig.initialStep
  );

  const StepComponent = getStateview(stateMachineConfig, currentStep);

  const steps: StepNames[] = ['step1', 'step2', 'confirmation'];

  const handleNext = () => {
    const canAdvance = stateMachineConfig.steps[currentStep].canAdvance(
      wizardState
    );
    if (!canAdvance) {
      alert("You can't move forward yet!");
      return;
    }

    const currentIndex = steps.indexOf(currentStep);
    const nextStep = steps[currentIndex + 1];
    if (nextStep) {
      setCurrentStep(nextStep);
    }
  };

  return (
    <section>
      <h1>State Machine Wizard</h1>
      <StepComponent state={wizardState} setState={setWizardState} />
      {currentStep !== 'confirmation' && (
        <button onClick={handleNext}>Next</button>
      )}
    </section>
  );
};

export default StateMachineWizard;
