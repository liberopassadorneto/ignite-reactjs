import { zodResolver } from '@hookform/resolvers/zod'
import { Play } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  StartCountdownButton,
  TaskInput,
} from './styles'

// Controlled vs Uncontrolled components

// function register(name:string){
//   return(
//     onChange:() => void;
//     onBlur:() => void;
//     ....
//   )
// }

const newCountdownFormSchema = z.object({
  task: z.string().min(1, { message: 'Task name is required' }),
  minutesAmount: z
    .number()
    .min(5, { message: 'Minimum time is 5 minutes' })
    .max(60, { message: 'Maximum time is 60 minutes' })
    .int({ message: 'Time must be an integer' }),
})

type NewCountdownFormData = z.infer<typeof newCountdownFormSchema>

export function Home() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    // formState: { errors },
  } = useForm<NewCountdownFormData>({
    resolver: zodResolver(newCountdownFormSchema),
    defaultValues: {
      task: '',
      minutesAmount: 5,
    },
  })

  // console.log(errors)

  const task = watch('task')
  const isSubmitDisabled = !task

  function handleCreateNewCountdown(data: NewCountdownFormData) {
    console.log(data)
    reset()
  }

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCountdown)}>
        <FormContainer>
          <label htmlFor="task">I will work on</label>
          <TaskInput
            id="task"
            list="task-suggestions"
            placeholder="Give a name to your task"
            {...register('task')}
          />

          <datalist id="task-suggestions">
            <option value="Front-end" />
            <option value="Back-end" />
            <option value="Mobile" />
            <option value="DevOps" />
          </datalist>

          <label htmlFor="minutesAmount">for</label>
          <MinutesAmountInput
            type="number"
            id="minutesAmount"
            placeholder="00"
            step={5}
            min={5}
            max={60}
            {...register('minutesAmount', {
              valueAsNumber: true,
            })}
          />

          <span>minutes.</span>
        </FormContainer>

        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <StartCountdownButton type="submit" disabled={isSubmitDisabled}>
          <Play size={24} />
          Start
        </StartCountdownButton>
      </form>
    </HomeContainer>
  )
}
