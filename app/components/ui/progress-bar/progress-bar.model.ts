export enum ProgressText {
    Initializing = 'Initializing',
    FetchingFiles = 'Fetching Files...',
    Finalizing = 'Finalizing'
}

export interface IProgressBar {
    progress: number;
    progressText?: ProgressText;
    onDone: () => void;
}