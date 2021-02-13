import React, { Component } from 'react'

export default class Btn extends Component {

    render(props) {
        return (
            <>
                {this.props.isSubmit ? (
                    <button className={this.props.className}>
                        {this.props.text} 
                    </button>    
                ): 
                <div className={this.props.className}>
                    {this.props.text} 
                </div>
                }
            </>
        )
    }
}
