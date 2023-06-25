import cn from 'classnames';
import styles from './stepper.module.css';

type Step = {
  label: string;
  step: number;
};

interface StepperProps {
  steps: Step[];
  activeStep: number;
}

const Stepper: React.FC<StepperProps> = ({ steps, activeStep }) => {
  const totalSteps = steps.length;
  const width = `${(100 / (totalSteps - 1)) * (activeStep - 1)}%`;

  return (
    <div className={cn(styles.mainContainer)}>
      <div className={cn(styles.stepContainer)}>
        {steps.map(({ step, label }) => (
          <div
            key={step}
            className={cn(styles.stepWrapper)}
            style={{
              marginLeft: `${step === 1 ? '-1px' : ''}`,
              marginRight: `${step === totalSteps ? '-1px' : ''}`,
            }}
          >
            <div
              className={cn(styles.stepStyle)}
              style={{
                backgroundColor: `${
                  activeStep === step
                    ? 'var(--clr-primary)'
                    : 'var(--clr-gray-dk)'
                }`,
              }}
            >
              {activeStep === step && <div className={cn(styles.dot)} />}
              {activeStep > step && (
                <div className={cn(styles.checkMark)}>
                  <img src="/icons/check-icon.svg" alt="" />
                </div>
              )}
            </div>
            <div className={cn(styles.stepsLabelContainer)}>
              <span
                key={step}
                className={cn(styles.stepLabel)}
                style={{
                  color: `${
                    activeStep >= step
                      ? 'var(--clr-primary)'
                      : 'var(--clr-base)'
                  }`,
                  fontWeight: `${activeStep >= step ? '600' : '400'}`,
                }}
              >
                {label}
              </span>
            </div>
          </div>
        ))}
        <div className={cn(styles.progressBar)} style={{ width: `${width}` }} />
      </div>
    </div>
  );
};

export default Stepper;
