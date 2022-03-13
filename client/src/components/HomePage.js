import React from "react";
import { Row, Col, message, Input } from "antd";
import { Element } from "react-scroll";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Header from "./Header";
import TagCard from "./TagCard";
import Loader from "./Loader";
import axios from "axios";

import { AiOutlineSearch } from "react-icons/ai";

import { clearSignUp } from "../actions/authActions";
import { getTags } from "../actions/tagActions";
import Footer from "./Footer";

import "../styles/HomePage.css";

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      search: "",
      data: [],
      halfData: [],
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ search: event.target.value });
  }

  componentDidMount() {
    this.props.getTags();
    axios
      .get(
        "https://newsapi.org/v2/everything?language=en&q=online-courses&apiKey=0b329b6724664cf59ecdf60382bb3665"
        // "https://newsapi.org/v2/top-headlines?language=en&category=technology&apiKey=0b329b6724664cf59ecdf60382bb3665"
        // "https://newsapi.org/v2/top-headlines?country=in&category=technology&apiKey=0b329b6724664cf59ecdf60382bb3665"
      )
      .then((res) => {
        let data = res.data.articles;
        this.setState({ data });
        // let halfData=data.articles.slice(2)
        // this.setState({halfData});
        console.log("res", res);
      });

    if (this.props.auth.newSignUp) {
      message.success("Registration Successful, Sign In to continue");
      setTimeout(() => {
        this.props.clearSignUp();
      }, 2000);
    }
  }

  render() {
    let tags;
    if (this.props.tag.loading || !this.props.tag.tags) {
      tags = <Loader />;
    } else {
      if (this.props.tag.tags.length === 0) {
        tags = (
          <div className="nothing-to-show">No tutorials submitted yet</div>
        );
      } else {
        let mainData = this.props.tag.tags;
        const filterData = mainData.filter((data) =>
          data.tag.toLowerCase().includes(this.state.search.toLowerCase())
        );
        if (filterData.length == 0) {
          tags = <div className="nothing-to-show">No tutorials available</div>;
        } else {
          tags = filterData.map((tag, i) => (
            <Col
              key={i}
              sm={{ span: 20, offset: 2 }}
              md={{ span: 10, offset: 1 }}
              xl={{ span: 8, offset: 0 }}
            >
              <TagCard tag={tag} />
            </Col>
          ));
        }
      }
    }

    return (
      <div>
        <div className="home-page">
          <Header />
          <div className="homepage-tags">
            
            <div className="homepage-tags-header">
              <span className="TutsSpan">Domains</span>
            </div>
            <Voice/>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Input
                placeholder="Search..."
                size="large"
                prefix={
                  <AiOutlineSearch
                    color="rgba(255, 255, 255, 0.8)"
                    size="20px"
                  />
                }
                value={this.state.search}
                className="searchInput"
                onChange={this.handleChange}
              />
            </div>
            <Element name="tags">
              <Row gutter={{ sm: 0, md: 4, xl: 8 }}>{tags}</Row>
            </Element>
            <div className="homepage-tags-header">
              <span className="TutsSpan">Latest News</span>
            </div>
            {this.state.data.map((data, i) => {
              if (i < 3)
                return (
                  <div className="outer-news-div">
                    <div
                      onClick={() => {
                        window.open(data.url);
                      }}
                      style={{
                        height: "250px",
                        // width: "28%",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                        cursor: "pointer",
                        backgroundImage: `url(${
                          data.urlToImage
                            ? data.urlToImage
                            : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgu8ZBF1KkGV_ZgL38TodoXzuNhxTnTI9s9w&usqp=CAU"
                        })`,
                        marginBottom: 30,
                      }}
                      className="news-main-div"
                    >
                      <div className="news-title-div">
                        {data.title} - {data.source.name}
                      </div>
                      {/* <img src={data.urlToImage} /> */}
                    </div>
                  </div>
                );
            })}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

HomePage.propTypes = {
  auth: PropTypes.object.isRequired,
  tag: PropTypes.object.isRequired,
  getTags: PropTypes.func.isRequired,
  clearSignUp: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  tag: state.tag,
});

export default connect(mapStateToProps, { clearSignUp, getTags })(HomePage);
