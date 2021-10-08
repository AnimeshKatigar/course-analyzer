import React from "react";
import { Layout, Icon, Row, Col } from "antd";
import { Link } from "react-router-dom";

import "../styles/Footer.css";

class Footer extends React.Component {
  render() {
    return (
      <div style={{ filter: "drop-shadow(30px 0px 30px rgba(98, 0, 148, 0.7))" }}>
        <Layout.Footer className="footer">
          <div className="footer-content">
            <Row>
              {/* <Col xs={24} sm={24} md={3} lg={2} className="footer-links">
                <Link to="/">Home</Link>
              </Col>
              <Col xs={24} sm={24} md={18} lg={20} className="footer-links">
                <Link to="/about">About Us</Link>
              </Col> */}
              {/* <Col xs={24} sm={24} md={3} lg={2} className="footer-links github">
							<a
								href="https://github.com/PiyushPawar17/course-catalogue"
								target="_blank"
								rel="noopener noreferrer"
							>
								<Icon type="github" theme="outlined" className="social-icon" />
							</a>
						</Col> */}
            </Row>
          </div>
        </Layout.Footer>
      </div>
    );
  }
}

export default Footer;
