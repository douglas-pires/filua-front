import Vue from 'vue'
import { mount } from '@vue/test-utils'
import Vuetify from 'vuetify'
import FiCard from '../../components/fi-card/FiCard'

Vue.use(Vuetify)

describe('FiCard', () => {
  let wrapper
  beforeAll(() => {
    wrapper = mount(FiCard, {
      props: {
        title: 'test',
        subtitle: '',
        text: '',
        src: '',
        minWidth: '',
        maxWidth: '',
        to: '',
        noGradient: ''
      }
    })
  })

  it('should render properly', () => {
    expect(wrapper.exists()).toBeTruthy()
  })
})
