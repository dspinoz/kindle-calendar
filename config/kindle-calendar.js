module.exports = {

  port: process.env.PORT || 8080,
  
  get: function(req) {
	return {title: 'aaa', current: req.path, pages:[{title:'abc', href:'abc'}]};
  }
}
