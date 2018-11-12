define({ 
  goToCategories: function(){
    navToForm("frmCategories");
  },

  onNavigate: function(context) 
  {
    this.imgName = 'shopping_cart.png';
    this.categoryId = 1;
  },

  showCategory: function(){
    let categoryObj = serviceCategory.getById(this.categoryId);
    this.view.txtHistoryCategory.text = categoryObj.name;
    this.view.imgHistoryCategory.src = this.imgName;
  },


  showExpenses: function() {
    let expByCat = serviceTransactions.getByCategoryId(this.categoryId);
    let dates = []; 

    for(let i = 0; i < expByCat.length; i++){
      let day = getDay[expByCat[i].date.getDay()];
      let numDay = expByCat[i].date.getDate().toString();
      let date = getMonth[expByCat[i].date.getMonth()] + ' ' + expByCat[i].date.getFullYear();

      let outerDateKey = expByCat[i].date.getDate() + ' ' + expByCat[i].date.getMonth(); 

      let filtExpByDay = expByCat.filter(value => {
        let innerDateKey = value.date.getDate() + ' ' + value.date.getMonth();
        return outerDateKey == innerDateKey;
      });

      const index = dates.findIndex(daySum => daySum.numDay === numDay && daySum.date === date);
      if(index === -1){
        let amounts = [];
        for(let j = 0; j < filtExpByDay.length; j++){
          amounts.push(filtExpByDay[j].amount);
        }
        let sum = amounts.reduce((prev,curr) => prev + curr);
        dates.push({day: day, numDay: numDay.toString(), date: date, sum: sum.toString()});
      }
    }

    let segHistoryExpense = this.view.segHistoryExpense;
    segHistoryExpense.widgetDataMap = {
      numDay: 'numDay',
      txtDay: 'day',
      txtDate: 'date',
      txtResult: 'sum'
    };
    segHistoryExpense.setData(dates);
  },

  goToHistoryDetails: function(){  
    let transDetails = this.view.segHistoryExpense.selectedRowItems;
    navToForm("frmHistoryDetails", {categoryId: this.categoryId,
                                    date: `${transDetails[0].numDay} ${transDetails[0].date}`});
  }

});