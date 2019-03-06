import { RootState } from '../../App';
import { ProgressText } from '../../components/ui/progress-bar/progress-bar.model';

export interface FilePath {
    file: string;
    path: string;
    url: string;
}

export interface IInstallerProps {
    filePaths: FilePath[];
    onError: (error: any) => void;
}

export interface IInstallerState extends RootState {
    progress: number;
    progressText: ProgressText;
    isDone: boolean;
}