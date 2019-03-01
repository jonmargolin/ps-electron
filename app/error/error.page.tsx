import * as React from 'react';

export class ErrorPage extends React.Component<any> {
    render() {
        console.log(this.props);
        return (
            <>
                <p>{this.props.error}</p>
            </>
        )
    }

}
