var Cat = function () {
    this.clickCount = ko.observable(0);
    this.nicknames = ['Tom', 'Jerry', 'savo', 'xiaoyan'];
    this.name = ko.observable('Tabby');
    this.imgSrc = ko.observable('img/434164568_fea0ad4013_z.jpg');
    this.imgAttribution = ko.observable('https://www.flickr.com/photos/big');
    this.level = ko.computed(function () {
        return this.clickCount() < 10 ? 'Newborn' : 'Teen';
    }, this);
}

var ViewModel = function () {
    this.currentCat = ko.observable(new Cat());

    this.incrementCounter = function () {
        this.currentCat().clickCount(this.currentCat().clickCount() + 1);
    }.bind(this) // this的作用域会根据页面中的 with 而变化
}
ko.applyBindings(new ViewModel());