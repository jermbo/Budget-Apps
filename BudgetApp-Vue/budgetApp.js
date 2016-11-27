Vue.component('budget-item', {
  template: '#item',
  props: ['id', 'type', 'desc', 'value']
})

var budgetApp = new Vue({
  el: '#budgetApp',
  data: {
    input: {
      desc: '',
      value: ''
    },
    items: [{
      type: 'inc',
      desc: 'Salary',
      value: 4000
    }, {
      type: 'exp',
      desc: 'Car Payment',
      value: 390
    }, {
      type: 'inc',
      desc: 'Garage Sale',
      value: 245.55
    }, {
      type: 'exp',
      desc: 'Entertainment',
      value: 150
    }]
  },
  methods: {
    addItem: function(type) {
      console.log('addItem type : ' + type);
      var item = {
        type: type,
        desc: this.input.desc,
        value: this.input.value
      };
      if (item.value && item.desc) {
        this.items.push(item);
        this.clearDisplay();
      } else {
        alert('gotta fill out the entire form');
      }
    },
    clearDisplay: function() {
      this.input.desc = '';
      this.input.value = '';
    },
    removeItem: function(type, index) {
      return this.items.splice(index, 1);
    },
    getTotal: function(type) {
      var sum = 0;
      this.items.forEach(function(current) {
        if (current.type === type) {
          sum += current.value;
        }
      });
      return sum.toFixed(2);
    }
  },
  computed: {
    monthly: function() {
      return (this.getTotal('inc') - this.getTotal('exp')).toFixed(2);
    },
    currentDay: function() {
      var d = new Date();
      return d.getDate();
    },
    currentMonth: function() {
      var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];

      var d = new Date();
      return monthNames[d.getMonth()];
    },
    expPrecent: function() {
      return (this.getTotal('inc') > 0) ? Math.round((this.getTotal('exp') / this.getTotal('inc')) * 100) + '%' : '---';
    }
  }
})