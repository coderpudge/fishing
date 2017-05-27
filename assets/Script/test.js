var array = [1, 2, 3];
//传统写法
array.forEach(function(v, i, a) {
    console.log("es5",v,i,a);
});
//ES6
array.forEach((v,i,a) => console.log("es6",v,i,a));