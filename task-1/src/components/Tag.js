import React, { Component } from 'react';

class Tag extends Component {
  constructor(props) {
    super(props);
    const { skill } = this.props;
    this.state = {
      inputEnabled: true,
      searchListEnabled: false,
      input: '',
      skill: skill || '',
      tagList: [
        'Java',
        'JavaScript',
        'Rust',
        'Python',
        'C',
      ],
    };
  }

  handleInput = (event) => {
    if (event.target.value) {
      if (event.key === 'Enter') {
        // console.log(`Skill Entered: ${event.target.value}`);
        this.setState({
          inputEnabled: false,
          searchListEnabled: false,
          skill: event.target.value,
          input: '',
        });
      } else {
        this.setState({
          searchListEnabled: true,
          input: event.target.value,
        });
      }
    } else {
      this.setState({
        searchListEnabled: false,
        input: '',
      });
    }
  }

  handleFocus = (event) => {
    if (!event.target.value) {
      this.setState({
        searchListEnabled: true,
      });
    }
  }

  handleBlur = (event) => {
    if (event.target.value) {
      this.setState({
        inputEnabled: false,
        searchListEnabled: false,
        skill: event.target.value,
      });
    }
  }

  updateSkill = (skill) => {
    const { skillSetter } = this.props;
    skillSetter(skill);
    this.setState({
      inputEnabled: false,
      searchListEnabled: false,
      skill,
      input: '',
    });
  }

  deleteSkill = () => {
    const { skillRemover } = this.props;
    skillRemover();
    this.setState({
      inputEnabled: true,
      input: '',
      skill: '',
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
        Type to Search
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

  render() {
    const {
      inputEnabled,
      searchListEnabled,
      skill,
      input,
      tagList,
    } = this.state;

    const { index, disabled } = this.props;

    if (inputEnabled) {
      return (
        <div className="tag">
          <div className={`tag__content ${disabled ? 'disabled' : ''}`}>
            <input
              type="text"
              className="tag__input"
              placeholder={`${index}. Add Skill`}
              disabled={disabled || !inputEnabled}
              onKeyUp={this.handleInput}
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
      <div className="tag locked">
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
