import React from "react";
import {
  Icon,
  Tag,
  Divider,
  Button,
  Input,
  Popconfirm,
  Row,
  Col,
  Badge,
  message,
} from "antd";
import { connect } from "react-redux";
import moment from "moment";
import PropTypes from "prop-types";
import Rating from "react-rating";
import Footer from "./Footer";

import { IoMdArrowRoundBack } from "react-icons/io";

import { getTutorial, addReview } from "../actions/tutorialActions";
import {
  addToFavorites,
  removeFromFavorites,
  clearMessage,
} from "../actions/userActions";
import {
  addUpvote,
  removeUpvote,
  clearUpvoteMessage,
} from "../actions/tutorialActions";
import { getUserProfile } from "../actions/authActions";

import Loader from "./Loader";

import "../styles/Tutorial.css";

class Tutorial extends React.Component {
  constructor(props) {
    super(props);

    this.addReview = this.addReview.bind(this);
    this.addToFavorites = this.addToFavorites.bind(this);
    this.removeFromFavorites = this.removeFromFavorites.bind(this);
    this.addUpvote = this.addUpvote.bind(this);
    this.removeUpvote = this.removeUpvote.bind(this);
  }

  componentDidMount() {
    this.props.getTutorial(this.props.match.params.tutorial);
  }

  addToFavorites() {
    if (!this.props.auth.authenticated) {
      return message.info("You need to login to add to favorites");
    }

    this.props.addToFavorites(this.props.match.params.tutorial);
    message.success("Tutorial added to favorites");
    this.props.getUserProfile();
    setTimeout(() => this.props.clearMessage(), 3000);
  }

  removeFromFavorites() {
    this.props.removeFromFavorites(this.props.match.params.tutorial);
    message.success("Tutorial removed from favorites");
    this.props.getUserProfile();
    setTimeout(() => this.props.clearMessage(), 3000);
  }

  addUpvote() {
    if (!this.props.auth.authenticated) {
      return message.info("You need to login to upvote");
    }

    this.props.addUpvote(this.props.match.params.tutorial);
    message.success("Upvote Added");
    this.props.getUserProfile();
    this.props.getTutorial(this.props.match.params.tutorial);
    setTimeout(() => this.props.clearUpvoteMessage(), 3000);
  }

  removeUpvote() {
    this.props.removeUpvote(this.props.match.params.tutorial);
    message.success("Upvote Removed");
    this.props.getUserProfile();
    this.props.getTutorial(this.props.match.params.tutorial);
    setTimeout(() => this.props.clearUpvoteMessage(), 3000);
  }

  addReview() {
    if (!this.props.auth.authenticated) {
      return message.info("You need to login to add a review");
    }

    if (this.refs.review.textAreaRef.value.trim() === "") {
      return message.info("Enter a review");
    }

    const newReview = {
      review: this.refs.review.textAreaRef.value,
    };

    this.props.addReview(this.props.match.params.tutorial, newReview);
    this.refs.review.textAreaRef.value = "";
  }

  render() {
    const { tutorial } = this.props.tutorial;
    let tutorialPage;
    if (this.props.tutorial.loading || !tutorial) {
      tutorialPage = <Loader />;
    } else {
      const colors = [
        "#8443de",
        "#ff46ab",
        "#69e52c",
        "#fc972b",
        "#fd313c",
        "#f5f29",
        "#ffb420",
        "#a6e509",
        "#2295ff",
        "#3359f5",
        "#04caca",
      ];
      let tags;

      if (tutorial.tags) {
        tags = tutorial.tags.map((tag, i) => (
          <Tag key={i} color={colors[i % colors.length]}>
            {tag}
          </Tag>
        ));
      } else {
        tags = null;
      }

      let favorite = false;
      let upvote = false;
      let upvoteCount = 0;
      if (this.props.tutorial.tutorial.upvotes)
        upvoteCount = this.props.tutorial.tutorial.upvotes.length;

      if (this.props.auth.userProfile.favorites) {
        this.props.auth.userProfile.favorites.forEach((tutorial) => {
          if (this.props.match.params.tutorial === tutorial._id)
            favorite = true;
        });
      }

      if (this.props.auth.userProfile.upvotes) {
        this.props.auth.userProfile.upvotes.forEach((tutorial) => {
          if (this.props.tutorial.tutorial._id === tutorial) upvote = true;
        });
      }

      let reviews;

      if (!tutorial.reviews || tutorial.reviews.length === 0) {
        reviews = <div className="nothing-to-show review">No Reviews Yet</div>;
      } else {
        reviews = tutorial.reviews.map((review, i) => (
          <div className="review" key={i}>
            <div className="reviewed-by">{review.reviewedBy.name}</div>
            <div className="review-content">{review.review}</div>
          </div>
        ));
      }

      tutorialPage = (
        <div>
          {this.props.history.location.state.recommended && (
            <div className="recommended-tutorial-div">
              <span>Recommended</span>
            </div>
          )}
          <h1 className="tutorial-title-name">
            <Row gutter={8}>
              <Col sm={24} md={20}>
                {tutorial.title}
              </Col>

              <Col xs={0} md={4}>
                <span>
                  {!favorite ? (
                    <Button type="primary" onClick={this.addToFavorites}>
                      Add to Favorites
                    </Button>
                  ) : (
                    <Popconfirm
                      placement="top"
                      title="Remove from favorites?"
                      okText="Yes"
                      cancelText="Cancel"
                      icon={<Icon type="question-circle" theme="outlined" />}
                      onConfirm={this.removeFromFavorites}
                    >
                      <Button type="danger">Remove from Favorites</Button>
                    </Popconfirm>
                  )}
                </span>
              </Col>
              <Col md={20} sm={24} style={{ marginTop: 5 }}>
                <div className="tutorial-info">{tutorial.description}</div>
              </Col>
            </Row>
          </h1>

          <div className="tutorial-tags">{tags}</div>

          {!upvote ? (
            <div style={{ display: "flex" }}>
              <Badge count={upvoteCount} showZero>
                <Button className="upvote-button" onClick={this.addUpvote}>
                  Upvote
                </Button>
              </Badge>
              <Col sm={24} md={0}>
                <span style={{ marginLeft: "20px" }}>
                  {!favorite ? (
                    <Button type="primary" onClick={this.addToFavorites}>
                      Add to Favorites
                    </Button>
                  ) : (
                    <Popconfirm
                      placement="top"
                      title="Remove from favorites?"
                      okText="Yes"
                      cancelText="Cancel"
                      icon={<Icon type="question-circle" theme="outlined" />}
                      onConfirm={this.removeFromFavorites}
                    >
                      <Button type="danger">Remove from Favorites</Button>
                    </Popconfirm>
                  )}
                </span>
              </Col>
            </div>
          ) : (
            <Popconfirm
              placement="top"
              title="Remove Upvote?"
              okText="Yes"
              cancelText="Cancel"
              icon={<Icon type="question-circle" theme="outlined" />}
              onConfirm={this.removeUpvote}
            >
              <Badge count={upvoteCount} showZero>
                <Button type="danger" className="upvote-button">
                  Remove Upvote
                </Button>
              </Badge>
            </Popconfirm>
          )}
          <Button type="primary">
            <a href={tutorial.link} target="_blank">
              Visit Tutorial
            </a>
          </Button>
          {console.log(this.props.history)}
          <Divider className="divider" />
          <div className="tutorial-info">
            <span className="bold">Educator :</span> {tutorial.educator}
          </div>
          <div className="tutorial-info">
            <span className="bold">Medium :</span> {tutorial.medium}
          </div>
          {tutorial.rating > 0 && (
            <div className="tutorial-info">
              <span className="bold">Avg. Rating :</span>{" "}
              <Rating
                readonly
                initialRating={tutorial.rating}
                fractions="2"
                className="rating-span"
                emptySymbol="fa fa-star-o fa-1x"
                fullSymbol="fa fa-star fa-1x medium"
              />
            </div>
          )}
          <div className="tutorial-info">
            <span className="bold">Language :</span>{" "}
            <span
              className={
                !tutorial.language
                  ? "flag-icon flag-icon-us"
                  : `flag-icon flag-icon-${tutorial.language}`
              }
            ></span>
          </div>

          {tutorial.platform && (
            <div className="tutorial-info">
              <span className="bold">Platform :</span> {tutorial.platform}
            </div>
          )}
          <div className="tutorial-info">
            <span className="bold">Type :</span> {tutorial.type}
          </div>
          <div className="tutorial-info">
            <span className="bold">Skill Level :</span> {tutorial.skillLevel}
          </div>

          <Divider className="divider" />
          <div className="reviews">
            <div className="tutorial-info">
              <span className="bold">Reviews</span>
            </div>
            <Row gutter={8}>
              <Col sm={24} md={21}>
                <Input.TextArea
                  rows={1}
                  placeholder="Add a review"
                  ref="review"
                />
              </Col>
              <Col sm={24} md={2}>
                <Button
                  type="primary"
                  onClick={this.addReview}
                  className="review-submit-button"
                >
                  Submit
                </Button>
              </Col>
            </Row>
            {reviews}
          </div>
        </div>
      );
    }

    return (
      <div>
        <div
          className={
            this.props.history.location.state.recommended
              ? "main-recommended-card-cointainer"
              : "tutorial"
          }
        >
          <div
            className="back-arrow-icon"
            onClick={() => this.props.history.goBack()}
          >
            <IoMdArrowRoundBack color="rgba(255, 255, 255, 1)" size="30px" />
          </div>
          <div
            className={
              this.props.history.location.state.recommended &&
              "recommended-tutorial"
            }
          >
            {tutorialPage}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

Tutorial.propTypes = {
  auth: PropTypes.object.isRequired,
  tutorial: PropTypes.object.isRequired,
  getTutorial: PropTypes.func.isRequired,
  addReview: PropTypes.func.isRequired,
  addToFavorites: PropTypes.func.isRequired,
  removeFromFavorites: PropTypes.func.isRequired,
  getUserProfile: PropTypes.func.isRequired,
  clearMessage: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  tutorial: state.tutorial,
});

export default connect(mapStateToProps, {
  getTutorial,
  addReview,
  addToFavorites,
  removeFromFavorites,
  getUserProfile,
  clearMessage,
  addUpvote,
  removeUpvote,
  clearUpvoteMessage,
})(Tutorial);
