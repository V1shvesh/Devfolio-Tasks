import React, { Component } from 'react';

import Tag from './Tag';

const maxIndex = 10;
const customContainerType = 'custom_container_type';

class TagList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      curIndex: -1,
      hoverOver: -1,
      dragged: -1,
      skillSet: Array(maxIndex).fill(''),
      tagID: Array(maxIndex).fill(0).map((value, index) => index),
    };
  }

  componentDidMount = () => {
    const { loadSkills } = this.props;
    loadSkills().then((skillSet) => {
      if (skillSet) {
        const curIndex = skillSet.filter(skill => skill !== '').length - 1;
        this.setState({
          curIndex,
          skillSet,
        });
      }
    });
  }

  componentDidUpdate = () => {
    const { tagID, skillSet } = this.state;
    const { saveSkills } = this.props;
    saveSkills(tagID.map(value => skillSet[value]));
  }

  setSkill = (skill, id) => {
    const { skillSet, curIndex } = this.state;
    const newIndex = curIndex + 1;
    this.setState({
      curIndex: newIndex,
      skillSet: [
        ...skillSet.slice(0, id),
        skill,
        ...skillSet.slice(id + 1),
      ],
    });
  }

  removeSkill = (id, index) => {
    const { skillSet, curIndex, tagID } = this.state;
    const newIndex = curIndex - 1;
    this.setState({
      curIndex: newIndex,
      skillSet: [
        ...skillSet.slice(0, id),
        '',
        ...skillSet.slice(id + 1),
      ],
      tagID: [
        ...tagID.slice(0, index),
        ...tagID.slice(index + 1, curIndex + 1),
        tagID[index],
        ...tagID.slice(curIndex + 1),
      ],
    });
  }

  // Drop Event Handlers
  containerAcceptsDropData = transferTypes => transferTypes.indexOf(customContainerType) !== -1

  handleDragStart = (e, dragged) => {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData(customContainerType, toString(dragged));
    this.setState({
      dragged,
    });
  }

  handleDragEnterItem = (e, hoverOver) => {
    const { dragged } = this.state;
    if (this.containerAcceptsDropData(e.dataTransfer.types)) {
      e.preventDefault();
    }

    if (dragged !== hoverOver) {
      this.setState({
        hoverOver,
      });
    }
  }

  handleDragEnd = () => {
    const { dragged, hoverOver, tagID } = this.state;
    let newTagID = [];
    if (hoverOver === -1) {
      this.setState({
        dragged: -1,
      });
      return;
    }

    if (dragged < hoverOver) {
      newTagID = [
        ...tagID.slice(0, dragged),
        ...tagID.slice(dragged + 1, hoverOver + 1),
        tagID[dragged],
        ...tagID.slice(hoverOver + 1),
      ];
    } else {
      newTagID = [
        ...tagID.slice(0, hoverOver),
        tagID[dragged],
        ...tagID.slice(hoverOver, dragged),
        ...tagID.slice(dragged + 1),
      ];
    }

    this.setState({
      tagID: newTagID,
    });
  }

  render() {
    const { skillSet, curIndex, tagID } = this.state;
    const tagList = tagID.map((id, index) => (
      <Tag
        key={id}
        index={index + 1}
        disabled={index > curIndex + 1}
        skill={index <= curIndex ? skillSet[id] : ''}
        skillSetter={skill => this.setSkill(skill, id)}
        skillRemover={() => this.removeSkill(id, index)}
        handleDragStart={e => this.handleDragStart(e, index)}
        handleDragEnterItem={e => this.handleDragEnterItem(e, index)}
        handleDragEnd={this.handleDragEnd}
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
