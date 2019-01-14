export  default interface Iinput {
    elementType: string;
    elementConfig: ElementConfig;
    value: string;
    invalid: boolean;
    shouldValidate: ShouldValidate;
    touched: boolean;
}
export  interface ShouldValidate {
    required: boolean
}
export  interface ElementConfig {
    type: string,
    placeholder: string
}
