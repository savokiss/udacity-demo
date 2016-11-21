/* STUDENTS IGNORE THIS FUNCTION
 * All this does is create an initial
 * attendance record if one is not found
 * within localStorage.
 */
var model = {
    data: {
        'Jason': [],
        'Savo': [],
        'Xiao Li': [],
        'Xiao Ming': [],
        'Xiao Yan': []
    },
    setData(params){
        this.data[params.name][params.index] = params.value;
        this.persist();
    },
    dayTimes: 12,
    persist: function () {
        window.localStorage.setItem('attendance', JSON.stringify(this.data));
    },
    random: function () {
        return (Math.random() >= 0.5);
    },
    init: function () {
        var data = window.localStorage.getItem('attendance');
        if (data) {
            this.data = JSON.parse(data);
        } else {
            for (var i in this.data) {
                for (var j = 0; j < this.dayTimes; j++) {
                    this.data[i].push(this.random());
                }
            }
            this.persist();
        }
    }
}

var tableView = {
    dom: null,
    tHeaderName: null,
    tBody: null,
    rowTemplate: null,
    cellTemplate: null,
    renderHeader: function () {
        var dayTimes = octopus.getDayTimes();
        for (var i = dayTimes; i >= 1; i--) {
            this.tHeaderName.after('<th>' + i + '</th>');
        }
    },
    renderRow: function () {
        this.tBody.html('');
        var data = octopus.getData();
        var self = this;
        for (var i in data) {
            var row = this.rowTemplate.clone();
            row.find('.name-col').html(i);
            for (var j = 0; j < data[i].length; j++) {
                var item = data[i];

                // checkbox
                var cell = this.cellTemplate.clone();
                cell.find('input').prop('checked', item[j]);
                row.find('.missed-col').before(cell);

                // checkbox listener
                cell.find('input').on('change', function(){
                    var input = $(this);
                    var student = input.parent().parent();
                    var nameEle = student.find('.name-col');
                    var colList = student.find('.attend-col');
                    octopus.setData({
                        name: nameEle.html(),
                        index: colList.index(input.parent()),
                        value: input.prop('checked')
                    });
                    self.renderRow();
                });

                // result
                var count = item.filter(function(value){
                    return !value;
                }).length;
                row.find('.missed-col').html(count);
            }
            this.tBody.append(row);
        }
    },
    renderResult: function(){

    },
    init: function () {
        this.dom = $('.table-view')
        this.tHeaderName = $('#t-header-name');
        this.tBody = $('.table-view tbody');
        this.rowTemplate = $($('#row-template').html());
        this.cellTemplate = $($('#cell-template').html());
        this.renderHeader();
        this.renderRow();
    }
}


var octopus = {
    getDayTimes: function () {
        return model.dayTimes;
    },
    getData: function () {
        return model.data;
    },
    setData: function(params){
        model.setData(params);
    },
    init: function () {
        model.init();
        tableView.init();
    }
}

octopus.init();