export default {
  data() {
    return {
      priceOpts: [
        {
          label: '不限',
          value: '-1'
        },
        {
          label: '0-100元',
          value: '1'
        },
        {
          label: '100-200元',
          value: '2'
        },
        {
          label: '200-500元',
          value: '3'
        },
        {
          label: '500-1000元',
          value: '4'
        },
      ],
      enumeStatus: {
        1: '正常',
        2: '易损',
        3: '维修',
        4: '报废',
      }
    }
  },
  methods: {
    
  },
  computed: {
    
  }
}