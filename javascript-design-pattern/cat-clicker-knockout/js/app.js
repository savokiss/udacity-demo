var Cat = function (options) {
    this.clickCount = ko.observable(options.clickCount);
    this.nicknames = ko.observable(options.nicknames);
    this.name = ko.observable(options.name);
    this.imgSrc = ko.observable(options.imgSrc);
    this.imgAttribution = ko.observable(options.imgAttribution);
    this.level = ko.computed(function () {
        return this.clickCount() < 10 ? 'Newborn' : 'Teen';
    }, this);
}

var ViewModel = function () {
    var self = this;
    this.catList = ko.observableArray([]);
    initialCats.forEach(function (catItem) {
        self.catList.push(new Cat(catItem));
    }.bind(this))
    this.currentCat = ko.observable(this.catList()[0]);

    this.setCat = function(clickedCat) {
        self.currentCat(clickedCat)
    }
    this.incrementCounter = function () {
        this.currentCat().clickCount(this.currentCat().clickCount() + 1);
    }.bind(this) // this的作用域会根据页面中的 with 而变化
}
ko.applyBindings(new ViewModel());