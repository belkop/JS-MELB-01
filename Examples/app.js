function address() {
    this.street = '123 foo st';
    this.postcode = 3000;
}

address.prototype.country = 'Australia';

var x = new address();

console.log(x);
