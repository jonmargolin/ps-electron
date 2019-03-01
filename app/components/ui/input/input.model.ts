export  default interface IInput {
    elementType: string;
    elementConfig: ElementConfig;
    value: string;
    invalid: boolean;
    shouldValidate: ShouldValidate;
    touched: boolean;

}
export  interface IInputChange extends  IInput{
    change: (event: any) => void
}
export  interface ShouldValidate {
    required: boolean
}
export  interface ElementConfig {
    type: string,
    placeholder: string
}
