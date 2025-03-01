interface State {
  isRunning: boolean;
  timeData: {
    duration: number;
    minutes: string;
    hours: string;
    seconds: string;
  };
  intervalId?: number | NodeJS.Timeout;
}
export interface ActionContainerProps extends Partial<State> {
  setIsRunning: React.Dispatch<React.SetStateAction<boolean>>;
  setDuration: React.Dispatch<React.SetStateAction<State["timeData"]>>;
  setIntervalId: React.Dispatch<
    React.SetStateAction<number | undefined | NodeJS.Timeout>
  >;
}
