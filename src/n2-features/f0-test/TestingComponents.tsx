import React from 'react'
import SuperButton from '../../n1-main/m1-ui/common/c2-SuperButton/SuperButton'
import SuperInputText from '../../n1-main/m1-ui/common/c1-SuperInputText/SuperInputText'
import SuperCheckbox from '../../n1-main/m1-ui/common/c3-SuperCheckbox/SuperCheckbox'

export const TestingComponents = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
      }}
    >
      <SuperInputText placeholder={'type the text...'} />
      <SuperButton>button</SuperButton>
      <SuperCheckbox />
    </div>
  )
}
