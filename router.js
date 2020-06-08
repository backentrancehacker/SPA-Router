class Router {
	constructor(target) {
		this.root = '/'
		this.routes = []
		this.target = target
	}
	validate(path) {
		this.routes.forEach(route => {
			if(route.path == path)
				throw new Error(path + ' path already exists.')
		})
	}
	get(path, html) {
		if(!Array.isArray(path)) {
			path = [path]
		}
		for(let piece of path) {
			this.validate(piece)
			this.routes.push({
				path: piece,
				html
			})
		}
		return this
	}
	remove(path) {
		for(let i = 0; i < this.routes.length; i++) {
			let route = this.routes[i]
			if(route.path == path) {
				this.routes.slice(i, 1)
				return this
			}	
		}
		return this
	}
	flush() {
		this.routes = []
		return this
	}
	navigate(path) {
		window.history.pushState(null, null, path)

		this.routes.some(route => {
			let regex = new RegExp(`^${route.path}$`),
				path = window.location.pathname
			
			
			if(path.match(regex)) {
				this.target.innerHTML = route.html
				this.attach()

				window.onpopstate = () => {
					this.start()
					// this.navigate(window.location.pathname)
					// this.attach()
				}
			}
		})

	}
	attach() {
		let anchors = this.target.querySelectorAll('a')
		for(let anchor of anchors) {
			let href = anchor.getAttribute('href')
			if(href.includes('://')) continue
			anchor.addEventListener('click', e => {
				e.preventDefault()
				this.navigate(href)
				return false
			})		
			
		}
	}
	strip(path) {
		if(path[path.length - 1] == '/') 
			return path.replace(/.$/,"")
		else 
			return path
	}
	start() {
		this.navigate(this.strip(window.location.pathname))
	}
}
String.prototype.render = function(json) {
	let altered = this.toString()
	for(let key in json) {
		let regex = new RegExp(`{${key}}`, 'g')
		altered = altered.replace(regex, json[key])
	}
	return altered
}