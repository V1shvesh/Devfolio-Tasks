import React, {Component} from 'react';

class Tag extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputEnabled: false,
      skill: '',
    }
  }


  render() {
    if (this.state.inputEnabled) {
      return (
        <input 
          className="tag inputMode"
          defaultValue={`${this.props.index}. Add Skill`}
        />
      );
    } else {
      return (
        <div className="tag viewMode">{`${this.props.index}. ${this.state.skill}`}</div>
      )
    }
  }
}

export default Tag;