import React from "react";
import { Card } from "antd";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import "../styles/TagCard.css";
import codeImg from "../img/laptop-code-solid.svg";
class TagCard extends React.Component {
  render() {
    return (
      <Card className="tag-card">
        <Link
          to={`/tutorials/tag/${this.props.tag.tag
            .toLowerCase()
            .split(" ")
            .join("-")}`}
        >
          <div className="tag-card-title">
            {this.props.tag.tag}{" "}
            <img
              src={this.props.tag.logoLink ? this.props.tag.logoLink : codeImg}
              alt="tag-logo"
              height="30px"
              width="30px"
              style={{ borderRadius: "50%" }}
            />
          </div>
          <div className="tag-card-description">
            {this.props.tag.description}
          </div>
        </Link>
        {this.props.tag.website ? (
          <div className="tag-card-website">
            Official Website :{" "}
            <a href={this.props.tag.website} target="_blank">
              <span className="website-link">{this.props.tag.website}</span>
            </a>
          </div>
        ) : null}
      </Card>
    );
  }
}

TagCard.propTypes = {
  tag: PropTypes.object.isRequired,
};

export default TagCard;
