if(process.env.NODE_ENV === 'production' ){
    module.exports = {mongoURI : 'mongodb://Abhi:Knightsandhawk9@ds113375.mlab.com:13375/vidjot-prod'};
}   else {
    module.exports = {mongoURI : 'mongodb://localhost/vidjot-dev'};
}