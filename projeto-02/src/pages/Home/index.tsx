import { zodResolver } from '@hookform/resolvers/zod';
import { HandPalm, Play } from 'phosphor-react';
import { useContext } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { CycleContext } from '../../contexts/CyclesContext';
import { Countdown } from './components/Countdown';
import { NewCycleForm } from './components/NewCycleForm';
import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from './styles';

// Controlled vs Uncontrolled components

// function register(name:string){
//   return(
//     onChange:() => void;
//     onBlur:() => void;
//     ....
//   )
// }

// Prop Drilling -> quando a gente tem MUITAS propriedades APENAS para comunicação entre componentes

// Context API -> permite compartilhar informações entre VÁRIOS componentes ao mesmo tempo

const newCycleFormValidationSchema = z.object({
  task: z.string().min(1, { message: 'Task name is required' }),
  minutesAmount: z
    .number()
    .min(5, { message: 'Minimum time is 5 minutes' })
    .max(60, { message: 'Maximum time is 60 minutes' })
    .int({ message: 'Time must be an integer' }),
});

type NewCycleFormData = z.infer<typeof newCycleFormValidationSchema>;

export function Home() {
  const { activeCycle, createCycle, interruptCurrentCycle } =
    useContext(CycleContext);

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 5,
    },
  });

  const { handleSubmit, watch, reset } = newCycleForm;

  const task = watch('task');
  const isSubmitDisabled = !task;

  function handleCreateCycle(data: NewCycleFormData) {
    createCycle(data);
    reset();
  }

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateCycle)}>
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>

        <Countdown />

        {activeCycle ? (
          <StopCountdownButton type="button" onClick={interruptCurrentCycle}>
            <HandPalm size={24} />
            Stop
          </StopCountdownButton>
        ) : (
          <StartCountdownButton type="submit" disabled={isSubmitDisabled}>
            <Play size={24} />
            Start
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  );
}
