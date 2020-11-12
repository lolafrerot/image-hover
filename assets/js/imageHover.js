/*!
 * imageHover v1
 * by E-magineurs
 *
 */

// Uses Node, AMD or browser globals to create a module.
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory(require('jquery'));
    } else {
        // Browser globals (root is window)
        root.imageHover = factory(root.jQuery);
    }
}(this, function ($) {

    function imageHover(options) {
        this.init();

        // options
        this.options = $.extend({}, this.constructor.defaults);
        this.option(options);

    }
    imageHover.defaults = {
        element: 'nav',        
        cardContainer: '.card',
        imgContainer: '.img-cont'
    }
    imageHover.prototype.option = function (options) {
        $.extend(this.options, options);
        //console.log(this.options);
    }
    imageHover.prototype.init = function () {
        var self = this;

        $(document).ready(function () {
            self.build();
        });
        
    }
    imageHover.prototype.build = function () {       

        var self = this;
        this.$isOpen = false;  
        
        this.$revealCont = $(self.options.element); 
        this.$revealCont.addClass('imageHover');
        
        this.$imgCont = this.$revealCont.find(self.options.imgContainer);   
        this.$cardCont = this.$revealCont.find(self.options.cardContainer);   
        
        
        this.$imgCont.each(function(){
            $(this).addClass('imageHover-image-container');
        })
        
        this.$cardCont.each(function(){
            let elem = $(this);
            $(this).addClass('imageHover-card-container');
            $(this).on('mouseover', function(e){
                self.displayFirstImage(elem);
            })
            $(this).on('mousemove', function(e){
                self.displayImage(elem, e);
            })
            $(this).on('mouseleave', function(){
                self.hideImage(elem);
                
            })
            $(this).find('a').on('click', function(e){
                e.preventDefault();
                self.changeUrl(elem);
                
            })
        })
        
       
        
    }
    
    imageHover.prototype.displayFirstImage = function (elem, e) {
        let self = this;
        elem.addClass('display');
        let imgCont =  elem.find(self.options.imgContainer);
        let img = imgCont.find('img');
       
        TweenLite.to(img, 0.4, {            
            scale:1
        });
        
    }
    
    imageHover.prototype.changeUrl = function (elem, e) {
        let self = this;
        let imgCont =  elem.find(self.options.imgContainer);
        elem.addClass('clicked');
        TweenLite.to(imgCont, 0.4, {            
            css: {
                position:'fixed',
                left: 0,
                top: 0,
                width:'100%',
                height:'100%'
            }
        });
        
    }
    
    imageHover.prototype.displayImage = function (elem, e) {
        let self = this;
        
        let imgCont =  elem.find(self.options.imgContainer);
        
        let imageWidth = imgCont.find('img').width();
        let imageHeight = imgCont.find('img').height();
        
        
        TweenLite.to(imgCont, 0.4, {            
            css: {
                position:'absolute',
                width:'auto',
                height:'auto',
                left: e.pageX - (imageWidth/2),
                top: e.pageY - (imageHeight/2)
            }
        });
        
    }
    
    imageHover.prototype.hideImage = function (elem) {
        let self = this;
        let imgCont =  elem.find(self.options.imgContainer);
        let img = imgCont.find('img');
        
         TweenLite.to(img, 0.4, {            
            scale:0,
             onComplete:function(){
                 elem.removeClass('display');
                 elem.removeClass('clicked');
             }
        });
        
    }

    return imageHover;
}));
