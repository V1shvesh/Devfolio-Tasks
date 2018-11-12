import React, { Component } from 'react';

import Tag from './Tag';

const maxIndex = 5;

class TagList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      curIndex: -1,
      skillValueSet: Array(maxIndex).fill(false),
    };
  }

  setSkill = (skill) => {
    const { skillValueSet, curIndex } = this.state;
    const newIndex = curIndex + 1;
    this.setState({
      curIndex: newIndex,
      skillValueSet: [
        ...skillValueSet.slice(0, newIndex),
        skill,
        ...skillValueSet.slice(newIndex + 1),
      ],
    });
  }

  removeSkill = () => {
    const { skillValueSet, curIndex } = this.state;
    const newIndex = curIndex - 1;
    this.setState({
      curIndex: newIndex,
      skillValueSet: [
        ...skillValueSet.slice(0, curIndex),
        undefined,
        ...skillValueSet.slice(curIndex + 1),
      ],
    });
  }

  render() {
    const { skillValueSet, curIndex } = this.state;
    const tagList = skillValueSet.map((value, index) => (
      <Tag
        index={index + 1}
        disabled={!value && index > curIndex + 1}
        skillSetter={this.setSkill}
        skillRemover={this.removeSkill}
      />
    ));

    return (
      <div
        className="taglist"
      >
        {tagList}
      </div>
    );
  }
}

export default TagList;
