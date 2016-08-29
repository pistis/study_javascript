var Ball = function(order, color, size) {
    this.order = order;
    this.color = color;
    this.size = size;
    this.sum = 0;
    
    this.getColor = function() {
        return this.color;
    };
    
    this.getSize = function() {
        return this.size;
    };
    
    this.setSum = function(sum){
        this.sum = sum;
    };
    
    this.toString = function() {
        return "order["+this.order+"], color["+this.color+"], size["+this.size+"], sum["+this.sum+"]"
    }
};

module.exports = Ball;