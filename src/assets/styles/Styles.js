import Color from './Color'

const Styles = {
  faq: {
    question: {
      fontSize: '1.75vw',
      color: Color.primary
    },
    answer: {
      fontSize: '1.5vw',
      color: Color.secondary
    }
  },
  AddressForm: {
    Address: {
      color: Color.secondary
    }
  },
  lessonPane: {
    backgroundColor: Color.greenish(0.8),
  },
  pane: {
    height: '100%'
  },
  statusPane: {
    backgroundColor: Color.dark(0.8)
  },
  thirdPane: {
    backgroundColor: Color.black(0.8)
  }
}

export default Styles