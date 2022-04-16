import React from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import Footer from "./Footer";

import "../styles/Tutorial.css";

class News extends React.Component {
  render() {
    return (
      <div>
        <div className="news-div">
          <div
            className="back-arrow-icon"
            onClick={() => this.props.history.goBack()}
          >
            <IoMdArrowRoundBack color="rgba(255, 255, 255, 1)" size="30px" />
          </div>
          <div className="homepage-tags-header">
            <span className="TutsSpan">Latest News</span>
          </div>
          {window.history.state.state.map((data, i) => {
            return (
              <div className="outer-news-div" key={i}>
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
        {console.log("sd", this.props.history)}
        <Footer />
      </div>
    );
  }
}

export default News;
