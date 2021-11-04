import React, { useState } from 'react'

import styled from 'styled-components'

const Button = styled.div`
  position: fixed;
  width: 52px;
  left: 50%;
  transform: translateX(-50%);
  bottom: 300px;
  height: 52px;
  font-size: 3rem;
  z-index: 0;
  cursor: pointer;
  box-shadow: 0px 20px 40px #00000029;
  background: #fff;
  border-radius: 180px;
`
const Arrow = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  & img {
    transform: rotate(90deg);
  }
  &::after {
    content: '';
    background-image: url '/images/arrow-back-orange.svg';
    transform: rotate(90deg);
  }
`

const ScrollArrow = () => {
  const [visible, setVisible] = useState(false)

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop
    if (scrolled > 1000) {
      setVisible(true)
    } else if (scrolled <= 1000) {
      setVisible(false)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  window.addEventListener('scroll', toggleVisible)

  return (
    <Button onClick={scrollToTop} style={{ display: visible ? 'inline' : 'none' }}>
      <Arrow>
        <img src='/images/arrow-back-orange.svg' />
      </Arrow>
    </Button>
  )
}

export default ScrollArrow
