import { differenceInSeconds } from 'date-fns';
import { useContext, useEffect } from 'react';
import { CycleContext } from '../../../../contexts/CyclesContext';

import { CountdownContainer, Separator } from './styles';

export function Countdown() {
  const {
    activeCycle,
    activeCycleId,
    markCurrentCycleAsFinished,
    amountSecondsPassed,
    setSecondsPassed,
  } = useContext(CycleContext);

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;

  const minutesAmount = Math.floor(currentSeconds / 60);
  const secondsAmount = currentSeconds % 60;

  const minutesAmountFormatted = String(minutesAmount).padStart(2, '0');
  const secondsAmountFormatted = String(secondsAmount).padStart(2, '0');

  useEffect(() => {
    let interval: number;

    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          activeCycle.startDate,
        );

        if (secondsDifference >= totalSeconds) {
          markCurrentCycleAsFinished();
          setSecondsPassed(totalSeconds);
          clearInterval(interval);
        } else {
          setSecondsPassed(secondsDifference);
        }
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [
    activeCycle,
    totalSeconds,
    activeCycleId,
    markCurrentCycleAsFinished,
    setSecondsPassed,
  ]);

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutesAmountFormatted}:${secondsAmountFormatted}`;
    }
  }, [minutesAmountFormatted, secondsAmountFormatted, activeCycle]);

  return (
    <CountdownContainer>
      <span>{minutesAmountFormatted[0]}</span>
      <span>{minutesAmountFormatted[1]}</span>
      <Separator>:</Separator>
      <span>{secondsAmountFormatted[0]}</span>
      <span>{secondsAmountFormatted[1]}</span>
    </CountdownContainer>
  );
}
