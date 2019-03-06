import { FilePath } from '../installer';
import { RootState } from '../App';
import { IInputChange } from '../components/ui/input/input.model';
import { IButton } from '../components/ui/button/button';

export interface IHomeProps {
    filePaths: FilePath[];
    onDone: (filePaths: FilePath[]) => void;
    onError: (error: any) => void;
  }
  
  export interface HomeState extends RootState {
    input: IInputChange;
    button: IButton;
  }