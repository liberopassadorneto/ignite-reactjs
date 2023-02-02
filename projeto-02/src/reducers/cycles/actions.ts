import { Cycle } from './reducer';

export enum ActionTypes {
  createCycle = 'CREATE_CYCLE',
  interruptCurrentCycle = 'INTERRUPT_CURRENT_CYCLE',
  finishCurrentCycle = 'FINISH_CURRENT_CYCLE',
}

export function createCycleAction(newCycle: Cycle) {
  return {
    type: ActionTypes.createCycle,
    payload: {
      newCycle,
    },
  };
}

export function interruptCurrentCycleAction() {
  return {
    type: ActionTypes.interruptCurrentCycle,
  };
}

export function finishCurrentCycleAction() {
  return {
    type: ActionTypes.finishCurrentCycle,
  };
}
