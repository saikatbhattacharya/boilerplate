import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Nav, Navbar, NavDropdown, MenuItem } from 'react-bootstrap';
import cookie from 'react-cookie';
import { Link } from 'react-router';
import logo from '../images/logo.png';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { user: cookie.load('user') };
  }

  render() {
    const userIcon = <i className="fa fa-user user-icon" />;
    return (
      <Navbar fixedTop fluid>
        <Navbar.Header>
          <Navbar.Brand>
            <Link className="navbar-brand" to="/">
              <img alt="Nationstar Mortgage Logo" src={logo} />
            </Link>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav pullRight>
          <NavDropdown
            animation={false}
            eventKey={1}
            id="user-dropdown"
            title={userIcon}
          >
            <MenuItem eventKey={1.1}>{this.state.user}</MenuItem>
          </NavDropdown>
        </Nav>
      </Navbar>
    );
  }
}

Header.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(Header);
