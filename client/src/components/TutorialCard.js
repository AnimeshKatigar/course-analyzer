import React from "react";
import {
  Card,
  Tag,
  Skeleton,
  Tooltip,
  Icon,
  Row,
  Col,
  Button,
  message,
  Popconfirm,
  Badge,
} from "antd";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Rating from "react-rating";

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

import "../styles/TutorialCard.css";

class TutorialCard extends React.Component {
  constructor(props) {
    super(props);

    this.addToFavorites = this.addToFavorites.bind(this);
    this.removeFromFavorites = this.removeFromFavorites.bind(this);
    this.addUpvote = this.addUpvote.bind(this);
    this.removeUpvote = this.removeUpvote.bind(this);
  }

  addToFavorites() {
    if (!this.props.auth.authenticated) {
      return message.info("You need to login to add to favorites");
    }

    this.props.addToFavorites(this.props.tutorial._id);
    message.success("Tutorial added to favorites");
    this.props.getUserProfile();
    setTimeout(() => this.props.clearMessage(), 3000);
  }

  removeFromFavorites() {
    this.props.removeFromFavorites(this.props.tutorial._id);
    message.success("Tutorial removed from favorites");
    this.props.getUserProfile();
    setTimeout(() => this.props.clearMessage(), 3000);
  }

  addUpvote() {
    if (!this.props.auth.authenticated) {
      return message.info("You need to login to upvote");
    }

    this.props.addUpvote(this.props.tutorial._id);
    message.success("Upvote Added");
    this.props.getUserProfile();
    window.location.reload();
    setTimeout(() => this.props.clearUpvoteMessage(), 3000);
  }

  removeUpvote() {
    this.props.removeUpvote(this.props.tutorial._id);
    message.success("Upvote Removed");
    this.props.getUserProfile();
    window.location.reload();
    setTimeout(() => this.props.clearUpvoteMessage(), 3000);
  }

  render() {
    // const colors = [
    //   "#8443de",
    //   "#ff46ab",
    //   "#69e52c",
    //   "#fc972b",
    //   "#fd313c",
    //   "#ffb420",
    //   "#a6e509",
    //   "#2295ff",
    //   "#3359f5",
    //   "#04caca",
    // ];
    const colors = [
      "#CC00FF",
      "#ff46ab",
      "#9D00FF",
      "#FF00CC",
      "#CC00FF",
      "#ffb420",
      "#a6e509",
      "#2295ff",
      "#3359f5",
      "#04caca",
    ];
    let tags;
    if (this.props.tutorial.tags) {
      tags = this.props.tutorial.tags.map((tag, i) => (
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
    if (this.props.tutorial.upvotes)
      upvoteCount = this.props.tutorial.upvotes.length;

    if (this.props.auth.userProfile.favorites) {
      this.props.auth.userProfile.favorites.forEach((tutorial) => {
        if (this.props.tutorial._id === tutorial._id) favorite = true;
      });
    }

    if (this.props.auth.userProfile.upvotes) {
      this.props.auth.userProfile.upvotes.forEach((tutorial) => {
        if (this.props.tutorial._id === tutorial) upvote = true;
      });
    }

    return (
      <Card className="tutorial-card">
        <Skeleton loading={!this.props.tutorial} active>
          <div
            onClick={() =>
              this.props.history.push(`/tutorials/${this.props.tutorial._id}`)
            }
          >
            <div className="card-title">
              <Tooltip placement="topLeft" title="Click here for more info">
                <span className="tutorial-name">
                  {this.props.tutorial.title}
                  <span
                    className={
                      !this.props.tutorial.language
                        ? "flag-icon flag-icon-us"
                        : `flag-icon flag-icon-${this.props.tutorial.language}`
                    }
                    style={{ marginLeft: 15 }}
                  ></span>
                </span>
              </Tooltip>
              {this.props.tutorial.rating > 0 && (
                <div className="tutorial-info">
                  <Rating
                    readonly
                    initialRating={this.props.tutorial.rating}
                    fractions="2"
                    className="rating-span"
                    emptySymbol="fa fa-star-o fa-1x"
                    fullSymbol="fa fa-star fa-1x medium"
                  />
                </div>
              )}
            </div>
            <Row gutter={{ sm: 0, md: 4, xl: 8 }}>
              <Col xs={24} sm={24} md={12} xl={8}>
                <div className="card-entries">
                  <span>Medium</span> : {this.props.tutorial.medium}
                </div>
              </Col>
              <Col xs={24} sm={24} md={12} xl={8}>
                <div className="card-entries">
                  <span>Type</span> : {this.props.tutorial.type}
                </div>
              </Col>
              <Col xs={24} sm={24} md={12} xl={8}>
                <div className="card-entries">
                  <span>Skill Level</span>: {this.props.tutorial.skillLevel}
                </div>
              </Col>
            </Row>
            <div className="card-entries">{tags}</div>
          </div>
          {/* <Row justify="space-between">
						<Col xs={24} sm={24} md={14} lg={18} className="upvote-button">
							{!upvote ? (
								<Badge count={upvoteCount} showZero>
									<Button className="upvote-button" onClick={this.addUpvote}>
										Upvote
									</Button>
								</Badge>
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
						</Col>
						<Col xs={24} sm={24} md={6} lg={4}>
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
						</Col>
					</Row> */}
          <div className="btnContainer">
            <div className="upvote-button" style={{ display: "flex" }}>
              {!upvote ? (
                <Badge count={upvoteCount} showZero>
                  <Button className="upvote-button" onClick={this.addUpvote}>
                    Upvote
                  </Button>
                </Badge>
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
            </div>
            <div style={{ display: "flex" }}>
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
            </div>
          </div>
        </Skeleton>
      </Card>
    );
  }
}

TutorialCard.propTypes = {
  auth: PropTypes.object.isRequired,
  addToFavorites: PropTypes.func.isRequired,
  removeFromFavorites: PropTypes.func.isRequired,
  clearMessage: PropTypes.func.isRequired,
  getUserProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  addToFavorites,
  removeFromFavorites,
  clearMessage,
  getUserProfile,
  addUpvote,
  removeUpvote,
  clearUpvoteMessage,
})(withRouter(TutorialCard));
