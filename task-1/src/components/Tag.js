import React, { Component } from 'react';
import fetch from 'node-fetch';

function toTitleCase(str) {
  let result = str.replace(
    /\w\S*/g,
    txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(),
  );

  result = result.replace(
    /-\w\S*/g,
    txt => `-${txt.charAt(1).toUpperCase()}${txt.substr(2).toLowerCase()}`,
  );

  result = result.replace(
    /sql|css|html/gi,
    txt => txt.toUpperCase(),
  );

  return result;
}

class Tag extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchListEnabled: false,
      input: '',
      tagList: [],
      dragged: false,
    };
  }

  fetchTags = (input) => {
    fetch(`https://api.stackexchange.com/2.2/tags?pagesize=4&order=desc&sort=popular&site=stackoverflow&inname=${input}&filter=!-.G.68gzI8DP`)
      .then(response => response.json())
      .then((json) => {
        const tagList = json.items.map(item => toTitleCase(item.name));
        this.setState({
          tagList,
        });
      });
  }

  handleInput = (e) => {
    if (e.target.value) {
      if (e.key === 'Enter') {
        this.updateSkill(e.target.value);
      } else {
        const newInput = e.target.value.trim();
        this.setState({
          input: newInput,
        });
        this.fetchTags(newInput.toLowerCase());
      }
    } else {
      this.setState({
        input: '',
        tagList: [],
      });
    }
  }

  handleFocus = () => {
    this.setState({
      searchListEnabled: true,
      input: '',
    });
  }

  handleBlur = (e) => {
    if (e.target.value) {
      this.updateSkill(e.target.value);
    } else {
      this.setState({
        searchListEnabled: false,
      });
    }
  }

  updateSkill = (skill) => {
    const { skillSetter } = this.props;
    skillSetter(skill);
    this.setState({
      searchListEnabled: false,
      input: '',
    });
  }

  deleteSkill = () => {
    const { skillRemover } = this.props;
    skillRemover();
    this.setState({
      input: '',
    });
  }

  renderDefaultSearchOption = (input) => {
    if (input) {
      return (
        <li
          key={input}
        >
          <button
            type="button"
            key={input}
            onClick={() => this.updateSkill(input)}
          >
            {`Create Option "${input}"`}
          </button>
        </li>
      );
    }

    return (
      <li>
        <button
          type="button"
        >
          Type to Search
        </button>
      </li>
    );
  }

  renderSearchList = (tagList, input) => tagList
    .filter(tag => tag.toLowerCase().includes(input.toLowerCase()))
    .map(tag => (
      <li key={tag}>
        <button type="button" key={tag} onClick={() => this.updateSkill(tag)}>
          {tag}
        </button>
      </li>
    ));

  startDrag = (e) => {
    const { handleDragStart } = this.props;
    handleDragStart(e);
    this.setState({
      dragged: true,
    });
  }

  endDrag = (e) => {
    const { handleDragEnd } = this.props;
    handleDragEnd(e);
    this.setState({
      dragged: false,
    });
  }

  render() {
    const {
      searchListEnabled,
      input,
      tagList,
      dragged,
    } = this.state;

    const {
      index,
      skill,
      disabled,
      handleDragEnterItem,
    } = this.props;

    if (skill === '') {
      return (
        <div className="tag">
          <div className={`tag__content ${disabled ? 'disabled' : ''}`}>
            <input
              type="text"
              className="tag__input"
              placeholder={`${index}. Add Skill`}
              disabled={disabled}
              onKeyUp={this.handleInput}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
            />
          </div>
          <div className="tag__searchlist" hidden={!searchListEnabled}>
            <ul>
              {this.renderDefaultSearchOption(input)}
              {this.renderSearchList(tagList, input)}
            </ul>
          </div>
        </div>
      );
    }
    return (
      <div
        className={`tag locked ${dragged ? 'dragged' : ''}`}
        draggable
        onDragStart={this.startDrag}
        onDragEnter={handleDragEnterItem}
        onDragEnd={this.endDrag}
      >
        <div>
          {`${index}. ${skill}`}
        </div>
        <button
          type="button"
          className="tag__delete"
          onClick={this.deleteSkill}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-x-circle"
            style={{ opacity: 0.8 }}
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M15 9l-6 6M9 9l6 6" />
          </svg>
        </button>
      </div>
    );
  }
}

export default Tag;
