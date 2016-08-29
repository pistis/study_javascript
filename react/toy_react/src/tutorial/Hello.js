import React from 'react';

export class Hello extends React.Component {
    render() {
        return (
            <div className="container">Hello {this.props.name}</div>
        )
    }
}