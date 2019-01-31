import Axios from 'axios'

const test111 = () => {
  console.log(Axios)
}

const trees = () => {
  console.log('tree-shaking')
}

export default {
  test111,
  trees
}
