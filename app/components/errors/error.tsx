import * as React from 'react';


export class Error extends React.Component<any> {
    render() {
        console.log(this.props);
        return (
            <div>
                <p> error</p>
            </div>
        )
    }

}
export  default Error
