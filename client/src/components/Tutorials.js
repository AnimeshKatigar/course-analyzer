import React from "react";
import { Row, Col, Checkbox, Input } from "antd";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { getTag } from "../actions/tagActions";
import { getTutorialsByTag } from "../actions/tutorialActions";
import { AiOutlineSearch } from "react-icons/ai";

import TutorialCard from "./TutorialCard";
import Loader from "./Loader";
import CountrySelector from "./CountrySelector.js";

import "../styles/Tutorials.css";
import codeImg from "../img/laptop-code-solid.svg";

class Tutorials extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      recommended: {},
      Video: false,
      Blog: false,
      Free: false,
      Paid: false,
      Beginner: false,
      Intermediate: false,
      Advanced: false,
      filters: {
        medium: [],
        type: [],
        skillLevel: [],
      },
      country: "",
      platform: "",
    };

    this.onChange = this.onChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onCountryChange = this.onCountryChange.bind(this);
  }

  componentDidMount() {
    this.props.getTag(this.props.match.params.tag);
    this.props.getTutorialsByTag(this.props.match.params.tag);
  }

  onCountryChange(state) {
    this.setState({ country: state });
    console.log(this.state.country);
  }

  handleChange(event) {
    this.setState({ platform: event.target.value });
  }

  onChange(event) {
    let filters = this.state.filters;
    if (event.target.checked) {
      if (event.target.name === "Video" || event.target.name === "Blog") {
        filters.medium.push(event.target.name);
      } else if (event.target.name === "Free" || event.target.name === "Paid") {
        filters.type.push(event.target.name);
      } else if (
        event.target.name === "Beginner" ||
        event.target.name === "Intermediate" ||
        event.target.name === "Advanced"
      ) {
        filters.skillLevel.push(event.target.name);
      }
    } else {
      if (event.target.name === "Video" || event.target.name === "Blog") {
        filters.medium = filters.medium.filter(
          (filter) => filter !== event.target.name
        );
      } else if (event.target.name === "Free" || event.target.name === "Paid") {
        filters.type = filters.type.filter(
          (filter) => filter !== event.target.name
        );
      } else if (
        event.target.name === "Beginner" ||
        event.target.name === "Intermediate" ||
        event.target.name === "Advanced"
      ) {
        filters.skillLevel = filters.skillLevel.filter(
          (filter) => filter !== event.target.name
        );
      }
    }
    this.setState({
      [event.target.name]: event.target.checked,
      filters,
    });
  }

  render() {
    let tutorials;
    let recommended;
    if (this.props.tutorial.loading || !this.props.tutorial.tutorials) {
      tutorials = <Loader />;
    } else {
      const mainTutorials = this.props.tutorial.tutorials;
      // recommended = this.props.tutorial.tutorials.reduce((prev, current) =>
      //   (prev.rating ? prev.rating : 0) > (current.rating ? current.rating : 0)
      //     ? prev
      //     : current
      // );
      recommended = this.props.tutorial.tutorials.reduce(function (
        prev,
        current
      ) {
        let prevLength = prev.upvotes ? prev.upvotes.length : 0;
        let currLength = current.upvotes ? current.upvotes.length : 0;

        return (prev.rating ? prev.rating + prevLength : 0 + prevLength) >
          (current.rating ? current.rating + currLength : 0 + currLength)
          ? prev
          : current;
      },
      {});

      const remainingTutorials = mainTutorials.filter(
        (tut) => tut._id !== recommended._id
      );

      const filteredTutorials = remainingTutorials.filter((tutorial) => {
        if (
          tutorial.language &&
          this.state.country.toLowerCase() == tutorial.language
        )
          return true;

        if (
          this.state.filters.medium.length !== 0 &&
          this.state.filters.medium.includes(tutorial.medium) &&
          this.state.filters.type.length !== 0 &&
          this.state.filters.type.includes(tutorial.type) &&
          this.state.filters.skillLevel.length !== 0 &&
          this.state.filters.skillLevel.includes(tutorial.skillLevel)
        )
          return true;
        if (
          this.state.filters.medium.length === 0 &&
          this.state.filters.type.length !== 0 &&
          this.state.filters.type.includes(tutorial.type) &&
          this.state.filters.skillLevel.length !== 0 &&
          this.state.filters.skillLevel.includes(tutorial.skillLevel)
        )
          return true;
        if (
          this.state.filters.type.length === 0 &&
          this.state.filters.medium.length !== 0 &&
          this.state.filters.medium.includes(tutorial.medium) &&
          this.state.filters.skillLevel.length !== 0 &&
          this.state.filters.skillLevel.includes(tutorial.skillLevel)
        )
          return true;
        if (
          this.state.filters.skillLevel.length === 0 &&
          this.state.filters.medium.length !== 0 &&
          this.state.filters.medium.includes(tutorial.medium) &&
          this.state.filters.type.length !== 0 &&
          this.state.filters.type.includes(tutorial.type)
        )
          return true;
        if (
          this.state.filters.medium.length === 0 &&
          this.state.filters.type.length === 0 &&
          this.state.filters.skillLevel.length !== 0 &&
          this.state.filters.skillLevel.includes(tutorial.skillLevel)
        )
          return true;
        if (
          this.state.filters.skillLevel.length === 0 &&
          this.state.filters.type.length === 0 &&
          this.state.filters.medium.length !== 0 &&
          this.state.filters.medium.includes(tutorial.medium)
        )
          return true;
        if (
          this.state.filters.skillLevel.length === 0 &&
          this.state.filters.medium.length === 0 &&
          this.state.filters.type.length !== 0 &&
          this.state.filters.type.includes(tutorial.type)
        )
          return true;
        if (
          this.state.filters.skillLevel.length === 0 &&
          this.state.filters.medium.length === 0 &&
          this.state.filters.type.length === 0
        )
          return true;

        return false;
      });
      // const merged=filteredTutorials.concat(recommended)
      const filterData = filteredTutorials.filter((data) =>
        data.title.toLowerCase().includes(this.state.platform.toLowerCase())
      );

      if (filterData.length === 0) {
        tutorials = (
          <div className="nothing-to-show nothing-matched">
            No Tutorials Found with the following filters
          </div>
        );
      } else {
        tutorials = (
          <div>
            {/* {console.log("adsad",filterData)} */}
            <Col span={24}>
              <TutorialCard tutorial={recommended} recommended={true} />
            </Col>
            {filterData.map((tutorial, i) => (
              <Col span={24} key={i}>
                <TutorialCard tutorial={tutorial} />
              </Col>
            ))}
          </div>
        );
      }
    }
    return (
      <div className="tutorials-by-tag">
        <h1 className="tutorial-title">
          <span
            style={{
              background: "#610094",
              color: "#fff",
              padding: "3px 5px 3px 7px",
              borderRadius: "10px",
              marginRight: 3,
            }}
          >
            <img
              src={
                this.props.tag.tag.logoLink
                  ? this.props.tag.tag.logoLink
                  : codeImg
              }
              alt="tag-logo"
              height="30px"
              width="30px"
              style={{ borderRadius: "50%", marginRight: "5px" }}
            />
            {this.props.tag.tag.tag}
          </span>{" "}
          Tutorials
        </h1>
        <Row gutter={32}>
          <Col xs={24} md={16} lg={8}>
            <div className="filters">
              <div className="filter">
                <Row>
                  <Input
                    placeholder="Search..."
                    size="large"
                    prefix={
                      <AiOutlineSearch
                        color="rgba(255, 255, 255, 0.8)"
                        size="20px"
                      />
                    }
                    style={{ width: "100%", margin: "0px 0px 10px" }}
                    value={this.state.platform}
                    className="searchInput"
                    onChange={this.handleChange}
                  />
                </Row>
              </div>
              <div className="bold filter-title">Filters</div>
              <div className="filter">
                <Row gutter={8}>
                  {/* <Col xs={24} sm={4} md={3} lg={3} className="filter-type"> */}
                  <Col xs={24} className="filter-type">
                    Medium{" "}
                  </Col>
                  {/* <Col xs={24} sm={7} md={5} lg={4}> */}
                  <Col xs={24} sm={7} md={5} lg={24} className="filter-type">
                    <Checkbox
                      checked={this.state.Video}
                      name="Video"
                      onChange={this.onChange}
                    >
                      Video
                    </Checkbox>
                  </Col>
                  {/* <Col xs={24} sm={7} md={5} lg={4}> */}
                  <Col xs={24} sm={7} md={5} lg={24} className="filter-type">
                    <Checkbox
                      checked={this.state.Blog}
                      name="Blog"
                      onChange={this.onChange}
                    >
                      Blog
                    </Checkbox>
                  </Col>
                </Row>
              </div>
              <div className="filter">
                <Row gutter={8}>
                  {/* <Col xs={24} sm={4} md={3} lg={3} className="filter-type"> */}
                  <Col xs={24} className="filter-type">
                    Type{" "}
                  </Col>
                  {/* <Col xs={24} sm={7} md={5} lg={4}> */}
                  <Col xs={24} sm={7} md={5} lg={24} className="filter-type">
                    <Checkbox
                      checked={this.state.Free}
                      name="Free"
                      onChange={this.onChange}
                    >
                      Free
                    </Checkbox>
                  </Col>
                  {/* <Col xs={24} sm={7} md={5} lg={4}> */}
                  <Col xs={24} sm={7} md={5} lg={24} className="filter-type">
                    <Checkbox
                      checked={this.state.Paid}
                      name="Paid"
                      onChange={this.onChange}
                    >
                      Paid
                    </Checkbox>
                  </Col>
                </Row>
              </div>
              <div className="filter">
                <Row gutter={8}>
                  {/* <Col xs={24} sm={4} md={3} lg={3} className="filter-type"> */}
                  <Col xs={24} className="filter-type">
                    Skill Level{" "}
                  </Col>
                  <Col xs={24} sm={7} lg={24} className="filter-type">
                    {/* <Col xs={24} sm={7} md={5} lg={4}> */}
                    <Checkbox
                      checked={this.state.Beginner}
                      name="Beginner"
                      onChange={this.onChange}
                    >
                      Beginner
                    </Checkbox>
                  </Col>
                  <Col xs={24} sm={8} lg={24} className="filter-type">
                    {/* <Col xs={24} sm={7} md={5} lg={4}> */}
                    <Checkbox
                      checked={this.state.Intermediate}
                      name="Intermediate"
                      onChange={this.onChange}
                    >
                      Intermediate
                    </Checkbox>
                  </Col>
                  <Col xs={24} sm={8} lg={24} className="filter-type">
                    {/* <Col xs={24} sm={6} md={5} lg={4}> */}
                    <Checkbox
                      checked={this.state.Advanced}
                      name="Advanced"
                      onChange={this.onChange}
                    >
                      Advanced
                    </Checkbox>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
          <Col xs={24} lg={16}>
            <Row>{tutorials}</Row>
          </Col>
        </Row>
      </div>
    );
  }
}

Tutorials.propTypes = {
  tag: PropTypes.object.isRequired,
  tutorial: PropTypes.object.isRequired,
  getTag: PropTypes.func.isRequired,
  getTutorialsByTag: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  tag: state.tag,
  tutorial: state.tutorial,
});

export default connect(mapStateToProps, { getTag, getTutorialsByTag })(
  Tutorials
);
