import React from "react";
import { Form, Input, Button, Radio, Select, Modal, message } from "antd";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Rating from "react-rating";

import { addTag, getTags } from "../actions/tagActions";
import { addTutorial } from "../actions/tutorialActions";

import CountrySelector from "./CountrySelector.js";
import "../styles/TutorialForm.css";

class TutorialForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
      tags: [],
      tutorialTitle: "",
      tutorialEduc: "",
      tutorialLetters: 0,
      tutorialDescription: "",
      tutorialLink: "",
      tutorialMedium: "Video",
      tutorialPlatform: "",
      tutorialType: "Free",
      tutorialSkillLevel: "Beginner",
      rating: 0,

      tagTitle: "",
      tagDescription: "",
      tagWebsite: "",
      tagImage: "",
      tagLetters: 0,
      selected: "US",
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.submitTutorial = this.submitTutorial.bind(this);
    this.addTag = this.addTag.bind(this);
    this.selectTags = this.selectTags.bind(this);
    this.onChangeTutorial = this.onChangeTutorial.bind(this);
    this.onChangeTag = this.onChangeTag.bind(this);
  }

  componentDidMount() {
    this.props.getTags();
  }

  openModal() {
    this.setState({ modalVisible: true });
  }

  closeModal() {
    this.setState({ modalVisible: false });
  }

  selectTags(tags) {
    this.setState({ tags });
  }

  onChangeTutorial(event) {
    const tutorialDescription = event.target.value;
    if (tutorialDescription.length <= 150) {
      this.setState({
        tutorialLetters: tutorialDescription.length,
        tutorialDescription,
      });
    }
  }

  onChangeTag(event) {
    const tagDescription = event.target.value;
    if (tagDescription.length <= 150) {
      this.setState({ tagLetters: tagDescription.length, tagDescription });
    }
  }

  addTag(event) {
    event.preventDefault();

    if (this.state.tagTitle.trim() === "") {
      return message.warning("Enter Tag");
    }
    if (this.state.tagDescription.trim() === "") {
      return message.warning("Enter Tag Description");
    }

    const tag = {
      tag: this.state.tagTitle,
      description: this.state.tagDescription,
      logoLink: this.state.tagImage,
      website: this.state.tagWebsite,
    };

    this.props.addTag(tag);

    this.setState({
      tagTitle: "",
      tagDescription: "",
      tagWebsite: "",
      tagImage: "",
    });

    this.closeModal();
    window.location.reload();
  }

  submitTutorial(event) {
    event.preventDefault();
    if (this.state.tutorialTitle.trim() === "") {
      return message.warning("Enter Title");
    }
    if (this.state.tutorialEduc.trim() === "") {
      return message.warning("Enter Educator Name");
    }
    if (this.state.tutorialLink.trim() === "") {
      return message.warning("Provide Tutorial Link");
    }
    if (this.state.tutorialDescription.trim() === "") {
      return message.warning("Enter Tutorial Description");
    }
    if (this.state.tags.length === 0) {
      return message.warning("Select Tags");
    }
    if (this.state.selected == "") {
      return message.warning("Select Language");
    }
    const tutorial = {
      title: this.state.tutorialTitle,
      educator: this.state.tutorialEduc,
      link: this.state.tutorialLink,
      description: this.state.tutorialDescription,
      medium: this.state.tutorialMedium,
      platform: this.state.tutorialPlatform,
      type: this.state.tutorialType,
      rating: this.state.rating,
      skillLevel: this.state.tutorialSkillLevel,
      tags: this.state.tags,
      language: this.state.selected.toLowerCase(),
    };

    this.props.addTutorial(tutorial, this.props.history);
  }

  render() {
    let tags;
    if (this.props.tag.loading || !this.props.tag.tags) {
      tags = null;
    } else {
      tags = this.props.tag.tags.map((tag) => (
        <Select.Option key={tag.tag} value={tag.tag}>
          {tag.tag}
        </Select.Option>
      ));
    }

    return (
      <Form className="full-page-form" onSubmit={this.submitTutorial}>
        <h1 className="full-page-form-title">Tutorial Details</h1>
        <Form.Item>
          <div className="form-label required">Tutorial Title</div>
          <Input
            type="text"
            placeholder="Tutorial Title"
            onChange={(event) =>
              this.setState({ tutorialTitle: event.target.value })
            }
          />
        </Form.Item>

        <Form.Item>
          <div className="form-label required">Description</div>
          <Input.TextArea
            placeholder="Description"
            rows={2}
            ref="tutorialDescription"
            onChange={this.onChangeTutorial}
            value={this.state.tutorialDescription}
          />
          <small className="word-count">
            {this.state.tutorialLetters} / 150
          </small>
        </Form.Item>
        <Form.Item>
          <div className="form-label required">Educator's Name</div>
          <Input
            type="text"
            placeholder="Educator's Name"
            onChange={(event) =>
              this.setState({ tutorialEduc: event.target.value })
            }
          />
        </Form.Item>
        <div
          className="form-label required"
          style={{ color: "white", margin: "10px 0px" }}
        >
          Language
        </div>
        <CountrySelector
          selected={this.state.selected}
          onSelect={(state) => this.setState({ selected: state })}
        />
        <Form.Item>
          <div className="form-label required">Link to Original Tutorial</div>
          <Input
            type="text"
            placeholder="Link"
            onChange={(event) =>
              this.setState({ tutorialLink: event.target.value })
            }
          />
        </Form.Item>
        <Form.Item>
          <div className="form-label">Platform Name</div>
          <Input
            type="text"
            placeholder="Platform"
            onChange={(event) =>
              this.setState({ tutorialPlatform: event.target.value })
            }
          />
        </Form.Item>
        <Form.Item>
          <div className="form-label">Rating</div>
          <Rating
            initialRating={this.state.rating}
            fractions="2"
            className="rating-span"
            emptySymbol="fa fa-star-o fa-2x"
            fullSymbol="fa fa-star fa-2x medium"
            // quiet
            onChange={(rate) => this.setState({ rating: rate })}
          />
        </Form.Item>

        <Form.Item>
          <div className="form-label">Medium</div>
          <Radio.Group
            defaultValue="Video"
            onChange={(event) =>
              this.setState({ tutorialMedium: event.target.value })
            }
          >
            <Radio.Button value="Video">Video</Radio.Button>
            <Radio.Button value="Blog">Blog</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item>
          <div className="form-label">Type of Tutorial</div>
          <Radio.Group
            defaultValue="Free"
            onChange={(event) =>
              this.setState({ tutorialType: event.target.value })
            }
          >
            <Radio.Button value="Free">Free</Radio.Button>
            <Radio.Button value="Paid">Paid</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item>
          <div className="form-label">Skill Level</div>
          <Radio.Group
            defaultValue="Beginner"
            onChange={(event) =>
              this.setState({ tutorialSkillLevel: event.target.value })
            }
          >
            <Radio.Button value="Beginner">Beginner</Radio.Button>
            <Radio.Button value="Intermediate">Intermediate</Radio.Button>
            <Radio.Button value="Advanced">Advanced</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item>
          <div className="form-label required">Tags</div>
          <Select mode="multiple" onChange={this.selectTags}>
            {tags}
          </Select>
          <Button onClick={this.openModal}>Add New Tag</Button>
        </Form.Item>
        <Form.Item className="form-action-buttons">
          <Button
            type="primary"
            htmlType="submit"
            className="form-action-button"
          >
            Submit Tutorial
          </Button>
          <Button
            className="form-action-button"
            onClick={this.props.history.goBack}
          >
            Cancel
          </Button>
        </Form.Item>
        <Modal
          visible={this.state.modalVisible}
          title="New Tag Details"
          onCancel={this.closeModal}
          footer={[
            <Button key="1" onClick={this.closeModal}>
              Cancel
            </Button>,
            <Button key="2" type="primary" onClick={this.addTag}>
              Add Tag
            </Button>,
          ]}
        >
          <Form>
            <Form.Item>
              <div className="form-label required">Tag</div>
              <Input
                type="text"
                placeholder="Tag"
                onChange={(event) =>
                  this.setState({ tagTitle: event.target.value })
                }
              />
            </Form.Item>
            <Form.Item>
              <div className="form-label required">Description</div>
              <Input.TextArea
                placeholder="Description"
                rows={3}
                ref="tagDescription"
                onChange={this.onChangeTag}
                value={this.state.tagDescription}
              />
              <small className="word-count">
                {this.state.tagLetters} / 150
              </small>
            </Form.Item>
            <Form.Item>
              <div className="form-label">Tag Image URL</div>
              <Input
                type="text"
                placeholder="Official Website"
                onChange={(event) =>
                  this.setState({ tagImage: event.target.value })
                }
              />
            </Form.Item>
            <Form.Item>
              <div className="form-label">Official Website</div>
              <Input
                type="text"
                placeholder="Official Website"
                onChange={(event) =>
                  this.setState({ tagWebsite: event.target.value })
                }
              />
            </Form.Item>
          </Form>
        </Modal>
      </Form>
    );
  }
}

TutorialForm.propTypes = {
  tag: PropTypes.object.isRequired,
  tutorial: PropTypes.object.isRequired,
  getTags: PropTypes.func.isRequired,
  addTag: PropTypes.func.isRequired,
  addTutorial: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  tag: state.tag,
  tutorial: state.tutorial,
});

export default connect(mapStateToProps, { getTags, addTag, addTutorial })(
  TutorialForm
);
