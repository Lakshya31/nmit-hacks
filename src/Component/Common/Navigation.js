import React, { Component } from 'react'
import {Navbar,Nav,NavItem,NavbarBrand,NavbarToggler,Collapse,NavLink,Dropdown,DropdownItem,DropdownMenu,DropdownToggle} from "shards-react"
export default class Navigation extends Component {
    render() {
        return (
            <div>
                <Navbar type="dark" theme="primary" expand="md">
        <NavbarBrand href="/">Bus Scheduler</NavbarBrand>
        <NavbarToggler onClick={this.toggleNavbar} />
        <Collapse open={true} navbar>
          <Nav navbar>
            <NavItem>
              <NavLink active href='/path'>
                Path
              </NavLink>
            </NavItem>
            {/* <NavItem>
              <NavLink href="#" disabled>
                Disabled
              </NavLink>
            </NavItem> */}
           
          </Nav>
        </Collapse>
      </Navbar>
            </div>
        )
    }
}
