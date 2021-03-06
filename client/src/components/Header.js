import React from "react";
import { Icon } from "antd";
import { scroller } from "react-scroll";

import "../styles/Header.css";

class Header extends React.Component {
  scroll() {
    scroller.scrollTo("tags", {
      duration: 1000,
      smooth: true,
    });
  }

  render() {
    return (
      <div className="header-wrap">
        <header className="header">
          <h1 className="heading">
            <span className="courseText">Course</span> Analyzer
          </h1>
          <p className="header-description">
            The best place to find online tutorials.
          </p>
          <div className="scroll-down">
            <div>Explore Courses</div>
            <div className="icon-wrapper">
              <Icon
                type="double-right"
                theme="outlined"
                className="scroll-down-icon"
                onClick={this.scroll}
              />
            </div>
          </div>
        </header>
      </div>
    );
  }
}

export default Header;
