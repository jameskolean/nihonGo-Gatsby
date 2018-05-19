import React from 'react'
import Link from 'gatsby-link'
import logo from '../assets/images/logo.svg'
import styled from 'styled-components'
import Img from "gatsby-image";

const HeaderWrapper = styled.div `
  height: 70vh;
  background: blue;
  margin-bottom: 1.45rem;
  overflow: hidden;
  position: relative;
  opacity: 0.8;
  h1 {
    img {
      height: 90px;
    }
  }
`
const HeaderContainer = styled.div `
  position: relative;
  z-index: 2;
  margin: 0 auto;
  max-width: 960px;
  padding: 1.45rem 1.0875rem;
`

const Header = ({ data }) => (
  <HeaderWrapper>
    <HeaderContainer>
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: "white",
            textDecoration: "none"
          }}
        >
          <img src={logo} alt="Niho Go Logo" />
        </Link>
      </h1>
      <p>{data.site.siteMetadata.title}</p>
      <p>{data.site.siteMetadata.desc}</p>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </nav>
    </HeaderContainer>
    <Img 
      style={{
        position:'absolute',
        laft:0,
        top:0,
        width:'100%',
        height:'100%',
      }}
      sizes={data.background.sizes} />
  </HeaderWrapper>
)

export default Header
