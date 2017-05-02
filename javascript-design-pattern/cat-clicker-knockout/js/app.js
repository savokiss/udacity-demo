var ViewModel = function(){
    this.clickCount = ko.observable(0);
    this.nicknames = ['Tom','Jerry','savo','xiaoyan'];
    this.name = ko.observable('Tabby');
    this.imgSrc = ko.observable('img/434164568_fea0ad4013_z.jpg');
    this.imgAttribution = ko.observable('https://www.flickr.com/photos/big');

    this.level = ko.computed(function(){
        return this.clickCount() < 10 ? 'Newborn' : 'Teen';
    }, this);
    this.incrementCounter = function(){
        this.clickCount(this.clickCount()+1);
    }.bind(this);
}
ko.applyBindings(new ViewModel());