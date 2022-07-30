import React from 'react'
import { Row, Col } from 'antd'

const SearchPageTest = () => {
  return (
    <Row>
      <Col span={1} />
      <Col span={22}>
        <div style={{ textAlign: 'center' }}>
          <span style={{ marginTop: '8%' }}>
            <img src={$tools.APP_ICON} width="30px" />
          </span>
          <span style={{ fontSize: '18px' }}>
            {/* <img src={$tools.APP_TEXT} width="110" alt="" /> */}
            JCTV
          </span>
        </div>
      </Col>
      <Col span={1} />
    </Row>
  )
}

export default SearchPageTest
