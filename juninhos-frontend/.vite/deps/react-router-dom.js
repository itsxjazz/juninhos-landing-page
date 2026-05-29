import { require_react_dom } from "./chunk-HCGKX5ED.js"
import { require_react } from "./chunk-WNPTCGAH.js"
import { __commonJS, __toESM } from "./chunk-5WRI5ZAA.js"

// node_modules/cookie/dist/index.js
var require_dist = __commonJS({
	"node_modules/cookie/dist/index.js"(exports) {
		Object.defineProperty(exports, "__esModule", { value: true })
		exports.parseCookie = parseCookie
		exports.parse = parseCookie
		exports.stringifyCookie = stringifyCookie
		exports.stringifySetCookie = stringifySetCookie
		exports.serialize = stringifySetCookie
		exports.parseSetCookie = parseSetCookie
		exports.stringifySetCookie = stringifySetCookie
		exports.serialize = stringifySetCookie
		var cookieNameRegExp = /^[\u0021-\u003A\u003C\u003E-\u007E]+$/
		var cookieValueRegExp = /^[\u0021-\u003A\u003C-\u007E]*$/
		var domainValueRegExp =
			/^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i
		var pathValueRegExp = /^[\u0020-\u003A\u003D-\u007E]*$/
		var maxAgeRegExp = /^-?\d+$/
		var __toString = Object.prototype.toString
		var NullObject = (() => {
			const C = () => {}
			C.prototype = /* @__PURE__ */ Object.create(null)
			return C
		})()
		function parseCookie(str, options) {
			const obj = new NullObject()
			const len = str.length
			if (len < 2) return obj
			const dec = (options == null ? void 0 : options.decode) || decode2
			let index = 0
			do {
				const eqIdx = eqIndex(str, index, len)
				if (eqIdx === -1) break
				const endIdx = endIndex(str, index, len)
				if (eqIdx > endIdx) {
					index = str.lastIndexOf(";", eqIdx - 1) + 1
					continue
				}
				const key = valueSlice(str, index, eqIdx)
				if (obj[key] === void 0) {
					obj[key] = dec(valueSlice(str, eqIdx + 1, endIdx))
				}
				index = endIdx + 1
			} while (index < len)
			return obj
		}
		function stringifyCookie(cookie, options) {
			const enc = (options == null ? void 0 : options.encode) || encodeURIComponent
			const cookieStrings = []
			for (const name of Object.keys(cookie)) {
				const val = cookie[name]
				if (val === void 0) continue
				if (!cookieNameRegExp.test(name)) {
					throw new TypeError(`cookie name is invalid: ${name}`)
				}
				const value = enc(val)
				if (!cookieValueRegExp.test(value)) {
					throw new TypeError(`cookie val is invalid: ${val}`)
				}
				cookieStrings.push(`${name}=${value}`)
			}
			return cookieStrings.join("; ")
		}
		function stringifySetCookie(_name, _val, _opts) {
			const cookie =
				typeof _name === "object" ? _name : { ..._opts, name: _name, value: String(_val) }
			const options = typeof _val === "object" ? _val : _opts
			const enc = (options == null ? void 0 : options.encode) || encodeURIComponent
			if (!cookieNameRegExp.test(cookie.name)) {
				throw new TypeError(`argument name is invalid: ${cookie.name}`)
			}
			const value = cookie.value ? enc(cookie.value) : ""
			if (!cookieValueRegExp.test(value)) {
				throw new TypeError(`argument val is invalid: ${cookie.value}`)
			}
			let str = cookie.name + "=" + value
			if (cookie.maxAge !== void 0) {
				if (!Number.isInteger(cookie.maxAge)) {
					throw new TypeError(`option maxAge is invalid: ${cookie.maxAge}`)
				}
				str += "; Max-Age=" + cookie.maxAge
			}
			if (cookie.domain) {
				if (!domainValueRegExp.test(cookie.domain)) {
					throw new TypeError(`option domain is invalid: ${cookie.domain}`)
				}
				str += "; Domain=" + cookie.domain
			}
			if (cookie.path) {
				if (!pathValueRegExp.test(cookie.path)) {
					throw new TypeError(`option path is invalid: ${cookie.path}`)
				}
				str += "; Path=" + cookie.path
			}
			if (cookie.expires) {
				if (!isDate(cookie.expires) || !Number.isFinite(cookie.expires.valueOf())) {
					throw new TypeError(`option expires is invalid: ${cookie.expires}`)
				}
				str += "; Expires=" + cookie.expires.toUTCString()
			}
			if (cookie.httpOnly) {
				str += "; HttpOnly"
			}
			if (cookie.secure) {
				str += "; Secure"
			}
			if (cookie.partitioned) {
				str += "; Partitioned"
			}
			if (cookie.priority) {
				const priority =
					typeof cookie.priority === "string" ? cookie.priority.toLowerCase() : void 0
				switch (priority) {
					case "low":
						str += "; Priority=Low"
						break
					case "medium":
						str += "; Priority=Medium"
						break
					case "high":
						str += "; Priority=High"
						break
					default:
						throw new TypeError(`option priority is invalid: ${cookie.priority}`)
				}
			}
			if (cookie.sameSite) {
				const sameSite =
					typeof cookie.sameSite === "string" ? cookie.sameSite.toLowerCase() : cookie.sameSite
				switch (sameSite) {
					case true:
					case "strict":
						str += "; SameSite=Strict"
						break
					case "lax":
						str += "; SameSite=Lax"
						break
					case "none":
						str += "; SameSite=None"
						break
					default:
						throw new TypeError(`option sameSite is invalid: ${cookie.sameSite}`)
				}
			}
			return str
		}
		function parseSetCookie(str, options) {
			const dec = (options == null ? void 0 : options.decode) || decode2
			const len = str.length
			const endIdx = endIndex(str, 0, len)
			const eqIdx = eqIndex(str, 0, endIdx)
			const setCookie =
				eqIdx === -1
					? { name: "", value: dec(valueSlice(str, 0, endIdx)) }
					: {
							name: valueSlice(str, 0, eqIdx),
							value: dec(valueSlice(str, eqIdx + 1, endIdx)),
						}
			let index = endIdx + 1
			while (index < len) {
				const endIdx2 = endIndex(str, index, len)
				const eqIdx2 = eqIndex(str, index, endIdx2)
				const attr =
					eqIdx2 === -1 ? valueSlice(str, index, endIdx2) : valueSlice(str, index, eqIdx2)
				const val = eqIdx2 === -1 ? void 0 : valueSlice(str, eqIdx2 + 1, endIdx2)
				switch (attr.toLowerCase()) {
					case "httponly":
						setCookie.httpOnly = true
						break
					case "secure":
						setCookie.secure = true
						break
					case "partitioned":
						setCookie.partitioned = true
						break
					case "domain":
						setCookie.domain = val
						break
					case "path":
						setCookie.path = val
						break
					case "max-age":
						if (val && maxAgeRegExp.test(val)) setCookie.maxAge = Number(val)
						break
					case "expires": {
						if (!val) break
						const date = new Date(val)
						if (Number.isFinite(date.valueOf())) setCookie.expires = date
						break
					}
					case "priority": {
						if (!val) break
						const priority = val.toLowerCase()
						if (priority === "low" || priority === "medium" || priority === "high") {
							setCookie.priority = priority
						}
						break
					}
					case "samesite": {
						if (!val) break
						const sameSite = val.toLowerCase()
						if (sameSite === "lax" || sameSite === "strict" || sameSite === "none") {
							setCookie.sameSite = sameSite
						}
						break
					}
				}
				index = endIdx2 + 1
			}
			return setCookie
		}
		function endIndex(str, min, len) {
			const index = str.indexOf(";", min)
			return index === -1 ? len : index
		}
		function eqIndex(str, min, max) {
			const index = str.indexOf("=", min)
			return index < max ? index : -1
		}
		function valueSlice(str, min, max) {
			let start = min
			let end = max
			do {
				const code = str.charCodeAt(start)
				if (code !== 32 && code !== 9) break
			} while (++start < end)
			while (end > start) {
				const code = str.charCodeAt(end - 1)
				if (code !== 32 && code !== 9) break
				end--
			}
			return str.slice(start, end)
		}
		function decode2(str) {
			if (str.indexOf("%") === -1) return str
			try {
				return decodeURIComponent(str)
			} catch (e) {
				return str
			}
		}
		function isDate(val) {
			return __toString.call(val) === "[object Date]"
		}
	},
})

// node_modules/set-cookie-parser/lib/set-cookie.js
var require_set_cookie = __commonJS({
	"node_modules/set-cookie-parser/lib/set-cookie.js"(exports, module) {
		var defaultParseOptions = {
			decodeValues: true,
			map: false,
			silent: false,
		}
		function isForbiddenKey(key) {
			return typeof key !== "string" || key in {}
		}
		function createNullObj() {
			return /* @__PURE__ */ Object.create(null)
		}
		function isNonEmptyString(str) {
			return typeof str === "string" && !!str.trim()
		}
		function parseString(setCookieValue, options) {
			var parts = setCookieValue.split(";").filter(isNonEmptyString)
			var nameValuePairStr = parts.shift()
			var parsed = parseNameValuePair(nameValuePairStr)
			var name = parsed.name
			var value = parsed.value
			options = options ? Object.assign({}, defaultParseOptions, options) : defaultParseOptions
			if (isForbiddenKey(name)) {
				return null
			}
			try {
				value = options.decodeValues ? decodeURIComponent(value) : value
			} catch (e) {
				console.error(
					"set-cookie-parser: failed to decode cookie value. Set options.decodeValues=false to disable decoding.",
					e,
				)
			}
			var cookie = createNullObj()
			cookie.name = name
			cookie.value = value
			parts.forEach(part => {
				var sides = part.split("=")
				var key = sides.shift().trimLeft().toLowerCase()
				if (isForbiddenKey(key)) {
					return
				}
				var value2 = sides.join("=")
				if (key === "expires") {
					cookie.expires = new Date(value2)
				} else if (key === "max-age") {
					var n = parseInt(value2, 10)
					if (!Number.isNaN(n)) cookie.maxAge = n
				} else if (key === "secure") {
					cookie.secure = true
				} else if (key === "httponly") {
					cookie.httpOnly = true
				} else if (key === "samesite") {
					cookie.sameSite = value2
				} else if (key === "partitioned") {
					cookie.partitioned = true
				} else if (key) {
					cookie[key] = value2
				}
			})
			return cookie
		}
		function parseNameValuePair(nameValuePairStr) {
			var name = ""
			var value = ""
			var nameValueArr = nameValuePairStr.split("=")
			if (nameValueArr.length > 1) {
				name = nameValueArr.shift()
				value = nameValueArr.join("=")
			} else {
				value = nameValuePairStr
			}
			return { name, value }
		}
		function parse2(input, options) {
			options = options ? Object.assign({}, defaultParseOptions, options) : defaultParseOptions
			if (!input) {
				if (!options.map) {
					return []
				} else {
					return createNullObj()
				}
			}
			if (input.headers) {
				if (typeof input.headers.getSetCookie === "function") {
					input = input.headers.getSetCookie()
				} else if (input.headers["set-cookie"]) {
					input = input.headers["set-cookie"]
				} else {
					var sch =
						input.headers[
							Object.keys(input.headers).find(key => key.toLowerCase() === "set-cookie")
						]
					if (!sch && input.headers.cookie && !options.silent) {
						console.warn(
							"Warning: set-cookie-parser appears to have been called on a request object. It is designed to parse Set-Cookie headers from responses, not Cookie headers from requests. Set the option {silent: true} to suppress this warning.",
						)
					}
					input = sch
				}
			}
			if (!Array.isArray(input)) {
				input = [input]
			}
			if (!options.map) {
				return input
					.filter(isNonEmptyString)
					.map(str => parseString(str, options))
					.filter(Boolean)
			} else {
				var cookies = createNullObj()
				return input.filter(isNonEmptyString).reduce((cookies2, str) => {
					var cookie = parseString(str, options)
					if (cookie && !isForbiddenKey(cookie.name)) {
						cookies2[cookie.name] = cookie
					}
					return cookies2
				}, cookies)
			}
		}
		function splitCookiesString2(cookiesString) {
			if (Array.isArray(cookiesString)) {
				return cookiesString
			}
			if (typeof cookiesString !== "string") {
				return []
			}
			var cookiesStrings = []
			var pos = 0
			var start
			var ch
			var lastComma
			var nextStart
			var cookiesSeparatorFound
			function skipWhitespace() {
				while (pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))) {
					pos += 1
				}
				return pos < cookiesString.length
			}
			function notSpecialChar() {
				ch = cookiesString.charAt(pos)
				return ch !== "=" && ch !== ";" && ch !== ","
			}
			while (pos < cookiesString.length) {
				start = pos
				cookiesSeparatorFound = false
				while (skipWhitespace()) {
					ch = cookiesString.charAt(pos)
					if (ch === ",") {
						lastComma = pos
						pos += 1
						skipWhitespace()
						nextStart = pos
						while (pos < cookiesString.length && notSpecialChar()) {
							pos += 1
						}
						if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
							cookiesSeparatorFound = true
							pos = nextStart
							cookiesStrings.push(cookiesString.substring(start, lastComma))
							start = pos
						} else {
							pos = lastComma + 1
						}
					} else {
						pos += 1
					}
				}
				if (!cookiesSeparatorFound || pos >= cookiesString.length) {
					cookiesStrings.push(cookiesString.substring(start, cookiesString.length))
				}
			}
			return cookiesStrings
		}
		module.exports = parse2
		module.exports.parse = parse2
		module.exports.parseString = parseString
		module.exports.splitCookiesString = splitCookiesString2
	},
})

// node_modules/react-router/dist/development/chunk-5KNZJZUH.mjs
var React = __toESM(require_react(), 1)
var React2 = __toESM(require_react(), 1)
var React3 = __toESM(require_react(), 1)
var React4 = __toESM(require_react(), 1)
var React9 = __toESM(require_react(), 1)
var React8 = __toESM(require_react(), 1)
var React7 = __toESM(require_react(), 1)
var React6 = __toESM(require_react(), 1)
var React5 = __toESM(require_react(), 1)
var React10 = __toESM(require_react(), 1)
var React11 = __toESM(require_react(), 1)
var __typeError = msg => {
	throw TypeError(msg)
}
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg)
var __privateGet = (obj, member, getter) => (
	__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj)
)
var __privateAdd = (obj, member, value) =>
	member.has(obj)
		? __typeError("Cannot add the same private member more than once")
		: member instanceof WeakSet
			? member.add(obj)
			: member.set(obj, value)
var __privateSet = (obj, member, value, setter) => (
	__accessCheck(obj, member, "write to private field"),
	setter ? setter.call(obj, value) : member.set(obj, value),
	value
)
var Action = (Action2 => {
	Action2["Pop"] = "POP"
	Action2["Push"] = "PUSH"
	Action2["Replace"] = "REPLACE"
	return Action2
})(Action || {})
var PopStateEventType = "popstate"
function isLocation(obj) {
	return (
		typeof obj === "object" &&
		obj != null &&
		"pathname" in obj &&
		"search" in obj &&
		"hash" in obj &&
		"state" in obj &&
		"key" in obj
	)
}
function createMemoryHistory(options = {}) {
	const { initialEntries = ["/"], initialIndex, v5Compat = false } = options
	let entries
	entries = initialEntries.map((entry, index2) =>
		createMemoryLocation(
			entry,
			typeof entry === "string" ? null : entry.state,
			index2 === 0 ? "default" : void 0,
			typeof entry === "string" ? void 0 : entry.mask,
		),
	)
	let index = clampIndex(initialIndex == null ? entries.length - 1 : initialIndex)
	let action = "POP"
	let listener = null
	function clampIndex(n) {
		return Math.min(Math.max(n, 0), entries.length - 1)
	}
	function getCurrentLocation() {
		return entries[index]
	}
	function createMemoryLocation(to, state = null, key, mask) {
		const location2 = createLocation(
			entries ? getCurrentLocation().pathname : "/",
			to,
			state,
			key,
			mask,
		)
		warning(
			location2.pathname.charAt(0) === "/",
			`relative pathnames are not supported in memory history: ${JSON.stringify(to)}`,
		)
		return location2
	}
	function createHref2(to) {
		return typeof to === "string" ? to : createPath(to)
	}
	const history = {
		get index() {
			return index
		},
		get action() {
			return action
		},
		get location() {
			return getCurrentLocation()
		},
		createHref: createHref2,
		createURL(to) {
			return new URL(createHref2(to), "http://localhost")
		},
		encodeLocation(to) {
			const path = typeof to === "string" ? parsePath(to) : to
			return {
				pathname: path.pathname || "",
				search: path.search || "",
				hash: path.hash || "",
			}
		},
		push(to, state) {
			action = "PUSH"
			const nextLocation = isLocation(to) ? to : createMemoryLocation(to, state)
			index += 1
			entries.splice(index, entries.length, nextLocation)
			if (v5Compat && listener) {
				listener({ action, location: nextLocation, delta: 1 })
			}
		},
		replace(to, state) {
			action = "REPLACE"
			const nextLocation = isLocation(to) ? to : createMemoryLocation(to, state)
			entries[index] = nextLocation
			if (v5Compat && listener) {
				listener({ action, location: nextLocation, delta: 0 })
			}
		},
		go(delta) {
			action = "POP"
			const nextIndex = clampIndex(index + delta)
			const nextLocation = entries[nextIndex]
			index = nextIndex
			if (listener) {
				listener({ action, location: nextLocation, delta })
			}
		},
		listen(fn) {
			listener = fn
			return () => {
				listener = null
			}
		},
	}
	return history
}
function createBrowserHistory(options = {}) {
	function createBrowserLocation(window2, globalHistory) {
		var _a
		const maskedLocation = (_a = globalHistory.state) == null ? void 0 : _a.masked
		const { pathname, search, hash } = maskedLocation || window2.location
		return createLocation(
			"",
			{ pathname, search, hash },
			// state defaults to `null` because `window.history.state` does
			(globalHistory.state && globalHistory.state.usr) || null,
			(globalHistory.state && globalHistory.state.key) || "default",
			maskedLocation
				? {
						pathname: window2.location.pathname,
						search: window2.location.search,
						hash: window2.location.hash,
					}
				: void 0,
		)
	}
	function createBrowserHref(window2, to) {
		return typeof to === "string" ? to : createPath(to)
	}
	return getUrlBasedHistory(createBrowserLocation, createBrowserHref, null, options)
}
function createHashHistory(options = {}) {
	function createHashLocation(window2, globalHistory) {
		let { pathname = "/", search = "", hash = "" } = parsePath(window2.location.hash.substring(1))
		if (!pathname.startsWith("/") && !pathname.startsWith(".")) {
			pathname = "/" + pathname
		}
		return createLocation(
			"",
			{ pathname, search, hash },
			// state defaults to `null` because `window.history.state` does
			(globalHistory.state && globalHistory.state.usr) || null,
			(globalHistory.state && globalHistory.state.key) || "default",
		)
	}
	function createHashHref(window2, to) {
		const base = window2.document.querySelector("base")
		let href2 = ""
		if (base && base.getAttribute("href")) {
			const url = window2.location.href
			const hashIndex = url.indexOf("#")
			href2 = hashIndex === -1 ? url : url.slice(0, hashIndex)
		}
		return href2 + "#" + (typeof to === "string" ? to : createPath(to))
	}
	function validateHashLocation(location2, to) {
		warning(
			location2.pathname.charAt(0) === "/",
			`relative pathnames are not supported in hash history.push(${JSON.stringify(to)})`,
		)
	}
	return getUrlBasedHistory(createHashLocation, createHashHref, validateHashLocation, options)
}
function invariant(value, message) {
	if (value === false || value === null || typeof value === "undefined") {
		throw new Error(message)
	}
}
function warning(cond, message) {
	if (!cond) {
		if (typeof console !== "undefined") console.warn(message)
		try {
			throw new Error(message)
		} catch (e) {}
	}
}
function createKey() {
	return Math.random().toString(36).substring(2, 10)
}
function getHistoryState(location2, index) {
	return {
		usr: location2.state,
		key: location2.key,
		idx: index,
		masked: location2.mask
			? {
					pathname: location2.pathname,
					search: location2.search,
					hash: location2.hash,
				}
			: void 0,
	}
}
function createLocation(current, to, state = null, key, mask) {
	const location2 = {
		pathname: typeof current === "string" ? current : current.pathname,
		search: "",
		hash: "",
		...(typeof to === "string" ? parsePath(to) : to),
		state,
		// TODO: This could be cleaned up.  push/replace should probably just take
		// full Locations now and avoid the need to run through this flow at all
		// But that's a pretty big refactor to the current test suite so going to
		// keep as is for the time being and just let any incoming keys take precedence
		key: (to && to.key) || key || createKey(),
		mask,
	}
	return location2
}
function createPath({ pathname = "/", search = "", hash = "" }) {
	if (search && search !== "?") pathname += search.charAt(0) === "?" ? search : "?" + search
	if (hash && hash !== "#") pathname += hash.charAt(0) === "#" ? hash : "#" + hash
	return pathname
}
function parsePath(path) {
	const parsedPath = {}
	if (path) {
		const hashIndex = path.indexOf("#")
		if (hashIndex >= 0) {
			parsedPath.hash = path.substring(hashIndex)
			path = path.substring(0, hashIndex)
		}
		const searchIndex = path.indexOf("?")
		if (searchIndex >= 0) {
			parsedPath.search = path.substring(searchIndex)
			path = path.substring(0, searchIndex)
		}
		if (path) {
			parsedPath.pathname = path
		}
	}
	return parsedPath
}
function getUrlBasedHistory(getLocation, createHref2, validateLocation, options = {}) {
	const { window: window2 = document.defaultView, v5Compat = false } = options
	const globalHistory = window2.history
	let action = "POP"
	let listener = null
	let index = getIndex()
	if (index == null) {
		index = 0
		globalHistory.replaceState({ ...globalHistory.state, idx: index }, "")
	}
	function getIndex() {
		const state = globalHistory.state || { idx: null }
		return state.idx
	}
	function handlePop() {
		action = "POP"
		const nextIndex = getIndex()
		const delta = nextIndex == null ? null : nextIndex - index
		index = nextIndex
		if (listener) {
			listener({ action, location: history.location, delta })
		}
	}
	function push(to, state) {
		action = "PUSH"
		const location2 = isLocation(to) ? to : createLocation(history.location, to, state)
		if (validateLocation) validateLocation(location2, to)
		index = getIndex() + 1
		const historyState = getHistoryState(location2, index)
		const url = history.createHref(location2.mask || location2)
		try {
			globalHistory.pushState(historyState, "", url)
		} catch (error) {
			if (error instanceof DOMException && error.name === "DataCloneError") {
				throw error
			}
			window2.location.assign(url)
		}
		if (v5Compat && listener) {
			listener({ action, location: history.location, delta: 1 })
		}
	}
	function replace2(to, state) {
		action = "REPLACE"
		const location2 = isLocation(to) ? to : createLocation(history.location, to, state)
		if (validateLocation) validateLocation(location2, to)
		index = getIndex()
		const historyState = getHistoryState(location2, index)
		const url = history.createHref(location2.mask || location2)
		globalHistory.replaceState(historyState, "", url)
		if (v5Compat && listener) {
			listener({ action, location: history.location, delta: 0 })
		}
	}
	function createURL(to) {
		return createBrowserURLImpl(to)
	}
	const history = {
		get action() {
			return action
		},
		get location() {
			return getLocation(window2, globalHistory)
		},
		listen(fn) {
			if (listener) {
				throw new Error("A history only accepts one active listener")
			}
			window2.addEventListener(PopStateEventType, handlePop)
			listener = fn
			return () => {
				window2.removeEventListener(PopStateEventType, handlePop)
				listener = null
			}
		},
		createHref(to) {
			return createHref2(window2, to)
		},
		createURL,
		encodeLocation(to) {
			const url = createURL(to)
			return {
				pathname: url.pathname,
				search: url.search,
				hash: url.hash,
			}
		},
		push,
		replace: replace2,
		go(n) {
			return globalHistory.go(n)
		},
	}
	return history
}
function createBrowserURLImpl(to, isAbsolute = false) {
	let base = "http://localhost"
	if (typeof window !== "undefined") {
		base = window.location.origin !== "null" ? window.location.origin : window.location.href
	}
	invariant(base, "No window.location.(origin|href) available to create URL")
	let href2 = typeof to === "string" ? to : createPath(to)
	href2 = href2.replace(/ $/, "%20")
	if (!isAbsolute && href2.startsWith("//")) {
		href2 = base + href2
	}
	return new URL(href2, base)
}
function createContext4(defaultValue) {
	return { defaultValue }
}
var _map
var RouterContextProvider = class {
	/**
	 * Create a new `RouterContextProvider` instance
	 * @param init An optional initial context map to populate the provider with
	 */
	constructor(init) {
		__privateAdd(this, _map, /* @__PURE__ */ new Map())
		if (init) {
			for (const [context, value] of init) {
				this.set(context, value)
			}
		}
	}
	/**
	 * Access a value from the context. If no value has been set for the context,
	 * it will return the context's `defaultValue` if provided, or throw an error
	 * if no `defaultValue` was set.
	 * @param context The context to get the value for
	 * @returns The value for the context, or the context's `defaultValue` if no
	 * value was set
	 */
	get(context) {
		if (__privateGet(this, _map).has(context)) {
			return __privateGet(this, _map).get(context)
		}
		if (context.defaultValue !== void 0) {
			return context.defaultValue
		}
		throw new Error("No value found for context")
	}
	/**
	 * Set a value for the context. If the context already has a value set, this
	 * will overwrite it.
	 *
	 * @param context The context to set the value for
	 * @param value The value to set for the context
	 * @returns {void}
	 */
	set(context, value) {
		__privateGet(this, _map).set(context, value)
	}
}
_map = /* @__PURE__ */ new WeakMap()
var unsupportedLazyRouteObjectKeys = /* @__PURE__ */ new Set([
	"lazy",
	"caseSensitive",
	"path",
	"id",
	"index",
	"children",
])
function isUnsupportedLazyRouteObjectKey(key) {
	return unsupportedLazyRouteObjectKeys.has(key)
}
var unsupportedLazyRouteFunctionKeys = /* @__PURE__ */ new Set([
	"lazy",
	"caseSensitive",
	"path",
	"id",
	"index",
	"middleware",
	"children",
])
function isUnsupportedLazyRouteFunctionKey(key) {
	return unsupportedLazyRouteFunctionKeys.has(key)
}
function isIndexRoute(route) {
	return route.index === true
}
function convertRoutesToDataRoutes(
	routes,
	mapRouteProperties2,
	parentPath = [],
	manifest = {},
	allowInPlaceMutations = false,
) {
	return routes.map((route, index) => {
		const treePath = [...parentPath, String(index)]
		const id = typeof route.id === "string" ? route.id : treePath.join("-")
		invariant(route.index !== true || !route.children, `Cannot specify children on an index route`)
		invariant(
			allowInPlaceMutations || !manifest[id],
			`Found a route id collision on id "${id}".  Route id's must be globally unique within Data Router usages`,
		)
		if (isIndexRoute(route)) {
			const indexRoute = {
				...route,
				id,
			}
			manifest[id] = mergeRouteUpdates(indexRoute, mapRouteProperties2(indexRoute))
			return indexRoute
		} else {
			const pathOrLayoutRoute = {
				...route,
				id,
				children: void 0,
			}
			manifest[id] = mergeRouteUpdates(pathOrLayoutRoute, mapRouteProperties2(pathOrLayoutRoute))
			if (route.children) {
				pathOrLayoutRoute.children = convertRoutesToDataRoutes(
					route.children,
					mapRouteProperties2,
					treePath,
					manifest,
					allowInPlaceMutations,
				)
			}
			return pathOrLayoutRoute
		}
	})
}
function mergeRouteUpdates(route, updates) {
	return Object.assign(route, {
		...updates,
		...(typeof updates.lazy === "object" && updates.lazy != null
			? {
					lazy: {
						...route.lazy,
						...updates.lazy,
					},
				}
			: {}),
	})
}
function matchRoutes(routes, locationArg, basename = "/") {
	return matchRoutesImpl(routes, locationArg, basename, false)
}
function matchRoutesImpl(routes, locationArg, basename, allowPartial, precomputedBranches) {
	const location2 = typeof locationArg === "string" ? parsePath(locationArg) : locationArg
	const pathname = stripBasename(location2.pathname || "/", basename)
	if (pathname == null) {
		return null
	}
	const branches = precomputedBranches ?? flattenAndRankRoutes(routes)
	let matches = null
	const decoded = decodePath(pathname)
	for (let i = 0; matches == null && i < branches.length; ++i) {
		matches = matchRouteBranch(branches[i], decoded, allowPartial)
	}
	return matches
}
function convertRouteMatchToUiMatch(match, loaderData) {
	const { route, pathname, params } = match
	return {
		id: route.id,
		pathname,
		params,
		data: loaderData[route.id],
		loaderData: loaderData[route.id],
		handle: route.handle,
	}
}
function flattenAndRankRoutes(routes) {
	const branches = flattenRoutes(routes)
	rankRouteBranches(branches)
	return branches
}
function flattenRoutes(
	routes,
	branches = [],
	parentsMeta = [],
	parentPath = "",
	_hasParentOptionalSegments = false,
) {
	const flattenRoute = (
		route,
		index,
		hasParentOptionalSegments = _hasParentOptionalSegments,
		relativePath,
	) => {
		const meta = {
			relativePath: relativePath === void 0 ? route.path || "" : relativePath,
			caseSensitive: route.caseSensitive === true,
			childrenIndex: index,
			route,
		}
		if (meta.relativePath.startsWith("/")) {
			if (!meta.relativePath.startsWith(parentPath) && hasParentOptionalSegments) {
				return
			}
			invariant(
				meta.relativePath.startsWith(parentPath),
				`Absolute route path "${meta.relativePath}" nested under path "${parentPath}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`,
			)
			meta.relativePath = meta.relativePath.slice(parentPath.length)
		}
		const path = joinPaths([parentPath, meta.relativePath])
		const routesMeta = parentsMeta.concat(meta)
		if (route.children && route.children.length > 0) {
			invariant(
				// Our types know better, but runtime JS may not!
				// @ts-expect-error
				route.index !== true,
				`Index routes must not have child routes. Please remove all child routes from route path "${path}".`,
			)
			flattenRoutes(route.children, branches, routesMeta, path, hasParentOptionalSegments)
		}
		if (route.path == null && !route.index) {
			return
		}
		branches.push({
			path,
			score: computeScore(path, route.index),
			routesMeta,
		})
	}
	routes.forEach((route, index) => {
		var _a
		if (route.path === "" || !((_a = route.path) == null ? void 0 : _a.includes("?"))) {
			flattenRoute(route, index)
		} else {
			for (const exploded of explodeOptionalSegments(route.path)) {
				flattenRoute(route, index, true, exploded)
			}
		}
	})
	return branches
}
function explodeOptionalSegments(path) {
	const segments = path.split("/")
	if (segments.length === 0) return []
	const [first, ...rest] = segments
	const isOptional = first.endsWith("?")
	const required = first.replace(/\?$/, "")
	if (rest.length === 0) {
		return isOptional ? [required, ""] : [required]
	}
	const restExploded = explodeOptionalSegments(rest.join("/"))
	const result = []
	result.push(
		...restExploded.map(subpath => (subpath === "" ? required : [required, subpath].join("/"))),
	)
	if (isOptional) {
		result.push(...restExploded)
	}
	return result.map(exploded => (path.startsWith("/") && exploded === "" ? "/" : exploded))
}
function rankRouteBranches(branches) {
	branches.sort((a, b) =>
		a.score !== b.score
			? b.score - a.score
			: compareIndexes(
					a.routesMeta.map(meta => meta.childrenIndex),
					b.routesMeta.map(meta => meta.childrenIndex),
				),
	)
}
var paramRe = /^:[\w-]+$/
var dynamicSegmentValue = 3
var indexRouteValue = 2
var emptySegmentValue = 1
var staticSegmentValue = 10
var splatPenalty = -2
var isSplat = s => s === "*"
function computeScore(path, index) {
	const segments = path.split("/")
	let initialScore = segments.length
	if (segments.some(isSplat)) {
		initialScore += splatPenalty
	}
	if (index) {
		initialScore += indexRouteValue
	}
	return segments
		.filter(s => !isSplat(s))
		.reduce(
			(score, segment) =>
				score +
				(paramRe.test(segment)
					? dynamicSegmentValue
					: segment === ""
						? emptySegmentValue
						: staticSegmentValue),
			initialScore,
		)
}
function compareIndexes(a, b) {
	const siblings = a.length === b.length && a.slice(0, -1).every((n, i) => n === b[i])
	return siblings
		? // If two routes are siblings, we should try to match the earlier sibling
			// first. This allows people to have fine-grained control over the matching
			// behavior by simply putting routes with identical paths in the order they
			// want them tried.
			a[a.length - 1] - b[b.length - 1]
		: // Otherwise, it doesn't really make sense to rank non-siblings by index,
			// so they sort equally.
			0
}
function matchRouteBranch(branch, pathname, allowPartial = false) {
	const { routesMeta } = branch
	const matchedParams = {}
	let matchedPathname = "/"
	const matches = []
	for (let i = 0; i < routesMeta.length; ++i) {
		const meta = routesMeta[i]
		const end = i === routesMeta.length - 1
		const remainingPathname =
			matchedPathname === "/" ? pathname : pathname.slice(matchedPathname.length) || "/"
		let match = matchPath(
			{ path: meta.relativePath, caseSensitive: meta.caseSensitive, end },
			remainingPathname,
		)
		const route = meta.route
		if (!match && end && allowPartial && !routesMeta[routesMeta.length - 1].route.index) {
			match = matchPath(
				{
					path: meta.relativePath,
					caseSensitive: meta.caseSensitive,
					end: false,
				},
				remainingPathname,
			)
		}
		if (!match) {
			return null
		}
		Object.assign(matchedParams, match.params)
		matches.push({
			// TODO: Can this as be avoided?
			params: matchedParams,
			pathname: joinPaths([matchedPathname, match.pathname]),
			pathnameBase: normalizePathname(joinPaths([matchedPathname, match.pathnameBase])),
			route,
		})
		if (match.pathnameBase !== "/") {
			matchedPathname = joinPaths([matchedPathname, match.pathnameBase])
		}
	}
	return matches
}
function generatePath(originalPath, params = {}) {
	let path = originalPath
	if (path.endsWith("*") && path !== "*" && !path.endsWith("/*")) {
		warning(
			false,
			`Route path "${path}" will be treated as if it were "${path.replace(/\*$/, "/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${path.replace(/\*$/, "/*")}".`,
		)
		path = path.replace(/\*$/, "/*")
	}
	const prefix = path.startsWith("/") ? "/" : ""
	const stringify2 = p => (p == null ? "" : typeof p === "string" ? p : String(p))
	const segments = path
		.split(/\/+/)
		.map((segment, index, array) => {
			const isLastSegment = index === array.length - 1
			if (isLastSegment && segment === "*") {
				return stringify2(params["*"])
			}
			const keyMatch = segment.match(/^:([\w-]+)(\??)(.*)/)
			if (keyMatch) {
				const [, key, optional, suffix] = keyMatch
				const param = params[key]
				invariant(optional === "?" || param != null, `Missing ":${key}" param`)
				return encodeURIComponent(stringify2(param)) + suffix
			}
			return segment.replace(/\?$/g, "")
		})
		.filter(segment => !!segment)
	return prefix + segments.join("/")
}
function matchPath(pattern, pathname) {
	if (typeof pattern === "string") {
		pattern = { path: pattern, caseSensitive: false, end: true }
	}
	const [matcher, compiledParams] = compilePath(pattern.path, pattern.caseSensitive, pattern.end)
	const match = pathname.match(matcher)
	if (!match) return null
	const matchedPathname = match[0]
	let pathnameBase = matchedPathname.replace(/(.)\/+$/, "$1")
	const captureGroups = match.slice(1)
	const params = compiledParams.reduce((memo2, { paramName, isOptional }, index) => {
		if (paramName === "*") {
			const splatValue = captureGroups[index] || ""
			pathnameBase = matchedPathname
				.slice(0, matchedPathname.length - splatValue.length)
				.replace(/(.)\/+$/, "$1")
		}
		const value = captureGroups[index]
		if (isOptional && !value) {
			memo2[paramName] = void 0
		} else {
			memo2[paramName] = (value || "").replace(/%2F/g, "/")
		}
		return memo2
	}, {})
	return {
		params,
		pathname: matchedPathname,
		pathnameBase,
		pattern,
	}
}
function compilePath(path, caseSensitive = false, end = true) {
	warning(
		path === "*" || !path.endsWith("*") || path.endsWith("/*"),
		`Route path "${path}" will be treated as if it were "${path.replace(/\*$/, "/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${path.replace(/\*$/, "/*")}".`,
	)
	const params = []
	let regexpSource =
		"^" +
		path
			.replace(/\/*\*?$/, "")
			.replace(/^\/*/, "/")
			.replace(/[\\.*+^${}|()[\]]/g, "\\$&")
			.replace(/\/:([\w-]+)(\?)?/g, (match, paramName, isOptional, index, str) => {
				params.push({ paramName, isOptional: isOptional != null })
				if (isOptional) {
					const nextChar = str.charAt(index + match.length)
					if (nextChar && nextChar !== "/") {
						return "/([^\\/]*)"
					}
					return "(?:/([^\\/]*))?"
				}
				return "/([^\\/]+)"
			})
			.replace(/\/([\w-]+)\?(\/|$)/g, "(/$1)?$2")
	if (path.endsWith("*")) {
		params.push({ paramName: "*" })
		regexpSource += path === "*" || path === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$"
	} else if (end) {
		regexpSource += "\\/*$"
	} else if (path !== "" && path !== "/") {
		regexpSource += "(?:(?=\\/|$))"
	} else {
	}
	const matcher = new RegExp(regexpSource, caseSensitive ? void 0 : "i")
	return [matcher, params]
}
function decodePath(value) {
	try {
		return value
			.split("/")
			.map(v => decodeURIComponent(v).replace(/\//g, "%2F"))
			.join("/")
	} catch (error) {
		warning(
			false,
			`The URL path "${value}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${error}).`,
		)
		return value
	}
}
function stripBasename(pathname, basename) {
	if (basename === "/") return pathname
	if (!pathname.toLowerCase().startsWith(basename.toLowerCase())) {
		return null
	}
	const startIndex = basename.endsWith("/") ? basename.length - 1 : basename.length
	const nextChar = pathname.charAt(startIndex)
	if (nextChar && nextChar !== "/") {
		return null
	}
	return pathname.slice(startIndex) || "/"
}
function prependBasename({ basename, pathname }) {
	return pathname === "/" ? basename : joinPaths([basename, pathname])
}
var ABSOLUTE_URL_REGEX = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i
var isAbsoluteUrl = url => ABSOLUTE_URL_REGEX.test(url)
function resolvePath(to, fromPathname = "/") {
	let { pathname: toPathname, search = "", hash = "" } = typeof to === "string" ? parsePath(to) : to
	let pathname
	if (toPathname) {
		toPathname = removeDoubleSlashes(toPathname)
		if (toPathname.startsWith("/")) {
			pathname = resolvePathname(toPathname.substring(1), "/")
		} else {
			pathname = resolvePathname(toPathname, fromPathname)
		}
	} else {
		pathname = fromPathname
	}
	return {
		pathname,
		search: normalizeSearch(search),
		hash: normalizeHash(hash),
	}
}
function resolvePathname(relativePath, fromPathname) {
	const segments = removeTrailingSlash(fromPathname).split("/")
	const relativeSegments = relativePath.split("/")
	relativeSegments.forEach(segment => {
		if (segment === "..") {
			if (segments.length > 1) segments.pop()
		} else if (segment !== ".") {
			segments.push(segment)
		}
	})
	return segments.length > 1 ? segments.join("/") : "/"
}
function getInvalidPathError(char, field, dest, path) {
	return `Cannot include a '${char}' character in a manually specified \`to.${field}\` field [${JSON.stringify(
		path,
	)}].  Please separate it out to the \`to.${dest}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`
}
function getPathContributingMatches(matches) {
	return matches.filter(
		(match, index) => index === 0 || (match.route.path && match.route.path.length > 0),
	)
}
function getResolveToMatches(matches) {
	const pathMatches = getPathContributingMatches(matches)
	return pathMatches.map((match, idx) =>
		idx === pathMatches.length - 1 ? match.pathname : match.pathnameBase,
	)
}
function resolveTo(toArg, routePathnames, locationPathname, isPathRelative = false) {
	let to
	if (typeof toArg === "string") {
		to = parsePath(toArg)
	} else {
		to = { ...toArg }
		invariant(
			!to.pathname || !to.pathname.includes("?"),
			getInvalidPathError("?", "pathname", "search", to),
		)
		invariant(
			!to.pathname || !to.pathname.includes("#"),
			getInvalidPathError("#", "pathname", "hash", to),
		)
		invariant(
			!to.search || !to.search.includes("#"),
			getInvalidPathError("#", "search", "hash", to),
		)
	}
	const isEmptyPath = toArg === "" || to.pathname === ""
	const toPathname = isEmptyPath ? "/" : to.pathname
	let from
	if (toPathname == null) {
		from = locationPathname
	} else {
		let routePathnameIndex = routePathnames.length - 1
		if (!isPathRelative && toPathname.startsWith("..")) {
			const toSegments = toPathname.split("/")
			while (toSegments[0] === "..") {
				toSegments.shift()
				routePathnameIndex -= 1
			}
			to.pathname = toSegments.join("/")
		}
		from = routePathnameIndex >= 0 ? routePathnames[routePathnameIndex] : "/"
	}
	const path = resolvePath(to, from)
	const hasExplicitTrailingSlash = toPathname && toPathname !== "/" && toPathname.endsWith("/")
	const hasCurrentTrailingSlash =
		(isEmptyPath || toPathname === ".") && locationPathname.endsWith("/")
	if (!path.pathname.endsWith("/") && (hasExplicitTrailingSlash || hasCurrentTrailingSlash)) {
		path.pathname += "/"
	}
	return path
}
var removeDoubleSlashes = path => path.replace(/\/\/+/g, "/")
var joinPaths = paths => removeDoubleSlashes(paths.join("/"))
var removeTrailingSlash = path => path.replace(/\/+$/, "")
var normalizePathname = pathname => removeTrailingSlash(pathname).replace(/^\/*/, "/")
var normalizeSearch = search =>
	!search || search === "?" ? "" : search.startsWith("?") ? search : "?" + search
var normalizeHash = hash => (!hash || hash === "#" ? "" : hash.startsWith("#") ? hash : "#" + hash)
var DataWithResponseInit = class {
	constructor(data2, init) {
		this.type = "DataWithResponseInit"
		this.data = data2
		this.init = init || null
	}
}
function data(data2, init) {
	return new DataWithResponseInit(data2, typeof init === "number" ? { status: init } : init)
}
var redirect = (url, init = 302) => {
	let responseInit = init
	if (typeof responseInit === "number") {
		responseInit = { status: responseInit }
	} else if (typeof responseInit.status === "undefined") {
		responseInit.status = 302
	}
	const headers = new Headers(responseInit.headers)
	headers.set("Location", url)
	return new Response(null, { ...responseInit, headers })
}
var redirectDocument = (url, init) => {
	const response = redirect(url, init)
	response.headers.set("X-Remix-Reload-Document", "true")
	return response
}
var replace = (url, init) => {
	const response = redirect(url, init)
	response.headers.set("X-Remix-Replace", "true")
	return response
}
var ErrorResponseImpl = class {
	constructor(status, statusText, data2, internal = false) {
		this.status = status
		this.statusText = statusText || ""
		this.internal = internal
		if (data2 instanceof Error) {
			this.data = data2.toString()
			this.error = data2
		} else {
			this.data = data2
		}
	}
}
function isRouteErrorResponse(error) {
	return (
		error != null &&
		typeof error.status === "number" &&
		typeof error.statusText === "string" &&
		typeof error.internal === "boolean" &&
		"data" in error
	)
}
function getRoutePattern(matches) {
	const parts = matches.map(m => m.route.path).filter(Boolean)
	return joinPaths(parts) || "/"
}
var isBrowser =
	typeof window !== "undefined" &&
	typeof window.document !== "undefined" &&
	typeof window.document.createElement !== "undefined"
function parseToInfo(_to, basename) {
	let to = _to
	if (typeof to !== "string" || !ABSOLUTE_URL_REGEX.test(to)) {
		return {
			absoluteURL: void 0,
			isExternal: false,
			to,
		}
	}
	const absoluteURL = to
	let isExternal = false
	if (isBrowser) {
		try {
			const currentUrl = new URL(window.location.href)
			const targetUrl = to.startsWith("//") ? new URL(currentUrl.protocol + to) : new URL(to)
			const path = stripBasename(targetUrl.pathname, basename)
			if (targetUrl.origin === currentUrl.origin && path != null) {
				to = path + targetUrl.search + targetUrl.hash
			} else {
				isExternal = true
			}
		} catch (e) {
			warning(
				false,
				`<Link to="${to}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`,
			)
		}
	}
	return {
		absoluteURL,
		isExternal,
		to,
	}
}
var UninstrumentedSymbol = Symbol("Uninstrumented")
function getRouteInstrumentationUpdates(fns, route) {
	const aggregated = {
		lazy: [],
		"lazy.loader": [],
		"lazy.action": [],
		"lazy.middleware": [],
		middleware: [],
		loader: [],
		action: [],
	}
	fns.forEach(fn =>
		fn({
			id: route.id,
			index: route.index,
			path: route.path,
			instrument(i) {
				const keys = Object.keys(aggregated)
				for (const key of keys) {
					if (i[key]) {
						aggregated[key].push(i[key])
					}
				}
			},
		}),
	)
	const updates = {}
	if (typeof route.lazy === "function" && aggregated.lazy.length > 0) {
		const instrumented = wrapImpl(aggregated.lazy, route.lazy, () => void 0)
		if (instrumented) {
			updates.lazy = instrumented
		}
	}
	if (typeof route.lazy === "object") {
		const lazyObject = route.lazy
		;["middleware", "loader", "action"].forEach(key => {
			const lazyFn = lazyObject[key]
			const instrumentations = aggregated[`lazy.${key}`]
			if (typeof lazyFn === "function" && instrumentations.length > 0) {
				const instrumented = wrapImpl(instrumentations, lazyFn, () => void 0)
				if (instrumented) {
					updates.lazy = Object.assign(updates.lazy || {}, {
						[key]: instrumented,
					})
				}
			}
		})
	}
	;["loader", "action"].forEach(key => {
		const handler = route[key]
		if (typeof handler === "function" && aggregated[key].length > 0) {
			const original = handler[UninstrumentedSymbol] ?? handler
			const instrumented = wrapImpl(aggregated[key], original, (...args) => getHandlerInfo(args[0]))
			if (instrumented) {
				if (key === "loader" && original.hydrate === true) {
					instrumented.hydrate = true
				}
				instrumented[UninstrumentedSymbol] = original
				updates[key] = instrumented
			}
		}
	})
	if (route.middleware && route.middleware.length > 0 && aggregated.middleware.length > 0) {
		updates.middleware = route.middleware.map(middleware => {
			const original = middleware[UninstrumentedSymbol] ?? middleware
			const instrumented = wrapImpl(aggregated.middleware, original, (...args) =>
				getHandlerInfo(args[0]),
			)
			if (instrumented) {
				instrumented[UninstrumentedSymbol] = original
				return instrumented
			}
			return middleware
		})
	}
	return updates
}
function instrumentClientSideRouter(router2, fns) {
	const aggregated = {
		navigate: [],
		fetch: [],
	}
	fns.forEach(fn =>
		fn({
			instrument(i) {
				const keys = Object.keys(i)
				for (const key of keys) {
					if (i[key]) {
						aggregated[key].push(i[key])
					}
				}
			},
		}),
	)
	if (aggregated.navigate.length > 0) {
		const navigate = router2.navigate[UninstrumentedSymbol] ?? router2.navigate
		const instrumentedNavigate = wrapImpl(aggregated.navigate, navigate, (...args) => {
			const [to, opts] = args
			return {
				to: typeof to === "number" || typeof to === "string" ? to : to ? createPath(to) : ".",
				...getRouterInfo(router2, opts ?? {}),
			}
		})
		if (instrumentedNavigate) {
			instrumentedNavigate[UninstrumentedSymbol] = navigate
			router2.navigate = instrumentedNavigate
		}
	}
	if (aggregated.fetch.length > 0) {
		const fetch2 = router2.fetch[UninstrumentedSymbol] ?? router2.fetch
		const instrumentedFetch = wrapImpl(aggregated.fetch, fetch2, (...args) => {
			const [key, , href2, opts] = args
			return {
				href: href2 ?? ".",
				fetcherKey: key,
				...getRouterInfo(router2, opts ?? {}),
			}
		})
		if (instrumentedFetch) {
			instrumentedFetch[UninstrumentedSymbol] = fetch2
			router2.fetch = instrumentedFetch
		}
	}
	return router2
}
function instrumentHandler(handler, fns) {
	const aggregated = {
		request: [],
	}
	fns.forEach(fn =>
		fn({
			instrument(i) {
				const keys = Object.keys(i)
				for (const key of keys) {
					if (i[key]) {
						aggregated[key].push(i[key])
					}
				}
			},
		}),
	)
	let instrumentedHandler = handler
	if (aggregated.request.length > 0) {
		instrumentedHandler = wrapImpl(aggregated.request, handler, (...args) => {
			const [request, context] = args
			return {
				request: getReadonlyRequest(request),
				context: context != null ? getReadonlyContext(context) : context,
			}
		})
	}
	return instrumentedHandler
}
function wrapImpl(impls, handler, getInfo) {
	if (impls.length === 0) {
		return null
	}
	return async (...args) => {
		const result = await recurseRight(
			impls,
			getInfo(...args),
			() => handler(...args),
			impls.length - 1,
		)
		if (result.type === "error") {
			throw result.value
		}
		return result.value
	}
}
async function recurseRight(impls, info, handler, index) {
	const impl = impls[index]
	let result
	if (!impl) {
		try {
			const value = await handler()
			result = { type: "success", value }
		} catch (e) {
			result = { type: "error", value: e }
		}
	} else {
		let handlerPromise = void 0
		const callHandler = async () => {
			if (handlerPromise) {
				console.error("You cannot call instrumented handlers more than once")
			} else {
				handlerPromise = recurseRight(impls, info, handler, index - 1)
			}
			result = await handlerPromise
			invariant(result, "Expected a result")
			if (result.type === "error" && result.value instanceof Error) {
				return { status: "error", error: result.value }
			}
			return { status: "success", error: void 0 }
		}
		try {
			await impl(callHandler, info)
		} catch (e) {
			console.error("An instrumentation function threw an error:", e)
		}
		if (!handlerPromise) {
			await callHandler()
		}
		await handlerPromise
	}
	if (result) {
		return result
	}
	return {
		type: "error",
		value: new Error("No result assigned in instrumentation chain."),
	}
}
function getHandlerInfo(args) {
	const { request, context, params, pattern } = args
	return {
		request: getReadonlyRequest(request),
		params: { ...params },
		pattern,
		context: getReadonlyContext(context),
	}
}
function getRouterInfo(router2, opts) {
	return {
		currentUrl: createPath(router2.state.location),
		...("formMethod" in opts ? { formMethod: opts.formMethod } : {}),
		...("formEncType" in opts ? { formEncType: opts.formEncType } : {}),
		...("formData" in opts ? { formData: opts.formData } : {}),
		...("body" in opts ? { body: opts.body } : {}),
	}
}
function getReadonlyRequest(request) {
	return {
		method: request.method,
		url: request.url,
		headers: {
			get: (...args) => request.headers.get(...args),
		},
	}
}
function getReadonlyContext(context) {
	if (isPlainObject(context)) {
		const frozen = { ...context }
		Object.freeze(frozen)
		return frozen
	} else {
		return {
			get: ctx => context.get(ctx),
		}
	}
}
var objectProtoNames = Object.getOwnPropertyNames(Object.prototype).sort().join("\0")
function isPlainObject(thing) {
	if (thing === null || typeof thing !== "object") {
		return false
	}
	const proto = Object.getPrototypeOf(thing)
	return (
		proto === Object.prototype ||
		proto === null ||
		Object.getOwnPropertyNames(proto).sort().join("\0") === objectProtoNames
	)
}
var validMutationMethodsArr = ["POST", "PUT", "PATCH", "DELETE"]
var validMutationMethods = new Set(validMutationMethodsArr)
var validRequestMethodsArr = ["GET", ...validMutationMethodsArr]
var validRequestMethods = new Set(validRequestMethodsArr)
var redirectStatusCodes = /* @__PURE__ */ new Set([301, 302, 303, 307, 308])
var redirectPreserveMethodStatusCodes = /* @__PURE__ */ new Set([307, 308])
var IDLE_NAVIGATION = {
	state: "idle",
	location: void 0,
	formMethod: void 0,
	formAction: void 0,
	formEncType: void 0,
	formData: void 0,
	json: void 0,
	text: void 0,
}
var IDLE_FETCHER = {
	state: "idle",
	data: void 0,
	formMethod: void 0,
	formAction: void 0,
	formEncType: void 0,
	formData: void 0,
	json: void 0,
	text: void 0,
}
var IDLE_BLOCKER = {
	state: "unblocked",
	proceed: void 0,
	reset: void 0,
	location: void 0,
}
var defaultMapRouteProperties = route => ({
	hasErrorBoundary: Boolean(route.hasErrorBoundary),
})
var TRANSITIONS_STORAGE_KEY = "remix-router-transitions"
var ResetLoaderDataSymbol = Symbol("ResetLoaderData")
var _routes
var _branches
var _hmrRoutes
var _hmrBranches
var DataRoutes = class {
	constructor(routes) {
		__privateAdd(this, _routes)
		__privateAdd(this, _branches)
		__privateAdd(this, _hmrRoutes)
		__privateAdd(this, _hmrBranches)
		__privateSet(this, _routes, routes)
		__privateSet(this, _branches, flattenAndRankRoutes(routes))
	}
	/** The stable route tree */
	get stableRoutes() {
		return __privateGet(this, _routes)
	}
	/** The in-flight route tree if one is active, otherwise the stable tree */
	get activeRoutes() {
		return __privateGet(this, _hmrRoutes) ?? __privateGet(this, _routes)
	}
	/** Pre-computed branches */
	get branches() {
		return __privateGet(this, _hmrBranches) ?? __privateGet(this, _branches)
	}
	get hasHMRRoutes() {
		return __privateGet(this, _hmrRoutes) != null
	}
	/** Replace the stable route tree and recompute its branches */
	setRoutes(routes) {
		__privateSet(this, _routes, routes)
		__privateSet(this, _branches, flattenAndRankRoutes(routes))
	}
	/** Set a new in-flight route tree and recompute its branches */
	setHmrRoutes(routes) {
		__privateSet(this, _hmrRoutes, routes)
		__privateSet(this, _hmrBranches, flattenAndRankRoutes(routes))
	}
	/** Commit in-flight routes/branches to the stable slot and clear in-flight */
	commitHmrRoutes() {
		if (__privateGet(this, _hmrRoutes)) {
			__privateSet(this, _routes, __privateGet(this, _hmrRoutes))
			__privateSet(this, _branches, __privateGet(this, _hmrBranches))
			__privateSet(this, _hmrRoutes, void 0)
			__privateSet(this, _hmrBranches, void 0)
		}
	}
}
_routes = /* @__PURE__ */ new WeakMap()
_branches = /* @__PURE__ */ new WeakMap()
_hmrRoutes = /* @__PURE__ */ new WeakMap()
_hmrBranches = /* @__PURE__ */ new WeakMap()
function createRouter(init) {
	const routerWindow = init.window ? init.window : typeof window !== "undefined" ? window : void 0
	const isBrowser3 =
		typeof routerWindow !== "undefined" &&
		typeof routerWindow.document !== "undefined" &&
		typeof routerWindow.document.createElement !== "undefined"
	invariant(init.routes.length > 0, "You must provide a non-empty routes array to createRouter")
	const hydrationRouteProperties2 = init.hydrationRouteProperties || []
	const _mapRouteProperties = init.mapRouteProperties || defaultMapRouteProperties
	let mapRouteProperties2 = _mapRouteProperties
	if (init.instrumentations) {
		const instrumentations = init.instrumentations
		mapRouteProperties2 = route => {
			return {
				..._mapRouteProperties(route),
				...getRouteInstrumentationUpdates(
					instrumentations.map(i => i.route).filter(Boolean),
					route,
				),
			}
		}
	}
	let manifest = {}
	const dataRoutes = new DataRoutes(
		convertRoutesToDataRoutes(init.routes, mapRouteProperties2, void 0, manifest),
	)
	let basename = init.basename || "/"
	if (!basename.startsWith("/")) {
		basename = `/${basename}`
	}
	const dataStrategyImpl = init.dataStrategy || defaultDataStrategyWithMiddleware
	const future = {
		...init.future,
	}
	let unlistenHistory = null
	const subscribers = /* @__PURE__ */ new Set()
	let savedScrollPositions2 = null
	let getScrollRestorationKey2 = null
	let getScrollPosition = null
	let initialScrollRestored = init.hydrationData != null
	let initialMatches = matchRoutesImpl(
		dataRoutes.activeRoutes,
		init.history.location,
		basename,
		false,
		dataRoutes.branches,
	)
	let initialMatchesIsFOW = false
	let initialErrors = null
	let initialized
	let renderFallback
	if (initialMatches == null && !init.patchRoutesOnNavigation) {
		const error = getInternalRouterError(404, {
			pathname: init.history.location.pathname,
		})
		const { matches, route } = getShortCircuitMatches(dataRoutes.activeRoutes)
		initialized = true
		renderFallback = !initialized
		initialMatches = matches
		initialErrors = { [route.id]: error }
	} else {
		if (initialMatches && !init.hydrationData) {
			const fogOfWar = checkFogOfWar(
				initialMatches,
				dataRoutes.activeRoutes,
				init.history.location.pathname,
			)
			if (fogOfWar.active) {
				initialMatches = null
			}
		}
		if (!initialMatches) {
			initialized = false
			renderFallback = !initialized
			initialMatches = []
			const fogOfWar = checkFogOfWar(null, dataRoutes.activeRoutes, init.history.location.pathname)
			if (fogOfWar.active && fogOfWar.matches) {
				initialMatchesIsFOW = true
				initialMatches = fogOfWar.matches
			}
		} else if (initialMatches.some(m => m.route.lazy)) {
			initialized = false
			renderFallback = !initialized
		} else if (!initialMatches.some(m => routeHasLoaderOrMiddleware(m.route))) {
			initialized = true
			renderFallback = !initialized
		} else {
			const loaderData = init.hydrationData ? init.hydrationData.loaderData : null
			const errors = init.hydrationData ? init.hydrationData.errors : null
			let relevantMatches = initialMatches
			if (errors) {
				const idx = initialMatches.findIndex(m => errors[m.route.id] !== void 0)
				relevantMatches = relevantMatches.slice(0, idx + 1)
			}
			renderFallback = false
			initialized = true
			relevantMatches.forEach(m => {
				const status = getRouteHydrationStatus(m.route, loaderData, errors)
				renderFallback = renderFallback || status.renderFallback
				initialized = initialized && !status.shouldLoad
			})
		}
	}
	let router2
	let state = {
		historyAction: init.history.action,
		location: init.history.location,
		matches: initialMatches,
		initialized,
		renderFallback,
		navigation: IDLE_NAVIGATION,
		// Don't restore on initial updateState() if we were SSR'd
		restoreScrollPosition: init.hydrationData != null ? false : null,
		preventScrollReset: false,
		revalidation: "idle",
		loaderData: (init.hydrationData && init.hydrationData.loaderData) || {},
		actionData: (init.hydrationData && init.hydrationData.actionData) || null,
		errors: (init.hydrationData && init.hydrationData.errors) || initialErrors,
		fetchers: /* @__PURE__ */ new Map(),
		blockers: /* @__PURE__ */ new Map(),
	}
	let pendingAction = "POP"
	let pendingPopstateNavigationDfd = null
	let pendingPreventScrollReset = false
	let pendingNavigationController
	let pendingViewTransitionEnabled = false
	const appliedViewTransitions = /* @__PURE__ */ new Map()
	let removePageHideEventListener = null
	let isUninterruptedRevalidation = false
	let isRevalidationRequired = false
	const cancelledFetcherLoads = /* @__PURE__ */ new Set()
	const fetchControllers = /* @__PURE__ */ new Map()
	let incrementingLoadId = 0
	let pendingNavigationLoadId = -1
	const fetchReloadIds = /* @__PURE__ */ new Map()
	const fetchRedirectIds = /* @__PURE__ */ new Set()
	const fetchLoadMatches = /* @__PURE__ */ new Map()
	const activeFetchers = /* @__PURE__ */ new Map()
	const fetchersQueuedForDeletion = /* @__PURE__ */ new Set()
	const blockerFunctions = /* @__PURE__ */ new Map()
	let unblockBlockerHistoryUpdate = void 0
	let pendingRevalidationDfd = null
	function initialize() {
		unlistenHistory = init.history.listen(
			({ action: historyAction, location: location2, delta }) => {
				if (unblockBlockerHistoryUpdate) {
					unblockBlockerHistoryUpdate()
					unblockBlockerHistoryUpdate = void 0
					return
				}
				warning(
					blockerFunctions.size === 0 || delta != null,
					"You are trying to use a blocker on a POP navigation to a location that was not created by @remix-run/router. This will fail silently in production. This can happen if you are navigating outside the router via `window.history.pushState`/`window.location.hash` instead of using router navigation APIs.  This can also happen if you are using createHashRouter and the user manually changes the URL.",
				)
				const blockerKey = shouldBlockNavigation({
					currentLocation: state.location,
					nextLocation: location2,
					historyAction,
				})
				if (blockerKey && delta != null) {
					const nextHistoryUpdatePromise = new Promise(resolve => {
						unblockBlockerHistoryUpdate = resolve
					})
					init.history.go(delta * -1)
					updateBlocker(blockerKey, {
						state: "blocked",
						location: location2,
						proceed() {
							updateBlocker(blockerKey, {
								state: "proceeding",
								proceed: void 0,
								reset: void 0,
								location: location2,
							})
							nextHistoryUpdatePromise.then(() => init.history.go(delta))
						},
						reset() {
							const blockers = new Map(state.blockers)
							blockers.set(blockerKey, IDLE_BLOCKER)
							updateState({ blockers })
						},
					})
					pendingPopstateNavigationDfd == null ? void 0 : pendingPopstateNavigationDfd.resolve()
					pendingPopstateNavigationDfd = null
					return
				}
				return startNavigation(historyAction, location2)
			},
		)
		if (isBrowser3) {
			restoreAppliedTransitions(routerWindow, appliedViewTransitions)
			const _saveAppliedTransitions = () =>
				persistAppliedTransitions(routerWindow, appliedViewTransitions)
			routerWindow.addEventListener("pagehide", _saveAppliedTransitions)
			removePageHideEventListener = () =>
				routerWindow.removeEventListener("pagehide", _saveAppliedTransitions)
		}
		if (!state.initialized) {
			startNavigation("POP", state.location, {
				initialHydration: true,
			})
		}
		return router2
	}
	function dispose() {
		if (unlistenHistory) {
			unlistenHistory()
		}
		if (removePageHideEventListener) {
			removePageHideEventListener()
		}
		subscribers.clear()
		pendingNavigationController && pendingNavigationController.abort()
		state.fetchers.forEach((_, key) => deleteFetcher(key))
		state.blockers.forEach((_, key) => deleteBlocker(key))
	}
	function subscribe(fn) {
		subscribers.add(fn)
		return () => subscribers.delete(fn)
	}
	function updateState(newState, opts = {}) {
		if (newState.matches) {
			newState.matches = newState.matches.map(m => {
				const route = manifest[m.route.id]
				const matchRoute = m.route
				if (
					matchRoute.element !== route.element ||
					matchRoute.errorElement !== route.errorElement ||
					matchRoute.hydrateFallbackElement !== route.hydrateFallbackElement
				) {
					return {
						...m,
						route,
					}
				}
				return m
			})
		}
		state = {
			...state,
			...newState,
		}
		const unmountedFetchers = []
		const mountedFetchers = []
		state.fetchers.forEach((fetcher, key) => {
			if (fetcher.state === "idle") {
				if (fetchersQueuedForDeletion.has(key)) {
					unmountedFetchers.push(key)
				} else {
					mountedFetchers.push(key)
				}
			}
		})
		fetchersQueuedForDeletion.forEach(key => {
			if (!state.fetchers.has(key) && !fetchControllers.has(key)) {
				unmountedFetchers.push(key)
			}
		})
		;[...subscribers].forEach(subscriber =>
			subscriber(state, {
				deletedFetchers: unmountedFetchers,
				newErrors: newState.errors ?? null,
				viewTransitionOpts: opts.viewTransitionOpts,
				flushSync: opts.flushSync === true,
			}),
		)
		unmountedFetchers.forEach(key => deleteFetcher(key))
		mountedFetchers.forEach(key => state.fetchers.delete(key))
	}
	function completeNavigation(location2, newState, { flushSync: flushSync3 } = {}) {
		var _a, _b
		const isActionReload =
			state.actionData != null &&
			state.navigation.formMethod != null &&
			isMutationMethod(state.navigation.formMethod) &&
			state.navigation.state === "loading" &&
			((_a = location2.state) == null ? void 0 : _a._isRedirect) !== true
		let actionData
		if (newState.actionData) {
			if (Object.keys(newState.actionData).length > 0) {
				actionData = newState.actionData
			} else {
				actionData = null
			}
		} else if (isActionReload) {
			actionData = state.actionData
		} else {
			actionData = null
		}
		const loaderData = newState.loaderData
			? mergeLoaderData(
					state.loaderData,
					newState.loaderData,
					newState.matches || [],
					newState.errors,
				)
			: state.loaderData
		let blockers = state.blockers
		if (blockers.size > 0) {
			blockers = new Map(blockers)
			blockers.forEach((_, k) => blockers.set(k, IDLE_BLOCKER))
		}
		const restoreScrollPosition = isUninterruptedRevalidation
			? false
			: getSavedScrollPosition(location2, newState.matches || state.matches)
		const preventScrollReset =
			pendingPreventScrollReset === true ||
			(state.navigation.formMethod != null &&
				isMutationMethod(state.navigation.formMethod) &&
				((_b = location2.state) == null ? void 0 : _b._isRedirect) !== true)
		dataRoutes.commitHmrRoutes()
		if (isUninterruptedRevalidation) {
		} else if (pendingAction === "POP") {
		} else if (pendingAction === "PUSH") {
			init.history.push(location2, location2.state)
		} else if (pendingAction === "REPLACE") {
			init.history.replace(location2, location2.state)
		}
		let viewTransitionOpts
		if (pendingAction === "POP") {
			const priorPaths = appliedViewTransitions.get(state.location.pathname)
			if (priorPaths && priorPaths.has(location2.pathname)) {
				viewTransitionOpts = {
					currentLocation: state.location,
					nextLocation: location2,
				}
			} else if (appliedViewTransitions.has(location2.pathname)) {
				viewTransitionOpts = {
					currentLocation: location2,
					nextLocation: state.location,
				}
			}
		} else if (pendingViewTransitionEnabled) {
			let toPaths = appliedViewTransitions.get(state.location.pathname)
			if (toPaths) {
				toPaths.add(location2.pathname)
			} else {
				toPaths = /* @__PURE__ */ new Set([location2.pathname])
				appliedViewTransitions.set(state.location.pathname, toPaths)
			}
			viewTransitionOpts = {
				currentLocation: state.location,
				nextLocation: location2,
			}
		}
		updateState(
			{
				...newState,
				// matches, errors, fetchers go through as-is
				actionData,
				loaderData,
				historyAction: pendingAction,
				location: location2,
				initialized: true,
				renderFallback: false,
				navigation: IDLE_NAVIGATION,
				revalidation: "idle",
				restoreScrollPosition,
				preventScrollReset,
				blockers,
			},
			{
				viewTransitionOpts,
				flushSync: flushSync3 === true,
			},
		)
		pendingAction = "POP"
		pendingPreventScrollReset = false
		pendingViewTransitionEnabled = false
		isUninterruptedRevalidation = false
		isRevalidationRequired = false
		pendingPopstateNavigationDfd == null ? void 0 : pendingPopstateNavigationDfd.resolve()
		pendingPopstateNavigationDfd = null
		pendingRevalidationDfd == null ? void 0 : pendingRevalidationDfd.resolve()
		pendingRevalidationDfd = null
	}
	async function navigate(to, opts) {
		pendingPopstateNavigationDfd == null ? void 0 : pendingPopstateNavigationDfd.resolve()
		pendingPopstateNavigationDfd = null
		if (typeof to === "number") {
			if (!pendingPopstateNavigationDfd) {
				pendingPopstateNavigationDfd = createDeferred()
			}
			const promise = pendingPopstateNavigationDfd.promise
			init.history.go(to)
			return promise
		}
		const normalizedPath = normalizeTo(
			state.location,
			state.matches,
			basename,
			to,
			opts == null ? void 0 : opts.fromRouteId,
			opts == null ? void 0 : opts.relative,
		)
		const { path, submission, error } = normalizeNavigateOptions(false, normalizedPath, opts)
		let maskPath
		if (opts == null ? void 0 : opts.mask) {
			const partialPath =
				typeof opts.mask === "string"
					? parsePath(opts.mask)
					: {
							...state.location.mask,
							...opts.mask,
						}
			maskPath = {
				pathname: "",
				search: "",
				hash: "",
				...partialPath,
			}
		}
		const currentLocation = state.location
		let nextLocation = createLocation(currentLocation, path, opts && opts.state, void 0, maskPath)
		nextLocation = {
			...nextLocation,
			...init.history.encodeLocation(nextLocation),
		}
		const userReplace = opts && opts.replace != null ? opts.replace : void 0
		let historyAction = "PUSH"
		if (userReplace === true) {
			historyAction = "REPLACE"
		} else if (userReplace === false) {
		} else if (
			submission != null &&
			isMutationMethod(submission.formMethod) &&
			submission.formAction === state.location.pathname + state.location.search
		) {
			historyAction = "REPLACE"
		}
		const preventScrollReset =
			opts && "preventScrollReset" in opts ? opts.preventScrollReset === true : void 0
		const flushSync3 = (opts && opts.flushSync) === true
		const blockerKey = shouldBlockNavigation({
			currentLocation,
			nextLocation,
			historyAction,
		})
		if (blockerKey) {
			updateBlocker(blockerKey, {
				state: "blocked",
				location: nextLocation,
				proceed() {
					updateBlocker(blockerKey, {
						state: "proceeding",
						proceed: void 0,
						reset: void 0,
						location: nextLocation,
					})
					navigate(to, opts)
				},
				reset() {
					const blockers = new Map(state.blockers)
					blockers.set(blockerKey, IDLE_BLOCKER)
					updateState({ blockers })
				},
			})
			return
		}
		await startNavigation(historyAction, nextLocation, {
			submission,
			// Send through the formData serialization error if we have one so we can
			// render at the right error boundary after we match routes
			pendingError: error,
			preventScrollReset,
			replace: opts && opts.replace,
			enableViewTransition: opts && opts.viewTransition,
			flushSync: flushSync3,
			callSiteDefaultShouldRevalidate: opts && opts.defaultShouldRevalidate,
		})
	}
	function revalidate() {
		if (!pendingRevalidationDfd) {
			pendingRevalidationDfd = createDeferred()
		}
		interruptActiveLoads()
		updateState({ revalidation: "loading" })
		const promise = pendingRevalidationDfd.promise
		if (state.navigation.state === "submitting") {
			return promise
		}
		if (state.navigation.state === "idle") {
			startNavigation(state.historyAction, state.location, {
				startUninterruptedRevalidation: true,
			})
			return promise
		}
		startNavigation(pendingAction || state.historyAction, state.navigation.location, {
			overrideNavigation: state.navigation,
			// Proxy through any rending view transition
			enableViewTransition: pendingViewTransitionEnabled === true,
		})
		return promise
	}
	async function startNavigation(historyAction, location2, opts) {
		pendingNavigationController && pendingNavigationController.abort()
		pendingNavigationController = null
		pendingAction = historyAction
		isUninterruptedRevalidation = (opts && opts.startUninterruptedRevalidation) === true
		saveScrollPosition(state.location, state.matches)
		pendingPreventScrollReset = (opts && opts.preventScrollReset) === true
		pendingViewTransitionEnabled = (opts && opts.enableViewTransition) === true
		const routesToUse = dataRoutes.activeRoutes
		let loadingNavigation = opts && opts.overrideNavigation
		let matches =
			(opts == null ? void 0 : opts.initialHydration) &&
			state.matches &&
			state.matches.length > 0 &&
			!initialMatchesIsFOW
				? // `matchRoutes()` has already been called if we're in here via `router.initialize()`
					state.matches
				: matchRoutesImpl(routesToUse, location2, basename, false, dataRoutes.branches)
		let flushSync3 = (opts && opts.flushSync) === true
		if (
			matches &&
			state.initialized &&
			!isRevalidationRequired &&
			isHashChangeOnly(state.location, location2) &&
			!(opts && opts.submission && isMutationMethod(opts.submission.formMethod))
		) {
			completeNavigation(location2, { matches }, { flushSync: flushSync3 })
			return
		}
		const fogOfWar = checkFogOfWar(matches, routesToUse, location2.pathname)
		if (fogOfWar.active && fogOfWar.matches) {
			matches = fogOfWar.matches
		}
		if (!matches) {
			const { error, notFoundMatches, route } = handleNavigational404(location2.pathname)
			completeNavigation(
				location2,
				{
					matches: notFoundMatches,
					loaderData: {},
					errors: {
						[route.id]: error,
					},
				},
				{ flushSync: flushSync3 },
			)
			return
		}
		pendingNavigationController = new AbortController()
		let request = createClientSideRequest(
			init.history,
			location2,
			pendingNavigationController.signal,
			opts && opts.submission,
		)
		const scopedContext = init.getContext ? await init.getContext() : new RouterContextProvider()
		let pendingActionResult
		if (opts && opts.pendingError) {
			pendingActionResult = [
				findNearestBoundary(matches).route.id,
				{ type: "error", error: opts.pendingError },
			]
		} else if (opts && opts.submission && isMutationMethod(opts.submission.formMethod)) {
			const actionResult = await handleAction(
				request,
				location2,
				opts.submission,
				matches,
				scopedContext,
				fogOfWar.active,
				opts && opts.initialHydration === true,
				{ replace: opts.replace, flushSync: flushSync3 },
			)
			if (actionResult.shortCircuited) {
				return
			}
			if (actionResult.pendingActionResult) {
				const [routeId, result] = actionResult.pendingActionResult
				if (
					isErrorResult(result) &&
					isRouteErrorResponse(result.error) &&
					result.error.status === 404
				) {
					pendingNavigationController = null
					completeNavigation(location2, {
						matches: actionResult.matches,
						loaderData: {},
						errors: {
							[routeId]: result.error,
						},
					})
					return
				}
			}
			matches = actionResult.matches || matches
			pendingActionResult = actionResult.pendingActionResult
			loadingNavigation = getLoadingNavigation(location2, opts.submission)
			flushSync3 = false
			fogOfWar.active = false
			request = createClientSideRequest(init.history, request.url, request.signal)
		}
		const {
			shortCircuited,
			matches: updatedMatches,
			loaderData,
			errors,
		} = await handleLoaders(
			request,
			location2,
			matches,
			scopedContext,
			fogOfWar.active,
			loadingNavigation,
			opts && opts.submission,
			opts && opts.fetcherSubmission,
			opts && opts.replace,
			opts && opts.initialHydration === true,
			flushSync3,
			pendingActionResult,
			opts && opts.callSiteDefaultShouldRevalidate,
		)
		if (shortCircuited) {
			return
		}
		pendingNavigationController = null
		completeNavigation(location2, {
			matches: updatedMatches || matches,
			...getActionDataForCommit(pendingActionResult),
			loaderData,
			errors,
		})
	}
	async function handleAction(
		request,
		location2,
		submission,
		matches,
		scopedContext,
		isFogOfWar,
		initialHydration,
		opts = {},
	) {
		interruptActiveLoads()
		const navigation = getSubmittingNavigation(location2, submission)
		updateState({ navigation }, { flushSync: opts.flushSync === true })
		if (isFogOfWar) {
			const discoverResult = await discoverRoutes(matches, location2.pathname, request.signal)
			if (discoverResult.type === "aborted") {
				return { shortCircuited: true }
			} else if (discoverResult.type === "error") {
				if (discoverResult.partialMatches.length === 0) {
					const { matches: matches2, route } = getShortCircuitMatches(dataRoutes.activeRoutes)
					return {
						matches: matches2,
						pendingActionResult: [
							route.id,
							{
								type: "error",
								error: discoverResult.error,
							},
						],
					}
				}
				const boundaryId = findNearestBoundary(discoverResult.partialMatches).route.id
				return {
					matches: discoverResult.partialMatches,
					pendingActionResult: [
						boundaryId,
						{
							type: "error",
							error: discoverResult.error,
						},
					],
				}
			} else if (!discoverResult.matches) {
				const { notFoundMatches, error, route } = handleNavigational404(location2.pathname)
				return {
					matches: notFoundMatches,
					pendingActionResult: [
						route.id,
						{
							type: "error",
							error,
						},
					],
				}
			} else {
				matches = discoverResult.matches
			}
		}
		let result
		const actionMatch = getTargetMatch(matches, location2)
		if (!actionMatch.route.action && !actionMatch.route.lazy) {
			result = {
				type: "error",
				error: getInternalRouterError(405, {
					method: request.method,
					pathname: location2.pathname,
					routeId: actionMatch.route.id,
				}),
			}
		} else {
			const dsMatches = getTargetedDataStrategyMatches(
				mapRouteProperties2,
				manifest,
				request,
				location2,
				matches,
				actionMatch,
				initialHydration ? [] : hydrationRouteProperties2,
				scopedContext,
			)
			const results = await callDataStrategy(request, location2, dsMatches, scopedContext, null)
			result = results[actionMatch.route.id]
			if (!result) {
				for (const match of matches) {
					if (results[match.route.id]) {
						result = results[match.route.id]
						break
					}
				}
			}
			if (request.signal.aborted) {
				return { shortCircuited: true }
			}
		}
		if (isRedirectResult(result)) {
			let replace2
			if (opts && opts.replace != null) {
				replace2 = opts.replace
			} else {
				const location22 = normalizeRedirectLocation(
					result.response.headers.get("Location"),
					new URL(request.url),
					basename,
					init.history,
				)
				replace2 = location22 === state.location.pathname + state.location.search
			}
			await startRedirectNavigation(request, result, true, {
				submission,
				replace: replace2,
			})
			return { shortCircuited: true }
		}
		if (isErrorResult(result)) {
			const boundaryMatch = findNearestBoundary(matches, actionMatch.route.id)
			if ((opts && opts.replace) !== true) {
				pendingAction = "PUSH"
			}
			return {
				matches,
				pendingActionResult: [boundaryMatch.route.id, result, actionMatch.route.id],
			}
		}
		return {
			matches,
			pendingActionResult: [actionMatch.route.id, result],
		}
	}
	async function handleLoaders(
		request,
		location2,
		matches,
		scopedContext,
		isFogOfWar,
		overrideNavigation,
		submission,
		fetcherSubmission,
		replace2,
		initialHydration,
		flushSync3,
		pendingActionResult,
		callSiteDefaultShouldRevalidate,
	) {
		const loadingNavigation = overrideNavigation || getLoadingNavigation(location2, submission)
		const activeSubmission =
			submission || fetcherSubmission || getSubmissionFromNavigation(loadingNavigation)
		const shouldUpdateNavigationState = !isUninterruptedRevalidation && !initialHydration
		if (isFogOfWar) {
			if (shouldUpdateNavigationState) {
				const actionData = getUpdatedActionData(pendingActionResult)
				updateState(
					{
						navigation: loadingNavigation,
						...(actionData !== void 0 ? { actionData } : {}),
					},
					{
						flushSync: flushSync3,
					},
				)
			}
			const discoverResult = await discoverRoutes(matches, location2.pathname, request.signal)
			if (discoverResult.type === "aborted") {
				return { shortCircuited: true }
			} else if (discoverResult.type === "error") {
				if (discoverResult.partialMatches.length === 0) {
					const { matches: matches2, route } = getShortCircuitMatches(dataRoutes.activeRoutes)
					return {
						matches: matches2,
						loaderData: {},
						errors: {
							[route.id]: discoverResult.error,
						},
					}
				}
				const boundaryId = findNearestBoundary(discoverResult.partialMatches).route.id
				return {
					matches: discoverResult.partialMatches,
					loaderData: {},
					errors: {
						[boundaryId]: discoverResult.error,
					},
				}
			} else if (!discoverResult.matches) {
				const { error, notFoundMatches, route } = handleNavigational404(location2.pathname)
				return {
					matches: notFoundMatches,
					loaderData: {},
					errors: {
						[route.id]: error,
					},
				}
			} else {
				matches = discoverResult.matches
			}
		}
		const routesToUse = dataRoutes.activeRoutes
		const { dsMatches, revalidatingFetchers } = getMatchesToLoad(
			request,
			scopedContext,
			mapRouteProperties2,
			manifest,
			init.history,
			state,
			matches,
			activeSubmission,
			location2,
			initialHydration ? [] : hydrationRouteProperties2,
			initialHydration === true,
			isRevalidationRequired,
			cancelledFetcherLoads,
			fetchersQueuedForDeletion,
			fetchLoadMatches,
			fetchRedirectIds,
			routesToUse,
			basename,
			init.patchRoutesOnNavigation != null,
			dataRoutes.branches,
			pendingActionResult,
			callSiteDefaultShouldRevalidate,
		)
		pendingNavigationLoadId = ++incrementingLoadId
		if (
			!init.dataStrategy &&
			!dsMatches.some(m => m.shouldLoad) &&
			!dsMatches.some(m => m.route.middleware && m.route.middleware.length > 0) &&
			revalidatingFetchers.length === 0
		) {
			const updatedFetchers2 = markFetchRedirectsDone()
			completeNavigation(
				location2,
				{
					matches,
					loaderData: {},
					// Commit pending error if we're short circuiting
					errors:
						pendingActionResult && isErrorResult(pendingActionResult[1])
							? { [pendingActionResult[0]]: pendingActionResult[1].error }
							: null,
					...getActionDataForCommit(pendingActionResult),
					...(updatedFetchers2 ? { fetchers: new Map(state.fetchers) } : {}),
				},
				{ flushSync: flushSync3 },
			)
			return { shortCircuited: true }
		}
		if (shouldUpdateNavigationState) {
			const updates = {}
			if (!isFogOfWar) {
				updates.navigation = loadingNavigation
				const actionData = getUpdatedActionData(pendingActionResult)
				if (actionData !== void 0) {
					updates.actionData = actionData
				}
			}
			if (revalidatingFetchers.length > 0) {
				updates.fetchers = getUpdatedRevalidatingFetchers(revalidatingFetchers)
			}
			updateState(updates, { flushSync: flushSync3 })
		}
		revalidatingFetchers.forEach(rf => {
			abortFetcher(rf.key)
			if (rf.controller) {
				fetchControllers.set(rf.key, rf.controller)
			}
		})
		const abortPendingFetchRevalidations = () =>
			revalidatingFetchers.forEach(f => abortFetcher(f.key))
		if (pendingNavigationController) {
			pendingNavigationController.signal.addEventListener("abort", abortPendingFetchRevalidations)
		}
		const { loaderResults, fetcherResults } = await callLoadersAndMaybeResolveData(
			dsMatches,
			revalidatingFetchers,
			request,
			location2,
			scopedContext,
		)
		if (request.signal.aborted) {
			return { shortCircuited: true }
		}
		if (pendingNavigationController) {
			pendingNavigationController.signal.removeEventListener(
				"abort",
				abortPendingFetchRevalidations,
			)
		}
		revalidatingFetchers.forEach(rf => fetchControllers.delete(rf.key))
		let redirect2 = findRedirect(loaderResults)
		if (redirect2) {
			await startRedirectNavigation(request, redirect2.result, true, {
				replace: replace2,
			})
			return { shortCircuited: true }
		}
		redirect2 = findRedirect(fetcherResults)
		if (redirect2) {
			fetchRedirectIds.add(redirect2.key)
			await startRedirectNavigation(request, redirect2.result, true, {
				replace: replace2,
			})
			return { shortCircuited: true }
		}
		let { loaderData, errors } = processLoaderData(
			state,
			matches,
			loaderResults,
			pendingActionResult,
			revalidatingFetchers,
			fetcherResults,
		)
		if (initialHydration && state.errors) {
			errors = { ...state.errors, ...errors }
		}
		const updatedFetchers = markFetchRedirectsDone()
		const didAbortFetchLoads = abortStaleFetchLoads(pendingNavigationLoadId)
		const shouldUpdateFetchers =
			updatedFetchers || didAbortFetchLoads || revalidatingFetchers.length > 0
		return {
			matches,
			loaderData,
			errors,
			...(shouldUpdateFetchers ? { fetchers: new Map(state.fetchers) } : {}),
		}
	}
	function getUpdatedActionData(pendingActionResult) {
		if (pendingActionResult && !isErrorResult(pendingActionResult[1])) {
			return {
				[pendingActionResult[0]]: pendingActionResult[1].data,
			}
		} else if (state.actionData) {
			if (Object.keys(state.actionData).length === 0) {
				return null
			} else {
				return state.actionData
			}
		}
	}
	function getUpdatedRevalidatingFetchers(revalidatingFetchers) {
		revalidatingFetchers.forEach(rf => {
			const fetcher = state.fetchers.get(rf.key)
			const revalidatingFetcher = getLoadingFetcher(void 0, fetcher ? fetcher.data : void 0)
			state.fetchers.set(rf.key, revalidatingFetcher)
		})
		return new Map(state.fetchers)
	}
	async function fetch2(key, routeId, href2, opts) {
		abortFetcher(key)
		const flushSync3 = (opts && opts.flushSync) === true
		const routesToUse = dataRoutes.activeRoutes
		const normalizedPath = normalizeTo(
			state.location,
			state.matches,
			basename,
			href2,
			routeId,
			opts == null ? void 0 : opts.relative,
		)
		let matches = matchRoutesImpl(routesToUse, normalizedPath, basename, false, dataRoutes.branches)
		const fogOfWar = checkFogOfWar(matches, routesToUse, normalizedPath)
		if (fogOfWar.active && fogOfWar.matches) {
			matches = fogOfWar.matches
		}
		if (!matches) {
			setFetcherError(key, routeId, getInternalRouterError(404, { pathname: normalizedPath }), {
				flushSync: flushSync3,
			})
			return
		}
		const { path, submission, error } = normalizeNavigateOptions(true, normalizedPath, opts)
		if (error) {
			setFetcherError(key, routeId, error, { flushSync: flushSync3 })
			return
		}
		const scopedContext = init.getContext ? await init.getContext() : new RouterContextProvider()
		const preventScrollReset = (opts && opts.preventScrollReset) === true
		if (submission && isMutationMethod(submission.formMethod)) {
			await handleFetcherAction(
				key,
				routeId,
				path,
				matches,
				scopedContext,
				fogOfWar.active,
				flushSync3,
				preventScrollReset,
				submission,
				opts && opts.defaultShouldRevalidate,
			)
			return
		}
		fetchLoadMatches.set(key, { routeId, path })
		await handleFetcherLoader(
			key,
			routeId,
			path,
			matches,
			scopedContext,
			fogOfWar.active,
			flushSync3,
			preventScrollReset,
			submission,
		)
	}
	async function handleFetcherAction(
		key,
		routeId,
		path,
		requestMatches,
		scopedContext,
		isFogOfWar,
		flushSync3,
		preventScrollReset,
		submission,
		callSiteDefaultShouldRevalidate,
	) {
		interruptActiveLoads()
		fetchLoadMatches.delete(key)
		const existingFetcher = state.fetchers.get(key)
		updateFetcherState(key, getSubmittingFetcher(submission, existingFetcher), {
			flushSync: flushSync3,
		})
		const abortController = new AbortController()
		const fetchRequest = createClientSideRequest(
			init.history,
			path,
			abortController.signal,
			submission,
		)
		if (isFogOfWar) {
			const discoverResult = await discoverRoutes(
				requestMatches,
				new URL(fetchRequest.url).pathname,
				fetchRequest.signal,
				key,
			)
			if (discoverResult.type === "aborted") {
				return
			} else if (discoverResult.type === "error") {
				setFetcherError(key, routeId, discoverResult.error, {
					flushSync: flushSync3,
				})
				return
			} else if (!discoverResult.matches) {
				setFetcherError(key, routeId, getInternalRouterError(404, { pathname: path }), {
					flushSync: flushSync3,
				})
				return
			} else {
				requestMatches = discoverResult.matches
			}
		}
		const match = getTargetMatch(requestMatches, path)
		if (!match.route.action && !match.route.lazy) {
			const error = getInternalRouterError(405, {
				method: submission.formMethod,
				pathname: path,
				routeId,
			})
			setFetcherError(key, routeId, error, { flushSync: flushSync3 })
			return
		}
		fetchControllers.set(key, abortController)
		const originatingLoadId = incrementingLoadId
		const fetchMatches = getTargetedDataStrategyMatches(
			mapRouteProperties2,
			manifest,
			fetchRequest,
			path,
			requestMatches,
			match,
			hydrationRouteProperties2,
			scopedContext,
		)
		const actionResults = await callDataStrategy(
			fetchRequest,
			path,
			fetchMatches,
			scopedContext,
			key,
		)
		let actionResult = actionResults[match.route.id]
		if (!actionResult) {
			for (const match2 of fetchMatches) {
				if (actionResults[match2.route.id]) {
					actionResult = actionResults[match2.route.id]
					break
				}
			}
		}
		if (fetchRequest.signal.aborted) {
			if (fetchControllers.get(key) === abortController) {
				fetchControllers.delete(key)
			}
			return
		}
		if (fetchersQueuedForDeletion.has(key)) {
			if (isRedirectResult(actionResult) || isErrorResult(actionResult)) {
				updateFetcherState(key, getDoneFetcher(void 0))
				return
			}
		} else {
			if (isRedirectResult(actionResult)) {
				fetchControllers.delete(key)
				if (pendingNavigationLoadId > originatingLoadId) {
					updateFetcherState(key, getDoneFetcher(void 0))
					return
				} else {
					fetchRedirectIds.add(key)
					updateFetcherState(key, getLoadingFetcher(submission))
					return startRedirectNavigation(fetchRequest, actionResult, false, {
						fetcherSubmission: submission,
						preventScrollReset,
					})
				}
			}
			if (isErrorResult(actionResult)) {
				setFetcherError(key, routeId, actionResult.error)
				return
			}
		}
		const nextLocation = state.navigation.location || state.location
		const revalidationRequest = createClientSideRequest(
			init.history,
			nextLocation,
			abortController.signal,
		)
		const routesToUse = dataRoutes.activeRoutes
		const matches =
			state.navigation.state !== "idle"
				? matchRoutesImpl(
						routesToUse,
						state.navigation.location,
						basename,
						false,
						dataRoutes.branches,
					)
				: state.matches
		invariant(matches, "Didn't find any matches after fetcher action")
		const loadId = ++incrementingLoadId
		fetchReloadIds.set(key, loadId)
		const loadFetcher = getLoadingFetcher(submission, actionResult.data)
		state.fetchers.set(key, loadFetcher)
		const { dsMatches, revalidatingFetchers } = getMatchesToLoad(
			revalidationRequest,
			scopedContext,
			mapRouteProperties2,
			manifest,
			init.history,
			state,
			matches,
			submission,
			nextLocation,
			hydrationRouteProperties2,
			false,
			isRevalidationRequired,
			cancelledFetcherLoads,
			fetchersQueuedForDeletion,
			fetchLoadMatches,
			fetchRedirectIds,
			routesToUse,
			basename,
			init.patchRoutesOnNavigation != null,
			dataRoutes.branches,
			[match.route.id, actionResult],
			callSiteDefaultShouldRevalidate,
		)
		revalidatingFetchers
			.filter(rf => rf.key !== key)
			.forEach(rf => {
				const staleKey = rf.key
				const existingFetcher2 = state.fetchers.get(staleKey)
				const revalidatingFetcher = getLoadingFetcher(
					void 0,
					existingFetcher2 ? existingFetcher2.data : void 0,
				)
				state.fetchers.set(staleKey, revalidatingFetcher)
				abortFetcher(staleKey)
				if (rf.controller) {
					fetchControllers.set(staleKey, rf.controller)
				}
			})
		updateState({ fetchers: new Map(state.fetchers) })
		const abortPendingFetchRevalidations = () =>
			revalidatingFetchers.forEach(rf => abortFetcher(rf.key))
		abortController.signal.addEventListener("abort", abortPendingFetchRevalidations)
		const { loaderResults, fetcherResults } = await callLoadersAndMaybeResolveData(
			dsMatches,
			revalidatingFetchers,
			revalidationRequest,
			nextLocation,
			scopedContext,
		)
		if (abortController.signal.aborted) {
			return
		}
		abortController.signal.removeEventListener("abort", abortPendingFetchRevalidations)
		fetchReloadIds.delete(key)
		fetchControllers.delete(key)
		revalidatingFetchers.forEach(r => fetchControllers.delete(r.key))
		if (state.fetchers.has(key)) {
			const doneFetcher = getDoneFetcher(actionResult.data)
			state.fetchers.set(key, doneFetcher)
		}
		let redirect2 = findRedirect(loaderResults)
		if (redirect2) {
			return startRedirectNavigation(revalidationRequest, redirect2.result, false, {
				preventScrollReset,
			})
		}
		redirect2 = findRedirect(fetcherResults)
		if (redirect2) {
			fetchRedirectIds.add(redirect2.key)
			return startRedirectNavigation(revalidationRequest, redirect2.result, false, {
				preventScrollReset,
			})
		}
		const { loaderData, errors } = processLoaderData(
			state,
			matches,
			loaderResults,
			void 0,
			revalidatingFetchers,
			fetcherResults,
		)
		abortStaleFetchLoads(loadId)
		if (state.navigation.state === "loading" && loadId > pendingNavigationLoadId) {
			invariant(pendingAction, "Expected pending action")
			pendingNavigationController && pendingNavigationController.abort()
			completeNavigation(state.navigation.location, {
				matches,
				loaderData,
				errors,
				fetchers: new Map(state.fetchers),
			})
		} else {
			updateState({
				errors,
				loaderData: mergeLoaderData(state.loaderData, loaderData, matches, errors),
				fetchers: new Map(state.fetchers),
			})
			isRevalidationRequired = false
		}
	}
	async function handleFetcherLoader(
		key,
		routeId,
		path,
		matches,
		scopedContext,
		isFogOfWar,
		flushSync3,
		preventScrollReset,
		submission,
	) {
		const existingFetcher = state.fetchers.get(key)
		updateFetcherState(
			key,
			getLoadingFetcher(submission, existingFetcher ? existingFetcher.data : void 0),
			{ flushSync: flushSync3 },
		)
		const abortController = new AbortController()
		const fetchRequest = createClientSideRequest(init.history, path, abortController.signal)
		if (isFogOfWar) {
			const discoverResult = await discoverRoutes(
				matches,
				new URL(fetchRequest.url).pathname,
				fetchRequest.signal,
				key,
			)
			if (discoverResult.type === "aborted") {
				return
			} else if (discoverResult.type === "error") {
				setFetcherError(key, routeId, discoverResult.error, {
					flushSync: flushSync3,
				})
				return
			} else if (!discoverResult.matches) {
				setFetcherError(key, routeId, getInternalRouterError(404, { pathname: path }), {
					flushSync: flushSync3,
				})
				return
			} else {
				matches = discoverResult.matches
			}
		}
		const match = getTargetMatch(matches, path)
		fetchControllers.set(key, abortController)
		const originatingLoadId = incrementingLoadId
		const dsMatches = getTargetedDataStrategyMatches(
			mapRouteProperties2,
			manifest,
			fetchRequest,
			path,
			matches,
			match,
			hydrationRouteProperties2,
			scopedContext,
		)
		const results = await callDataStrategy(fetchRequest, path, dsMatches, scopedContext, key)
		let result = results[match.route.id]
		if (!result) {
			for (const match2 of matches) {
				if (results[match2.route.id]) {
					result = results[match2.route.id]
					break
				}
			}
		}
		if (fetchControllers.get(key) === abortController) {
			fetchControllers.delete(key)
		}
		if (fetchRequest.signal.aborted) {
			return
		}
		if (fetchersQueuedForDeletion.has(key)) {
			updateFetcherState(key, getDoneFetcher(void 0))
			return
		}
		if (isRedirectResult(result)) {
			if (pendingNavigationLoadId > originatingLoadId) {
				updateFetcherState(key, getDoneFetcher(void 0))
				return
			} else {
				fetchRedirectIds.add(key)
				await startRedirectNavigation(fetchRequest, result, false, {
					preventScrollReset,
				})
				return
			}
		}
		if (isErrorResult(result)) {
			setFetcherError(key, routeId, result.error)
			return
		}
		updateFetcherState(key, getDoneFetcher(result.data))
	}
	async function startRedirectNavigation(
		request,
		redirect2,
		isNavigation,
		{ submission, fetcherSubmission, preventScrollReset, replace: replace2 } = {},
	) {
		if (!isNavigation) {
			pendingPopstateNavigationDfd == null ? void 0 : pendingPopstateNavigationDfd.resolve()
			pendingPopstateNavigationDfd = null
		}
		if (redirect2.response.headers.has("X-Remix-Revalidate")) {
			isRevalidationRequired = true
		}
		let location2 = redirect2.response.headers.get("Location")
		invariant(location2, "Expected a Location header on the redirect Response")
		location2 = normalizeRedirectLocation(location2, new URL(request.url), basename, init.history)
		const redirectLocation = createLocation(state.location, location2, {
			_isRedirect: true,
		})
		if (isBrowser3) {
			let isDocumentReload = false
			if (redirect2.response.headers.has("X-Remix-Reload-Document")) {
				isDocumentReload = true
			} else if (isAbsoluteUrl(location2)) {
				const url = createBrowserURLImpl(location2, true)
				isDocumentReload = // Hard reload if it's an absolute URL to a new origin
					url.origin !== routerWindow.location.origin || // Hard reload if it's an absolute URL that does not match our basename
					stripBasename(url.pathname, basename) == null
			}
			if (isDocumentReload) {
				if (replace2) {
					routerWindow.location.replace(location2)
				} else {
					routerWindow.location.assign(location2)
				}
				return
			}
		}
		pendingNavigationController = null
		const redirectNavigationType =
			replace2 === true || redirect2.response.headers.has("X-Remix-Replace") ? "REPLACE" : "PUSH"
		const { formMethod, formAction, formEncType } = state.navigation
		if (!submission && !fetcherSubmission && formMethod && formAction && formEncType) {
			submission = getSubmissionFromNavigation(state.navigation)
		}
		const activeSubmission = submission || fetcherSubmission
		if (
			redirectPreserveMethodStatusCodes.has(redirect2.response.status) &&
			activeSubmission &&
			isMutationMethod(activeSubmission.formMethod)
		) {
			await startNavigation(redirectNavigationType, redirectLocation, {
				submission: {
					...activeSubmission,
					formAction: location2,
				},
				// Preserve these flags across redirects
				preventScrollReset: preventScrollReset || pendingPreventScrollReset,
				enableViewTransition: isNavigation ? pendingViewTransitionEnabled : void 0,
			})
		} else {
			const overrideNavigation = getLoadingNavigation(redirectLocation, submission)
			await startNavigation(redirectNavigationType, redirectLocation, {
				overrideNavigation,
				// Send fetcher submissions through for shouldRevalidate
				fetcherSubmission,
				// Preserve these flags across redirects
				preventScrollReset: preventScrollReset || pendingPreventScrollReset,
				enableViewTransition: isNavigation ? pendingViewTransitionEnabled : void 0,
			})
		}
	}
	async function callDataStrategy(request, path, matches, scopedContext, fetcherKey) {
		var _a
		let results
		const dataResults = {}
		try {
			results = await callDataStrategyImpl(
				dataStrategyImpl,
				request,
				path,
				matches,
				fetcherKey,
				scopedContext,
				false,
			)
		} catch (e) {
			matches
				.filter(m => m.shouldLoad)
				.forEach(m => {
					dataResults[m.route.id] = {
						type: "error",
						error: e,
					}
				})
			return dataResults
		}
		if (request.signal.aborted) {
			return dataResults
		}
		if (!isMutationMethod(request.method)) {
			for (const match of matches) {
				if (((_a = results[match.route.id]) == null ? void 0 : _a.type) === "error") {
					break
				}
				if (
					!Object.hasOwn(results, match.route.id) &&
					!Object.hasOwn(state.loaderData, match.route.id) &&
					(!state.errors || !Object.hasOwn(state.errors, match.route.id)) &&
					match.shouldCallHandler()
				) {
					results[match.route.id] = {
						type: "error",
						result: new Error(`No result returned from dataStrategy for route ${match.route.id}`),
					}
				}
			}
		}
		for (const [routeId, result] of Object.entries(results)) {
			if (isRedirectDataStrategyResult(result)) {
				const response = result.result
				dataResults[routeId] = {
					type: "redirect",
					response: normalizeRelativeRoutingRedirectResponse(
						response,
						request,
						routeId,
						matches,
						basename,
					),
				}
			} else {
				dataResults[routeId] = await convertDataStrategyResultToDataResult(result)
			}
		}
		return dataResults
	}
	async function callLoadersAndMaybeResolveData(
		matches,
		fetchersToLoad,
		request,
		location2,
		scopedContext,
	) {
		const loaderResultsPromise = callDataStrategy(request, location2, matches, scopedContext, null)
		const fetcherResultsPromise = Promise.all(
			fetchersToLoad.map(async f => {
				if (f.matches && f.match && f.request && f.controller) {
					const results = await callDataStrategy(f.request, f.path, f.matches, scopedContext, f.key)
					const result = results[f.match.route.id]
					return { [f.key]: result }
				} else {
					return Promise.resolve({
						[f.key]: {
							type: "error",
							error: getInternalRouterError(404, {
								pathname: f.path,
							}),
						},
					})
				}
			}),
		)
		const loaderResults = await loaderResultsPromise
		const fetcherResults = (await fetcherResultsPromise).reduce(
			(acc, r) => Object.assign(acc, r),
			{},
		)
		return {
			loaderResults,
			fetcherResults,
		}
	}
	function interruptActiveLoads() {
		isRevalidationRequired = true
		fetchLoadMatches.forEach((_, key) => {
			if (fetchControllers.has(key)) {
				cancelledFetcherLoads.add(key)
			}
			abortFetcher(key)
		})
	}
	function updateFetcherState(key, fetcher, opts = {}) {
		state.fetchers.set(key, fetcher)
		updateState(
			{ fetchers: new Map(state.fetchers) },
			{ flushSync: (opts && opts.flushSync) === true },
		)
	}
	function setFetcherError(key, routeId, error, opts = {}) {
		const boundaryMatch = findNearestBoundary(state.matches, routeId)
		deleteFetcher(key)
		updateState(
			{
				errors: {
					[boundaryMatch.route.id]: error,
				},
				fetchers: new Map(state.fetchers),
			},
			{ flushSync: (opts && opts.flushSync) === true },
		)
	}
	function getFetcher(key) {
		activeFetchers.set(key, (activeFetchers.get(key) || 0) + 1)
		if (fetchersQueuedForDeletion.has(key)) {
			fetchersQueuedForDeletion.delete(key)
		}
		return state.fetchers.get(key) || IDLE_FETCHER
	}
	function resetFetcher(key, opts) {
		abortFetcher(key, opts == null ? void 0 : opts.reason)
		updateFetcherState(key, getDoneFetcher(null))
	}
	function deleteFetcher(key) {
		const fetcher = state.fetchers.get(key)
		if (
			fetchControllers.has(key) &&
			!(fetcher && fetcher.state === "loading" && fetchReloadIds.has(key))
		) {
			abortFetcher(key)
		}
		fetchLoadMatches.delete(key)
		fetchReloadIds.delete(key)
		fetchRedirectIds.delete(key)
		fetchersQueuedForDeletion.delete(key)
		cancelledFetcherLoads.delete(key)
		state.fetchers.delete(key)
	}
	function queueFetcherForDeletion(key) {
		const count = (activeFetchers.get(key) || 0) - 1
		if (count <= 0) {
			activeFetchers.delete(key)
			fetchersQueuedForDeletion.add(key)
		} else {
			activeFetchers.set(key, count)
		}
		updateState({ fetchers: new Map(state.fetchers) })
	}
	function abortFetcher(key, reason) {
		const controller = fetchControllers.get(key)
		if (controller) {
			controller.abort(reason)
			fetchControllers.delete(key)
		}
	}
	function markFetchersDone(keys) {
		for (const key of keys) {
			const fetcher = getFetcher(key)
			const doneFetcher = getDoneFetcher(fetcher.data)
			state.fetchers.set(key, doneFetcher)
		}
	}
	function markFetchRedirectsDone() {
		const doneKeys = []
		let updatedFetchers = false
		for (const key of fetchRedirectIds) {
			const fetcher = state.fetchers.get(key)
			invariant(fetcher, `Expected fetcher: ${key}`)
			if (fetcher.state === "loading") {
				fetchRedirectIds.delete(key)
				doneKeys.push(key)
				updatedFetchers = true
			}
		}
		markFetchersDone(doneKeys)
		return updatedFetchers
	}
	function abortStaleFetchLoads(landedId) {
		const yeetedKeys = []
		for (const [key, id] of fetchReloadIds) {
			if (id < landedId) {
				const fetcher = state.fetchers.get(key)
				invariant(fetcher, `Expected fetcher: ${key}`)
				if (fetcher.state === "loading") {
					abortFetcher(key)
					fetchReloadIds.delete(key)
					yeetedKeys.push(key)
				}
			}
		}
		markFetchersDone(yeetedKeys)
		return yeetedKeys.length > 0
	}
	function getBlocker(key, fn) {
		const blocker = state.blockers.get(key) || IDLE_BLOCKER
		if (blockerFunctions.get(key) !== fn) {
			blockerFunctions.set(key, fn)
		}
		return blocker
	}
	function deleteBlocker(key) {
		state.blockers.delete(key)
		blockerFunctions.delete(key)
	}
	function updateBlocker(key, newBlocker) {
		const blocker = state.blockers.get(key) || IDLE_BLOCKER
		invariant(
			(blocker.state === "unblocked" && newBlocker.state === "blocked") ||
				(blocker.state === "blocked" && newBlocker.state === "blocked") ||
				(blocker.state === "blocked" && newBlocker.state === "proceeding") ||
				(blocker.state === "blocked" && newBlocker.state === "unblocked") ||
				(blocker.state === "proceeding" && newBlocker.state === "unblocked"),
			`Invalid blocker state transition: ${blocker.state} -> ${newBlocker.state}`,
		)
		const blockers = new Map(state.blockers)
		blockers.set(key, newBlocker)
		updateState({ blockers })
	}
	function shouldBlockNavigation({ currentLocation, nextLocation, historyAction }) {
		if (blockerFunctions.size === 0) {
			return
		}
		if (blockerFunctions.size > 1) {
			warning(false, "A router only supports one blocker at a time")
		}
		const entries = Array.from(blockerFunctions.entries())
		const [blockerKey, blockerFunction] = entries[entries.length - 1]
		const blocker = state.blockers.get(blockerKey)
		if (blocker && blocker.state === "proceeding") {
			return
		}
		if (blockerFunction({ currentLocation, nextLocation, historyAction })) {
			return blockerKey
		}
	}
	function handleNavigational404(pathname) {
		const error = getInternalRouterError(404, { pathname })
		const routesToUse = dataRoutes.activeRoutes
		const { matches, route } = getShortCircuitMatches(routesToUse)
		return { notFoundMatches: matches, route, error }
	}
	function enableScrollRestoration(positions, getPosition, getKey) {
		savedScrollPositions2 = positions
		getScrollPosition = getPosition
		getScrollRestorationKey2 = getKey || null
		if (!initialScrollRestored && state.navigation === IDLE_NAVIGATION) {
			initialScrollRestored = true
			const y = getSavedScrollPosition(state.location, state.matches)
			if (y != null) {
				updateState({ restoreScrollPosition: y })
			}
		}
		return () => {
			savedScrollPositions2 = null
			getScrollPosition = null
			getScrollRestorationKey2 = null
		}
	}
	function getScrollKey(location2, matches) {
		if (getScrollRestorationKey2) {
			const key = getScrollRestorationKey2(
				location2,
				matches.map(m => convertRouteMatchToUiMatch(m, state.loaderData)),
			)
			return key || location2.key
		}
		return location2.key
	}
	function saveScrollPosition(location2, matches) {
		if (savedScrollPositions2 && getScrollPosition) {
			const key = getScrollKey(location2, matches)
			savedScrollPositions2[key] = getScrollPosition()
		}
	}
	function getSavedScrollPosition(location2, matches) {
		if (savedScrollPositions2) {
			const key = getScrollKey(location2, matches)
			const y = savedScrollPositions2[key]
			if (typeof y === "number") {
				return y
			}
		}
		return null
	}
	function checkFogOfWar(matches, routesToUse, pathname) {
		if (init.patchRoutesOnNavigation) {
			const activeBranches = dataRoutes.branches
			if (!matches) {
				const fogMatches = matchRoutesImpl(routesToUse, pathname, basename, true, activeBranches)
				return { active: true, matches: fogMatches || [] }
			} else {
				if (Object.keys(matches[0].params).length > 0) {
					const partialMatches = matchRoutesImpl(
						routesToUse,
						pathname,
						basename,
						true,
						activeBranches,
					)
					return { active: true, matches: partialMatches }
				}
			}
		}
		return { active: false, matches: null }
	}
	async function discoverRoutes(matches, pathname, signal, fetcherKey) {
		if (!init.patchRoutesOnNavigation) {
			return { type: "success", matches }
		}
		let partialMatches = matches
		while (true) {
			const localManifest = manifest
			try {
				await init.patchRoutesOnNavigation({
					signal,
					path: pathname,
					matches: partialMatches,
					fetcherKey,
					patch: (routeId, children) => {
						if (signal.aborted) return
						patchRoutesImpl(
							routeId,
							children,
							dataRoutes,
							localManifest,
							mapRouteProperties2,
							false,
						)
					},
				})
			} catch (e) {
				return { type: "error", error: e, partialMatches }
			}
			if (signal.aborted) {
				return { type: "aborted" }
			}
			const activeBranches = dataRoutes.branches
			const newMatches = matchRoutesImpl(
				dataRoutes.activeRoutes,
				pathname,
				basename,
				false,
				activeBranches,
			)
			let newPartialMatches = null
			if (newMatches) {
				if (Object.keys(newMatches[0].params).length === 0) {
					return { type: "success", matches: newMatches }
				} else {
					newPartialMatches = matchRoutesImpl(
						dataRoutes.activeRoutes,
						pathname,
						basename,
						true,
						activeBranches,
					)
					const matchedDeeper =
						newPartialMatches &&
						partialMatches.length < newPartialMatches.length &&
						compareMatches(partialMatches, newPartialMatches.slice(0, partialMatches.length))
					if (!matchedDeeper) {
						return { type: "success", matches: newMatches }
					}
				}
			}
			if (!newPartialMatches) {
				newPartialMatches = matchRoutesImpl(
					dataRoutes.activeRoutes,
					pathname,
					basename,
					true,
					activeBranches,
				)
			}
			if (!newPartialMatches || compareMatches(partialMatches, newPartialMatches)) {
				return { type: "success", matches: null }
			}
			partialMatches = newPartialMatches
		}
	}
	function compareMatches(a, b) {
		return a.length === b.length && a.every((m, i) => m.route.id === b[i].route.id)
	}
	function _internalSetRoutes(newRoutes) {
		manifest = {}
		dataRoutes.setHmrRoutes(
			convertRoutesToDataRoutes(newRoutes, mapRouteProperties2, void 0, manifest),
		)
	}
	function patchRoutes(routeId, children, unstable_allowElementMutations = false) {
		patchRoutesImpl(
			routeId,
			children,
			dataRoutes,
			manifest,
			mapRouteProperties2,
			unstable_allowElementMutations,
		)
		if (!dataRoutes.hasHMRRoutes) {
			updateState({})
		}
	}
	router2 = {
		get basename() {
			return basename
		},
		get future() {
			return future
		},
		get state() {
			return state
		},
		get routes() {
			return dataRoutes.stableRoutes
		},
		get branches() {
			return dataRoutes.branches
		},
		get manifest() {
			return manifest
		},
		get window() {
			return routerWindow
		},
		initialize,
		subscribe,
		enableScrollRestoration,
		navigate,
		fetch: fetch2,
		revalidate,
		// Passthrough to history-aware createHref used by useHref so we get proper
		// hash-aware URLs in DOM paths
		createHref: to => init.history.createHref(to),
		encodeLocation: to => init.history.encodeLocation(to),
		getFetcher,
		resetFetcher,
		deleteFetcher: queueFetcherForDeletion,
		dispose,
		getBlocker,
		deleteBlocker,
		patchRoutes,
		_internalFetchControllers: fetchControllers,
		// TODO: Remove setRoutes, it's temporary to avoid dealing with
		// updating the tree while validating the update algorithm.
		_internalSetRoutes,
		_internalSetStateDoNotUseOrYouWillBreakYourApp(newState) {
			updateState(newState)
		},
	}
	if (init.instrumentations) {
		router2 = instrumentClientSideRouter(
			router2,
			init.instrumentations.map(i => i.router).filter(Boolean),
		)
	}
	return router2
}
function createStaticHandler(routes, opts) {
	invariant(routes.length > 0, "You must provide a non-empty routes array to createStaticHandler")
	const manifest = {}
	const basename = (opts ? opts.basename : null) || "/"
	const _mapRouteProperties =
		(opts == null ? void 0 : opts.mapRouteProperties) || defaultMapRouteProperties
	let mapRouteProperties2 = _mapRouteProperties
	const future = {
		...(opts == null ? void 0 : opts.future),
	}
	if (opts == null ? void 0 : opts.instrumentations) {
		const instrumentations = opts.instrumentations
		mapRouteProperties2 = route => {
			return {
				..._mapRouteProperties(route),
				...getRouteInstrumentationUpdates(
					instrumentations.map(i => i.route).filter(Boolean),
					route,
				),
			}
		}
	}
	const dataRoutes = convertRoutesToDataRoutes(routes, mapRouteProperties2, void 0, manifest)
	const routeBranches = flattenAndRankRoutes(dataRoutes)
	async function query(
		request,
		{
			requestContext,
			filterMatchesToLoad,
			skipLoaderErrorBubbling,
			skipRevalidation,
			dataStrategy,
			generateMiddlewareResponse,
			normalizePath,
		} = {},
	) {
		const normalizePathImpl = normalizePath || defaultNormalizePath
		const method = request.method
		const location2 = createLocation("", normalizePathImpl(request), null, "default")
		const matches = matchRoutesImpl(dataRoutes, location2, basename, false, routeBranches)
		requestContext = requestContext != null ? requestContext : new RouterContextProvider()
		if (!isValidMethod(method) && method !== "HEAD") {
			const error = getInternalRouterError(405, { method })
			const { matches: methodNotAllowedMatches, route } = getShortCircuitMatches(dataRoutes)
			const staticContext = {
				basename,
				location: location2,
				matches: methodNotAllowedMatches,
				loaderData: {},
				actionData: null,
				errors: {
					[route.id]: error,
				},
				statusCode: error.status,
				loaderHeaders: {},
				actionHeaders: {},
			}
			return generateMiddlewareResponse
				? generateMiddlewareResponse(() => Promise.resolve(staticContext))
				: staticContext
		} else if (!matches) {
			const error = getInternalRouterError(404, { pathname: location2.pathname })
			const { matches: notFoundMatches, route } = getShortCircuitMatches(dataRoutes)
			const staticContext = {
				basename,
				location: location2,
				matches: notFoundMatches,
				loaderData: {},
				actionData: null,
				errors: {
					[route.id]: error,
				},
				statusCode: error.status,
				loaderHeaders: {},
				actionHeaders: {},
			}
			return generateMiddlewareResponse
				? generateMiddlewareResponse(() => Promise.resolve(staticContext))
				: staticContext
		}
		if (generateMiddlewareResponse) {
			invariant(
				requestContext instanceof RouterContextProvider,
				"When using middleware in `staticHandler.query()`, any provided `requestContext` must be an instance of `RouterContextProvider`",
			)
			try {
				await loadLazyMiddlewareForMatches(matches, manifest, mapRouteProperties2)
				let renderedStaticContext
				const response = await runServerMiddlewarePipeline(
					{
						request,
						url: createDataFunctionUrl(request, location2),
						pattern: getRoutePattern(matches),
						matches,
						params: matches[0].params,
						// If we're calling middleware then it must be enabled so we can cast
						// this to the proper type knowing it's not an `AppLoadContext`
						context: requestContext,
					},
					async () => {
						const res = await generateMiddlewareResponse(
							async (revalidationRequest, opts2 = {}) => {
								const result2 = await queryImpl(
									revalidationRequest,
									location2,
									matches,
									requestContext,
									dataStrategy || null,
									skipLoaderErrorBubbling === true,
									null,
									"filterMatchesToLoad" in opts2
										? (opts2.filterMatchesToLoad ?? null)
										: (filterMatchesToLoad ?? null),
									skipRevalidation === true,
								)
								if (isResponse(result2)) {
									return result2
								}
								renderedStaticContext = {
									location: location2,
									basename,
									...result2,
								}
								return renderedStaticContext
							},
						)
						return res
					},
					async (error, routeId) => {
						var _a
						if (isRedirectResponse(error)) {
							return error
						}
						if (isResponse(error)) {
							try {
								error = new ErrorResponseImpl(
									error.status,
									error.statusText,
									await parseResponseBody(error),
								)
							} catch (e) {
								error = e
							}
						}
						if (isDataWithResponseInit(error)) {
							error = dataWithResponseInitToErrorResponse(error)
						}
						if (renderedStaticContext) {
							if (routeId in renderedStaticContext.loaderData) {
								renderedStaticContext.loaderData[routeId] = void 0
							}
							const staticContext = getStaticContextFromError(
								dataRoutes,
								renderedStaticContext,
								error,
								skipLoaderErrorBubbling ? routeId : findNearestBoundary(matches, routeId).route.id,
							)
							return generateMiddlewareResponse(() => Promise.resolve(staticContext))
						} else {
							const boundaryRouteId = skipLoaderErrorBubbling
								? routeId
								: findNearestBoundary(
										matches,
										((_a = matches.find(m => m.route.id === routeId || m.route.loader)) == null
											? void 0
											: _a.route.id) || routeId,
									).route.id
							const staticContext = {
								matches,
								location: location2,
								basename,
								loaderData: {},
								actionData: null,
								errors: {
									[boundaryRouteId]: error,
								},
								statusCode: isRouteErrorResponse(error) ? error.status : 500,
								actionHeaders: {},
								loaderHeaders: {},
							}
							return generateMiddlewareResponse(() => Promise.resolve(staticContext))
						}
					},
				)
				invariant(isResponse(response), "Expected a response in query()")
				return response
			} catch (e) {
				if (isResponse(e)) {
					return e
				}
				throw e
			}
		}
		const result = await queryImpl(
			request,
			location2,
			matches,
			requestContext,
			dataStrategy || null,
			skipLoaderErrorBubbling === true,
			null,
			filterMatchesToLoad || null,
			skipRevalidation === true,
		)
		if (isResponse(result)) {
			return result
		}
		return { location: location2, basename, ...result }
	}
	async function queryRoute(
		request,
		{ routeId, requestContext, dataStrategy, generateMiddlewareResponse, normalizePath } = {},
	) {
		const normalizePathImpl = normalizePath || defaultNormalizePath
		const method = request.method
		const location2 = createLocation("", normalizePathImpl(request), null, "default")
		const matches = matchRoutesImpl(dataRoutes, location2, basename, false, routeBranches)
		requestContext = requestContext != null ? requestContext : new RouterContextProvider()
		if (!isValidMethod(method) && method !== "HEAD" && method !== "OPTIONS") {
			throw getInternalRouterError(405, { method })
		} else if (!matches) {
			throw getInternalRouterError(404, { pathname: location2.pathname })
		}
		const match = routeId
			? matches.find(m => m.route.id === routeId)
			: getTargetMatch(matches, location2)
		if (routeId && !match) {
			throw getInternalRouterError(403, {
				pathname: location2.pathname,
				routeId,
			})
		} else if (!match) {
			throw getInternalRouterError(404, { pathname: location2.pathname })
		}
		if (generateMiddlewareResponse) {
			invariant(
				requestContext instanceof RouterContextProvider,
				"When using middleware in `staticHandler.queryRoute()`, any provided `requestContext` must be an instance of `RouterContextProvider`",
			)
			await loadLazyMiddlewareForMatches(matches, manifest, mapRouteProperties2)
			const response = await runServerMiddlewarePipeline(
				{
					request,
					url: createDataFunctionUrl(request, location2),
					pattern: getRoutePattern(matches),
					matches,
					params: matches[0].params,
					// If we're calling middleware then it must be enabled so we can cast
					// this to the proper type knowing it's not an `AppLoadContext`
					context: requestContext,
				},
				async () => {
					const res = await generateMiddlewareResponse(async innerRequest => {
						const result2 = await queryImpl(
							innerRequest,
							location2,
							matches,
							requestContext,
							dataStrategy || null,
							false,
							match,
							null,
							false,
						)
						const processed = handleQueryResult(result2)
						return isResponse(processed)
							? processed
							: typeof processed === "string"
								? new Response(processed)
								: Response.json(processed)
					})
					return res
				},
				error => {
					if (isDataWithResponseInit(error)) {
						return Promise.resolve(dataWithResponseInitToResponse(error))
					}
					if (isResponse(error)) {
						return Promise.resolve(error)
					}
					throw error
				},
			)
			return response
		}
		const result = await queryImpl(
			request,
			location2,
			matches,
			requestContext,
			dataStrategy || null,
			false,
			match,
			null,
			false,
		)
		return handleQueryResult(result)
		function handleQueryResult(result2) {
			if (isResponse(result2)) {
				return result2
			}
			const error = result2.errors ? Object.values(result2.errors)[0] : void 0
			if (error !== void 0) {
				throw error
			}
			if (result2.actionData) {
				return Object.values(result2.actionData)[0]
			}
			if (result2.loaderData) {
				return Object.values(result2.loaderData)[0]
			}
			return void 0
		}
	}
	async function queryImpl(
		request,
		location2,
		matches,
		requestContext,
		dataStrategy,
		skipLoaderErrorBubbling,
		routeMatch,
		filterMatchesToLoad,
		skipRevalidation,
	) {
		invariant(
			request.signal,
			"query()/queryRoute() requests must contain an AbortController signal",
		)
		try {
			if (isMutationMethod(request.method)) {
				const result2 = await submit(
					request,
					location2,
					matches,
					routeMatch || getTargetMatch(matches, location2),
					requestContext,
					dataStrategy,
					skipLoaderErrorBubbling,
					routeMatch != null,
					filterMatchesToLoad,
					skipRevalidation,
				)
				return result2
			}
			const result = await loadRouteData(
				request,
				location2,
				matches,
				requestContext,
				dataStrategy,
				skipLoaderErrorBubbling,
				routeMatch,
				filterMatchesToLoad,
			)
			return isResponse(result)
				? result
				: {
						...result,
						actionData: null,
						actionHeaders: {},
					}
		} catch (e) {
			if (isDataStrategyResult(e) && isResponse(e.result)) {
				if (e.type === "error") {
					throw e.result
				}
				return e.result
			}
			if (isRedirectResponse(e)) {
				return e
			}
			throw e
		}
	}
	async function submit(
		request,
		location2,
		matches,
		actionMatch,
		requestContext,
		dataStrategy,
		skipLoaderErrorBubbling,
		isRouteRequest,
		filterMatchesToLoad,
		skipRevalidation,
	) {
		let result
		if (!actionMatch.route.action && !actionMatch.route.lazy) {
			const error = getInternalRouterError(405, {
				method: request.method,
				pathname: new URL(request.url).pathname,
				routeId: actionMatch.route.id,
			})
			if (isRouteRequest) {
				throw error
			}
			result = {
				type: "error",
				error,
			}
		} else {
			const dsMatches = getTargetedDataStrategyMatches(
				mapRouteProperties2,
				manifest,
				request,
				location2,
				matches,
				actionMatch,
				[],
				requestContext,
			)
			const results = await callDataStrategy(
				request,
				location2,
				dsMatches,
				isRouteRequest,
				requestContext,
				dataStrategy,
			)
			result = results[actionMatch.route.id]
			if (request.signal.aborted) {
				throwStaticHandlerAbortedError(request, isRouteRequest)
			}
		}
		if (isRedirectResult(result)) {
			throw new Response(null, {
				status: result.response.status,
				headers: {
					Location: result.response.headers.get("Location"),
				},
			})
		}
		if (isRouteRequest) {
			if (isErrorResult(result)) {
				throw result.error
			}
			return {
				matches: [actionMatch],
				loaderData: {},
				actionData: { [actionMatch.route.id]: result.data },
				errors: null,
				// Note: statusCode + headers are unused here since queryRoute will
				// return the raw Response or value
				statusCode: 200,
				loaderHeaders: {},
				actionHeaders: {},
			}
		}
		if (skipRevalidation) {
			if (isErrorResult(result)) {
				const boundaryMatch = skipLoaderErrorBubbling
					? actionMatch
					: findNearestBoundary(matches, actionMatch.route.id)
				return {
					statusCode: isRouteErrorResponse(result.error)
						? result.error.status
						: result.statusCode != null
							? result.statusCode
							: 500,
					actionData: null,
					actionHeaders: {
						...(result.headers ? { [actionMatch.route.id]: result.headers } : {}),
					},
					matches,
					loaderData: {},
					errors: {
						[boundaryMatch.route.id]: result.error,
					},
					loaderHeaders: {},
				}
			} else {
				return {
					actionData: {
						[actionMatch.route.id]: result.data,
					},
					actionHeaders: result.headers ? { [actionMatch.route.id]: result.headers } : {},
					matches,
					loaderData: {},
					errors: null,
					statusCode: result.statusCode || 200,
					loaderHeaders: {},
				}
			}
		}
		const loaderRequest = new Request(request.url, {
			headers: request.headers,
			redirect: request.redirect,
			signal: request.signal,
		})
		if (isErrorResult(result)) {
			const boundaryMatch = skipLoaderErrorBubbling
				? actionMatch
				: findNearestBoundary(matches, actionMatch.route.id)
			const handlerContext2 = await loadRouteData(
				loaderRequest,
				location2,
				matches,
				requestContext,
				dataStrategy,
				skipLoaderErrorBubbling,
				null,
				filterMatchesToLoad,
				[boundaryMatch.route.id, result],
			)
			return {
				...handlerContext2,
				statusCode: isRouteErrorResponse(result.error)
					? result.error.status
					: result.statusCode != null
						? result.statusCode
						: 500,
				actionData: null,
				actionHeaders: {
					...(result.headers ? { [actionMatch.route.id]: result.headers } : {}),
				},
			}
		}
		const handlerContext = await loadRouteData(
			loaderRequest,
			location2,
			matches,
			requestContext,
			dataStrategy,
			skipLoaderErrorBubbling,
			null,
			filterMatchesToLoad,
		)
		return {
			...handlerContext,
			actionData: {
				[actionMatch.route.id]: result.data,
			},
			// action status codes take precedence over loader status codes
			...(result.statusCode ? { statusCode: result.statusCode } : {}),
			actionHeaders: result.headers ? { [actionMatch.route.id]: result.headers } : {},
		}
	}
	async function loadRouteData(
		request,
		location2,
		matches,
		requestContext,
		dataStrategy,
		skipLoaderErrorBubbling,
		routeMatch,
		filterMatchesToLoad,
		pendingActionResult,
	) {
		const isRouteRequest = routeMatch != null
		if (
			isRouteRequest &&
			!(routeMatch == null ? void 0 : routeMatch.route.loader) &&
			!(routeMatch == null ? void 0 : routeMatch.route.lazy)
		) {
			throw getInternalRouterError(400, {
				method: request.method,
				pathname: new URL(request.url).pathname,
				routeId: routeMatch == null ? void 0 : routeMatch.route.id,
			})
		}
		let dsMatches
		if (routeMatch) {
			dsMatches = getTargetedDataStrategyMatches(
				mapRouteProperties2,
				manifest,
				request,
				location2,
				matches,
				routeMatch,
				[],
				requestContext,
			)
		} else {
			const maxIdx =
				pendingActionResult && isErrorResult(pendingActionResult[1])
					? // Up to but not including the boundary
						matches.findIndex(m => m.route.id === pendingActionResult[0]) - 1
					: void 0
			const pattern = getRoutePattern(matches)
			dsMatches = matches.map((match, index) => {
				if (maxIdx != null && index > maxIdx) {
					return getDataStrategyMatch(
						mapRouteProperties2,
						manifest,
						request,
						location2,
						pattern,
						match,
						[],
						requestContext,
						false,
					)
				}
				return getDataStrategyMatch(
					mapRouteProperties2,
					manifest,
					request,
					location2,
					pattern,
					match,
					[],
					requestContext,
					(match.route.loader || match.route.lazy) != null &&
						(!filterMatchesToLoad || filterMatchesToLoad(match)),
				)
			})
		}
		if (!dataStrategy && !dsMatches.some(m => m.shouldLoad)) {
			return {
				matches,
				loaderData: {},
				errors:
					pendingActionResult && isErrorResult(pendingActionResult[1])
						? {
								[pendingActionResult[0]]: pendingActionResult[1].error,
							}
						: null,
				statusCode: 200,
				loaderHeaders: {},
			}
		}
		const results = await callDataStrategy(
			request,
			location2,
			dsMatches,
			isRouteRequest,
			requestContext,
			dataStrategy,
		)
		if (request.signal.aborted) {
			throwStaticHandlerAbortedError(request, isRouteRequest)
		}
		const handlerContext = processRouteLoaderData(
			matches,
			results,
			pendingActionResult,
			true,
			skipLoaderErrorBubbling,
		)
		return {
			...handlerContext,
			matches,
		}
	}
	async function callDataStrategy(
		request,
		location2,
		matches,
		isRouteRequest,
		requestContext,
		dataStrategy,
	) {
		const results = await callDataStrategyImpl(
			dataStrategy || defaultDataStrategy,
			request,
			location2,
			matches,
			null,
			requestContext,
			true,
		)
		const dataResults = {}
		await Promise.all(
			matches.map(async match => {
				if (!(match.route.id in results)) {
					return
				}
				const result = results[match.route.id]
				if (isRedirectDataStrategyResult(result)) {
					const response = result.result
					throw normalizeRelativeRoutingRedirectResponse(
						response,
						request,
						match.route.id,
						matches,
						basename,
					)
				}
				if (isRouteRequest) {
					if (isResponse(result.result)) {
						throw result
					} else if (isDataWithResponseInit(result.result)) {
						throw dataWithResponseInitToResponse(result.result)
					}
				}
				dataResults[match.route.id] = await convertDataStrategyResultToDataResult(result)
			}),
		)
		return dataResults
	}
	return {
		dataRoutes,
		_internalRouteBranches: routeBranches,
		query,
		queryRoute,
	}
}
function getStaticContextFromError(routes, handlerContext, error, boundaryId) {
	const errorBoundaryId = boundaryId || handlerContext._deepestRenderedBoundaryId || routes[0].id
	return {
		...handlerContext,
		statusCode: isRouteErrorResponse(error) ? error.status : 500,
		errors: {
			[errorBoundaryId]: error,
		},
	}
}
function throwStaticHandlerAbortedError(request, isRouteRequest) {
	if (request.signal.reason !== void 0) {
		throw request.signal.reason
	}
	const method = isRouteRequest ? "queryRoute" : "query"
	throw new Error(
		`${method}() call aborted without an \`AbortSignal.reason\`: ${request.method} ${request.url}`,
	)
}
function isSubmissionNavigation(opts) {
	return (
		opts != null &&
		(("formData" in opts && opts.formData != null) || ("body" in opts && opts.body !== void 0))
	)
}
function defaultNormalizePath(request) {
	const url = new URL(request.url)
	return {
		pathname: url.pathname,
		search: url.search,
		hash: url.hash,
	}
}
function normalizeTo(location2, matches, basename, to, fromRouteId, relative) {
	let contextualMatches
	let activeRouteMatch
	if (fromRouteId) {
		contextualMatches = []
		for (const match of matches) {
			contextualMatches.push(match)
			if (match.route.id === fromRouteId) {
				activeRouteMatch = match
				break
			}
		}
	} else {
		contextualMatches = matches
		activeRouteMatch = matches[matches.length - 1]
	}
	const path = resolveTo(
		to ? to : ".",
		getResolveToMatches(contextualMatches),
		stripBasename(location2.pathname, basename) || location2.pathname,
		relative === "path",
	)
	if (to == null) {
		path.search = location2.search
		path.hash = location2.hash
	}
	if ((to == null || to === "" || to === ".") && activeRouteMatch) {
		const nakedIndex = hasNakedIndexQuery(path.search)
		if (activeRouteMatch.route.index && !nakedIndex) {
			path.search = path.search ? path.search.replace(/^\?/, "?index&") : "?index"
		} else if (!activeRouteMatch.route.index && nakedIndex) {
			const params = new URLSearchParams(path.search)
			const indexValues = params.getAll("index")
			params.delete("index")
			indexValues.filter(v => v).forEach(v => params.append("index", v))
			const qs = params.toString()
			path.search = qs ? `?${qs}` : ""
		}
	}
	if (basename !== "/") {
		path.pathname = prependBasename({ basename, pathname: path.pathname })
	}
	return createPath(path)
}
function normalizeNavigateOptions(isFetcher, path, opts) {
	if (!opts || !isSubmissionNavigation(opts)) {
		return { path }
	}
	if (opts.formMethod && !isValidMethod(opts.formMethod)) {
		return {
			path,
			error: getInternalRouterError(405, { method: opts.formMethod }),
		}
	}
	const getInvalidBodyError = () => ({
		path,
		error: getInternalRouterError(400, { type: "invalid-body" }),
	})
	const rawFormMethod = opts.formMethod || "get"
	const formMethod = rawFormMethod.toUpperCase()
	const formAction = stripHashFromPath(path)
	if (opts.body !== void 0) {
		if (opts.formEncType === "text/plain") {
			if (!isMutationMethod(formMethod)) {
				return getInvalidBodyError()
			}
			const text =
				typeof opts.body === "string"
					? opts.body
					: opts.body instanceof FormData || opts.body instanceof URLSearchParams
						? // https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#plain-text-form-data
							Array.from(opts.body.entries()).reduce(
								(acc, [name, value]) => `${acc}${name}=${value}
`,
								"",
							)
						: String(opts.body)
			return {
				path,
				submission: {
					formMethod,
					formAction,
					formEncType: opts.formEncType,
					formData: void 0,
					json: void 0,
					text,
				},
			}
		} else if (opts.formEncType === "application/json") {
			if (!isMutationMethod(formMethod)) {
				return getInvalidBodyError()
			}
			try {
				const json = typeof opts.body === "string" ? JSON.parse(opts.body) : opts.body
				return {
					path,
					submission: {
						formMethod,
						formAction,
						formEncType: opts.formEncType,
						formData: void 0,
						json,
						text: void 0,
					},
				}
			} catch (e) {
				return getInvalidBodyError()
			}
		}
	}
	invariant(typeof FormData === "function", "FormData is not available in this environment")
	let searchParams
	let formData
	if (opts.formData) {
		searchParams = convertFormDataToSearchParams(opts.formData)
		formData = opts.formData
	} else if (opts.body instanceof FormData) {
		searchParams = convertFormDataToSearchParams(opts.body)
		formData = opts.body
	} else if (opts.body instanceof URLSearchParams) {
		searchParams = opts.body
		formData = convertSearchParamsToFormData(searchParams)
	} else if (opts.body == null) {
		searchParams = new URLSearchParams()
		formData = new FormData()
	} else {
		try {
			searchParams = new URLSearchParams(opts.body)
			formData = convertSearchParamsToFormData(searchParams)
		} catch (e) {
			return getInvalidBodyError()
		}
	}
	const submission = {
		formMethod,
		formAction,
		formEncType: (opts && opts.formEncType) || "application/x-www-form-urlencoded",
		formData,
		json: void 0,
		text: void 0,
	}
	if (isMutationMethod(submission.formMethod)) {
		return { path, submission }
	}
	const parsedPath = parsePath(path)
	if (isFetcher && parsedPath.search && hasNakedIndexQuery(parsedPath.search)) {
		searchParams.append("index", "")
	}
	parsedPath.search = `?${searchParams}`
	return { path: createPath(parsedPath), submission }
}
function getMatchesToLoad(
	request,
	scopedContext,
	mapRouteProperties2,
	manifest,
	history,
	state,
	matches,
	submission,
	location2,
	lazyRoutePropertiesToSkip,
	initialHydration,
	isRevalidationRequired,
	cancelledFetcherLoads,
	fetchersQueuedForDeletion,
	fetchLoadMatches,
	fetchRedirectIds,
	routesToUse,
	basename,
	hasPatchRoutesOnNavigation,
	branches,
	pendingActionResult,
	callSiteDefaultShouldRevalidate,
) {
	var _a
	const actionResult = pendingActionResult
		? isErrorResult(pendingActionResult[1])
			? pendingActionResult[1].error
			: pendingActionResult[1].data
		: void 0
	const currentUrl = history.createURL(state.location)
	const nextUrl = history.createURL(location2)
	let maxIdx
	if (initialHydration && state.errors) {
		const boundaryId = Object.keys(state.errors)[0]
		maxIdx = matches.findIndex(m => m.route.id === boundaryId)
	} else if (pendingActionResult && isErrorResult(pendingActionResult[1])) {
		const boundaryId = pendingActionResult[0]
		maxIdx = matches.findIndex(m => m.route.id === boundaryId) - 1
	}
	const actionStatus = pendingActionResult ? pendingActionResult[1].statusCode : void 0
	const shouldSkipRevalidation = actionStatus && actionStatus >= 400
	const baseShouldRevalidateArgs = {
		currentUrl,
		currentParams: ((_a = state.matches[0]) == null ? void 0 : _a.params) || {},
		nextUrl,
		nextParams: matches[0].params,
		...submission,
		actionResult,
		actionStatus,
	}
	const pattern = getRoutePattern(matches)
	const dsMatches = matches.map((match, index) => {
		const { route } = match
		let forceShouldLoad = null
		if (maxIdx != null && index > maxIdx) {
			forceShouldLoad = false
		} else if (route.lazy) {
			forceShouldLoad = true
		} else if (!routeHasLoaderOrMiddleware(route)) {
			forceShouldLoad = false
		} else if (initialHydration) {
			const { shouldLoad: shouldLoad2 } = getRouteHydrationStatus(
				route,
				state.loaderData,
				state.errors,
			)
			forceShouldLoad = shouldLoad2
		} else if (isNewLoader(state.loaderData, state.matches[index], match)) {
			forceShouldLoad = true
		}
		if (forceShouldLoad !== null) {
			return getDataStrategyMatch(
				mapRouteProperties2,
				manifest,
				request,
				location2,
				pattern,
				match,
				lazyRoutePropertiesToSkip,
				scopedContext,
				forceShouldLoad,
			)
		}
		let defaultShouldRevalidate = false
		if (typeof callSiteDefaultShouldRevalidate === "boolean") {
			defaultShouldRevalidate = callSiteDefaultShouldRevalidate
		} else if (shouldSkipRevalidation) {
			defaultShouldRevalidate = false
		} else if (isRevalidationRequired) {
			defaultShouldRevalidate = true
		} else if (currentUrl.pathname + currentUrl.search === nextUrl.pathname + nextUrl.search) {
			defaultShouldRevalidate = true
		} else if (currentUrl.search !== nextUrl.search) {
			defaultShouldRevalidate = true
		} else if (isNewRouteInstance(state.matches[index], match)) {
			defaultShouldRevalidate = true
		}
		const shouldRevalidateArgs = {
			...baseShouldRevalidateArgs,
			defaultShouldRevalidate,
		}
		const shouldLoad = shouldRevalidateLoader(match, shouldRevalidateArgs)
		return getDataStrategyMatch(
			mapRouteProperties2,
			manifest,
			request,
			location2,
			pattern,
			match,
			lazyRoutePropertiesToSkip,
			scopedContext,
			shouldLoad,
			shouldRevalidateArgs,
			callSiteDefaultShouldRevalidate,
		)
	})
	const revalidatingFetchers = []
	fetchLoadMatches.forEach((f, key) => {
		if (
			initialHydration ||
			!matches.some(m => m.route.id === f.routeId) ||
			fetchersQueuedForDeletion.has(key)
		) {
			return
		}
		const fetcher = state.fetchers.get(key)
		const isMidInitialLoad = fetcher && fetcher.state !== "idle" && fetcher.data === void 0
		const fetcherMatches = matchRoutesImpl(routesToUse, f.path, basename ?? "/", false, branches)
		if (!fetcherMatches) {
			if (hasPatchRoutesOnNavigation && isMidInitialLoad) {
				return
			}
			revalidatingFetchers.push({
				key,
				routeId: f.routeId,
				path: f.path,
				matches: null,
				match: null,
				request: null,
				controller: null,
			})
			return
		}
		if (fetchRedirectIds.has(key)) {
			return
		}
		const fetcherMatch = getTargetMatch(fetcherMatches, f.path)
		const fetchController = new AbortController()
		const fetchRequest = createClientSideRequest(history, f.path, fetchController.signal)
		let fetcherDsMatches = null
		if (cancelledFetcherLoads.has(key)) {
			cancelledFetcherLoads.delete(key)
			fetcherDsMatches = getTargetedDataStrategyMatches(
				mapRouteProperties2,
				manifest,
				fetchRequest,
				f.path,
				fetcherMatches,
				fetcherMatch,
				lazyRoutePropertiesToSkip,
				scopedContext,
			)
		} else if (isMidInitialLoad) {
			if (isRevalidationRequired) {
				fetcherDsMatches = getTargetedDataStrategyMatches(
					mapRouteProperties2,
					manifest,
					fetchRequest,
					f.path,
					fetcherMatches,
					fetcherMatch,
					lazyRoutePropertiesToSkip,
					scopedContext,
				)
			}
		} else {
			let defaultShouldRevalidate
			if (typeof callSiteDefaultShouldRevalidate === "boolean") {
				defaultShouldRevalidate = callSiteDefaultShouldRevalidate
			} else if (shouldSkipRevalidation) {
				defaultShouldRevalidate = false
			} else {
				defaultShouldRevalidate = isRevalidationRequired
			}
			const shouldRevalidateArgs = {
				...baseShouldRevalidateArgs,
				defaultShouldRevalidate,
			}
			if (shouldRevalidateLoader(fetcherMatch, shouldRevalidateArgs)) {
				fetcherDsMatches = getTargetedDataStrategyMatches(
					mapRouteProperties2,
					manifest,
					fetchRequest,
					f.path,
					fetcherMatches,
					fetcherMatch,
					lazyRoutePropertiesToSkip,
					scopedContext,
					shouldRevalidateArgs,
				)
			}
		}
		if (fetcherDsMatches) {
			revalidatingFetchers.push({
				key,
				routeId: f.routeId,
				path: f.path,
				matches: fetcherDsMatches,
				match: fetcherMatch,
				request: fetchRequest,
				controller: fetchController,
			})
		}
	})
	return { dsMatches, revalidatingFetchers }
}
function routeHasLoaderOrMiddleware(route) {
	return route.loader != null || (route.middleware != null && route.middleware.length > 0)
}
function getRouteHydrationStatus(route, loaderData, errors) {
	if (route.lazy) {
		return { shouldLoad: true, renderFallback: true }
	}
	if (!routeHasLoaderOrMiddleware(route)) {
		return { shouldLoad: false, renderFallback: false }
	}
	const hasData = loaderData != null && route.id in loaderData
	const hasError = errors != null && errors[route.id] !== void 0
	if (!hasData && hasError) {
		return { shouldLoad: false, renderFallback: false }
	}
	if (typeof route.loader === "function" && route.loader.hydrate === true) {
		return { shouldLoad: true, renderFallback: !hasData }
	}
	const shouldLoad = !hasData && !hasError
	return { shouldLoad, renderFallback: shouldLoad }
}
function isNewLoader(currentLoaderData, currentMatch, match) {
	const isNew =
		// [a] -> [a, b]
		!currentMatch || // [a, b] -> [a, c]
		match.route.id !== currentMatch.route.id
	const isMissingData = !Object.hasOwn(currentLoaderData, match.route.id)
	return isNew || isMissingData
}
function isNewRouteInstance(currentMatch, match) {
	const currentPath = currentMatch.route.path
	return (
		// param change for this match, /users/123 -> /users/456
		currentMatch.pathname !== match.pathname || // splat param changed, which is not present in match.path
		// e.g. /files/images/avatar.jpg -> files/finances.xls
		(currentPath != null &&
			currentPath.endsWith("*") &&
			currentMatch.params["*"] !== match.params["*"])
	)
}
function shouldRevalidateLoader(loaderMatch, arg) {
	if (loaderMatch.route.shouldRevalidate) {
		const routeChoice = loaderMatch.route.shouldRevalidate(arg)
		if (typeof routeChoice === "boolean") {
			return routeChoice
		}
	}
	return arg.defaultShouldRevalidate
}
function patchRoutesImpl(
	routeId,
	children,
	dataRoutes,
	manifest,
	mapRouteProperties2,
	allowElementMutations,
) {
	let childrenToPatch
	if (routeId) {
		const route = manifest[routeId]
		invariant(route, `No route found to patch children into: routeId = ${routeId}`)
		if (!route.children) {
			route.children = []
		}
		childrenToPatch = route.children
	} else {
		childrenToPatch = dataRoutes.activeRoutes
	}
	const uniqueChildren = []
	const existingChildren = []
	children.forEach(newRoute => {
		const existingRoute = childrenToPatch.find(existingRoute2 =>
			isSameRoute(newRoute, existingRoute2),
		)
		if (existingRoute) {
			existingChildren.push({ existingRoute, newRoute })
		} else {
			uniqueChildren.push(newRoute)
		}
	})
	if (uniqueChildren.length > 0) {
		const newRoutes = convertRoutesToDataRoutes(
			uniqueChildren,
			mapRouteProperties2,
			[
				routeId || "_",
				"patch",
				String((childrenToPatch == null ? void 0 : childrenToPatch.length) || "0"),
			],
			manifest,
		)
		childrenToPatch.push(...newRoutes)
	}
	if (allowElementMutations && existingChildren.length > 0) {
		for (let i = 0; i < existingChildren.length; i++) {
			const { existingRoute, newRoute } = existingChildren[i]
			const existingRouteTyped = existingRoute
			const [newRouteTyped] = convertRoutesToDataRoutes(
				[newRoute],
				mapRouteProperties2,
				[],
				// Doesn't matter for mutated routes since they already have an id
				{},
				// Don't touch the manifest here since we're updating in place
				true,
			)
			Object.assign(existingRouteTyped, {
				element: newRouteTyped.element ? newRouteTyped.element : existingRouteTyped.element,
				errorElement: newRouteTyped.errorElement
					? newRouteTyped.errorElement
					: existingRouteTyped.errorElement,
				hydrateFallbackElement: newRouteTyped.hydrateFallbackElement
					? newRouteTyped.hydrateFallbackElement
					: existingRouteTyped.hydrateFallbackElement,
			})
		}
	}
	if (!dataRoutes.hasHMRRoutes) {
		dataRoutes.setRoutes([...dataRoutes.activeRoutes])
	}
}
function isSameRoute(newRoute, existingRoute) {
	var _a
	if ("id" in newRoute && "id" in existingRoute && newRoute.id === existingRoute.id) {
		return true
	}
	if (
		!(
			newRoute.index === existingRoute.index &&
			newRoute.path === existingRoute.path &&
			newRoute.caseSensitive === existingRoute.caseSensitive
		)
	) {
		return false
	}
	if (
		(!newRoute.children || newRoute.children.length === 0) &&
		(!existingRoute.children || existingRoute.children.length === 0)
	) {
		return true
	}
	return (
		((_a = newRoute.children) == null
			? void 0
			: _a.every((aChild, i) => {
					var _a2
					return (_a2 = existingRoute.children) == null
						? void 0
						: _a2.some(bChild => isSameRoute(aChild, bChild))
				})) ?? false
	)
}
var lazyRoutePropertyCache = /* @__PURE__ */ new WeakMap()
var loadLazyRouteProperty = ({ key, route, manifest, mapRouteProperties: mapRouteProperties2 }) => {
	const routeToUpdate = manifest[route.id]
	invariant(routeToUpdate, "No route found in manifest")
	if (!routeToUpdate.lazy || typeof routeToUpdate.lazy !== "object") {
		return
	}
	const lazyFn = routeToUpdate.lazy[key]
	if (!lazyFn) {
		return
	}
	let cache = lazyRoutePropertyCache.get(routeToUpdate)
	if (!cache) {
		cache = {}
		lazyRoutePropertyCache.set(routeToUpdate, cache)
	}
	const cachedPromise = cache[key]
	if (cachedPromise) {
		return cachedPromise
	}
	const propertyPromise = (async () => {
		const isUnsupported = isUnsupportedLazyRouteObjectKey(key)
		const staticRouteValue = routeToUpdate[key]
		const isStaticallyDefined = staticRouteValue !== void 0 && key !== "hasErrorBoundary"
		if (isUnsupported) {
			warning(
				!isUnsupported,
				"Route property " +
					key +
					" is not a supported lazy route property. This property will be ignored.",
			)
			cache[key] = Promise.resolve()
		} else if (isStaticallyDefined) {
			warning(
				false,
				`Route "${routeToUpdate.id}" has a static property "${key}" defined. The lazy property will be ignored.`,
			)
		} else {
			const value = await lazyFn()
			if (value != null) {
				Object.assign(routeToUpdate, { [key]: value })
				Object.assign(routeToUpdate, mapRouteProperties2(routeToUpdate))
			}
		}
		if (typeof routeToUpdate.lazy === "object") {
			routeToUpdate.lazy[key] = void 0
			if (Object.values(routeToUpdate.lazy).every(value => value === void 0)) {
				routeToUpdate.lazy = void 0
			}
		}
	})()
	cache[key] = propertyPromise
	return propertyPromise
}
var lazyRouteFunctionCache = /* @__PURE__ */ new WeakMap()
function loadLazyRoute(route, type, manifest, mapRouteProperties2, lazyRoutePropertiesToSkip) {
	const routeToUpdate = manifest[route.id]
	invariant(routeToUpdate, "No route found in manifest")
	if (!route.lazy) {
		return {
			lazyRoutePromise: void 0,
			lazyHandlerPromise: void 0,
		}
	}
	if (typeof route.lazy === "function") {
		const cachedPromise = lazyRouteFunctionCache.get(routeToUpdate)
		if (cachedPromise) {
			return {
				lazyRoutePromise: cachedPromise,
				lazyHandlerPromise: cachedPromise,
			}
		}
		const lazyRoutePromise2 = (async () => {
			invariant(typeof route.lazy === "function", "No lazy route function found")
			const lazyRoute = await route.lazy()
			const routeUpdates = {}
			for (const lazyRouteProperty in lazyRoute) {
				const lazyValue = lazyRoute[lazyRouteProperty]
				if (lazyValue === void 0) {
					continue
				}
				const isUnsupported = isUnsupportedLazyRouteFunctionKey(lazyRouteProperty)
				const staticRouteValue = routeToUpdate[lazyRouteProperty]
				const isStaticallyDefined =
					staticRouteValue !== void 0 && // This property isn't static since it should always be updated based
					// on the route updates
					lazyRouteProperty !== "hasErrorBoundary"
				if (isUnsupported) {
					warning(
						!isUnsupported,
						"Route property " +
							lazyRouteProperty +
							" is not a supported property to be returned from a lazy route function. This property will be ignored.",
					)
				} else if (isStaticallyDefined) {
					warning(
						!isStaticallyDefined,
						`Route "${routeToUpdate.id}" has a static property "${lazyRouteProperty}" defined but its lazy function is also returning a value for this property. The lazy route property "${lazyRouteProperty}" will be ignored.`,
					)
				} else {
					routeUpdates[lazyRouteProperty] = lazyValue
				}
			}
			Object.assign(routeToUpdate, routeUpdates)
			Object.assign(routeToUpdate, {
				// To keep things framework agnostic, we use the provided `mapRouteProperties`
				// function to set the framework-aware properties (`element`/`hasErrorBoundary`)
				// since the logic will differ between frameworks.
				...mapRouteProperties2(routeToUpdate),
				lazy: void 0,
			})
		})()
		lazyRouteFunctionCache.set(routeToUpdate, lazyRoutePromise2)
		lazyRoutePromise2.catch(() => {})
		return {
			lazyRoutePromise: lazyRoutePromise2,
			lazyHandlerPromise: lazyRoutePromise2,
		}
	}
	const lazyKeys = Object.keys(route.lazy)
	const lazyPropertyPromises = []
	let lazyHandlerPromise = void 0
	for (const key of lazyKeys) {
		if (lazyRoutePropertiesToSkip && lazyRoutePropertiesToSkip.includes(key)) {
			continue
		}
		const promise = loadLazyRouteProperty({
			key,
			route,
			manifest,
			mapRouteProperties: mapRouteProperties2,
		})
		if (promise) {
			lazyPropertyPromises.push(promise)
			if (key === type) {
				lazyHandlerPromise = promise
			}
		}
	}
	const lazyRoutePromise =
		lazyPropertyPromises.length > 0 ? Promise.all(lazyPropertyPromises).then(() => {}) : void 0
	lazyRoutePromise == null ? void 0 : lazyRoutePromise.catch(() => {})
	lazyHandlerPromise == null ? void 0 : lazyHandlerPromise.catch(() => {})
	return {
		lazyRoutePromise,
		lazyHandlerPromise,
	}
}
function isNonNullable(value) {
	return value !== void 0
}
function loadLazyMiddlewareForMatches(matches, manifest, mapRouteProperties2) {
	const promises = matches
		.map(({ route }) => {
			if (typeof route.lazy !== "object" || !route.lazy.middleware) {
				return void 0
			}
			return loadLazyRouteProperty({
				key: "middleware",
				route,
				manifest,
				mapRouteProperties: mapRouteProperties2,
			})
		})
		.filter(isNonNullable)
	return promises.length > 0 ? Promise.all(promises) : void 0
}
async function defaultDataStrategy(args) {
	const matchesToLoad = args.matches.filter(m => m.shouldLoad)
	const keyedResults = {}
	const results = await Promise.all(matchesToLoad.map(m => m.resolve()))
	results.forEach((result, i) => {
		keyedResults[matchesToLoad[i].route.id] = result
	})
	return keyedResults
}
async function defaultDataStrategyWithMiddleware(args) {
	if (!args.matches.some(m => m.route.middleware)) {
		return defaultDataStrategy(args)
	}
	return runClientMiddlewarePipeline(args, () => defaultDataStrategy(args))
}
function runServerMiddlewarePipeline(args, handler, errorHandler) {
	return runMiddlewarePipeline(args, handler, processResult, isResponse, errorHandler)
	function processResult(result) {
		return isDataWithResponseInit(result) ? dataWithResponseInitToResponse(result) : result
	}
}
function runClientMiddlewarePipeline(args, handler) {
	return runMiddlewarePipeline(
		args,
		handler,
		r => {
			if (isRedirectResponse(r)) {
				throw r
			}
			return r
		},
		isDataStrategyResults,
		errorHandler,
	)
	function errorHandler(error, routeId, nextResult) {
		if (nextResult) {
			return Promise.resolve(
				Object.assign(nextResult.value, {
					[routeId]: { type: "error", result: error },
				}),
			)
		} else {
			const { matches } = args
			const maxBoundaryIdx = Math.min(
				// Throwing route
				Math.max(
					matches.findIndex(m => m.route.id === routeId),
					0,
				),
				// or the shallowest route that needs to load data
				Math.max(
					matches.findIndex(m => m.shouldCallHandler()),
					0,
				),
			)
			const boundaryRouteId = findNearestBoundary(matches, matches[maxBoundaryIdx].route.id).route
				.id
			return Promise.resolve({
				[boundaryRouteId]: { type: "error", result: error },
			})
		}
	}
}
async function runMiddlewarePipeline(args, handler, processResult, isResult, errorHandler) {
	const { matches, ...dataFnArgs } = args
	const tuples = matches.flatMap(m =>
		m.route.middleware ? m.route.middleware.map(fn => [m.route.id, fn]) : [],
	)
	const result = await callRouteMiddleware(
		dataFnArgs,
		tuples,
		handler,
		processResult,
		isResult,
		errorHandler,
	)
	return result
}
async function callRouteMiddleware(
	args,
	middlewares,
	handler,
	processResult,
	isResult,
	errorHandler,
	idx = 0,
) {
	const { request } = args
	if (request.signal.aborted) {
		throw request.signal.reason ?? new Error(`Request aborted: ${request.method} ${request.url}`)
	}
	const tuple = middlewares[idx]
	if (!tuple) {
		const result = await handler()
		return result
	}
	const [routeId, middleware] = tuple
	let nextResult
	const next = async () => {
		if (nextResult) {
			throw new Error("You may only call `next()` once per middleware")
		}
		try {
			const result = await callRouteMiddleware(
				args,
				middlewares,
				handler,
				processResult,
				isResult,
				errorHandler,
				idx + 1,
			)
			nextResult = { value: result }
			return nextResult.value
		} catch (error) {
			nextResult = { value: await errorHandler(error, routeId, nextResult) }
			return nextResult.value
		}
	}
	try {
		const value = await middleware(args, next)
		const result = value != null ? processResult(value) : void 0
		if (isResult(result)) {
			return result
		} else if (nextResult) {
			return result ?? nextResult.value
		} else {
			nextResult = { value: await next() }
			return nextResult.value
		}
	} catch (error) {
		const response = await errorHandler(error, routeId, nextResult)
		return response
	}
}
function getDataStrategyMatchLazyPromises(
	mapRouteProperties2,
	manifest,
	request,
	match,
	lazyRoutePropertiesToSkip,
) {
	const lazyMiddlewarePromise = loadLazyRouteProperty({
		key: "middleware",
		route: match.route,
		manifest,
		mapRouteProperties: mapRouteProperties2,
	})
	const lazyRoutePromises = loadLazyRoute(
		match.route,
		isMutationMethod(request.method) ? "action" : "loader",
		manifest,
		mapRouteProperties2,
		lazyRoutePropertiesToSkip,
	)
	return {
		middleware: lazyMiddlewarePromise,
		route: lazyRoutePromises.lazyRoutePromise,
		handler: lazyRoutePromises.lazyHandlerPromise,
	}
}
function getDataStrategyMatch(
	mapRouteProperties2,
	manifest,
	request,
	path,
	pattern,
	match,
	lazyRoutePropertiesToSkip,
	scopedContext,
	shouldLoad,
	shouldRevalidateArgs = null,
	callSiteDefaultShouldRevalidate,
) {
	let isUsingNewApi = false
	const _lazyPromises = getDataStrategyMatchLazyPromises(
		mapRouteProperties2,
		manifest,
		request,
		match,
		lazyRoutePropertiesToSkip,
	)
	return {
		...match,
		_lazyPromises,
		shouldLoad,
		shouldRevalidateArgs,
		shouldCallHandler(defaultShouldRevalidate) {
			isUsingNewApi = true
			if (!shouldRevalidateArgs) {
				return shouldLoad
			}
			if (typeof callSiteDefaultShouldRevalidate === "boolean") {
				return shouldRevalidateLoader(match, {
					...shouldRevalidateArgs,
					defaultShouldRevalidate: callSiteDefaultShouldRevalidate,
				})
			}
			if (typeof defaultShouldRevalidate === "boolean") {
				return shouldRevalidateLoader(match, {
					...shouldRevalidateArgs,
					defaultShouldRevalidate,
				})
			}
			return shouldRevalidateLoader(match, shouldRevalidateArgs)
		},
		resolve(handlerOverride) {
			const { lazy, loader, middleware } = match.route
			const callHandler =
				isUsingNewApi ||
				shouldLoad ||
				(handlerOverride && !isMutationMethod(request.method) && (lazy || loader))
			const isMiddlewareOnlyRoute = middleware && middleware.length > 0 && !loader && !lazy
			if (callHandler && (isMutationMethod(request.method) || !isMiddlewareOnlyRoute)) {
				return callLoaderOrAction({
					request,
					path,
					pattern,
					match,
					lazyHandlerPromise: _lazyPromises == null ? void 0 : _lazyPromises.handler,
					lazyRoutePromise: _lazyPromises == null ? void 0 : _lazyPromises.route,
					handlerOverride,
					scopedContext,
				})
			}
			return Promise.resolve({ type: "data", result: void 0 })
		},
	}
}
function getTargetedDataStrategyMatches(
	mapRouteProperties2,
	manifest,
	request,
	path,
	matches,
	targetMatch,
	lazyRoutePropertiesToSkip,
	scopedContext,
	shouldRevalidateArgs = null,
) {
	return matches.map(match => {
		if (match.route.id !== targetMatch.route.id) {
			return {
				...match,
				shouldLoad: false,
				shouldRevalidateArgs,
				shouldCallHandler: () => false,
				_lazyPromises: getDataStrategyMatchLazyPromises(
					mapRouteProperties2,
					manifest,
					request,
					match,
					lazyRoutePropertiesToSkip,
				),
				resolve: () => Promise.resolve({ type: "data", result: void 0 }),
			}
		}
		return getDataStrategyMatch(
			mapRouteProperties2,
			manifest,
			request,
			path,
			getRoutePattern(matches),
			match,
			lazyRoutePropertiesToSkip,
			scopedContext,
			true,
			shouldRevalidateArgs,
		)
	})
}
async function callDataStrategyImpl(
	dataStrategyImpl,
	request,
	path,
	matches,
	fetcherKey,
	scopedContext,
	isStaticHandler,
) {
	if (
		matches.some(m => {
			var _a
			return (_a = m._lazyPromises) == null ? void 0 : _a.middleware
		})
	) {
		await Promise.all(
			matches.map(m => {
				var _a
				return (_a = m._lazyPromises) == null ? void 0 : _a.middleware
			}),
		)
	}
	const dataStrategyArgs = {
		request,
		url: createDataFunctionUrl(request, path),
		pattern: getRoutePattern(matches),
		params: matches[0].params,
		context: scopedContext,
		matches,
	}
	const runClientMiddleware = isStaticHandler
		? () => {
				throw new Error(
					"You cannot call `runClientMiddleware()` from a static handler `dataStrategy`. Middleware is run outside of `dataStrategy` during SSR in order to bubble up the Response.  You can enable middleware via the `respond` API in `query`/`queryRoute`",
				)
			}
		: cb => {
				const typedDataStrategyArgs = dataStrategyArgs
				return runClientMiddlewarePipeline(typedDataStrategyArgs, () => {
					return cb({
						...typedDataStrategyArgs,
						fetcherKey,
						runClientMiddleware: () => {
							throw new Error(
								"Cannot call `runClientMiddleware()` from within an `runClientMiddleware` handler",
							)
						},
					})
				})
			}
	const results = await dataStrategyImpl({
		...dataStrategyArgs,
		fetcherKey,
		runClientMiddleware,
	})
	try {
		await Promise.all(
			matches.flatMap(m => {
				var _a, _b
				return [
					(_a = m._lazyPromises) == null ? void 0 : _a.handler,
					(_b = m._lazyPromises) == null ? void 0 : _b.route,
				]
			}),
		)
	} catch (e) {}
	return results
}
async function callLoaderOrAction({
	request,
	path,
	pattern,
	match,
	lazyHandlerPromise,
	lazyRoutePromise,
	handlerOverride,
	scopedContext,
}) {
	let result
	let onReject
	const isAction = isMutationMethod(request.method)
	const type = isAction ? "action" : "loader"
	const runHandler = handler => {
		let reject
		const abortPromise = new Promise((_, r) => (reject = r))
		onReject = () => reject()
		request.signal.addEventListener("abort", onReject)
		const actualHandler = ctx => {
			if (typeof handler !== "function") {
				return Promise.reject(
					new Error(
						`You cannot call the handler for a route which defines a boolean "${type}" [routeId: ${match.route.id}]`,
					),
				)
			}
			return handler(
				{
					request,
					url: createDataFunctionUrl(request, path),
					pattern,
					params: match.params,
					context: scopedContext,
				},
				...(ctx !== void 0 ? [ctx] : []),
			)
		}
		const handlerPromise = (async () => {
			try {
				const val = await (handlerOverride
					? handlerOverride(ctx => actualHandler(ctx))
					: actualHandler())
				return { type: "data", result: val }
			} catch (e) {
				return { type: "error", result: e }
			}
		})()
		return Promise.race([handlerPromise, abortPromise])
	}
	try {
		const handler = isAction ? match.route.action : match.route.loader
		if (lazyHandlerPromise || lazyRoutePromise) {
			if (handler) {
				let handlerError
				const [value] = await Promise.all([
					// If the handler throws, don't let it immediately bubble out,
					// since we need to let the lazy() execution finish so we know if this
					// route has a boundary that can handle the error
					runHandler(handler).catch(e => {
						handlerError = e
					}),
					// Ensure all lazy route promises are resolved before continuing
					lazyHandlerPromise,
					lazyRoutePromise,
				])
				if (handlerError !== void 0) {
					throw handlerError
				}
				result = value
			} else {
				await lazyHandlerPromise
				const handler2 = isAction ? match.route.action : match.route.loader
				if (handler2) {
					;[result] = await Promise.all([runHandler(handler2), lazyRoutePromise])
				} else if (type === "action") {
					const url = new URL(request.url)
					const pathname = url.pathname + url.search
					throw getInternalRouterError(405, {
						method: request.method,
						pathname,
						routeId: match.route.id,
					})
				} else {
					return { type: "data", result: void 0 }
				}
			}
		} else if (!handler) {
			const url = new URL(request.url)
			const pathname = url.pathname + url.search
			throw getInternalRouterError(404, {
				pathname,
			})
		} else {
			result = await runHandler(handler)
		}
	} catch (e) {
		return { type: "error", result: e }
	} finally {
		if (onReject) {
			request.signal.removeEventListener("abort", onReject)
		}
	}
	return result
}
async function parseResponseBody(response) {
	const contentType = response.headers.get("Content-Type")
	if (contentType && /\bapplication\/json\b/.test(contentType)) {
		return response.body == null ? null : response.json()
	}
	return response.text()
}
async function convertDataStrategyResultToDataResult(dataStrategyResult) {
	var _a, _b, _c, _d, _e
	const { result, type } = dataStrategyResult
	if (isResponse(result)) {
		let data2
		try {
			data2 = await parseResponseBody(result)
		} catch (e) {
			return { type: "error", error: e }
		}
		if (type === "error") {
			return {
				type: "error",
				error: new ErrorResponseImpl(result.status, result.statusText, data2),
				statusCode: result.status,
				headers: result.headers,
			}
		}
		return {
			type: "data",
			data: data2,
			statusCode: result.status,
			headers: result.headers,
		}
	}
	if (type === "error") {
		if (isDataWithResponseInit(result)) {
			if (result.data instanceof Error) {
				return {
					type: "error",
					error: result.data,
					statusCode: (_a = result.init) == null ? void 0 : _a.status,
					headers: ((_b = result.init) == null ? void 0 : _b.headers)
						? new Headers(result.init.headers)
						: void 0,
				}
			}
			return {
				type: "error",
				error: dataWithResponseInitToErrorResponse(result),
				statusCode: isRouteErrorResponse(result) ? result.status : void 0,
				headers: ((_c = result.init) == null ? void 0 : _c.headers)
					? new Headers(result.init.headers)
					: void 0,
			}
		}
		return {
			type: "error",
			error: result,
			statusCode: isRouteErrorResponse(result) ? result.status : void 0,
		}
	}
	if (isDataWithResponseInit(result)) {
		return {
			type: "data",
			data: result.data,
			statusCode: (_d = result.init) == null ? void 0 : _d.status,
			headers: ((_e = result.init) == null ? void 0 : _e.headers)
				? new Headers(result.init.headers)
				: void 0,
		}
	}
	return { type: "data", data: result }
}
function normalizeRelativeRoutingRedirectResponse(response, request, routeId, matches, basename) {
	let location2 = response.headers.get("Location")
	invariant(location2, "Redirects returned/thrown from loaders/actions must have a Location header")
	if (!isAbsoluteUrl(location2)) {
		const trimmedMatches = matches.slice(0, matches.findIndex(m => m.route.id === routeId) + 1)
		location2 = normalizeTo(new URL(request.url), trimmedMatches, basename, location2)
		response.headers.set("Location", location2)
	}
	return response
}
var invalidProtocols = [
	"about:",
	"blob:",
	"chrome:",
	"chrome-untrusted:",
	"content:",
	"data:",
	"devtools:",
	"file:",
	"filesystem:",

	"javascript:",
]
function normalizeRedirectLocation(location2, currentUrl, basename, historyInstance) {
	if (isAbsoluteUrl(location2)) {
		const normalizedLocation = location2
		const url = normalizedLocation.startsWith("//")
			? new URL(currentUrl.protocol + normalizedLocation)
			: new URL(normalizedLocation)
		if (invalidProtocols.includes(url.protocol)) {
			throw new Error("Invalid redirect location")
		}
		const isSameBasename = stripBasename(url.pathname, basename) != null
		if (url.origin === currentUrl.origin && isSameBasename) {
			return removeDoubleSlashes(url.pathname) + url.search + url.hash
		}
	}
	try {
		const url = historyInstance.createURL(location2)
		if (invalidProtocols.includes(url.protocol)) {
			throw new Error("Invalid redirect location")
		}
	} catch (e) {}
	return location2
}
function createClientSideRequest(history, location2, signal, submission) {
	const url = history.createURL(stripHashFromPath(location2)).toString()
	const init = { signal }
	if (submission && isMutationMethod(submission.formMethod)) {
		const { formMethod, formEncType } = submission
		init.method = formMethod.toUpperCase()
		if (formEncType === "application/json") {
			init.headers = new Headers({ "Content-Type": formEncType })
			init.body = JSON.stringify(submission.json)
		} else if (formEncType === "text/plain") {
			init.body = submission.text
		} else if (formEncType === "application/x-www-form-urlencoded" && submission.formData) {
			init.body = convertFormDataToSearchParams(submission.formData)
		} else {
			init.body = submission.formData
		}
	}
	return new Request(url, init)
}
function createDataFunctionUrl(request, path) {
	const url = new URL(request.url)
	const parsed = typeof path === "string" ? parsePath(path) : path
	url.pathname = parsed.pathname || "/"
	if (parsed.search) {
		const searchParams = new URLSearchParams(parsed.search)
		const indexValues = searchParams.getAll("index")
		searchParams.delete("index")
		for (const value of indexValues.filter(Boolean)) {
			searchParams.append("index", value)
		}
		url.search = searchParams.size ? `?${searchParams.toString()}` : ""
	} else {
		url.search = ""
	}
	url.hash = parsed.hash || ""
	return url
}
function convertFormDataToSearchParams(formData) {
	const searchParams = new URLSearchParams()
	for (const [key, value] of formData.entries()) {
		searchParams.append(key, typeof value === "string" ? value : value.name)
	}
	return searchParams
}
function convertSearchParamsToFormData(searchParams) {
	const formData = new FormData()
	for (const [key, value] of searchParams.entries()) {
		formData.append(key, value)
	}
	return formData
}
function processRouteLoaderData(
	matches,
	results,
	pendingActionResult,
	isStaticHandler = false,
	skipLoaderErrorBubbling = false,
) {
	const loaderData = {}
	let errors = null
	let statusCode
	let foundError = false
	const loaderHeaders = {}
	let pendingError =
		pendingActionResult && isErrorResult(pendingActionResult[1])
			? pendingActionResult[1].error
			: void 0
	matches.forEach(match => {
		if (!(match.route.id in results)) {
			return
		}
		const id = match.route.id
		const result = results[id]
		invariant(!isRedirectResult(result), "Cannot handle redirect results in processLoaderData")
		if (isErrorResult(result)) {
			let error = result.error
			if (pendingError !== void 0) {
				error = pendingError
				pendingError = void 0
			}
			errors = errors || {}
			if (skipLoaderErrorBubbling) {
				errors[id] = error
			} else {
				const boundaryMatch = findNearestBoundary(matches, id)
				if (errors[boundaryMatch.route.id] == null) {
					errors[boundaryMatch.route.id] = error
				}
			}
			if (!isStaticHandler) {
				loaderData[id] = ResetLoaderDataSymbol
			}
			if (!foundError) {
				foundError = true
				statusCode = isRouteErrorResponse(result.error) ? result.error.status : 500
			}
			if (result.headers) {
				loaderHeaders[id] = result.headers
			}
		} else {
			loaderData[id] = result.data
			if (result.statusCode && result.statusCode !== 200 && !foundError) {
				statusCode = result.statusCode
			}
			if (result.headers) {
				loaderHeaders[id] = result.headers
			}
		}
	})
	if (pendingError !== void 0 && pendingActionResult) {
		errors = { [pendingActionResult[0]]: pendingError }
		if (pendingActionResult[2]) {
			loaderData[pendingActionResult[2]] = void 0
		}
	}
	return {
		loaderData,
		errors,
		statusCode: statusCode || 200,
		loaderHeaders,
	}
}
function processLoaderData(
	state,
	matches,
	results,
	pendingActionResult,
	revalidatingFetchers,
	fetcherResults,
) {
	let { loaderData, errors } = processRouteLoaderData(matches, results, pendingActionResult)
	revalidatingFetchers
		.filter(f => !f.matches || f.matches.some(m => m.shouldLoad))
		.forEach(rf => {
			const { key, match, controller } = rf
			if (controller && controller.signal.aborted) {
				return
			}
			const result = fetcherResults[key]
			invariant(result, "Did not find corresponding fetcher result")
			if (isErrorResult(result)) {
				const boundaryMatch = findNearestBoundary(
					state.matches,
					match == null ? void 0 : match.route.id,
				)
				if (!(errors && errors[boundaryMatch.route.id])) {
					errors = {
						...errors,
						[boundaryMatch.route.id]: result.error,
					}
				}
				state.fetchers.delete(key)
			} else if (isRedirectResult(result)) {
				invariant(false, "Unhandled fetcher revalidation redirect")
			} else {
				const doneFetcher = getDoneFetcher(result.data)
				state.fetchers.set(key, doneFetcher)
			}
		})
	return { loaderData, errors }
}
function mergeLoaderData(loaderData, newLoaderData, matches, errors) {
	const mergedLoaderData = Object.entries(newLoaderData)
		.filter(([, v]) => v !== ResetLoaderDataSymbol)
		.reduce((merged, [k, v]) => {
			merged[k] = v
			return merged
		}, {})
	for (const match of matches) {
		const id = match.route.id
		if (!Object.hasOwn(newLoaderData, id) && Object.hasOwn(loaderData, id) && match.route.loader) {
			mergedLoaderData[id] = loaderData[id]
		}
		if (errors && Object.hasOwn(errors, id)) {
			break
		}
	}
	return mergedLoaderData
}
function getActionDataForCommit(pendingActionResult) {
	if (!pendingActionResult) {
		return {}
	}
	return isErrorResult(pendingActionResult[1])
		? {
				// Clear out prior actionData on errors
				actionData: {},
			}
		: {
				actionData: {
					[pendingActionResult[0]]: pendingActionResult[1].data,
				},
			}
}
function findNearestBoundary(matches, routeId) {
	const eligibleMatches = routeId
		? matches.slice(0, matches.findIndex(m => m.route.id === routeId) + 1)
		: [...matches]
	return eligibleMatches.reverse().find(m => m.route.hasErrorBoundary === true) || matches[0]
}
function getShortCircuitMatches(routes) {
	const route =
		routes.length === 1
			? routes[0]
			: routes.find(r => r.index || !r.path || r.path === "/") || {
					id: `__shim-error-route__`,
				}
	return {
		matches: [
			{
				params: {},
				pathname: "",
				pathnameBase: "",
				route,
			},
		],
		route,
	}
}
function getInternalRouterError(status, { pathname, routeId, method, type, message } = {}) {
	let statusText = "Unknown Server Error"
	let errorMessage = "Unknown @remix-run/router error"
	if (status === 400) {
		statusText = "Bad Request"
		if (method && pathname && routeId) {
			errorMessage = `You made a ${method} request to "${pathname}" but did not provide a \`loader\` for route "${routeId}", so there is no way to handle the request.`
		} else if (type === "invalid-body") {
			errorMessage = "Unable to encode submission body"
		}
	} else if (status === 403) {
		statusText = "Forbidden"
		errorMessage = `Route "${routeId}" does not match URL "${pathname}"`
	} else if (status === 404) {
		statusText = "Not Found"
		errorMessage = `No route matches URL "${pathname}"`
	} else if (status === 405) {
		statusText = "Method Not Allowed"
		if (method && pathname && routeId) {
			errorMessage = `You made a ${method.toUpperCase()} request to "${pathname}" but did not provide an \`action\` for route "${routeId}", so there is no way to handle the request.`
		} else if (method) {
			errorMessage = `Invalid request method "${method.toUpperCase()}"`
		}
	}
	return new ErrorResponseImpl(status || 500, statusText, new Error(errorMessage), true)
}
function findRedirect(results) {
	const entries = Object.entries(results)
	for (let i = entries.length - 1; i >= 0; i--) {
		const [key, result] = entries[i]
		if (isRedirectResult(result)) {
			return { key, result }
		}
	}
}
function stripHashFromPath(path) {
	const parsedPath = typeof path === "string" ? parsePath(path) : path
	return createPath({ ...parsedPath, hash: "" })
}
function isHashChangeOnly(a, b) {
	if (a.pathname !== b.pathname || a.search !== b.search) {
		return false
	}
	if (a.hash === "") {
		return b.hash !== ""
	} else if (a.hash === b.hash) {
		return true
	} else if (b.hash !== "") {
		return true
	}
	return false
}
function dataWithResponseInitToResponse(data2) {
	return Response.json(data2.data, data2.init ?? void 0)
}
function dataWithResponseInitToErrorResponse(data2) {
	var _a, _b
	return new ErrorResponseImpl(
		((_a = data2.init) == null ? void 0 : _a.status) ?? 500,
		((_b = data2.init) == null ? void 0 : _b.statusText) ?? "Internal Server Error",
		data2.data,
	)
}
function isDataStrategyResults(result) {
	return (
		result != null &&
		typeof result === "object" &&
		Object.entries(result).every(
			([key, value]) => typeof key === "string" && isDataStrategyResult(value),
		)
	)
}
function isDataStrategyResult(result) {
	return (
		result != null &&
		typeof result === "object" &&
		"type" in result &&
		"result" in result &&
		(result.type === "data" || result.type === "error")
	)
}
function isRedirectDataStrategyResult(result) {
	return isResponse(result.result) && redirectStatusCodes.has(result.result.status)
}
function isErrorResult(result) {
	return result.type === "error"
}
function isRedirectResult(result) {
	return (result && result.type) === "redirect"
}
function isDataWithResponseInit(value) {
	return (
		typeof value === "object" &&
		value != null &&
		"type" in value &&
		"data" in value &&
		"init" in value &&
		value.type === "DataWithResponseInit"
	)
}
function isResponse(value) {
	return (
		value != null &&
		typeof value.status === "number" &&
		typeof value.statusText === "string" &&
		typeof value.headers === "object" &&
		typeof value.body !== "undefined"
	)
}
function isRedirectStatusCode(statusCode) {
	return redirectStatusCodes.has(statusCode)
}
function isRedirectResponse(result) {
	return isResponse(result) && isRedirectStatusCode(result.status) && result.headers.has("Location")
}
function isValidMethod(method) {
	return validRequestMethods.has(method.toUpperCase())
}
function isMutationMethod(method) {
	return validMutationMethods.has(method.toUpperCase())
}
function hasNakedIndexQuery(search) {
	return new URLSearchParams(search).getAll("index").some(v => v === "")
}
function getTargetMatch(matches, location2) {
	const search = typeof location2 === "string" ? parsePath(location2).search : location2.search
	if (matches[matches.length - 1].route.index && hasNakedIndexQuery(search || "")) {
		return matches[matches.length - 1]
	}
	const pathMatches = getPathContributingMatches(matches)
	return pathMatches[pathMatches.length - 1]
}
function getSubmissionFromNavigation(navigation) {
	const { formMethod, formAction, formEncType, text, formData, json } = navigation
	if (!formMethod || !formAction || !formEncType) {
		return
	}
	if (text != null) {
		return {
			formMethod,
			formAction,
			formEncType,
			formData: void 0,
			json: void 0,
			text,
		}
	} else if (formData != null) {
		return {
			formMethod,
			formAction,
			formEncType,
			formData,
			json: void 0,
			text: void 0,
		}
	} else if (json !== void 0) {
		return {
			formMethod,
			formAction,
			formEncType,
			formData: void 0,
			json,
			text: void 0,
		}
	}
}
function getLoadingNavigation(location2, submission) {
	if (submission) {
		const navigation = {
			state: "loading",
			location: location2,
			formMethod: submission.formMethod,
			formAction: submission.formAction,
			formEncType: submission.formEncType,
			formData: submission.formData,
			json: submission.json,
			text: submission.text,
		}
		return navigation
	} else {
		const navigation = {
			state: "loading",
			location: location2,
			formMethod: void 0,
			formAction: void 0,
			formEncType: void 0,
			formData: void 0,
			json: void 0,
			text: void 0,
		}
		return navigation
	}
}
function getSubmittingNavigation(location2, submission) {
	const navigation = {
		state: "submitting",
		location: location2,
		formMethod: submission.formMethod,
		formAction: submission.formAction,
		formEncType: submission.formEncType,
		formData: submission.formData,
		json: submission.json,
		text: submission.text,
	}
	return navigation
}
function getLoadingFetcher(submission, data2) {
	if (submission) {
		const fetcher = {
			state: "loading",
			formMethod: submission.formMethod,
			formAction: submission.formAction,
			formEncType: submission.formEncType,
			formData: submission.formData,
			json: submission.json,
			text: submission.text,
			data: data2,
		}
		return fetcher
	} else {
		const fetcher = {
			state: "loading",
			formMethod: void 0,
			formAction: void 0,
			formEncType: void 0,
			formData: void 0,
			json: void 0,
			text: void 0,
			data: data2,
		}
		return fetcher
	}
}
function getSubmittingFetcher(submission, existingFetcher) {
	const fetcher = {
		state: "submitting",
		formMethod: submission.formMethod,
		formAction: submission.formAction,
		formEncType: submission.formEncType,
		formData: submission.formData,
		json: submission.json,
		text: submission.text,
		data: existingFetcher ? existingFetcher.data : void 0,
	}
	return fetcher
}
function getDoneFetcher(data2) {
	const fetcher = {
		state: "idle",
		formMethod: void 0,
		formAction: void 0,
		formEncType: void 0,
		formData: void 0,
		json: void 0,
		text: void 0,
		data: data2,
	}
	return fetcher
}
function restoreAppliedTransitions(_window, transitions) {
	try {
		const sessionPositions = _window.sessionStorage.getItem(TRANSITIONS_STORAGE_KEY)
		if (sessionPositions) {
			const json = JSON.parse(sessionPositions)
			for (const [k, v] of Object.entries(json || {})) {
				if (v && Array.isArray(v)) {
					transitions.set(k, new Set(v || []))
				}
			}
		}
	} catch (e) {}
}
function persistAppliedTransitions(_window, transitions) {
	if (transitions.size > 0) {
		const json = {}
		for (const [k, v] of transitions) {
			json[k] = [...v]
		}
		try {
			_window.sessionStorage.setItem(TRANSITIONS_STORAGE_KEY, JSON.stringify(json))
		} catch (error) {
			warning(false, `Failed to save applied view transitions in sessionStorage (${error}).`)
		}
	}
}
function createDeferred() {
	let resolve
	let reject
	const promise = new Promise((res, rej) => {
		resolve = async val => {
			res(val)
			try {
				await promise
			} catch (e) {}
		}
		reject = async error => {
			rej(error)
			try {
				await promise
			} catch (e) {}
		}
	})
	return {
		promise,
		//@ts-expect-error
		resolve,
		//@ts-expect-error
		reject,
	}
}
var DataRouterContext = React.createContext(null)
DataRouterContext.displayName = "DataRouter"
var DataRouterStateContext = React.createContext(null)
DataRouterStateContext.displayName = "DataRouterState"
var RSCRouterContext = React.createContext(false)
function useIsRSCRouterContext() {
	return React.useContext(RSCRouterContext)
}
var ViewTransitionContext = React.createContext({
	isTransitioning: false,
})
ViewTransitionContext.displayName = "ViewTransition"
var FetchersContext = React.createContext(/* @__PURE__ */ new Map())
FetchersContext.displayName = "Fetchers"
var AwaitContext = React.createContext(null)
AwaitContext.displayName = "Await"
var AwaitContextProvider = props => React.createElement(AwaitContext.Provider, props)
var NavigationContext = React.createContext(null)
NavigationContext.displayName = "Navigation"
var LocationContext = React.createContext(null)
LocationContext.displayName = "Location"
var RouteContext = React.createContext({
	outlet: null,
	matches: [],
	isDataRoute: false,
})
RouteContext.displayName = "Route"
var RouteErrorContext = React.createContext(null)
RouteErrorContext.displayName = "RouteError"
var ENABLE_DEV_WARNINGS = true
var ERROR_DIGEST_BASE = "REACT_ROUTER_ERROR"
var ERROR_DIGEST_REDIRECT = "REDIRECT"
var ERROR_DIGEST_ROUTE_ERROR_RESPONSE = "ROUTE_ERROR_RESPONSE"
function decodeRedirectErrorDigest(digest) {
	if (digest.startsWith(`${ERROR_DIGEST_BASE}:${ERROR_DIGEST_REDIRECT}:{`)) {
		try {
			const parsed = JSON.parse(digest.slice(28))
			if (
				typeof parsed === "object" &&
				parsed &&
				typeof parsed.status === "number" &&
				typeof parsed.statusText === "string" &&
				typeof parsed.location === "string" &&
				typeof parsed.reloadDocument === "boolean" &&
				typeof parsed.replace === "boolean"
			) {
				return parsed
			}
		} catch {}
	}
}
function decodeRouteErrorResponseDigest(digest) {
	if (digest.startsWith(`${ERROR_DIGEST_BASE}:${ERROR_DIGEST_ROUTE_ERROR_RESPONSE}:{`)) {
		try {
			const parsed = JSON.parse(digest.slice(40))
			if (
				typeof parsed === "object" &&
				parsed &&
				typeof parsed.status === "number" &&
				typeof parsed.statusText === "string"
			) {
				return new ErrorResponseImpl(parsed.status, parsed.statusText, parsed.data)
			}
		} catch {}
	}
}
function useHref(to, { relative } = {}) {
	invariant(
		useInRouterContext(),
		// TODO: This error is probably because they somehow have 2 versions of the
		// router loaded. We can help them understand how to avoid that.
		`useHref() may be used only in the context of a <Router> component.`,
	)
	const { basename, navigator } = React2.useContext(NavigationContext)
	const { hash, pathname, search } = useResolvedPath(to, { relative })
	let joinedPathname = pathname
	if (basename !== "/") {
		joinedPathname = pathname === "/" ? basename : joinPaths([basename, pathname])
	}
	return navigator.createHref({ pathname: joinedPathname, search, hash })
}
function useInRouterContext() {
	return React2.useContext(LocationContext) != null
}
function useLocation() {
	invariant(
		useInRouterContext(),
		// TODO: This error is probably because they somehow have 2 versions of the
		// router loaded. We can help them understand how to avoid that.
		`useLocation() may be used only in the context of a <Router> component.`,
	)
	return React2.useContext(LocationContext).location
}
function useNavigationType() {
	return React2.useContext(LocationContext).navigationType
}
function useMatch(pattern) {
	invariant(
		useInRouterContext(),
		// TODO: This error is probably because they somehow have 2 versions of the
		// router loaded. We can help them understand how to avoid that.
		`useMatch() may be used only in the context of a <Router> component.`,
	)
	const { pathname } = useLocation()
	return React2.useMemo(() => matchPath(pattern, decodePath(pathname)), [pathname, pattern])
}
var navigateEffectWarning = `You should call navigate() in a React.useEffect(), not when your component is first rendered.`
function useIsomorphicLayoutEffect(cb) {
	const isStatic = React2.useContext(NavigationContext).static
	if (!isStatic) {
		React2.useLayoutEffect(cb)
	}
}
function useNavigate() {
	const { isDataRoute } = React2.useContext(RouteContext)
	return isDataRoute ? useNavigateStable() : useNavigateUnstable()
}
function useNavigateUnstable() {
	invariant(
		useInRouterContext(),
		// TODO: This error is probably because they somehow have 2 versions of the
		// router loaded. We can help them understand how to avoid that.
		`useNavigate() may be used only in the context of a <Router> component.`,
	)
	const dataRouterContext = React2.useContext(DataRouterContext)
	const { basename, navigator } = React2.useContext(NavigationContext)
	const { matches } = React2.useContext(RouteContext)
	const { pathname: locationPathname } = useLocation()
	const routePathnamesJson = JSON.stringify(getResolveToMatches(matches))
	const activeRef = React2.useRef(false)
	useIsomorphicLayoutEffect(() => {
		activeRef.current = true
	})
	const navigate = React2.useCallback(
		(to, options = {}) => {
			warning(activeRef.current, navigateEffectWarning)
			if (!activeRef.current) return
			if (typeof to === "number") {
				navigator.go(to)
				return
			}
			const path = resolveTo(
				to,
				JSON.parse(routePathnamesJson),
				locationPathname,
				options.relative === "path",
			)
			if (dataRouterContext == null && basename !== "/") {
				path.pathname = path.pathname === "/" ? basename : joinPaths([basename, path.pathname])
			}
			;(options.replace ? navigator.replace : navigator.push)(path, options.state, options)
		},
		[basename, navigator, routePathnamesJson, locationPathname, dataRouterContext],
	)
	return navigate
}
var OutletContext = React2.createContext(null)
function useOutletContext() {
	return React2.useContext(OutletContext)
}
function useOutlet(context) {
	const outlet = React2.useContext(RouteContext).outlet
	return React2.useMemo(
		() => outlet && React2.createElement(OutletContext.Provider, { value: context }, outlet),
		[outlet, context],
	)
}
function useParams() {
	const { matches } = React2.useContext(RouteContext)
	const routeMatch = matches[matches.length - 1]
	return (routeMatch == null ? void 0 : routeMatch.params) ?? {}
}
function useResolvedPath(to, { relative } = {}) {
	const { matches } = React2.useContext(RouteContext)
	const { pathname: locationPathname } = useLocation()
	const routePathnamesJson = JSON.stringify(getResolveToMatches(matches))
	return React2.useMemo(
		() => resolveTo(to, JSON.parse(routePathnamesJson), locationPathname, relative === "path"),
		[to, routePathnamesJson, locationPathname, relative],
	)
}
function useRoutes(routes, locationArg) {
	return useRoutesImpl(routes, locationArg)
}
function useRoutesImpl(routes, locationArg, dataRouterOpts) {
	var _a
	invariant(
		useInRouterContext(),
		// TODO: This error is probably because they somehow have 2 versions of the
		// router loaded. We can help them understand how to avoid that.
		`useRoutes() may be used only in the context of a <Router> component.`,
	)
	const { navigator } = React2.useContext(NavigationContext)
	const { matches: parentMatches } = React2.useContext(RouteContext)
	const routeMatch = parentMatches[parentMatches.length - 1]
	const parentParams = routeMatch ? routeMatch.params : {}
	const parentPathname = routeMatch ? routeMatch.pathname : "/"
	const parentPathnameBase = routeMatch ? routeMatch.pathnameBase : "/"
	const parentRoute = routeMatch && routeMatch.route
	if (ENABLE_DEV_WARNINGS) {
		const parentPath = (parentRoute && parentRoute.path) || ""
		warningOnce(
			parentPathname,
			!parentRoute || parentPath.endsWith("*") || parentPath.endsWith("*?"),
			`You rendered descendant <Routes> (or called \`useRoutes()\`) at "${parentPathname}" (under <Route path="${parentPath}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${parentPath}"> to <Route path="${parentPath === "/" ? "*" : `${parentPath}/*`}">.`,
		)
	}
	const locationFromContext = useLocation()
	let location2
	if (locationArg) {
		const parsedLocationArg = typeof locationArg === "string" ? parsePath(locationArg) : locationArg
		invariant(
			parentPathnameBase === "/" ||
				((_a = parsedLocationArg.pathname) == null ? void 0 : _a.startsWith(parentPathnameBase)),
			`When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${parentPathnameBase}" but pathname "${parsedLocationArg.pathname}" was given in the \`location\` prop.`,
		)
		location2 = parsedLocationArg
	} else {
		location2 = locationFromContext
	}
	const pathname = location2.pathname || "/"
	let remainingPathname = pathname
	if (parentPathnameBase !== "/") {
		const parentSegments = parentPathnameBase.replace(/^\//, "").split("/")
		const segments = pathname.replace(/^\//, "").split("/")
		remainingPathname = "/" + segments.slice(parentSegments.length).join("/")
	}
	const matches =
		dataRouterOpts && dataRouterOpts.state.matches.length
			? // If we're in a data router, use the matches we've already identified but ensure
				// we have the latest route instances from the manifest in case elements have changed
				dataRouterOpts.state.matches.map(m =>
					Object.assign(m, {
						route: dataRouterOpts.manifest[m.route.id] || m.route,
					}),
				)
			: matchRoutes(routes, { pathname: remainingPathname })
	if (ENABLE_DEV_WARNINGS) {
		warning(
			parentRoute || matches != null,
			`No routes matched location "${location2.pathname}${location2.search}${location2.hash}" `,
		)
		warning(
			matches == null ||
				matches[matches.length - 1].route.element !== void 0 ||
				matches[matches.length - 1].route.Component !== void 0 ||
				matches[matches.length - 1].route.lazy !== void 0,
			`Matched leaf route at location "${location2.pathname}${location2.search}${location2.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`,
		)
	}
	const renderedMatches = _renderMatches(
		matches &&
			matches.map(match =>
				Object.assign({}, match, {
					params: Object.assign({}, parentParams, match.params),
					pathname: joinPaths([
						parentPathnameBase,
						// Re-encode pathnames that were decoded inside matchRoutes.
						// Pre-encode `%`, `?` and `#` ahead of `encodeLocation` because it uses
						// `new URL()` internally and we need to prevent it from treating
						// them as separators
						navigator.encodeLocation
							? navigator.encodeLocation(
									match.pathname.replace(/%/g, "%25").replace(/\?/g, "%3F").replace(/#/g, "%23"),
								).pathname
							: match.pathname,
					]),
					pathnameBase:
						match.pathnameBase === "/"
							? parentPathnameBase
							: joinPaths([
									parentPathnameBase,
									// Re-encode pathnames that were decoded inside matchRoutes
									// Pre-encode `%`, `?` and `#` ahead of `encodeLocation` because it uses
									// `new URL()` internally and we need to prevent it from treating
									// them as separators
									navigator.encodeLocation
										? navigator.encodeLocation(
												match.pathnameBase
													.replace(/%/g, "%25")
													.replace(/\?/g, "%3F")
													.replace(/#/g, "%23"),
											).pathname
										: match.pathnameBase,
								]),
				}),
			),
		parentMatches,
		dataRouterOpts,
	)
	if (locationArg && renderedMatches) {
		return React2.createElement(
			LocationContext.Provider,
			{
				value: {
					location: {
						pathname: "/",
						search: "",
						hash: "",
						state: null,
						key: "default",
						mask: void 0,
						...location2,
					},
					navigationType: "POP",
					/* Pop */
				},
			},
			renderedMatches,
		)
	}
	return renderedMatches
}
function DefaultErrorComponent() {
	const error = useRouteError()
	const message = isRouteErrorResponse(error)
		? `${error.status} ${error.statusText}`
		: error instanceof Error
			? error.message
			: JSON.stringify(error)
	const stack = error instanceof Error ? error.stack : null
	const lightgrey = "rgba(200,200,200, 0.5)"
	const preStyles = { padding: "0.5rem", backgroundColor: lightgrey }
	const codeStyles = { padding: "2px 4px", backgroundColor: lightgrey }
	let devInfo = null
	if (ENABLE_DEV_WARNINGS) {
		console.error("Error handled by React Router default ErrorBoundary:", error)
		devInfo = React2.createElement(
			React2.Fragment,
			null,
			React2.createElement("p", null, "💿 Hey developer 👋"),
			React2.createElement(
				"p",
				null,
				"You can provide a way better UX than this when your app throws errors by providing your own ",
				React2.createElement("code", { style: codeStyles }, "ErrorBoundary"),
				" or",
				" ",
				React2.createElement("code", { style: codeStyles }, "errorElement"),
				" prop on your route.",
			),
		)
	}
	return React2.createElement(
		React2.Fragment,
		null,
		React2.createElement("h2", null, "Unexpected Application Error!"),
		React2.createElement("h3", { style: { fontStyle: "italic" } }, message),
		stack ? React2.createElement("pre", { style: preStyles }, stack) : null,
		devInfo,
	)
}
var defaultErrorElement = React2.createElement(DefaultErrorComponent, null)
var RenderErrorBoundary = class extends React2.Component {
	constructor(props) {
		super(props)
		this.state = {
			location: props.location,
			revalidation: props.revalidation,
			error: props.error,
		}
	}
	static getDerivedStateFromError(error) {
		return { error }
	}
	static getDerivedStateFromProps(props, state) {
		if (
			state.location !== props.location ||
			(state.revalidation !== "idle" && props.revalidation === "idle")
		) {
			return {
				error: props.error,
				location: props.location,
				revalidation: props.revalidation,
			}
		}
		return {
			error: props.error !== void 0 ? props.error : state.error,
			location: state.location,
			revalidation: props.revalidation || state.revalidation,
		}
	}
	componentDidCatch(error, errorInfo) {
		if (this.props.onError) {
			this.props.onError(error, errorInfo)
		} else {
			console.error("React Router caught the following error during render", error)
		}
	}
	render() {
		let error = this.state.error
		if (
			this.context &&
			typeof error === "object" &&
			error &&
			"digest" in error &&
			typeof error.digest === "string"
		) {
			const decoded = decodeRouteErrorResponseDigest(error.digest)
			if (decoded) error = decoded
		}
		const result =
			error !== void 0
				? React2.createElement(
						RouteContext.Provider,
						{ value: this.props.routeContext },
						React2.createElement(RouteErrorContext.Provider, {
							value: error,
							children: this.props.component,
						}),
					)
				: this.props.children
		if (this.context) {
			return React2.createElement(RSCErrorHandler, { error }, result)
		}
		return result
	}
}
RenderErrorBoundary.contextType = RSCRouterContext
var errorRedirectHandledMap = /* @__PURE__ */ new WeakMap()
function RSCErrorHandler({ children, error }) {
	const { basename } = React2.useContext(NavigationContext)
	if (typeof error === "object" && error && "digest" in error && typeof error.digest === "string") {
		const redirect2 = decodeRedirectErrorDigest(error.digest)
		if (redirect2) {
			const existingRedirect = errorRedirectHandledMap.get(error)
			if (existingRedirect) throw existingRedirect
			const parsed = parseToInfo(redirect2.location, basename)
			if (isBrowser && !errorRedirectHandledMap.get(error)) {
				if (parsed.isExternal || redirect2.reloadDocument) {
					window.location.href = parsed.absoluteURL || parsed.to
				} else {
					const redirectPromise = Promise.resolve().then(() =>
						window.__reactRouterDataRouter.navigate(parsed.to, {
							replace: redirect2.replace,
						}),
					)
					errorRedirectHandledMap.set(error, redirectPromise)
					throw redirectPromise
				}
			}
			return React2.createElement("meta", {
				httpEquiv: "refresh",
				content: `0;url=${parsed.absoluteURL || parsed.to}`,
			})
		}
	}
	return children
}
function RenderedRoute({ routeContext, match, children }) {
	const dataRouterContext = React2.useContext(DataRouterContext)
	if (
		dataRouterContext &&
		dataRouterContext.static &&
		dataRouterContext.staticContext &&
		(match.route.errorElement || match.route.ErrorBoundary)
	) {
		dataRouterContext.staticContext._deepestRenderedBoundaryId = match.route.id
	}
	return React2.createElement(RouteContext.Provider, { value: routeContext }, children)
}
function _renderMatches(matches, parentMatches = [], dataRouterOpts) {
	const dataRouterState = dataRouterOpts == null ? void 0 : dataRouterOpts.state
	if (matches == null) {
		if (!dataRouterState) {
			return null
		}
		if (dataRouterState.errors) {
			matches = dataRouterState.matches
		} else if (
			parentMatches.length === 0 &&
			!dataRouterState.initialized &&
			dataRouterState.matches.length > 0
		) {
			matches = dataRouterState.matches
		} else {
			return null
		}
	}
	let renderedMatches = matches
	const errors = dataRouterState == null ? void 0 : dataRouterState.errors
	if (errors != null) {
		const errorIndex = renderedMatches.findIndex(
			m => m.route.id && (errors == null ? void 0 : errors[m.route.id]) !== void 0,
		)
		invariant(
			errorIndex >= 0,
			`Could not find a matching route for errors on route IDs: ${Object.keys(errors).join(",")}`,
		)
		renderedMatches = renderedMatches.slice(0, Math.min(renderedMatches.length, errorIndex + 1))
	}
	let renderFallback = false
	let fallbackIndex = -1
	if (dataRouterOpts && dataRouterState) {
		renderFallback = dataRouterState.renderFallback
		for (let i = 0; i < renderedMatches.length; i++) {
			const match = renderedMatches[i]
			if (match.route.HydrateFallback || match.route.hydrateFallbackElement) {
				fallbackIndex = i
			}
			if (match.route.id) {
				const { loaderData, errors: errors2 } = dataRouterState
				const needsToRunLoader =
					match.route.loader &&
					!Object.hasOwn(loaderData, match.route.id) &&
					(!errors2 || errors2[match.route.id] === void 0)
				if (match.route.lazy || needsToRunLoader) {
					if (dataRouterOpts.isStatic) {
						renderFallback = true
					}
					if (fallbackIndex >= 0) {
						renderedMatches = renderedMatches.slice(0, fallbackIndex + 1)
					} else {
						renderedMatches = [renderedMatches[0]]
					}
					break
				}
			}
		}
	}
	const onErrorHandler = dataRouterOpts == null ? void 0 : dataRouterOpts.onError
	const onError =
		dataRouterState && onErrorHandler
			? (error, errorInfo) => {
					var _a, _b
					onErrorHandler(error, {
						location: dataRouterState.location,
						params:
							((_b = (_a = dataRouterState.matches) == null ? void 0 : _a[0]) == null
								? void 0
								: _b.params) ?? {},
						pattern: getRoutePattern(dataRouterState.matches),
						errorInfo,
					})
				}
			: void 0
	return renderedMatches.reduceRight((outlet, match, index) => {
		let error
		let shouldRenderHydrateFallback = false
		let errorElement = null
		let hydrateFallbackElement = null
		if (dataRouterState) {
			error = errors && match.route.id ? errors[match.route.id] : void 0
			errorElement = match.route.errorElement || defaultErrorElement
			if (renderFallback) {
				if (fallbackIndex < 0 && index === 0) {
					warningOnce(
						"route-fallback",
						false,
						"No `HydrateFallback` element provided to render during initial hydration",
					)
					shouldRenderHydrateFallback = true
					hydrateFallbackElement = null
				} else if (fallbackIndex === index) {
					shouldRenderHydrateFallback = true
					hydrateFallbackElement = match.route.hydrateFallbackElement || null
				}
			}
		}
		const matches2 = parentMatches.concat(renderedMatches.slice(0, index + 1))
		const getChildren = () => {
			let children
			if (error) {
				children = errorElement
			} else if (shouldRenderHydrateFallback) {
				children = hydrateFallbackElement
			} else if (match.route.Component) {
				children = React2.createElement(match.route.Component, null)
			} else if (match.route.element) {
				children = match.route.element
			} else {
				children = outlet
			}
			return React2.createElement(RenderedRoute, {
				match,
				routeContext: {
					outlet,
					matches: matches2,
					isDataRoute: dataRouterState != null,
				},
				children,
			})
		}
		return dataRouterState && (match.route.ErrorBoundary || match.route.errorElement || index === 0)
			? React2.createElement(RenderErrorBoundary, {
					location: dataRouterState.location,
					revalidation: dataRouterState.revalidation,
					component: errorElement,
					error,
					children: getChildren(),
					routeContext: { outlet: null, matches: matches2, isDataRoute: true },
					onError,
				})
			: getChildren()
	}, null)
}
function getDataRouterConsoleError(hookName) {
	return `${hookName} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`
}
function useDataRouterContext(hookName) {
	const ctx = React2.useContext(DataRouterContext)
	invariant(ctx, getDataRouterConsoleError(hookName))
	return ctx
}
function useDataRouterState(hookName) {
	const state = React2.useContext(DataRouterStateContext)
	invariant(state, getDataRouterConsoleError(hookName))
	return state
}
function useRouteContext(hookName) {
	const route = React2.useContext(RouteContext)
	invariant(route, getDataRouterConsoleError(hookName))
	return route
}
function useCurrentRouteId(hookName) {
	const route = useRouteContext(hookName)
	const thisRoute = route.matches[route.matches.length - 1]
	invariant(thisRoute.route.id, `${hookName} can only be used on routes that contain a unique "id"`)
	return thisRoute.route.id
}
function useRouteId() {
	return useCurrentRouteId(
		"useRouteId",
		/* UseRouteId */
	)
}
function useNavigation() {
	const state = useDataRouterState(
		"useNavigation",
		/* UseNavigation */
	)
	return state.navigation
}
function useRevalidator() {
	const dataRouterContext = useDataRouterContext(
		"useRevalidator",
		/* UseRevalidator */
	)
	const state = useDataRouterState(
		"useRevalidator",
		/* UseRevalidator */
	)
	const revalidate = React2.useCallback(async () => {
		await dataRouterContext.router.revalidate()
	}, [dataRouterContext.router])
	return React2.useMemo(
		() => ({ revalidate, state: state.revalidation }),
		[revalidate, state.revalidation],
	)
}
function useMatches() {
	const { matches, loaderData } = useDataRouterState(
		"useMatches",
		/* UseMatches */
	)
	return React2.useMemo(
		() => matches.map(m => convertRouteMatchToUiMatch(m, loaderData)),
		[matches, loaderData],
	)
}
function useLoaderData() {
	const state = useDataRouterState(
		"useLoaderData",
		/* UseLoaderData */
	)
	const routeId = useCurrentRouteId(
		"useLoaderData",
		/* UseLoaderData */
	)
	return state.loaderData[routeId]
}
function useRouteLoaderData(routeId) {
	const state = useDataRouterState(
		"useRouteLoaderData",
		/* UseRouteLoaderData */
	)
	return state.loaderData[routeId]
}
function useActionData() {
	const state = useDataRouterState(
		"useActionData",
		/* UseActionData */
	)
	const routeId = useCurrentRouteId(
		"useLoaderData",
		/* UseLoaderData */
	)
	return state.actionData ? state.actionData[routeId] : void 0
}
function useRouteError() {
	var _a
	const error = React2.useContext(RouteErrorContext)
	const state = useDataRouterState(
		"useRouteError",
		/* UseRouteError */
	)
	const routeId = useCurrentRouteId(
		"useRouteError",
		/* UseRouteError */
	)
	if (error !== void 0) {
		return error
	}
	return (_a = state.errors) == null ? void 0 : _a[routeId]
}
function useAsyncValue() {
	const value = React2.useContext(AwaitContext)
	return value == null ? void 0 : value._data
}
function useAsyncError() {
	const value = React2.useContext(AwaitContext)
	return value == null ? void 0 : value._error
}
var blockerId = 0
function useBlocker(shouldBlock) {
	const { router: router2, basename } = useDataRouterContext(
		"useBlocker",
		/* UseBlocker */
	)
	const state = useDataRouterState(
		"useBlocker",
		/* UseBlocker */
	)
	const [blockerKey, setBlockerKey] = React2.useState("")
	const blockerFunction = React2.useCallback(
		arg => {
			if (typeof shouldBlock !== "function") {
				return !!shouldBlock
			}
			if (basename === "/") {
				return shouldBlock(arg)
			}
			const { currentLocation, nextLocation, historyAction } = arg
			return shouldBlock({
				currentLocation: {
					...currentLocation,
					pathname: stripBasename(currentLocation.pathname, basename) || currentLocation.pathname,
				},
				nextLocation: {
					...nextLocation,
					pathname: stripBasename(nextLocation.pathname, basename) || nextLocation.pathname,
				},
				historyAction,
			})
		},
		[basename, shouldBlock],
	)
	React2.useEffect(() => {
		const key = String(++blockerId)
		setBlockerKey(key)
		return () => router2.deleteBlocker(key)
	}, [router2])
	React2.useEffect(() => {
		if (blockerKey !== "") {
			router2.getBlocker(blockerKey, blockerFunction)
		}
	}, [router2, blockerKey, blockerFunction])
	return blockerKey && state.blockers.has(blockerKey)
		? state.blockers.get(blockerKey)
		: IDLE_BLOCKER
}
function useNavigateStable() {
	const { router: router2 } = useDataRouterContext(
		"useNavigate",
		/* UseNavigateStable */
	)
	const id = useCurrentRouteId(
		"useNavigate",
		/* UseNavigateStable */
	)
	const activeRef = React2.useRef(false)
	useIsomorphicLayoutEffect(() => {
		activeRef.current = true
	})
	const navigate = React2.useCallback(
		async (to, options = {}) => {
			warning(activeRef.current, navigateEffectWarning)
			if (!activeRef.current) return
			if (typeof to === "number") {
				await router2.navigate(to)
			} else {
				await router2.navigate(to, { fromRouteId: id, ...options })
			}
		},
		[router2, id],
	)
	return navigate
}
var alreadyWarned = {}
function warningOnce(key, cond, message) {
	if (!cond && !alreadyWarned[key]) {
		alreadyWarned[key] = true
		warning(false, message)
	}
}
function useRoute(...args) {
	var _a
	const currentRouteId = useCurrentRouteId(
		"useRoute",
		/* UseRoute */
	)
	const id = args[0] ?? currentRouteId
	const state = useDataRouterState(
		"useRoute",
		/* UseRoute */
	)
	const route = state.matches.find(({ route: route2 }) => route2.id === id)
	if (route === void 0) return void 0
	return {
		handle: route.route.handle,
		loaderData: state.loaderData[id],
		actionData: (_a = state.actionData) == null ? void 0 : _a[id],
	}
}
var alreadyWarned2 = {}
function warnOnce(condition, message) {
	if (!condition && !alreadyWarned2[message]) {
		alreadyWarned2[message] = true
		console.warn(message)
	}
}
var USE_OPTIMISTIC = "useOptimistic"
var useOptimisticImpl = React3[USE_OPTIMISTIC]
var stableUseOptimisticSetter = () => void 0
function useOptimisticSafe(val) {
	if (useOptimisticImpl) {
		return useOptimisticImpl(val)
	} else {
		return [val, stableUseOptimisticSetter]
	}
}
function mapRouteProperties(route) {
	const updates = {
		// Note: this check also occurs in createRoutesFromChildren so update
		// there if you change this -- please and thank you!
		hasErrorBoundary:
			route.hasErrorBoundary || route.ErrorBoundary != null || route.errorElement != null,
	}
	if (route.Component) {
		if (ENABLE_DEV_WARNINGS) {
			if (route.element) {
				warning(
					false,
					"You should not include both `Component` and `element` on your route - `Component` will be used.",
				)
			}
		}
		Object.assign(updates, {
			element: React3.createElement(route.Component),
			Component: void 0,
		})
	}
	if (route.HydrateFallback) {
		if (ENABLE_DEV_WARNINGS) {
			if (route.hydrateFallbackElement) {
				warning(
					false,
					"You should not include both `HydrateFallback` and `hydrateFallbackElement` on your route - `HydrateFallback` will be used.",
				)
			}
		}
		Object.assign(updates, {
			hydrateFallbackElement: React3.createElement(route.HydrateFallback),
			HydrateFallback: void 0,
		})
	}
	if (route.ErrorBoundary) {
		if (ENABLE_DEV_WARNINGS) {
			if (route.errorElement) {
				warning(
					false,
					"You should not include both `ErrorBoundary` and `errorElement` on your route - `ErrorBoundary` will be used.",
				)
			}
		}
		Object.assign(updates, {
			errorElement: React3.createElement(route.ErrorBoundary),
			ErrorBoundary: void 0,
		})
	}
	return updates
}
var hydrationRouteProperties = ["HydrateFallback", "hydrateFallbackElement"]
function createMemoryRouter(routes, opts) {
	return createRouter({
		basename: opts == null ? void 0 : opts.basename,
		getContext: opts == null ? void 0 : opts.getContext,
		future: opts == null ? void 0 : opts.future,
		history: createMemoryHistory({
			initialEntries: opts == null ? void 0 : opts.initialEntries,
			initialIndex: opts == null ? void 0 : opts.initialIndex,
		}),
		hydrationData: opts == null ? void 0 : opts.hydrationData,
		routes,
		hydrationRouteProperties,
		mapRouteProperties,
		dataStrategy: opts == null ? void 0 : opts.dataStrategy,
		patchRoutesOnNavigation: opts == null ? void 0 : opts.patchRoutesOnNavigation,
		instrumentations: opts == null ? void 0 : opts.instrumentations,
	}).initialize()
}
var Deferred = class {
	constructor() {
		this.status = "pending"
		this.promise = new Promise((resolve, reject) => {
			this.resolve = value => {
				if (this.status === "pending") {
					this.status = "resolved"
					resolve(value)
				}
			}
			this.reject = reason => {
				if (this.status === "pending") {
					this.status = "rejected"
					reject(reason)
				}
			}
		})
	}
}
function RouterProvider({
	router: router2,
	flushSync: reactDomFlushSyncImpl,
	onError,
	useTransitions,
}) {
	const unstable_rsc = useIsRSCRouterContext()
	useTransitions = unstable_rsc || useTransitions
	const [_state, setStateImpl] = React3.useState(router2.state)
	const [state, setOptimisticState] = useOptimisticSafe(_state)
	const [pendingState, setPendingState] = React3.useState()
	const [vtContext, setVtContext] = React3.useState({
		isTransitioning: false,
	})
	const [renderDfd, setRenderDfd] = React3.useState()
	const [transition, setTransition] = React3.useState()
	const [interruption, setInterruption] = React3.useState()
	const fetcherData = React3.useRef(/* @__PURE__ */ new Map())
	const setState = React3.useCallback(
		(newState, { deletedFetchers, newErrors, flushSync: flushSync3, viewTransitionOpts }) => {
			if (newErrors && onError) {
				Object.values(newErrors).forEach(error => {
					var _a
					return onError(error, {
						location: newState.location,
						params: ((_a = newState.matches[0]) == null ? void 0 : _a.params) ?? {},
						pattern: getRoutePattern(newState.matches),
					})
				})
			}
			newState.fetchers.forEach((fetcher, key) => {
				if (fetcher.data !== void 0) {
					fetcherData.current.set(key, fetcher.data)
				}
			})
			deletedFetchers.forEach(key => fetcherData.current.delete(key))
			warnOnce(
				flushSync3 === false || reactDomFlushSyncImpl != null,
				'You provided the `flushSync` option to a router update, but you are not using the `<RouterProvider>` from `react-router/dom` so `ReactDOM.flushSync()` is unavailable.  Please update your app to `import { RouterProvider } from "react-router/dom"` and ensure you have `react-dom` installed as a dependency to use the `flushSync` option.',
			)
			const isViewTransitionAvailable =
				router2.window != null &&
				router2.window.document != null &&
				typeof router2.window.document.startViewTransition === "function"
			warnOnce(
				viewTransitionOpts == null || isViewTransitionAvailable,
				"You provided the `viewTransition` option to a router update, but you do not appear to be running in a DOM environment as `window.startViewTransition` is not available.",
			)
			if (!viewTransitionOpts || !isViewTransitionAvailable) {
				if (reactDomFlushSyncImpl && flushSync3) {
					reactDomFlushSyncImpl(() => setStateImpl(newState))
				} else if (useTransitions === false) {
					setStateImpl(newState)
				} else {
					React3.startTransition(() => {
						if (useTransitions === true) {
							setOptimisticState(s => getOptimisticRouterState(s, newState))
						}
						setStateImpl(newState)
					})
				}
				return
			}
			if (reactDomFlushSyncImpl && flushSync3) {
				reactDomFlushSyncImpl(() => {
					if (transition) {
						renderDfd == null ? void 0 : renderDfd.resolve()
						transition.skipTransition()
					}
					setVtContext({
						isTransitioning: true,
						flushSync: true,
						currentLocation: viewTransitionOpts.currentLocation,
						nextLocation: viewTransitionOpts.nextLocation,
					})
				})
				const t = router2.window.document.startViewTransition(() => {
					reactDomFlushSyncImpl(() => setStateImpl(newState))
				})
				t.finished.finally(() => {
					reactDomFlushSyncImpl(() => {
						setRenderDfd(void 0)
						setTransition(void 0)
						setPendingState(void 0)
						setVtContext({ isTransitioning: false })
					})
				})
				reactDomFlushSyncImpl(() => setTransition(t))
				return
			}
			if (transition) {
				renderDfd == null ? void 0 : renderDfd.resolve()
				transition.skipTransition()
				setInterruption({
					state: newState,
					currentLocation: viewTransitionOpts.currentLocation,
					nextLocation: viewTransitionOpts.nextLocation,
				})
			} else {
				setPendingState(newState)
				setVtContext({
					isTransitioning: true,
					flushSync: false,
					currentLocation: viewTransitionOpts.currentLocation,
					nextLocation: viewTransitionOpts.nextLocation,
				})
			}
		},
		[
			router2.window,
			reactDomFlushSyncImpl,
			transition,
			renderDfd,
			useTransitions,
			setOptimisticState,
			onError,
		],
	)
	React3.useLayoutEffect(() => router2.subscribe(setState), [router2, setState])
	const initialized = state.initialized
	React3.useLayoutEffect(() => {
		if (!initialized && router2.state.initialized) {
			setState(router2.state, {
				deletedFetchers: [],
				flushSync: false,
				newErrors: null,
			})
		}
	}, [initialized, setState, router2.state])
	React3.useEffect(() => {
		if (vtContext.isTransitioning && !vtContext.flushSync) {
			setRenderDfd(new Deferred())
		}
	}, [vtContext])
	React3.useEffect(() => {
		if (renderDfd && pendingState && router2.window) {
			const newState = pendingState
			const renderPromise = renderDfd.promise
			const transition2 = router2.window.document.startViewTransition(async () => {
				if (useTransitions === false) {
					setStateImpl(newState)
				} else {
					React3.startTransition(() => {
						if (useTransitions === true) {
							setOptimisticState(s => getOptimisticRouterState(s, newState))
						}
						setStateImpl(newState)
					})
				}
				await renderPromise
			})
			transition2.finished.finally(() => {
				setRenderDfd(void 0)
				setTransition(void 0)
				setPendingState(void 0)
				setVtContext({ isTransitioning: false })
			})
			setTransition(transition2)
		}
	}, [pendingState, renderDfd, router2.window, useTransitions, setOptimisticState])
	React3.useEffect(() => {
		if (renderDfd && pendingState && state.location.key === pendingState.location.key) {
			renderDfd.resolve()
		}
	}, [renderDfd, transition, state.location, pendingState])
	React3.useEffect(() => {
		if (!vtContext.isTransitioning && interruption) {
			setPendingState(interruption.state)
			setVtContext({
				isTransitioning: true,
				flushSync: false,
				currentLocation: interruption.currentLocation,
				nextLocation: interruption.nextLocation,
			})
			setInterruption(void 0)
		}
	}, [vtContext.isTransitioning, interruption])
	const navigator = React3.useMemo(() => {
		return {
			createHref: router2.createHref,
			encodeLocation: router2.encodeLocation,
			go: n => router2.navigate(n),
			push: (to, state2, opts) =>
				router2.navigate(to, {
					state: state2,
					preventScrollReset: opts == null ? void 0 : opts.preventScrollReset,
				}),
			replace: (to, state2, opts) =>
				router2.navigate(to, {
					replace: true,
					state: state2,
					preventScrollReset: opts == null ? void 0 : opts.preventScrollReset,
				}),
		}
	}, [router2])
	const basename = router2.basename || "/"
	const dataRouterContext = React3.useMemo(
		() => ({
			router: router2,
			navigator,
			static: false,
			basename,
			onError,
		}),
		[router2, navigator, basename, onError],
	)
	return React3.createElement(
		React3.Fragment,
		null,
		React3.createElement(
			DataRouterContext.Provider,
			{ value: dataRouterContext },
			React3.createElement(
				DataRouterStateContext.Provider,
				{ value: state },
				React3.createElement(
					FetchersContext.Provider,
					{ value: fetcherData.current },
					React3.createElement(
						ViewTransitionContext.Provider,
						{ value: vtContext },
						React3.createElement(
							Router,
							{
								basename,
								location: state.location,
								navigationType: state.historyAction,
								navigator,
								useTransitions,
							},
							React3.createElement(MemoizedDataRoutes, {
								routes: router2.routes,
								manifest: router2.manifest,
								future: router2.future,
								state,
								isStatic: false,
								onError,
							}),
						),
					),
				),
			),
		),
		null,
	)
}
function getOptimisticRouterState(currentState, newState) {
	return {
		// Don't surface "current location specific" stuff mid-navigation
		// (historyAction, location, matches, loaderData, errors, initialized,
		// restoreScroll, preventScrollReset, blockers, etc.)
		...currentState,
		// Only surface "pending/in-flight stuff"
		// (navigation, revalidation, actionData, fetchers, )
		navigation:
			newState.navigation.state !== "idle" ? newState.navigation : currentState.navigation,
		revalidation:
			newState.revalidation !== "idle" ? newState.revalidation : currentState.revalidation,
		actionData:
			newState.navigation.state !== "submitting" ? newState.actionData : currentState.actionData,
		fetchers: newState.fetchers,
	}
}
var MemoizedDataRoutes = React3.memo(DataRoutes2)
function DataRoutes2({ routes, manifest, future, state, isStatic, onError }) {
	return useRoutesImpl(routes, void 0, {
		manifest,
		state,
		isStatic,
		onError,
		future,
	})
}
function MemoryRouter({ basename, children, initialEntries, initialIndex, useTransitions }) {
	const historyRef = React3.useRef()
	if (historyRef.current == null) {
		historyRef.current = createMemoryHistory({
			initialEntries,
			initialIndex,
			v5Compat: true,
		})
	}
	const history = historyRef.current
	const [state, setStateImpl] = React3.useState({
		action: history.action,
		location: history.location,
	})
	const setState = React3.useCallback(
		newState => {
			if (useTransitions === false) {
				setStateImpl(newState)
			} else {
				React3.startTransition(() => setStateImpl(newState))
			}
		},
		[useTransitions],
	)
	React3.useLayoutEffect(() => history.listen(setState), [history, setState])
	return React3.createElement(Router, {
		basename,
		children,
		location: state.location,
		navigationType: state.action,
		navigator: history,
		useTransitions,
	})
}
function Navigate({ to, replace: replace2, state, relative }) {
	invariant(
		useInRouterContext(),
		// TODO: This error is probably because they somehow have 2 versions of
		// the router loaded. We can help them understand how to avoid that.
		`<Navigate> may be used only in the context of a <Router> component.`,
	)
	const { static: isStatic } = React3.useContext(NavigationContext)
	warning(
		!isStatic,
		`<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change.`,
	)
	const { matches } = React3.useContext(RouteContext)
	const { pathname: locationPathname } = useLocation()
	const navigate = useNavigate()
	const path = resolveTo(to, getResolveToMatches(matches), locationPathname, relative === "path")
	const jsonPath = JSON.stringify(path)
	React3.useEffect(() => {
		navigate(JSON.parse(jsonPath), { replace: replace2, state, relative })
	}, [navigate, jsonPath, relative, replace2, state])
	return null
}
function Outlet(props) {
	return useOutlet(props.context)
}
function Route(props) {
	invariant(
		false,
		`A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.`,
	)
}
function Router({
	basename: basenameProp = "/",
	children = null,
	location: locationProp,
	navigationType = "POP",
	navigator,
	static: staticProp = false,
	useTransitions,
}) {
	invariant(
		!useInRouterContext(),
		`You cannot render a <Router> inside another <Router>. You should never have more than one in your app.`,
	)
	const basename = basenameProp.replace(/^\/*/, "/")
	const navigationContext = React3.useMemo(
		() => ({
			basename,
			navigator,
			static: staticProp,
			useTransitions,
			future: {},
		}),
		[basename, navigator, staticProp, useTransitions],
	)
	if (typeof locationProp === "string") {
		locationProp = parsePath(locationProp)
	}
	const {
		pathname = "/",
		search = "",
		hash = "",
		state = null,
		key = "default",
		mask,
	} = locationProp
	const locationContext = React3.useMemo(() => {
		const trailingPathname = stripBasename(pathname, basename)
		if (trailingPathname == null) {
			return null
		}
		return {
			location: {
				pathname: trailingPathname,
				search,
				hash,
				state,
				key,
				mask,
			},
			navigationType,
		}
	}, [basename, pathname, search, hash, state, key, navigationType, mask])
	warning(
		locationContext != null,
		`<Router basename="${basename}"> is not able to match the URL "${pathname}${search}${hash}" because it does not start with the basename, so the <Router> won't render anything.`,
	)
	if (locationContext == null) {
		return null
	}
	return React3.createElement(
		NavigationContext.Provider,
		{ value: navigationContext },
		React3.createElement(LocationContext.Provider, {
			children,
			value: locationContext,
		}),
	)
}
function Routes({ children, location: location2 }) {
	return useRoutes(createRoutesFromChildren(children), location2)
}
function Await({ children, errorElement, resolve }) {
	const dataRouterContext = React3.useContext(DataRouterContext)
	const dataRouterStateContext = React3.useContext(DataRouterStateContext)
	const onError = React3.useCallback(
		(error, errorInfo) => {
			var _a
			if (dataRouterContext && dataRouterContext.onError && dataRouterStateContext) {
				dataRouterContext.onError(error, {
					location: dataRouterStateContext.location,
					params: ((_a = dataRouterStateContext.matches[0]) == null ? void 0 : _a.params) || {},
					pattern: getRoutePattern(dataRouterStateContext.matches),
					errorInfo,
				})
			}
		},
		[dataRouterContext, dataRouterStateContext],
	)
	return React3.createElement(
		AwaitErrorBoundary,
		{
			resolve,
			errorElement,
			onError,
		},
		React3.createElement(ResolveAwait, null, children),
	)
}
var AwaitErrorBoundary = class extends React3.Component {
	constructor(props) {
		super(props)
		this.state = { error: null }
	}
	static getDerivedStateFromError(error) {
		return { error }
	}
	componentDidCatch(error, errorInfo) {
		if (this.props.onError) {
			this.props.onError(error, errorInfo)
		} else {
			console.error("<Await> caught the following error during render", error, errorInfo)
		}
	}
	render() {
		const { children, errorElement, resolve } = this.props
		let promise = null
		let status = 0
		if (!(resolve instanceof Promise)) {
			status = 1
			promise = Promise.resolve()
			Object.defineProperty(promise, "_tracked", { get: () => true })
			Object.defineProperty(promise, "_data", { get: () => resolve })
		} else if (this.state.error) {
			status = 2
			const renderError = this.state.error
			promise = Promise.reject().catch(() => {})
			Object.defineProperty(promise, "_tracked", { get: () => true })
			Object.defineProperty(promise, "_error", { get: () => renderError })
		} else if (resolve._tracked) {
			promise = resolve
			status = "_error" in promise ? 2 : "_data" in promise ? 1 : 0
		} else {
			status = 0
			Object.defineProperty(resolve, "_tracked", { get: () => true })
			promise = resolve.then(
				data2 => Object.defineProperty(resolve, "_data", { get: () => data2 }),
				error => {
					var _a, _b
					;(_b = (_a = this.props).onError) == null ? void 0 : _b.call(_a, error)
					Object.defineProperty(resolve, "_error", { get: () => error })
				},
			)
		}
		if (status === 2 && !errorElement) {
			throw promise._error
		}
		if (status === 2) {
			return React3.createElement(AwaitContext.Provider, {
				value: promise,
				children: errorElement,
			})
		}
		if (status === 1) {
			return React3.createElement(AwaitContext.Provider, {
				value: promise,
				children,
			})
		}
		throw promise
	}
}
function ResolveAwait({ children }) {
	const data2 = useAsyncValue()
	const toRender = typeof children === "function" ? children(data2) : children
	return React3.createElement(React3.Fragment, null, toRender)
}
function createRoutesFromChildren(children, parentPath = []) {
	const routes = []
	React3.Children.forEach(children, (element, index) => {
		if (!React3.isValidElement(element)) {
			return
		}
		const treePath = [...parentPath, index]
		if (element.type === React3.Fragment) {
			routes.push.apply(routes, createRoutesFromChildren(element.props.children, treePath))
			return
		}
		invariant(
			element.type === Route,
			`[${typeof element.type === "string" ? element.type : element.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`,
		)
		invariant(
			!element.props.index || !element.props.children,
			"An index route cannot have child routes.",
		)
		const route = {
			id: element.props.id || treePath.join("-"),
			caseSensitive: element.props.caseSensitive,
			element: element.props.element,
			Component: element.props.Component,
			index: element.props.index,
			path: element.props.path,
			middleware: element.props.middleware,
			loader: element.props.loader,
			action: element.props.action,
			hydrateFallbackElement: element.props.hydrateFallbackElement,
			HydrateFallback: element.props.HydrateFallback,
			errorElement: element.props.errorElement,
			ErrorBoundary: element.props.ErrorBoundary,
			hasErrorBoundary:
				element.props.hasErrorBoundary === true ||
				element.props.ErrorBoundary != null ||
				element.props.errorElement != null,
			shouldRevalidate: element.props.shouldRevalidate,
			handle: element.props.handle,
			lazy: element.props.lazy,
		}
		if (element.props.children) {
			route.children = createRoutesFromChildren(element.props.children, treePath)
		}
		routes.push(route)
	})
	return routes
}
var createRoutesFromElements = createRoutesFromChildren
function renderMatches(matches) {
	return _renderMatches(matches)
}
function useRouteComponentProps() {
	return {
		params: useParams(),
		loaderData: useLoaderData(),
		actionData: useActionData(),
		matches: useMatches(),
	}
}
function WithComponentProps({ children }) {
	const props = useRouteComponentProps()
	return React3.cloneElement(children, props)
}
function withComponentProps(Component4) {
	return function WithComponentProps2() {
		const props = useRouteComponentProps()
		return React3.createElement(Component4, props)
	}
}
function useHydrateFallbackProps() {
	return {
		params: useParams(),
		loaderData: useLoaderData(),
		actionData: useActionData(),
	}
}
function WithHydrateFallbackProps({ children }) {
	const props = useHydrateFallbackProps()
	return React3.cloneElement(children, props)
}
function withHydrateFallbackProps(HydrateFallback) {
	return function WithHydrateFallbackProps2() {
		const props = useHydrateFallbackProps()
		return React3.createElement(HydrateFallback, props)
	}
}
function useErrorBoundaryProps() {
	return {
		params: useParams(),
		loaderData: useLoaderData(),
		actionData: useActionData(),
		error: useRouteError(),
	}
}
function WithErrorBoundaryProps({ children }) {
	const props = useErrorBoundaryProps()
	return React3.cloneElement(children, props)
}
function withErrorBoundaryProps(ErrorBoundary) {
	return function WithErrorBoundaryProps2() {
		const props = useErrorBoundaryProps()
		return React3.createElement(ErrorBoundary, props)
	}
}
var defaultMethod = "get"
var defaultEncType = "application/x-www-form-urlencoded"
function isHtmlElement(object) {
	return typeof HTMLElement !== "undefined" && object instanceof HTMLElement
}
function isButtonElement(object) {
	return isHtmlElement(object) && object.tagName.toLowerCase() === "button"
}
function isFormElement(object) {
	return isHtmlElement(object) && object.tagName.toLowerCase() === "form"
}
function isInputElement(object) {
	return isHtmlElement(object) && object.tagName.toLowerCase() === "input"
}
function isModifiedEvent(event) {
	return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey)
}
function shouldProcessLinkClick(event, target) {
	return (
		event.button === 0 && // Ignore everything but left clicks
		(!target || target === "_self") && // Let browser handle "target=_blank" etc.
		!isModifiedEvent(event)
	)
}
function createSearchParams(init = "") {
	return new URLSearchParams(
		typeof init === "string" || Array.isArray(init) || init instanceof URLSearchParams
			? init
			: Object.keys(init).reduce((memo2, key) => {
					const value = init[key]
					return memo2.concat(Array.isArray(value) ? value.map(v => [key, v]) : [[key, value]])
				}, []),
	)
}
function getSearchParamsForLocation(locationSearch, defaultSearchParams) {
	const searchParams = createSearchParams(locationSearch)
	if (defaultSearchParams) {
		defaultSearchParams.forEach((_, key) => {
			if (!searchParams.has(key)) {
				defaultSearchParams.getAll(key).forEach(value => {
					searchParams.append(key, value)
				})
			}
		})
	}
	return searchParams
}
var _formDataSupportsSubmitter = null
function isFormDataSubmitterSupported() {
	if (_formDataSupportsSubmitter === null) {
		try {
			new FormData(
				document.createElement("form"),
				// @ts-expect-error if FormData supports the submitter parameter, this will throw
				0,
			)
			_formDataSupportsSubmitter = false
		} catch (e) {
			_formDataSupportsSubmitter = true
		}
	}
	return _formDataSupportsSubmitter
}
var supportedFormEncTypes = /* @__PURE__ */ new Set([
	"application/x-www-form-urlencoded",
	"multipart/form-data",
	"text/plain",
])
function getFormEncType(encType) {
	if (encType != null && !supportedFormEncTypes.has(encType)) {
		warning(
			false,
			`"${encType}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${defaultEncType}"`,
		)
		return null
	}
	return encType
}
function getFormSubmissionInfo(target, basename) {
	let method
	let action
	let encType
	let formData
	let body
	if (isFormElement(target)) {
		const attr = target.getAttribute("action")
		action = attr ? stripBasename(attr, basename) : null
		method = target.getAttribute("method") || defaultMethod
		encType = getFormEncType(target.getAttribute("enctype")) || defaultEncType
		formData = new FormData(target)
	} else if (
		isButtonElement(target) ||
		(isInputElement(target) && (target.type === "submit" || target.type === "image"))
	) {
		const form = target.form
		if (form == null) {
			throw new Error(`Cannot submit a <button> or <input type="submit"> without a <form>`)
		}
		const attr = target.getAttribute("formaction") || form.getAttribute("action")
		action = attr ? stripBasename(attr, basename) : null
		method = target.getAttribute("formmethod") || form.getAttribute("method") || defaultMethod
		encType =
			getFormEncType(target.getAttribute("formenctype")) ||
			getFormEncType(form.getAttribute("enctype")) ||
			defaultEncType
		formData = new FormData(form, target)
		if (!isFormDataSubmitterSupported()) {
			const { name, type, value } = target
			if (type === "image") {
				const prefix = name ? `${name}.` : ""
				formData.append(`${prefix}x`, "0")
				formData.append(`${prefix}y`, "0")
			} else if (name) {
				formData.append(name, value)
			}
		}
	} else if (isHtmlElement(target)) {
		throw new Error(
			`Cannot submit element that is not <form>, <button>, or <input type="submit|image">`,
		)
	} else {
		method = defaultMethod
		action = null
		encType = defaultEncType
		body = target
	}
	if (formData && encType === "text/plain") {
		body = formData
		formData = void 0
	}
	return { action, method: method.toLowerCase(), encType, formData, body }
}
var HOLE = -1
var NAN = -2
var NEGATIVE_INFINITY = -3
var NEGATIVE_ZERO = -4
var NULL = -5
var POSITIVE_INFINITY = -6
var UNDEFINED = -7
var TYPE_BIGINT = "B"
var TYPE_DATE = "D"
var TYPE_ERROR = "E"
var TYPE_MAP = "M"
var TYPE_NULL_OBJECT = "N"
var TYPE_PROMISE = "P"
var TYPE_REGEXP = "R"
var TYPE_SET = "S"
var TYPE_SYMBOL = "Y"
var TYPE_URL = "U"
var TYPE_PREVIOUS_RESOLVED = "Z"
var SUPPORTED_ERROR_TYPES = [
	"EvalError",
	"RangeError",
	"ReferenceError",
	"SyntaxError",
	"TypeError",
	"URIError",
]
var Deferred2 = class {
	constructor() {
		this.promise = new Promise((resolve, reject) => {
			this.resolve = resolve
			this.reject = reject
		})
	}
}
function createLineSplittingTransform() {
	const decoder = new TextDecoder()
	let leftover = ""
	return new TransformStream({
		transform(chunk, controller) {
			const str = decoder.decode(chunk, { stream: true })
			const parts = (leftover + str).split("\n")
			leftover = parts.pop() || ""
			for (const part of parts) {
				controller.enqueue(part)
			}
		},
		flush(controller) {
			if (leftover) {
				controller.enqueue(leftover)
			}
		},
	})
}
var TIME_LIMIT_MS = 1
var getNow = () => Date.now()
var yieldToMain = () => new Promise(resolve => setTimeout(resolve, 0))
async function flatten(input) {
	const { indices } = this
	const existing = indices.get(input)
	if (existing) return [existing]
	if (input === void 0) return UNDEFINED
	if (input === null) return NULL
	if (Number.isNaN(input)) return NAN
	if (input === Number.POSITIVE_INFINITY) return POSITIVE_INFINITY
	if (input === Number.NEGATIVE_INFINITY) return NEGATIVE_INFINITY
	if (input === 0 && 1 / input < 0) return NEGATIVE_ZERO
	const index = this.index++
	indices.set(input, index)
	const stack = [[input, index]]
	await stringify.call(this, stack)
	return index
}
async function stringify(stack) {
	const { deferred, indices, plugins, postPlugins } = this
	const str = this.stringified
	let lastYieldTime = getNow()
	const flattenValue = value => {
		const existing = indices.get(value)
		if (existing) return [existing]
		if (value === void 0) return UNDEFINED
		if (value === null) return NULL
		if (Number.isNaN(value)) return NAN
		if (value === Number.POSITIVE_INFINITY) return POSITIVE_INFINITY
		if (value === Number.NEGATIVE_INFINITY) return NEGATIVE_INFINITY
		if (value === 0 && 1 / value < 0) return NEGATIVE_ZERO
		const index = this.index++
		indices.set(value, index)
		stack.push([value, index])
		return index
	}
	let i = 0
	while (stack.length > 0) {
		const now = getNow()
		if (++i % 6e3 === 0 && now - lastYieldTime >= TIME_LIMIT_MS) {
			await yieldToMain()
			lastYieldTime = getNow()
		}
		const [input, index] = stack.pop()
		const partsForObj = obj =>
			Object.keys(obj)
				.map(k => `"_${flattenValue(k)}":${flattenValue(obj[k])}`)
				.join(",")
		let error = null
		switch (typeof input) {
			case "boolean":
			case "number":
			case "string":
				str[index] = JSON.stringify(input)
				break
			case "bigint":
				str[index] = `["${TYPE_BIGINT}","${input}"]`
				break
			case "symbol": {
				const keyFor = Symbol.keyFor(input)
				if (!keyFor) {
					error = new Error("Cannot encode symbol unless created with Symbol.for()")
				} else {
					str[index] = `["${TYPE_SYMBOL}",${JSON.stringify(keyFor)}]`
				}
				break
			}
			case "object": {
				if (!input) {
					str[index] = `${NULL}`
					break
				}
				const isArray = Array.isArray(input)
				let pluginHandled = false
				if (!isArray && plugins) {
					for (const plugin of plugins) {
						const pluginResult = plugin(input)
						if (Array.isArray(pluginResult)) {
							pluginHandled = true
							const [pluginIdentifier, ...rest] = pluginResult
							str[index] = `[${JSON.stringify(pluginIdentifier)}`
							if (rest.length > 0) {
								str[index] += `,${rest.map(v => flattenValue(v)).join(",")}`
							}
							str[index] += "]"
							break
						}
					}
				}
				if (!pluginHandled) {
					let result = isArray ? "[" : "{"
					if (isArray) {
						for (let i2 = 0; i2 < input.length; i2++)
							result += (i2 ? "," : "") + (i2 in input ? flattenValue(input[i2]) : HOLE)
						str[index] = `${result}]`
					} else if (input instanceof Date) {
						const dateTime = input.getTime()
						str[index] =
							`["${TYPE_DATE}",${Number.isNaN(dateTime) ? JSON.stringify("invalid") : dateTime}]`
					} else if (input instanceof URL) {
						str[index] = `["${TYPE_URL}",${JSON.stringify(input.href)}]`
					} else if (input instanceof RegExp) {
						str[index] = `["${TYPE_REGEXP}",${JSON.stringify(
							input.source,
						)},${JSON.stringify(input.flags)}]`
					} else if (input instanceof Set) {
						if (input.size > 0) {
							str[index] = `["${TYPE_SET}",${[...input].map(val => flattenValue(val)).join(",")}]`
						} else {
							str[index] = `["${TYPE_SET}"]`
						}
					} else if (input instanceof Map) {
						if (input.size > 0) {
							str[index] =
								`["${TYPE_MAP}",${[...input].flatMap(([k, v]) => [flattenValue(k), flattenValue(v)]).join(",")}]`
						} else {
							str[index] = `["${TYPE_MAP}"]`
						}
					} else if (input instanceof Promise) {
						str[index] = `["${TYPE_PROMISE}",${index}]`
						deferred[index] = input
					} else if (input instanceof Error) {
						str[index] = `["${TYPE_ERROR}",${JSON.stringify(input.message)}`
						if (input.name !== "Error") {
							str[index] += `,${JSON.stringify(input.name)}`
						}
						str[index] += "]"
					} else if (Object.getPrototypeOf(input) === null) {
						str[index] = `["${TYPE_NULL_OBJECT}",{${partsForObj(input)}}]`
					} else if (isPlainObject2(input)) {
						str[index] = `{${partsForObj(input)}}`
					} else {
						error = new Error("Cannot encode object with prototype")
					}
				}
				break
			}
			default: {
				const isArray = Array.isArray(input)
				let pluginHandled = false
				if (!isArray && plugins) {
					for (const plugin of plugins) {
						const pluginResult = plugin(input)
						if (Array.isArray(pluginResult)) {
							pluginHandled = true
							const [pluginIdentifier, ...rest] = pluginResult
							str[index] = `[${JSON.stringify(pluginIdentifier)}`
							if (rest.length > 0) {
								str[index] += `,${rest.map(v => flattenValue(v)).join(",")}`
							}
							str[index] += "]"
							break
						}
					}
				}
				if (!pluginHandled) {
					error = new Error("Cannot encode function or unexpected type")
				}
			}
		}
		if (error) {
			let pluginHandled = false
			if (postPlugins) {
				for (const plugin of postPlugins) {
					const pluginResult = plugin(input)
					if (Array.isArray(pluginResult)) {
						pluginHandled = true
						const [pluginIdentifier, ...rest] = pluginResult
						str[index] = `[${JSON.stringify(pluginIdentifier)}`
						if (rest.length > 0) {
							str[index] += `,${rest.map(v => flattenValue(v)).join(",")}`
						}
						str[index] += "]"
						break
					}
				}
			}
			if (!pluginHandled) {
				throw error
			}
		}
	}
}
var objectProtoNames2 = Object.getOwnPropertyNames(Object.prototype).sort().join("\0")
function isPlainObject2(thing) {
	const proto = Object.getPrototypeOf(thing)
	return (
		proto === Object.prototype ||
		proto === null ||
		Object.getOwnPropertyNames(proto).sort().join("\0") === objectProtoNames2
	)
}
var globalObj =
	typeof window !== "undefined" ? window : typeof globalThis !== "undefined" ? globalThis : void 0
function unflatten(parsed) {
	const { hydrated, values } = this
	if (typeof parsed === "number") return hydrate.call(this, parsed)
	if (!Array.isArray(parsed) || !parsed.length) throw new SyntaxError()
	const startIndex = values.length
	for (const value of parsed) {
		values.push(value)
	}
	hydrated.length = values.length
	return hydrate.call(this, startIndex)
}
function hydrate(index) {
	const { hydrated, values, deferred, plugins } = this
	let result
	const stack = [
		[
			index,
			v => {
				result = v
			},
		],
	]
	const postRun = []
	while (stack.length > 0) {
		const [index2, set] = stack.pop()
		switch (index2) {
			case UNDEFINED:
				set(void 0)
				continue
			case NULL:
				set(null)
				continue
			case NAN:
				set(NaN)
				continue
			case POSITIVE_INFINITY:
				set(Infinity)
				continue
			case NEGATIVE_INFINITY:
				set(-Infinity)
				continue
			case NEGATIVE_ZERO:
				set(-0)
				continue
		}
		if (hydrated[index2]) {
			set(hydrated[index2])
			continue
		}
		const value = values[index2]
		if (!value || typeof value !== "object") {
			hydrated[index2] = value
			set(value)
			continue
		}
		if (Array.isArray(value)) {
			if (typeof value[0] === "string") {
				const [type, b, c] = value
				switch (type) {
					case TYPE_DATE:
						set((hydrated[index2] = new Date(b)))
						continue
					case TYPE_URL:
						set((hydrated[index2] = new URL(b)))
						continue
					case TYPE_BIGINT:
						set((hydrated[index2] = BigInt(b)))
						continue
					case TYPE_REGEXP:
						set((hydrated[index2] = new RegExp(b, c)))
						continue
					case TYPE_SYMBOL:
						set((hydrated[index2] = Symbol.for(b)))
						continue
					case TYPE_SET: {
						const newSet = /* @__PURE__ */ new Set()
						hydrated[index2] = newSet
						for (let i = value.length - 1; i > 0; i--)
							stack.push([
								value[i],
								v => {
									newSet.add(v)
								},
							])
						set(newSet)
						continue
					}
					case TYPE_MAP: {
						const map = /* @__PURE__ */ new Map()
						hydrated[index2] = map
						for (let i = value.length - 2; i > 0; i -= 2) {
							const r = []
							stack.push([
								value[i + 1],
								v => {
									r[1] = v
								},
							])
							stack.push([
								value[i],
								k => {
									r[0] = k
								},
							])
							postRun.push(() => {
								map.set(r[0], r[1])
							})
						}
						set(map)
						continue
					}
					case TYPE_NULL_OBJECT: {
						const obj = /* @__PURE__ */ Object.create(null)
						hydrated[index2] = obj
						for (const key of Object.keys(b).reverse()) {
							const r = []
							stack.push([
								b[key],
								v => {
									r[1] = v
								},
							])
							stack.push([
								Number(key.slice(1)),
								k => {
									r[0] = k
								},
							])
							postRun.push(() => {
								obj[r[0]] = r[1]
							})
						}
						set(obj)
						continue
					}
					case TYPE_PROMISE:
						if (hydrated[b]) {
							set((hydrated[index2] = hydrated[b]))
						} else {
							const d = new Deferred2()
							deferred[b] = d
							set((hydrated[index2] = d.promise))
						}
						continue
					case TYPE_ERROR: {
						const [, message, errorType] = value
						const error =
							errorType &&
							globalObj &&
							SUPPORTED_ERROR_TYPES.includes(errorType) &&
							errorType in globalObj &&
							typeof globalObj[errorType] === "function"
								? new globalObj[errorType](message)
								: new Error(message)
						hydrated[index2] = error
						set(error)
						continue
					}
					case TYPE_PREVIOUS_RESOLVED:
						set((hydrated[index2] = hydrated[b]))
						continue
					default:
						if (Array.isArray(plugins)) {
							const r = []
							const vals = value.slice(1)
							for (let i = 0; i < vals.length; i++) {
								const v = vals[i]
								stack.push([
									v,
									v2 => {
										r[i] = v2
									},
								])
							}
							postRun.push(() => {
								for (const plugin of plugins) {
									const result2 = plugin(value[0], ...r)
									if (result2) {
										set((hydrated[index2] = result2.value))
										return
									}
								}
								throw new SyntaxError()
							})
							continue
						}
						throw new SyntaxError()
				}
			} else {
				const array = []
				hydrated[index2] = array
				for (let i = 0; i < value.length; i++) {
					const n = value[i]
					if (n !== HOLE) {
						stack.push([
							n,
							v => {
								array[i] = v
							},
						])
					}
				}
				set(array)
			}
		} else {
			const object = {}
			hydrated[index2] = object
			for (const key of Object.keys(value).reverse()) {
				const r = []
				stack.push([
					value[key],
					v => {
						r[1] = v
					},
				])
				stack.push([
					Number(key.slice(1)),
					k => {
						r[0] = k
					},
				])
				postRun.push(() => {
					object[r[0]] = r[1]
				})
			}
			set(object)
		}
	}
	while (postRun.length > 0) {
		postRun.pop()()
	}
	return result
}
async function decode(readable, options) {
	const { plugins } = options ?? {}
	const done = new Deferred2()
	const reader = readable.pipeThrough(createLineSplittingTransform()).getReader()
	const decoder = {
		values: [],
		hydrated: [],
		deferred: {},
		plugins,
	}
	const decoded = await decodeInitial.call(decoder, reader)
	let donePromise = done.promise
	if (decoded.done) {
		done.resolve()
	} else {
		donePromise = decodeDeferred
			.call(decoder, reader)
			.then(done.resolve)
			.catch(reason => {
				for (const deferred of Object.values(decoder.deferred)) {
					deferred.reject(reason)
				}
				done.reject(reason)
			})
	}
	return {
		done: donePromise.then(() => reader.closed),
		value: decoded.value,
	}
}
async function decodeInitial(reader) {
	const read = await reader.read()
	if (!read.value) {
		throw new SyntaxError()
	}
	let line
	try {
		line = JSON.parse(read.value)
	} catch (reason) {
		throw new SyntaxError()
	}
	return {
		done: read.done,
		value: unflatten.call(this, line),
	}
}
async function decodeDeferred(reader) {
	let read = await reader.read()
	while (!read.done) {
		if (!read.value) continue
		const line = read.value
		switch (line[0]) {
			case TYPE_PROMISE: {
				const colonIndex = line.indexOf(":")
				const deferredId = Number(line.slice(1, colonIndex))
				const deferred = this.deferred[deferredId]
				if (!deferred) {
					throw new Error(`Deferred ID ${deferredId} not found in stream`)
				}
				const lineData = line.slice(colonIndex + 1)
				let jsonLine
				try {
					jsonLine = JSON.parse(lineData)
				} catch (reason) {
					throw new SyntaxError()
				}
				const value = unflatten.call(this, jsonLine)
				deferred.resolve(value)
				break
			}
			case TYPE_ERROR: {
				const colonIndex = line.indexOf(":")
				const deferredId = Number(line.slice(1, colonIndex))
				const deferred = this.deferred[deferredId]
				if (!deferred) {
					throw new Error(`Deferred ID ${deferredId} not found in stream`)
				}
				const lineData = line.slice(colonIndex + 1)
				let jsonLine
				try {
					jsonLine = JSON.parse(lineData)
				} catch (reason) {
					throw new SyntaxError()
				}
				const value = unflatten.call(this, jsonLine)
				deferred.reject(value)
				break
			}
			default:
				throw new SyntaxError()
		}
		read = await reader.read()
	}
}
function encode(input, options) {
	const { onComplete, plugins, postPlugins, signal } = options ?? {}
	const encoder3 = {
		deferred: {},
		index: 0,
		indices: /* @__PURE__ */ new Map(),
		stringified: [],
		plugins,
		postPlugins,
		signal,
	}
	const textEncoder = new TextEncoder()
	let lastSentIndex = 0
	const readable = new ReadableStream({
		async start(controller) {
			const id = await flatten.call(encoder3, input)
			if (Array.isArray(id)) {
				throw new Error("This should never happen")
			}
			if (id < 0) {
				controller.enqueue(
					textEncoder.encode(`${id}
`),
				)
			} else {
				controller.enqueue(
					textEncoder.encode(`[${encoder3.stringified.join(",")}]
`),
				)
				lastSentIndex = encoder3.stringified.length - 1
			}
			const seenPromises = /* @__PURE__ */ new WeakSet()
			let processingChain = Promise.resolve()
			if (Object.keys(encoder3.deferred).length) {
				let raceDone
				const racePromise = new Promise((resolve, reject) => {
					raceDone = resolve
					if (signal) {
						const rejectPromise = () => reject(signal.reason || new Error("Signal was aborted."))
						if (signal.aborted) {
							rejectPromise()
						} else {
							signal.addEventListener("abort", event => {
								rejectPromise()
							})
						}
					}
				})
				while (Object.keys(encoder3.deferred).length > 0) {
					for (const [deferredId, deferred] of Object.entries(encoder3.deferred)) {
						if (seenPromises.has(deferred)) continue
						seenPromises.add(
							// biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
							(encoder3.deferred[Number(deferredId)] = Promise.race([racePromise, deferred])
								.then(
									resolved => {
										processingChain = processingChain.then(async () => {
											const id2 = await flatten.call(encoder3, resolved)
											if (Array.isArray(id2)) {
												controller.enqueue(
													textEncoder.encode(
														`${TYPE_PROMISE}${deferredId}:[["${TYPE_PREVIOUS_RESOLVED}",${id2[0]}]]
`,
													),
												)
												encoder3.index++
												lastSentIndex++
											} else if (id2 < 0) {
												controller.enqueue(
													textEncoder.encode(
														`${TYPE_PROMISE}${deferredId}:${id2}
`,
													),
												)
											} else {
												const values = encoder3.stringified.slice(lastSentIndex + 1).join(",")
												controller.enqueue(
													textEncoder.encode(
														`${TYPE_PROMISE}${deferredId}:[${values}]
`,
													),
												)
												lastSentIndex = encoder3.stringified.length - 1
											}
										})
										return processingChain
									},
									reason => {
										processingChain = processingChain.then(async () => {
											if (!reason || typeof reason !== "object" || !(reason instanceof Error)) {
												reason = new Error("An unknown error occurred")
											}
											const id2 = await flatten.call(encoder3, reason)
											if (Array.isArray(id2)) {
												controller.enqueue(
													textEncoder.encode(
														`${TYPE_ERROR}${deferredId}:[["${TYPE_PREVIOUS_RESOLVED}",${id2[0]}]]
`,
													),
												)
												encoder3.index++
												lastSentIndex++
											} else if (id2 < 0) {
												controller.enqueue(
													textEncoder.encode(
														`${TYPE_ERROR}${deferredId}:${id2}
`,
													),
												)
											} else {
												const values = encoder3.stringified.slice(lastSentIndex + 1).join(",")
												controller.enqueue(
													textEncoder.encode(
														`${TYPE_ERROR}${deferredId}:[${values}]
`,
													),
												)
												lastSentIndex = encoder3.stringified.length - 1
											}
										})
										return processingChain
									},
								)
								.finally(() => {
									delete encoder3.deferred[Number(deferredId)]
								})),
						)
					}
					await Promise.race(Object.values(encoder3.deferred))
				}
				raceDone()
			}
			await Promise.all(Object.values(encoder3.deferred))
			await processingChain
			controller.close()
			onComplete == null ? void 0 : onComplete()
		},
	})
	return readable
}
async function createRequestInit(request) {
	const init = { signal: request.signal }
	if (request.method !== "GET") {
		init.method = request.method
		const contentType = request.headers.get("Content-Type")
		if (contentType && /\bapplication\/json\b/.test(contentType)) {
			init.headers = { "Content-Type": contentType }
			init.body = JSON.stringify(await request.json())
		} else if (contentType && /\btext\/plain\b/.test(contentType)) {
			init.headers = { "Content-Type": contentType }
			init.body = await request.text()
		} else if (contentType && /\bapplication\/x-www-form-urlencoded\b/.test(contentType)) {
			init.body = new URLSearchParams(await request.text())
		} else {
			init.body = await request.formData()
		}
	}
	return init
}
var ESCAPE_LOOKUP = {
	"&": "\\u0026",
	">": "\\u003e",
	"<": "\\u003c",
	"\u2028": "\\u2028",
	"\u2029": "\\u2029",
}
var ESCAPE_REGEX = /[&><\u2028\u2029]/g
function escapeHtml(html) {
	return html.replace(ESCAPE_REGEX, match => ESCAPE_LOOKUP[match])
}
function invariant2(value, message) {
	if (value === false || value === null || typeof value === "undefined") {
		throw new Error(message)
	}
}
var SingleFetchRedirectSymbol = Symbol("SingleFetchRedirect")
var SingleFetchNoResultError = class extends Error {}
var SINGLE_FETCH_REDIRECT_STATUS = 202
var NO_BODY_STATUS_CODES = /* @__PURE__ */ new Set([100, 101, 204, 205])
function StreamTransfer({ context, identifier, reader, textDecoder, nonce }) {
	if (!context.renderMeta || !context.renderMeta.didRenderScripts) {
		return null
	}
	if (!context.renderMeta.streamCache) {
		context.renderMeta.streamCache = {}
	}
	const { streamCache } = context.renderMeta
	let promise = streamCache[identifier]
	if (!promise) {
		promise = streamCache[identifier] = reader
			.read()
			.then(result => {
				streamCache[identifier].result = {
					done: result.done,
					value: textDecoder.decode(result.value, { stream: true }),
				}
			})
			.catch(e => {
				streamCache[identifier].error = e
			})
	}
	if (promise.error) {
		throw promise.error
	}
	if (promise.result === void 0) {
		throw promise
	}
	const { done, value } = promise.result
	const scriptTag = value
		? React4.createElement("script", {
				nonce,
				dangerouslySetInnerHTML: {
					__html: `window.__reactRouterContext.streamController.enqueue(${escapeHtml(
						JSON.stringify(value),
					)});`,
				},
			})
		: null
	if (done) {
		return React4.createElement(
			React4.Fragment,
			null,
			scriptTag,
			React4.createElement("script", {
				nonce,
				dangerouslySetInnerHTML: {
					__html: `window.__reactRouterContext.streamController.close();`,
				},
			}),
		)
	} else {
		return React4.createElement(
			React4.Fragment,
			null,
			scriptTag,
			React4.createElement(
				React4.Suspense,
				null,
				React4.createElement(StreamTransfer, {
					context,
					identifier: identifier + 1,
					reader,
					textDecoder,
					nonce,
				}),
			),
		)
	}
}
function getTurboStreamSingleFetchDataStrategy(
	getRouter,
	manifest,
	routeModules,
	ssr,
	basename,
	trailingSlashAware,
) {
	const dataStrategy = getSingleFetchDataStrategyImpl(
		getRouter,
		match => {
			const manifestRoute = manifest.routes[match.route.id]
			invariant2(manifestRoute, "Route not found in manifest")
			return {
				hasLoader: manifestRoute.hasLoader,
				hasClientLoader: manifestRoute.hasClientLoader,
			}
		},
		fetchAndDecodeViaTurboStream,
		ssr,
		basename,
		trailingSlashAware,
	)
	return async args => args.runClientMiddleware(dataStrategy)
}
function getSingleFetchDataStrategyImpl(
	getRouter,
	getRouteInfo,
	fetchAndDecode,
	ssr,
	basename,
	trailingSlashAware,
	shouldAllowOptOut = () => true,
) {
	return async args => {
		const { request, matches, fetcherKey } = args
		const router2 = getRouter()
		if (request.method !== "GET") {
			return singleFetchActionStrategy(args, fetchAndDecode, basename, trailingSlashAware)
		}
		const foundRevalidatingServerLoader = matches.some(m => {
			const { hasLoader, hasClientLoader } = getRouteInfo(m)
			return m.shouldCallHandler() && hasLoader && !hasClientLoader
		})
		if (!ssr && !foundRevalidatingServerLoader) {
			return nonSsrStrategy(args, getRouteInfo, fetchAndDecode, basename, trailingSlashAware)
		}
		if (fetcherKey) {
			return singleFetchLoaderFetcherStrategy(args, fetchAndDecode, basename, trailingSlashAware)
		}
		return singleFetchLoaderNavigationStrategy(
			args,
			router2,
			getRouteInfo,
			fetchAndDecode,
			ssr,
			basename,
			trailingSlashAware,
			shouldAllowOptOut,
		)
	}
}
async function singleFetchActionStrategy(args, fetchAndDecode, basename, trailingSlashAware) {
	const actionMatch = args.matches.find(m => m.shouldCallHandler())
	invariant2(actionMatch, "No action match found")
	let actionStatus = void 0
	const result = await actionMatch.resolve(async handler => {
		const result2 = await handler(async () => {
			const { data: data2, status } = await fetchAndDecode(args, basename, trailingSlashAware, [
				actionMatch.route.id,
			])
			actionStatus = status
			return unwrapSingleFetchResult(data2, actionMatch.route.id)
		})
		return result2
	})
	if (
		isResponse(result.result) ||
		isRouteErrorResponse(result.result) ||
		isDataWithResponseInit(result.result)
	) {
		return { [actionMatch.route.id]: result }
	}
	return {
		[actionMatch.route.id]: {
			type: result.type,
			result: data(result.result, actionStatus),
		},
	}
}
async function nonSsrStrategy(args, getRouteInfo, fetchAndDecode, basename, trailingSlashAware) {
	const matchesToLoad = args.matches.filter(m => m.shouldCallHandler())
	const results = {}
	await Promise.all(
		matchesToLoad.map(m =>
			m.resolve(async handler => {
				try {
					const { hasClientLoader } = getRouteInfo(m)
					const routeId = m.route.id
					const result = hasClientLoader
						? await handler(async () => {
								const { data: data2 } = await fetchAndDecode(args, basename, trailingSlashAware, [
									routeId,
								])
								return unwrapSingleFetchResult(data2, routeId)
							})
						: await handler()
					results[m.route.id] = { type: "data", result }
				} catch (e) {
					results[m.route.id] = { type: "error", result: e }
				}
			}),
		),
	)
	return results
}
async function singleFetchLoaderNavigationStrategy(
	args,
	router2,
	getRouteInfo,
	fetchAndDecode,
	ssr,
	basename,
	trailingSlashAware,
	shouldAllowOptOut = () => true,
) {
	const routesParams = /* @__PURE__ */ new Set()
	let foundOptOutRoute = false
	const routeDfds = args.matches.map(() => createDeferred2())
	const singleFetchDfd = createDeferred2()
	const results = {}
	const resolvePromise = Promise.all(
		args.matches.map(async (m, i) =>
			m.resolve(async handler => {
				routeDfds[i].resolve()
				const routeId = m.route.id
				const { hasLoader, hasClientLoader } = getRouteInfo(m)
				const defaultShouldRevalidate =
					!m.shouldRevalidateArgs ||
					m.shouldRevalidateArgs.actionStatus == null ||
					m.shouldRevalidateArgs.actionStatus < 400
				const shouldCall = m.shouldCallHandler(defaultShouldRevalidate)
				if (!shouldCall) {
					foundOptOutRoute ||
						(foundOptOutRoute =
							m.shouldRevalidateArgs != null && // This is a revalidation,
							hasLoader)
					return
				}
				if (shouldAllowOptOut(m) && hasClientLoader) {
					if (hasLoader) {
						foundOptOutRoute = true
					}
					try {
						const result = await handler(async () => {
							const { data: data2 } = await fetchAndDecode(args, basename, trailingSlashAware, [
								routeId,
							])
							return unwrapSingleFetchResult(data2, routeId)
						})
						results[routeId] = { type: "data", result }
					} catch (e) {
						results[routeId] = { type: "error", result: e }
					}
					return
				}
				if (hasLoader) {
					routesParams.add(routeId)
				}
				try {
					const result = await handler(async () => {
						const data2 = await singleFetchDfd.promise
						return unwrapSingleFetchResult(data2, routeId)
					})
					results[routeId] = { type: "data", result }
				} catch (e) {
					results[routeId] = { type: "error", result: e }
				}
			}),
		),
	)
	await Promise.all(routeDfds.map(d => d.promise))
	const isInitialLoad = !router2.state.initialized && router2.state.navigation.state === "idle"
	if ((isInitialLoad || routesParams.size === 0) && !window.__reactRouterHdrActive) {
		singleFetchDfd.resolve({ routes: {} })
	} else {
		const targetRoutes =
			ssr && foundOptOutRoute && routesParams.size > 0 ? [...routesParams.keys()] : void 0
		try {
			const data2 = await fetchAndDecode(args, basename, trailingSlashAware, targetRoutes)
			singleFetchDfd.resolve(data2.data)
		} catch (e) {
			singleFetchDfd.reject(e)
		}
	}
	await resolvePromise
	await bubbleMiddlewareErrors(singleFetchDfd.promise, args.matches, routesParams, results)
	return results
}
async function bubbleMiddlewareErrors(singleFetchPromise, matches, routesParams, results) {
	var _a
	try {
		let middlewareError
		const fetchedData = await singleFetchPromise
		if ("routes" in fetchedData) {
			for (const match of matches) {
				if (match.route.id in fetchedData.routes) {
					const routeResult = fetchedData.routes[match.route.id]
					if ("error" in routeResult) {
						middlewareError = routeResult.error
						if (((_a = results[match.route.id]) == null ? void 0 : _a.result) == null) {
							results[match.route.id] = {
								type: "error",
								result: middlewareError,
							}
						}
						break
					}
				}
			}
		}
		if (middlewareError !== void 0) {
			Array.from(routesParams.values()).forEach(routeId => {
				if (results[routeId].result instanceof SingleFetchNoResultError) {
					results[routeId].result = middlewareError
				}
			})
		}
	} catch (e) {}
}
async function singleFetchLoaderFetcherStrategy(
	args,
	fetchAndDecode,
	basename,
	trailingSlashAware,
) {
	const fetcherMatch = args.matches.find(m => m.shouldCallHandler())
	invariant2(fetcherMatch, "No fetcher match found")
	const routeId = fetcherMatch.route.id
	const result = await fetcherMatch.resolve(async handler =>
		handler(async () => {
			const { data: data2 } = await fetchAndDecode(args, basename, trailingSlashAware, [routeId])
			return unwrapSingleFetchResult(data2, routeId)
		}),
	)
	return { [fetcherMatch.route.id]: result }
}
function stripIndexParam(url) {
	const indexValues = url.searchParams.getAll("index")
	url.searchParams.delete("index")
	const indexValuesToKeep = []
	for (const indexValue of indexValues) {
		if (indexValue) {
			indexValuesToKeep.push(indexValue)
		}
	}
	for (const toKeep of indexValuesToKeep) {
		url.searchParams.append("index", toKeep)
	}
	return url
}
function singleFetchUrl(reqUrl, basename, trailingSlashAware, extension) {
	const url =
		typeof reqUrl === "string"
			? new URL(
					reqUrl,
					// This can be called during the SSR flow via PrefetchPageLinksImpl so
					// don't assume window is available
					typeof window === "undefined" ? "server://singlefetch/" : window.location.origin,
				)
			: reqUrl
	if (trailingSlashAware) {
		if (url.pathname.endsWith("/")) {
			url.pathname = `${url.pathname}_.${extension}`
		} else {
			url.pathname = `${url.pathname}.${extension}`
		}
	} else {
		if (url.pathname === "/") {
			url.pathname = `_root.${extension}`
		} else if (basename && stripBasename(url.pathname, basename) === "/") {
			url.pathname = `${removeTrailingSlash(basename)}/_root.${extension}`
		} else {
			url.pathname = `${removeTrailingSlash(url.pathname)}.${extension}`
		}
	}
	return url
}
async function fetchAndDecodeViaTurboStream(args, basename, trailingSlashAware, targetRoutes) {
	const { request } = args
	let url = singleFetchUrl(request.url, basename, trailingSlashAware, "data")
	if (request.method === "GET") {
		url = stripIndexParam(url)
		if (targetRoutes) {
			url.searchParams.set("_routes", targetRoutes.join(","))
		}
	}
	const res = await fetch(url, await createRequestInit(request))
	if (res.status >= 400 && !res.headers.has("X-Remix-Response")) {
		throw new ErrorResponseImpl(res.status, res.statusText, await res.text())
	}
	if (res.status === 204 && res.headers.has("X-Remix-Redirect")) {
		return {
			status: SINGLE_FETCH_REDIRECT_STATUS,
			data: {
				redirect: {
					redirect: res.headers.get("X-Remix-Redirect"),
					status: Number(res.headers.get("X-Remix-Status") || "302"),
					revalidate: res.headers.get("X-Remix-Revalidate") === "true",
					reload: res.headers.get("X-Remix-Reload-Document") === "true",
					replace: res.headers.get("X-Remix-Replace") === "true",
				},
			},
		}
	}
	if (NO_BODY_STATUS_CODES.has(res.status)) {
		const routes = {}
		if (targetRoutes && request.method !== "GET") {
			routes[targetRoutes[0]] = { data: void 0 }
		}
		return {
			status: res.status,
			data: { routes },
		}
	}
	invariant2(res.body, "No response body to decode")
	try {
		const decoded = await decodeViaTurboStream(res.body, window)
		let data2
		if (request.method === "GET") {
			const typed = decoded.value
			if (SingleFetchRedirectSymbol in typed) {
				data2 = { redirect: typed[SingleFetchRedirectSymbol] }
			} else {
				data2 = { routes: typed }
			}
		} else {
			const typed = decoded.value
			const routeId = targetRoutes == null ? void 0 : targetRoutes[0]
			invariant2(routeId, "No routeId found for single fetch call decoding")
			if ("redirect" in typed) {
				data2 = { redirect: typed }
			} else {
				data2 = { routes: { [routeId]: typed } }
			}
		}
		return { status: res.status, data: data2 }
	} catch (e) {
		throw new Error("Unable to decode turbo-stream response")
	}
}
function decodeViaTurboStream(body, global2) {
	return decode(body, {
		plugins: [
			(type, ...rest) => {
				if (type === "SanitizedError") {
					const [name, message, stack] = rest
					let Constructor = Error
					if (
						name &&
						SUPPORTED_ERROR_TYPES.includes(name) &&
						name in global2 && // @ts-expect-error
						typeof global2[name] === "function"
					) {
						Constructor = global2[name]
					}
					const error = new Constructor(message)
					error.stack = stack
					return { value: error }
				}
				if (type === "ErrorResponse") {
					const [data2, status, statusText] = rest
					return {
						value: new ErrorResponseImpl(status, statusText, data2),
					}
				}
				if (type === "SingleFetchRedirect") {
					return { value: { [SingleFetchRedirectSymbol]: rest[0] } }
				}
				if (type === "SingleFetchClassInstance") {
					return { value: rest[0] }
				}
				if (type === "SingleFetchFallback") {
					return { value: void 0 }
				}
			},
		],
	})
}
function unwrapSingleFetchResult(result, routeId) {
	if ("redirect" in result) {
		const { redirect: location2, revalidate, reload, replace: replace2, status } = result.redirect
		throw redirect(location2, {
			status,
			headers: {
				// Three R's of redirecting (lol Veep)
				...(revalidate ? { "X-Remix-Revalidate": "yes" } : null),
				...(reload ? { "X-Remix-Reload-Document": "yes" } : null),
				...(replace2 ? { "X-Remix-Replace": "yes" } : null),
			},
		})
	}
	const routeResult = result.routes[routeId]
	if (routeResult == null) {
		throw new SingleFetchNoResultError(`No result found for routeId "${routeId}"`)
	} else if ("error" in routeResult) {
		throw routeResult.error
	} else if ("data" in routeResult) {
		return routeResult.data
	} else {
		throw new Error(`Invalid response found for routeId "${routeId}"`)
	}
}
function createDeferred2() {
	let resolve
	let reject
	const promise = new Promise((res, rej) => {
		resolve = async val => {
			res(val)
			try {
				await promise
			} catch (e) {}
		}
		reject = async error => {
			rej(error)
			try {
				await promise
			} catch (e) {}
		}
	})
	return {
		promise,
		//@ts-expect-error
		resolve,
		//@ts-expect-error
		reject,
	}
}
async function loadRouteModule(route, routeModulesCache) {
	if (route.id in routeModulesCache) {
		return routeModulesCache[route.id]
	}
	try {
		const routeModule = await import(
			/* @vite-ignore */
			/* webpackIgnore: true */
			route.module
		)
		routeModulesCache[route.id] = routeModule
		return routeModule
	} catch (error) {
		console.error(`Error loading route module \`${route.module}\`, reloading page...`)
		console.error(error)
		if (
			window.__reactRouterContext &&
			window.__reactRouterContext.isSpaMode && // @ts-expect-error
			import.meta.hot
		) {
			throw error
		}
		window.location.reload()
		return new Promise(() => {})
	}
}
function getKeyedLinksForMatches(matches, routeModules, manifest) {
	const descriptors = matches
		.map(match => {
			var _a
			const module = routeModules[match.route.id]
			const route = manifest.routes[match.route.id]
			return [
				route && route.css ? route.css.map(href2 => ({ rel: "stylesheet", href: href2 })) : [],
				((_a = module == null ? void 0 : module.links) == null ? void 0 : _a.call(module)) || [],
			]
		})
		.flat(2)
	const preloads = getModuleLinkHrefs(matches, manifest)
	return dedupeLinkDescriptors(descriptors, preloads)
}
function getRouteCssDescriptors(route) {
	if (!route.css) return []
	return route.css.map(href2 => ({ rel: "stylesheet", href: href2 }))
}
async function prefetchRouteCss(route) {
	if (!route.css) return
	const descriptors = getRouteCssDescriptors(route)
	await Promise.all(descriptors.map(prefetchStyleLink))
}
async function prefetchStyleLinks(route, routeModule) {
	if ((!route.css && !routeModule.links) || !isPreloadSupported()) return
	const descriptors = []
	if (route.css) {
		descriptors.push(...getRouteCssDescriptors(route))
	}
	if (routeModule.links) {
		descriptors.push(...routeModule.links())
	}
	if (descriptors.length === 0) return
	const styleLinks = []
	for (const descriptor of descriptors) {
		if (!isPageLinkDescriptor(descriptor) && descriptor.rel === "stylesheet") {
			styleLinks.push({
				...descriptor,
				rel: "preload",
				as: "style",
			})
		}
	}
	await Promise.all(styleLinks.map(prefetchStyleLink))
}
async function prefetchStyleLink(descriptor) {
	return new Promise(resolve => {
		if (
			(descriptor.media && !window.matchMedia(descriptor.media).matches) ||
			document.querySelector(`link[rel="stylesheet"][href="${descriptor.href}"]`)
		) {
			return resolve()
		}
		const link = document.createElement("link")
		Object.assign(link, descriptor)
		function removeLink() {
			if (document.head.contains(link)) {
				document.head.removeChild(link)
			}
		}
		link.onload = () => {
			removeLink()
			resolve()
		}
		link.onerror = () => {
			removeLink()
			resolve()
		}
		document.head.appendChild(link)
	})
}
function isPageLinkDescriptor(object) {
	return object != null && typeof object.page === "string"
}
function isHtmlLinkDescriptor(object) {
	if (object == null) {
		return false
	}
	if (object.href == null) {
		return (
			object.rel === "preload" &&
			typeof object.imageSrcSet === "string" &&
			typeof object.imageSizes === "string"
		)
	}
	return typeof object.rel === "string" && typeof object.href === "string"
}
async function getKeyedPrefetchLinks(matches, manifest, routeModules) {
	const links = await Promise.all(
		matches.map(async match => {
			const route = manifest.routes[match.route.id]
			if (route) {
				const mod = await loadRouteModule(route, routeModules)
				return mod.links ? mod.links() : []
			}
			return []
		}),
	)
	return dedupeLinkDescriptors(
		links
			.flat(1)
			.filter(isHtmlLinkDescriptor)
			.filter(link => link.rel === "stylesheet" || link.rel === "preload")
			.map(link =>
				link.rel === "stylesheet"
					? { ...link, rel: "prefetch", as: "style" }
					: { ...link, rel: "prefetch" },
			),
	)
}
function getNewMatchesForLinks(page, nextMatches, currentMatches, manifest, location2, mode) {
	const isNew = (match, index) => {
		if (!currentMatches[index]) return true
		return match.route.id !== currentMatches[index].route.id
	}
	const matchPathChanged = (match, index) => {
		var _a
		return (
			// param change, /users/123 -> /users/456
			currentMatches[index].pathname !== match.pathname || // splat param changed, which is not present in match.path
			// e.g. /files/images/avatar.jpg -> files/finances.xls
			(((_a = currentMatches[index].route.path) == null ? void 0 : _a.endsWith("*")) &&
				currentMatches[index].params["*"] !== match.params["*"])
		)
	}
	if (mode === "assets") {
		return nextMatches.filter(
			(match, index) => isNew(match, index) || matchPathChanged(match, index),
		)
	}
	if (mode === "data") {
		return nextMatches.filter((match, index) => {
			var _a
			const manifestRoute = manifest.routes[match.route.id]
			if (!manifestRoute || !manifestRoute.hasLoader) {
				return false
			}
			if (isNew(match, index) || matchPathChanged(match, index)) {
				return true
			}
			if (match.route.shouldRevalidate) {
				const routeChoice = match.route.shouldRevalidate({
					currentUrl: new URL(
						location2.pathname + location2.search + location2.hash,
						window.origin,
					),
					currentParams: ((_a = currentMatches[0]) == null ? void 0 : _a.params) || {},
					nextUrl: new URL(page, window.origin),
					nextParams: match.params,
					defaultShouldRevalidate: true,
				})
				if (typeof routeChoice === "boolean") {
					return routeChoice
				}
			}
			return true
		})
	}
	return []
}
function getModuleLinkHrefs(matches, manifest, { includeHydrateFallback } = {}) {
	return dedupeHrefs(
		matches.flatMap(match => {
			const route = manifest.routes[match.route.id]
			if (!route) return []
			let hrefs = [route.module]
			if (route.clientActionModule) {
				hrefs = hrefs.concat(route.clientActionModule)
			}
			if (route.clientLoaderModule) {
				hrefs = hrefs.concat(route.clientLoaderModule)
			}
			if (includeHydrateFallback && route.hydrateFallbackModule) {
				hrefs = hrefs.concat(route.hydrateFallbackModule)
			}
			if (route.imports) {
				hrefs = hrefs.concat(route.imports)
			}
			return hrefs
		}),
	)
}
function dedupeHrefs(hrefs) {
	return [...new Set(hrefs)]
}
function sortKeys(obj) {
	const sorted = {}
	const keys = Object.keys(obj).sort()
	for (const key of keys) {
		sorted[key] = obj[key]
	}
	return sorted
}
function dedupeLinkDescriptors(descriptors, preloads) {
	const set = /* @__PURE__ */ new Set()
	const preloadsSet = new Set(preloads)
	return descriptors.reduce((deduped, descriptor) => {
		const alreadyModulePreload =
			preloads &&
			!isPageLinkDescriptor(descriptor) &&
			descriptor.as === "script" &&
			descriptor.href &&
			preloadsSet.has(descriptor.href)
		if (alreadyModulePreload) {
			return deduped
		}
		const key = JSON.stringify(sortKeys(descriptor))
		if (!set.has(key)) {
			set.add(key)
			deduped.push({ key, link: descriptor })
		}
		return deduped
	}, [])
}
var _isPreloadSupported
function isPreloadSupported() {
	if (_isPreloadSupported !== void 0) {
		return _isPreloadSupported
	}
	let el = document.createElement("link")
	_isPreloadSupported = el.relList.supports("preload")
	el = null
	return _isPreloadSupported
}
function RemixRootDefaultHydrateFallback() {
	return React5.createElement(
		BoundaryShell,
		{ title: "Loading...", renderScripts: true },
		ENABLE_DEV_WARNINGS
			? React5.createElement("script", {
					dangerouslySetInnerHTML: {
						__html: `
              console.log(
                "💿 Hey developer 👋. You can provide a way better UX than this " +
                "when your app is loading JS modules and/or running \`clientLoader\` " +
                "functions. Check out https://reactrouter.com/start/framework/route-module#hydratefallback " +
                "for more information."
              );
            `,
					},
				})
			: null,
	)
}
function groupRoutesByParentId(manifest) {
	const routes = {}
	Object.values(manifest).forEach(route => {
		if (route) {
			const parentId = route.parentId || ""
			if (!routes[parentId]) {
				routes[parentId] = []
			}
			routes[parentId].push(route)
		}
	})
	return routes
}
function getRouteComponents(route, routeModule, isSpaMode) {
	const Component4 = getRouteModuleComponent(routeModule)
	const HydrateFallback =
		routeModule.HydrateFallback && (!isSpaMode || route.id === "root")
			? routeModule.HydrateFallback
			: route.id === "root"
				? RemixRootDefaultHydrateFallback
				: void 0
	const ErrorBoundary = routeModule.ErrorBoundary
		? routeModule.ErrorBoundary
		: route.id === "root"
			? () =>
					React6.createElement(RemixRootDefaultErrorBoundary, {
						error: useRouteError(),
					})
			: void 0
	if (route.id === "root" && routeModule.Layout) {
		return {
			...(Component4
				? {
						element: React6.createElement(
							routeModule.Layout,
							null,
							React6.createElement(Component4, null),
						),
					}
				: { Component: Component4 }),
			...(ErrorBoundary
				? {
						errorElement: React6.createElement(
							routeModule.Layout,
							null,
							React6.createElement(ErrorBoundary, null),
						),
					}
				: { ErrorBoundary }),
			...(HydrateFallback
				? {
						hydrateFallbackElement: React6.createElement(
							routeModule.Layout,
							null,
							React6.createElement(HydrateFallback, null),
						),
					}
				: { HydrateFallback }),
		}
	}
	return { Component: Component4, ErrorBoundary, HydrateFallback }
}
function createServerRoutes(
	manifest,
	routeModules,
	future,
	isSpaMode,
	parentId = "",
	routesByParentId = groupRoutesByParentId(manifest),
	spaModeLazyPromise = Promise.resolve({ Component: () => null }),
) {
	return (routesByParentId[parentId] || []).map(route => {
		const routeModule = routeModules[route.id]
		invariant2(routeModule, "No `routeModule` available to create server routes")
		const dataRoute = {
			...getRouteComponents(route, routeModule, isSpaMode),
			caseSensitive: route.caseSensitive,
			id: route.id,
			index: route.index,
			path: route.path,
			handle: routeModule.handle,
			// For SPA Mode, all routes are lazy except root.  However we tell the
			// router root is also lazy here too since we don't need a full
			// implementation - we just need a `lazy` prop to tell the RR rendering
			// where to stop which is always at the root route in SPA mode
			lazy: isSpaMode ? () => spaModeLazyPromise : void 0,
			// For partial hydration rendering, we need to indicate when the route
			// has a loader/clientLoader, but it won't ever be called during the static
			// render, so just give it a no-op function so we can render down to the
			// proper fallback
			loader: route.hasLoader || route.hasClientLoader ? () => null : void 0,
			// We don't need middleware/action/shouldRevalidate on these routes since
			// they're for a static render
		}
		const children = createServerRoutes(
			manifest,
			routeModules,
			future,
			isSpaMode,
			route.id,
			routesByParentId,
			spaModeLazyPromise,
		)
		if (children.length > 0) dataRoute.children = children
		return dataRoute
	})
}
function createClientRoutesWithHMRRevalidationOptOut(
	needsRevalidation,
	manifest,
	routeModulesCache,
	initialState,
	ssr,
	isSpaMode,
) {
	return createClientRoutes(
		manifest,
		routeModulesCache,
		initialState,
		ssr,
		isSpaMode,
		"",
		groupRoutesByParentId(manifest),
		needsRevalidation,
	)
}
function preventInvalidServerHandlerCall(type, route) {
	if ((type === "loader" && !route.hasLoader) || (type === "action" && !route.hasAction)) {
		const fn = type === "action" ? "serverAction()" : "serverLoader()"
		const msg = `You are trying to call ${fn} on a route that does not have a server ${type} (routeId: "${route.id}")`
		console.error(msg)
		throw new ErrorResponseImpl(400, "Bad Request", new Error(msg), true)
	}
}
function noActionDefinedError(type, routeId) {
	const article = type === "clientAction" ? "a" : "an"
	const msg = `Route "${routeId}" does not have ${article} ${type}, but you are trying to submit to it. To fix this, please add ${article} \`${type}\` function to the route`
	console.error(msg)
	throw new ErrorResponseImpl(405, "Method Not Allowed", new Error(msg), true)
}
function createClientRoutes(
	manifest,
	routeModulesCache,
	initialState,
	ssr,
	isSpaMode,
	parentId = "",
	routesByParentId = groupRoutesByParentId(manifest),
	needsRevalidation,
) {
	return (routesByParentId[parentId] || []).map(route => {
		var _a, _b, _c
		const routeModule = routeModulesCache[route.id]
		function fetchServerHandler(singleFetch) {
			invariant2(
				typeof singleFetch === "function",
				"No single fetch function available for route handler",
			)
			return singleFetch()
		}
		function fetchServerLoader(singleFetch) {
			if (!route.hasLoader) return Promise.resolve(null)
			return fetchServerHandler(singleFetch)
		}
		function fetchServerAction(singleFetch) {
			if (!route.hasAction) {
				throw noActionDefinedError("action", route.id)
			}
			return fetchServerHandler(singleFetch)
		}
		function prefetchModule(modulePath) {
			import(
				/* @vite-ignore */
				/* webpackIgnore: true */
				modulePath
			)
		}
		function prefetchRouteModuleChunks(route2) {
			if (route2.clientActionModule) {
				prefetchModule(route2.clientActionModule)
			}
			if (route2.clientLoaderModule) {
				prefetchModule(route2.clientLoaderModule)
			}
		}
		async function prefetchStylesAndCallHandler(handler) {
			const cachedModule = routeModulesCache[route.id]
			const linkPrefetchPromise = cachedModule
				? prefetchStyleLinks(route, cachedModule)
				: Promise.resolve()
			try {
				return handler()
			} finally {
				await linkPrefetchPromise
			}
		}
		const dataRoute = {
			id: route.id,
			index: route.index,
			path: route.path,
		}
		if (routeModule) {
			Object.assign(dataRoute, {
				...dataRoute,
				...getRouteComponents(route, routeModule, isSpaMode),
				middleware: routeModule.clientMiddleware,
				handle: routeModule.handle,
				shouldRevalidate: getShouldRevalidateFunction(
					dataRoute.path,
					routeModule,
					route,
					ssr,
					needsRevalidation,
				),
			})
			const hasInitialData =
				initialState && initialState.loaderData && route.id in initialState.loaderData
			const initialData = hasInitialData
				? (_a = initialState == null ? void 0 : initialState.loaderData) == null
					? void 0
					: _a[route.id]
				: void 0
			const hasInitialError = initialState && initialState.errors && route.id in initialState.errors
			const initialError = hasInitialError
				? (_b = initialState == null ? void 0 : initialState.errors) == null
					? void 0
					: _b[route.id]
				: void 0
			let isHydrationRequest =
				needsRevalidation == null &&
				(((_c = routeModule.clientLoader) == null ? void 0 : _c.hydrate) === true ||
					!route.hasLoader)
			dataRoute.loader = async ({ request, params, context, pattern, url }, singleFetch) => {
				try {
					const result = await prefetchStylesAndCallHandler(async () => {
						invariant2(routeModule, "No `routeModule` available for critical-route loader")
						if (!routeModule.clientLoader) {
							return fetchServerLoader(singleFetch)
						}
						return routeModule.clientLoader({
							request,
							params,
							context,
							pattern,
							url,
							async serverLoader() {
								preventInvalidServerHandlerCall("loader", route)
								if (isHydrationRequest) {
									if (hasInitialData) {
										return initialData
									}
									if (hasInitialError) {
										throw initialError
									}
								}
								return fetchServerLoader(singleFetch)
							},
						})
					})
					return result
				} finally {
					isHydrationRequest = false
				}
			}
			dataRoute.loader.hydrate = shouldHydrateRouteLoader(
				route.id,
				routeModule.clientLoader,
				route.hasLoader,
				isSpaMode,
			)
			dataRoute.action = ({ request, params, context, pattern, url }, singleFetch) => {
				return prefetchStylesAndCallHandler(async () => {
					invariant2(routeModule, "No `routeModule` available for critical-route action")
					if (!routeModule.clientAction) {
						if (isSpaMode) {
							throw noActionDefinedError("clientAction", route.id)
						}
						return fetchServerAction(singleFetch)
					}
					return routeModule.clientAction({
						request,
						params,
						context,
						pattern,
						url,
						async serverAction() {
							preventInvalidServerHandlerCall("action", route)
							return fetchServerAction(singleFetch)
						},
					})
				})
			}
		} else {
			if (!route.hasClientLoader) {
				dataRoute.loader = (_, singleFetch) =>
					prefetchStylesAndCallHandler(() => {
						return fetchServerLoader(singleFetch)
					})
			}
			if (!route.hasClientAction) {
				dataRoute.action = (_, singleFetch) =>
					prefetchStylesAndCallHandler(() => {
						if (isSpaMode) {
							throw noActionDefinedError("clientAction", route.id)
						}
						return fetchServerAction(singleFetch)
					})
			}
			let lazyRoutePromise
			async function getLazyRoute() {
				if (lazyRoutePromise) {
					return await lazyRoutePromise
				}
				lazyRoutePromise = (async () => {
					if (route.clientLoaderModule || route.clientActionModule) {
						await new Promise(resolve => setTimeout(resolve, 0))
					}
					const routeModulePromise = loadRouteModuleWithBlockingLinks(route, routeModulesCache)
					prefetchRouteModuleChunks(route)
					return await routeModulePromise
				})()
				return await lazyRoutePromise
			}
			dataRoute.lazy = {
				loader: route.hasClientLoader
					? async () => {
							const { clientLoader } = route.clientLoaderModule
								? await import(
										/* @vite-ignore */
										/* webpackIgnore: true */
										route.clientLoaderModule
									)
								: await getLazyRoute()
							invariant2(clientLoader, "No `clientLoader` export found")
							return (args, singleFetch) =>
								clientLoader({
									...args,
									async serverLoader() {
										preventInvalidServerHandlerCall("loader", route)
										return fetchServerLoader(singleFetch)
									},
								})
						}
					: void 0,
				action: route.hasClientAction
					? async () => {
							const clientActionPromise = route.clientActionModule
								? import(
										/* @vite-ignore */
										/* webpackIgnore: true */
										route.clientActionModule
									)
								: getLazyRoute()
							prefetchRouteModuleChunks(route)
							const { clientAction } = await clientActionPromise
							invariant2(clientAction, "No `clientAction` export found")
							return (args, singleFetch) =>
								clientAction({
									...args,
									async serverAction() {
										preventInvalidServerHandlerCall("action", route)
										return fetchServerAction(singleFetch)
									},
								})
						}
					: void 0,
				middleware: route.hasClientMiddleware
					? async () => {
							const { clientMiddleware } = route.clientMiddlewareModule
								? await import(
										/* @vite-ignore */
										/* webpackIgnore: true */
										route.clientMiddlewareModule
									)
								: await getLazyRoute()
							invariant2(clientMiddleware, "No `clientMiddleware` export found")
							return clientMiddleware
						}
					: void 0,
				shouldRevalidate: async () => {
					const lazyRoute = await getLazyRoute()
					return getShouldRevalidateFunction(
						dataRoute.path,
						lazyRoute,
						route,
						ssr,
						needsRevalidation,
					)
				},
				handle: async () => (await getLazyRoute()).handle,
				// No need to wrap these in layout since the root route is never
				// loaded via route.lazy()
				Component: async () => (await getLazyRoute()).Component,
				ErrorBoundary: route.hasErrorBoundary
					? async () => (await getLazyRoute()).ErrorBoundary
					: void 0,
			}
		}
		const children = createClientRoutes(
			manifest,
			routeModulesCache,
			initialState,
			ssr,
			isSpaMode,
			route.id,
			routesByParentId,
			needsRevalidation,
		)
		if (children.length > 0) dataRoute.children = children
		return dataRoute
	})
}
function getShouldRevalidateFunction(path, route, manifestRoute, ssr, needsRevalidation) {
	if (needsRevalidation) {
		return wrapShouldRevalidateForHdr(manifestRoute.id, route.shouldRevalidate, needsRevalidation)
	}
	if (!ssr && manifestRoute.hasLoader && !manifestRoute.hasClientLoader) {
		const myParams = path ? compilePath(path)[1].map(p => p.paramName) : []
		const didParamsChange = opts => myParams.some(p => opts.currentParams[p] !== opts.nextParams[p])
		if (route.shouldRevalidate) {
			const fn = route.shouldRevalidate
			return opts =>
				fn({
					...opts,
					defaultShouldRevalidate: didParamsChange(opts),
				})
		} else {
			return opts => didParamsChange(opts)
		}
	}
	return route.shouldRevalidate
}
function wrapShouldRevalidateForHdr(routeId, routeShouldRevalidate, needsRevalidation) {
	let handledRevalidation = false
	return arg => {
		if (!handledRevalidation) {
			handledRevalidation = true
			return needsRevalidation.has(routeId)
		}
		return routeShouldRevalidate ? routeShouldRevalidate(arg) : arg.defaultShouldRevalidate
	}
}
async function loadRouteModuleWithBlockingLinks(route, routeModules) {
	const routeModulePromise = loadRouteModule(route, routeModules)
	const prefetchRouteCssPromise = prefetchRouteCss(route)
	const routeModule = await routeModulePromise
	await Promise.all([prefetchRouteCssPromise, prefetchStyleLinks(route, routeModule)])
	return {
		Component: getRouteModuleComponent(routeModule),
		ErrorBoundary: routeModule.ErrorBoundary,
		clientMiddleware: routeModule.clientMiddleware,
		clientAction: routeModule.clientAction,
		clientLoader: routeModule.clientLoader,
		handle: routeModule.handle,
		links: routeModule.links,
		meta: routeModule.meta,
		shouldRevalidate: routeModule.shouldRevalidate,
	}
}
function getRouteModuleComponent(routeModule) {
	if (routeModule.default == null) return void 0
	const isEmptyObject =
		typeof routeModule.default === "object" && Object.keys(routeModule.default).length === 0
	if (!isEmptyObject) {
		return routeModule.default
	}
}
function shouldHydrateRouteLoader(routeId, clientLoader, hasLoader, isSpaMode) {
	return (
		(isSpaMode && routeId !== "root") ||
		(clientLoader != null && (clientLoader.hydrate === true || hasLoader !== true))
	)
}
var nextPaths = /* @__PURE__ */ new Set()
var discoveredPathsMaxSize = 1e3
var discoveredPaths = /* @__PURE__ */ new Set()
var URL_LIMIT = 7680
function isFogOfWarEnabled(routeDiscovery, ssr) {
	return routeDiscovery.mode === "lazy" && ssr === true
}
function getPartialManifest({ sri, ...manifest }, router2) {
	const routeIds = new Set(router2.state.matches.map(m => m.route.id))
	const segments = router2.state.location.pathname.split("/").filter(Boolean)
	const paths = ["/"]
	segments.pop()
	while (segments.length > 0) {
		paths.push(`/${segments.join("/")}`)
		segments.pop()
	}
	paths.forEach(path => {
		const matches = matchRoutesImpl(
			router2.routes,
			path,
			router2.basename || "/",
			false,
			router2.branches,
		)
		if (matches) {
			matches.forEach(m => routeIds.add(m.route.id))
		}
	})
	const initialRoutes = [...routeIds].reduce(
		(acc, id) => Object.assign(acc, { [id]: manifest.routes[id] }),
		{},
	)
	return {
		...manifest,
		routes: initialRoutes,
		sri: sri ? true : void 0,
	}
}
function getPatchRoutesOnNavigationFunction(
	getRouter,
	manifest,
	routeModules,
	ssr,
	routeDiscovery,
	isSpaMode,
	basename,
) {
	if (!isFogOfWarEnabled(routeDiscovery, ssr)) {
		return void 0
	}
	return async ({ path, patch, signal, fetcherKey }) => {
		if (discoveredPaths.has(path)) {
			return
		}
		const { state } = getRouter()
		await fetchAndApplyManifestPatches(
			[path],
			// If we're patching for a fetcher call, reload the current location
			// Otherwise prefer any ongoing navigation location
			fetcherKey ? window.location.href : createPath(state.navigation.location || state.location),
			manifest,
			routeModules,
			ssr,
			isSpaMode,
			basename,
			routeDiscovery.manifestPath,
			patch,
			signal,
		)
	}
}
function useFogOFWarDiscovery(router2, manifest, routeModules, ssr, routeDiscovery, isSpaMode) {
	React7.useEffect(() => {
		var _a, _b
		if (
			!isFogOfWarEnabled(routeDiscovery, ssr) || // @ts-expect-error - TS doesn't know about this yet
			((_b = (_a = window.navigator) == null ? void 0 : _a.connection) == null
				? void 0
				: _b.saveData) === true
		) {
			return
		}
		function registerElement(el) {
			const path = el.tagName === "FORM" ? el.getAttribute("action") : el.getAttribute("href")
			if (!path) {
				return
			}
			const pathname =
				el.tagName === "A" ? el.pathname : new URL(path, window.location.origin).pathname
			if (!discoveredPaths.has(pathname)) {
				nextPaths.add(pathname)
			}
		}
		async function fetchPatches() {
			document.querySelectorAll("a[data-discover], form[data-discover]").forEach(registerElement)
			const lazyPaths = Array.from(nextPaths.keys()).filter(path => {
				if (discoveredPaths.has(path)) {
					nextPaths.delete(path)
					return false
				}
				return true
			})
			if (lazyPaths.length === 0) {
				return
			}
			try {
				await fetchAndApplyManifestPatches(
					lazyPaths,
					null,
					manifest,
					routeModules,
					ssr,
					isSpaMode,
					router2.basename,
					routeDiscovery.manifestPath,
					router2.patchRoutes,
				)
			} catch (e) {
				console.error("Failed to fetch manifest patches", e)
			}
		}
		const debouncedFetchPatches = debounce(fetchPatches, 100)
		fetchPatches()
		const observer = new MutationObserver(() => debouncedFetchPatches())
		observer.observe(document.documentElement, {
			subtree: true,
			childList: true,
			attributes: true,
			attributeFilter: ["data-discover", "href", "action"],
		})
		return () => observer.disconnect()
	}, [ssr, isSpaMode, manifest, routeModules, router2, routeDiscovery])
}
function getManifestPath(_manifestPath, basename) {
	const manifestPath = _manifestPath || "/__manifest"
	return basename == null ? manifestPath : joinPaths([basename, manifestPath])
}
var MANIFEST_VERSION_STORAGE_KEY = "react-router-manifest-version"
async function fetchAndApplyManifestPatches(
	paths,
	errorReloadPath,
	manifest,
	routeModules,
	ssr,
	isSpaMode,
	basename,
	manifestPath,
	patchRoutes,
	signal,
) {
	const searchParams = new URLSearchParams()
	searchParams.set("paths", paths.sort().join(","))
	searchParams.set("version", manifest.version)
	const url = new URL(getManifestPath(manifestPath, basename), window.location.origin)
	url.search = searchParams.toString()
	if (url.toString().length > URL_LIMIT) {
		nextPaths.clear()
		return
	}
	let serverPatches
	try {
		const res = await fetch(url, { signal })
		if (!res.ok) {
			throw new Error(`${res.status} ${res.statusText}`)
		} else if (res.status === 204 && res.headers.has("X-Remix-Reload-Document")) {
			if (!errorReloadPath) {
				console.warn(
					"Detected a manifest version mismatch during eager route discovery. The next navigation/fetch to an undiscovered route will result in a new document navigation to sync up with the latest manifest.",
				)
				return
			}
			try {
				if (sessionStorage.getItem(MANIFEST_VERSION_STORAGE_KEY) === manifest.version) {
					console.error("Unable to discover routes due to manifest version mismatch.")
					return
				}
				sessionStorage.setItem(MANIFEST_VERSION_STORAGE_KEY, manifest.version)
			} catch {}
			window.location.href = errorReloadPath
			console.warn("Detected manifest version mismatch, reloading...")
			await new Promise(() => {})
		} else if (res.status >= 400) {
			throw new Error(await res.text())
		}
		try {
			sessionStorage.removeItem(MANIFEST_VERSION_STORAGE_KEY)
		} catch {}
		serverPatches = await res.json()
	} catch (e) {
		if (signal == null ? void 0 : signal.aborted) return
		throw e
	}
	const knownRoutes = new Set(Object.keys(manifest.routes))
	const patches = Object.values(serverPatches).reduce((acc, route) => {
		if (route && !knownRoutes.has(route.id)) {
			acc[route.id] = route
		}
		return acc
	}, {})
	Object.assign(manifest.routes, patches)
	paths.forEach(p => addToFifoQueue(p, discoveredPaths))
	const parentIds = /* @__PURE__ */ new Set()
	Object.values(patches).forEach(patch => {
		if (patch && (!patch.parentId || !patches[patch.parentId])) {
			parentIds.add(patch.parentId)
		}
	})
	parentIds.forEach(parentId =>
		patchRoutes(
			parentId || null,
			createClientRoutes(patches, routeModules, null, ssr, isSpaMode, parentId),
		),
	)
}
function addToFifoQueue(path, queue) {
	if (queue.size >= discoveredPathsMaxSize) {
		const first = queue.values().next().value
		queue.delete(first)
	}
	queue.add(path)
}
function debounce(callback, wait) {
	let timeoutId
	return (...args) => {
		window.clearTimeout(timeoutId)
		timeoutId = window.setTimeout(() => callback(...args), wait)
	}
}
function useDataRouterContext2() {
	const context = React8.useContext(DataRouterContext)
	invariant2(context, "You must render this element inside a <DataRouterContext.Provider> element")
	return context
}
function useDataRouterStateContext() {
	const context = React8.useContext(DataRouterStateContext)
	invariant2(
		context,
		"You must render this element inside a <DataRouterStateContext.Provider> element",
	)
	return context
}
var FrameworkContext = React8.createContext(void 0)
FrameworkContext.displayName = "FrameworkContext"
function useFrameworkContext() {
	const context = React8.useContext(FrameworkContext)
	invariant2(context, "You must render this element inside a <HydratedRouter> element")
	return context
}
function usePrefetchBehavior(prefetch, theirElementProps) {
	const frameworkContext = React8.useContext(FrameworkContext)
	const [maybePrefetch, setMaybePrefetch] = React8.useState(false)
	const [shouldPrefetch, setShouldPrefetch] = React8.useState(false)
	const { onFocus, onBlur, onMouseEnter, onMouseLeave, onTouchStart } = theirElementProps
	const ref = React8.useRef(null)
	React8.useEffect(() => {
		if (prefetch === "render") {
			setShouldPrefetch(true)
		}
		if (prefetch === "viewport") {
			const callback = entries => {
				entries.forEach(entry => {
					setShouldPrefetch(entry.isIntersecting)
				})
			}
			const observer = new IntersectionObserver(callback, { threshold: 0.5 })
			if (ref.current) observer.observe(ref.current)
			return () => {
				observer.disconnect()
			}
		}
	}, [prefetch])
	React8.useEffect(() => {
		if (maybePrefetch) {
			const id = setTimeout(() => {
				setShouldPrefetch(true)
			}, 100)
			return () => {
				clearTimeout(id)
			}
		}
	}, [maybePrefetch])
	const setIntent = () => {
		setMaybePrefetch(true)
	}
	const cancelIntent = () => {
		setMaybePrefetch(false)
		setShouldPrefetch(false)
	}
	if (!frameworkContext) {
		return [false, ref, {}]
	}
	if (prefetch !== "intent") {
		return [shouldPrefetch, ref, {}]
	}
	return [
		shouldPrefetch,
		ref,
		{
			onFocus: composeEventHandlers(onFocus, setIntent),
			onBlur: composeEventHandlers(onBlur, cancelIntent),
			onMouseEnter: composeEventHandlers(onMouseEnter, setIntent),
			onMouseLeave: composeEventHandlers(onMouseLeave, cancelIntent),
			onTouchStart: composeEventHandlers(onTouchStart, setIntent),
		},
	]
}
function composeEventHandlers(theirHandler, ourHandler) {
	return event => {
		theirHandler && theirHandler(event)
		if (!event.defaultPrevented) {
			ourHandler(event)
		}
	}
}
function getActiveMatches(matches, errors, isSpaMode) {
	if (isSpaMode && !isHydrated) {
		return [matches[0]]
	}
	if (errors) {
		const errorIdx = matches.findIndex(m => errors[m.route.id] !== void 0)
		return matches.slice(0, errorIdx + 1)
	}
	return matches
}
var CRITICAL_CSS_DATA_ATTRIBUTE = "data-react-router-critical-css"
function Links({ nonce, crossOrigin }) {
	const { isSpaMode, manifest, routeModules, criticalCss } = useFrameworkContext()
	const { errors, matches: routerMatches } = useDataRouterStateContext()
	const matches = getActiveMatches(routerMatches, errors, isSpaMode)
	const keyedLinks = React8.useMemo(
		() => getKeyedLinksForMatches(matches, routeModules, manifest),
		[matches, routeModules, manifest],
	)
	return React8.createElement(
		React8.Fragment,
		null,
		typeof criticalCss === "string"
			? React8.createElement("style", {
					...{ [CRITICAL_CSS_DATA_ATTRIBUTE]: "" },
					nonce,
					dangerouslySetInnerHTML: { __html: criticalCss },
				})
			: null,
		typeof criticalCss === "object"
			? React8.createElement("link", {
					...{ [CRITICAL_CSS_DATA_ATTRIBUTE]: "" },
					rel: "stylesheet",
					href: criticalCss.href,
					nonce,
					crossOrigin,
				})
			: null,
		keyedLinks.map(({ key, link }) =>
			isPageLinkDescriptor(link)
				? React8.createElement(PrefetchPageLinks, {
						key,
						nonce,
						...link,
						crossOrigin: link.crossOrigin ?? crossOrigin,
					})
				: React8.createElement("link", {
						key,
						nonce,
						...link,
						crossOrigin: link.crossOrigin ?? crossOrigin,
					}),
		),
	)
}
function PrefetchPageLinks({ page, ...linkProps }) {
	const rsc = useIsRSCRouterContext()
	const { router: router2 } = useDataRouterContext2()
	const matches = React8.useMemo(
		() => matchRoutes(router2.routes, page, router2.basename),
		[router2.routes, page, router2.basename],
	)
	if (!matches) {
		return null
	}
	if (rsc) {
		return React8.createElement(RSCPrefetchPageLinksImpl, {
			page,
			matches,
			...linkProps,
		})
	}
	return React8.createElement(PrefetchPageLinksImpl, {
		page,
		matches,
		...linkProps,
	})
}
function useKeyedPrefetchLinks(matches) {
	const { manifest, routeModules } = useFrameworkContext()
	const [keyedPrefetchLinks, setKeyedPrefetchLinks] = React8.useState([])
	React8.useEffect(() => {
		let interrupted = false
		void getKeyedPrefetchLinks(matches, manifest, routeModules).then(links => {
			if (!interrupted) {
				setKeyedPrefetchLinks(links)
			}
		})
		return () => {
			interrupted = true
		}
	}, [matches, manifest, routeModules])
	return keyedPrefetchLinks
}
function RSCPrefetchPageLinksImpl({ page, matches: nextMatches, ...linkProps }) {
	const location2 = useLocation()
	const { future } = useFrameworkContext()
	const { basename } = useDataRouterContext2()
	const dataHrefs = React8.useMemo(() => {
		if (page === location2.pathname + location2.search + location2.hash) {
			return []
		}
		const url = singleFetchUrl(
			page,
			basename,
			future.unstable_trailingSlashAwareDataRequests,
			"rsc",
		)
		let hasSomeRoutesWithShouldRevalidate = false
		const targetRoutes = []
		for (const match of nextMatches) {
			if (typeof match.route.shouldRevalidate === "function") {
				hasSomeRoutesWithShouldRevalidate = true
			} else {
				targetRoutes.push(match.route.id)
			}
		}
		if (hasSomeRoutesWithShouldRevalidate && targetRoutes.length > 0) {
			url.searchParams.set("_routes", targetRoutes.join(","))
		}
		return [url.pathname + url.search]
	}, [basename, future.unstable_trailingSlashAwareDataRequests, page, location2, nextMatches])
	return React8.createElement(
		React8.Fragment,
		null,
		dataHrefs.map(href2 =>
			React8.createElement("link", {
				key: href2,
				rel: "prefetch",
				as: "fetch",
				href: href2,
				...linkProps,
			}),
		),
	)
}
function PrefetchPageLinksImpl({ page, matches: nextMatches, ...linkProps }) {
	const location2 = useLocation()
	const { future, manifest, routeModules } = useFrameworkContext()
	const { basename } = useDataRouterContext2()
	const { loaderData, matches } = useDataRouterStateContext()
	const newMatchesForData = React8.useMemo(
		() => getNewMatchesForLinks(page, nextMatches, matches, manifest, location2, "data"),
		[page, nextMatches, matches, manifest, location2],
	)
	const newMatchesForAssets = React8.useMemo(
		() => getNewMatchesForLinks(page, nextMatches, matches, manifest, location2, "assets"),
		[page, nextMatches, matches, manifest, location2],
	)
	const dataHrefs = React8.useMemo(() => {
		if (page === location2.pathname + location2.search + location2.hash) {
			return []
		}
		const routesParams = /* @__PURE__ */ new Set()
		let foundOptOutRoute = false
		nextMatches.forEach(m => {
			var _a
			const manifestRoute = manifest.routes[m.route.id]
			if (!manifestRoute || !manifestRoute.hasLoader) {
				return
			}
			if (
				!newMatchesForData.some(m2 => m2.route.id === m.route.id) &&
				m.route.id in loaderData &&
				((_a = routeModules[m.route.id]) == null ? void 0 : _a.shouldRevalidate)
			) {
				foundOptOutRoute = true
			} else if (manifestRoute.hasClientLoader) {
				foundOptOutRoute = true
			} else {
				routesParams.add(m.route.id)
			}
		})
		if (routesParams.size === 0) {
			return []
		}
		const url = singleFetchUrl(
			page,
			basename,
			future.unstable_trailingSlashAwareDataRequests,
			"data",
		)
		if (foundOptOutRoute && routesParams.size > 0) {
			url.searchParams.set(
				"_routes",
				nextMatches
					.filter(m => routesParams.has(m.route.id))
					.map(m => m.route.id)
					.join(","),
			)
		}
		return [url.pathname + url.search]
	}, [
		basename,
		future.unstable_trailingSlashAwareDataRequests,
		loaderData,
		location2,
		manifest,
		newMatchesForData,
		nextMatches,
		page,
		routeModules,
	])
	const moduleHrefs = React8.useMemo(
		() => getModuleLinkHrefs(newMatchesForAssets, manifest),
		[newMatchesForAssets, manifest],
	)
	const keyedPrefetchLinks = useKeyedPrefetchLinks(newMatchesForAssets)
	return React8.createElement(
		React8.Fragment,
		null,
		dataHrefs.map(href2 =>
			React8.createElement("link", {
				key: href2,
				rel: "prefetch",
				as: "fetch",
				href: href2,
				...linkProps,
			}),
		),
		moduleHrefs.map(href2 =>
			React8.createElement("link", {
				key: href2,
				rel: "modulepreload",
				href: href2,
				...linkProps,
			}),
		),
		keyedPrefetchLinks.map(({ key, link }) =>
			// these don't spread `linkProps` because they are full link descriptors
			// already with their own props
			React8.createElement("link", {
				key,
				nonce: linkProps.nonce,
				...link,
				crossOrigin: link.crossOrigin ?? linkProps.crossOrigin,
			}),
		),
	)
}
function Meta() {
	const { isSpaMode, routeModules } = useFrameworkContext()
	const { errors, matches: routerMatches, loaderData } = useDataRouterStateContext()
	const location2 = useLocation()
	const _matches = getActiveMatches(routerMatches, errors, isSpaMode)
	let error = null
	if (errors) {
		error = errors[_matches[_matches.length - 1].route.id]
	}
	let meta = []
	let leafMeta = null
	const matches = []
	for (let i = 0; i < _matches.length; i++) {
		const _match = _matches[i]
		const routeId = _match.route.id
		const data2 = loaderData[routeId]
		const params = _match.params
		const routeModule = routeModules[routeId]
		let routeMeta = []
		const match = {
			id: routeId,
			data: data2,
			loaderData: data2,
			meta: [],
			params: _match.params,
			pathname: _match.pathname,
			handle: _match.route.handle,
			error,
		}
		matches[i] = match
		if (routeModule == null ? void 0 : routeModule.meta) {
			routeMeta =
				typeof routeModule.meta === "function"
					? routeModule.meta({
							data: data2,
							loaderData: data2,
							params,
							location: location2,
							matches,
							error,
						})
					: Array.isArray(routeModule.meta)
						? [...routeModule.meta]
						: routeModule.meta
		} else if (leafMeta) {
			routeMeta = [...leafMeta]
		}
		routeMeta = routeMeta || []
		if (!Array.isArray(routeMeta)) {
			throw new Error(
				"The route at " +
					_match.route.path +
					" returns an invalid value. All route meta functions must return an array of meta objects.\n\nTo reference the meta function API, see https://reactrouter.com/start/framework/route-module#meta",
			)
		}
		match.meta = routeMeta
		matches[i] = match
		meta = [...routeMeta]
		leafMeta = meta
	}
	return React8.createElement(
		React8.Fragment,
		null,
		meta.flat().map(metaProps => {
			if (!metaProps) {
				return null
			}
			if ("tagName" in metaProps) {
				const { tagName, ...rest } = metaProps
				if (!isValidMetaTag(tagName)) {
					console.warn(
						`A meta object uses an invalid tagName: ${tagName}. Expected either 'link' or 'meta'`,
					)
					return null
				}
				const Comp = tagName
				return React8.createElement(Comp, {
					key: JSON.stringify(rest),
					...rest,
				})
			}
			if ("title" in metaProps) {
				return React8.createElement("title", { key: "title" }, String(metaProps.title))
			}
			if ("charset" in metaProps) {
				metaProps.charSet ?? (metaProps.charSet = metaProps.charset)
				delete metaProps.charset
			}
			if ("charSet" in metaProps && metaProps.charSet != null) {
				return typeof metaProps.charSet === "string"
					? React8.createElement("meta", {
							key: "charSet",
							charSet: metaProps.charSet,
						})
					: null
			}
			if ("script:ld+json" in metaProps) {
				try {
					const json = JSON.stringify(metaProps["script:ld+json"])
					return React8.createElement("script", {
						key: `script:ld+json:${json}`,
						type: "application/ld+json",
						dangerouslySetInnerHTML: { __html: escapeHtml(json) },
					})
				} catch (err) {
					return null
				}
			}
			return React8.createElement("meta", {
				key: JSON.stringify(metaProps),
				...metaProps,
			})
		}),
	)
}
function isValidMetaTag(tagName) {
	return typeof tagName === "string" && /^(meta|link)$/.test(tagName)
}
var isHydrated = false
function setIsHydrated() {
	isHydrated = true
}
function Scripts(scriptProps) {
	const { manifest, serverHandoffString, isSpaMode, renderMeta, routeDiscovery, ssr } =
		useFrameworkContext()
	const { router: router2, static: isStatic, staticContext } = useDataRouterContext2()
	const { matches: routerMatches } = useDataRouterStateContext()
	const isRSCRouterContext = useIsRSCRouterContext()
	const enableFogOfWar = isFogOfWarEnabled(routeDiscovery, ssr)
	if (renderMeta) {
		renderMeta.didRenderScripts = true
	}
	const matches = getActiveMatches(routerMatches, null, isSpaMode)
	React8.useEffect(() => {
		setIsHydrated()
	}, [])
	const initialScripts = React8.useMemo(() => {
		var _a
		if (isRSCRouterContext) {
			return null
		}
		const streamScript =
			"window.__reactRouterContext.stream = new ReadableStream({start(controller){window.__reactRouterContext.streamController = controller;}}).pipeThrough(new TextEncoderStream());"
		const contextScript = staticContext
			? `window.__reactRouterContext = ${serverHandoffString};${streamScript}`
			: " "
		const routeModulesScript = !isStatic
			? " "
			: `${((_a = manifest.hmr) == null ? void 0 : _a.runtime) ? `import ${JSON.stringify(manifest.hmr.runtime)};` : ""}${!enableFogOfWar ? `import ${JSON.stringify(manifest.url)}` : ""};
${matches
	.map((match, routeIndex) => {
		const routeVarName = `route${routeIndex}`
		const manifestEntry = manifest.routes[match.route.id]
		invariant2(manifestEntry, `Route ${match.route.id} not found in manifest`)
		const {
			clientActionModule,
			clientLoaderModule,
			clientMiddlewareModule,
			hydrateFallbackModule,
			module,
		} = manifestEntry
		const chunks = [
			...(clientActionModule
				? [
						{
							module: clientActionModule,
							varName: `${routeVarName}_clientAction`,
						},
					]
				: []),
			...(clientLoaderModule
				? [
						{
							module: clientLoaderModule,
							varName: `${routeVarName}_clientLoader`,
						},
					]
				: []),
			...(clientMiddlewareModule
				? [
						{
							module: clientMiddlewareModule,
							varName: `${routeVarName}_clientMiddleware`,
						},
					]
				: []),
			...(hydrateFallbackModule
				? [
						{
							module: hydrateFallbackModule,
							varName: `${routeVarName}_HydrateFallback`,
						},
					]
				: []),
			{ module, varName: `${routeVarName}_main` },
		]
		if (chunks.length === 1) {
			return `import * as ${routeVarName} from ${JSON.stringify(module)};`
		}
		const chunkImportsSnippet = chunks
			.map(chunk => `import * as ${chunk.varName} from "${chunk.module}";`)
			.join("\n")
		const mergedChunksSnippet = `const ${routeVarName} = {${chunks.map(chunk => `...${chunk.varName}`).join(",")}};`
		return [chunkImportsSnippet, mergedChunksSnippet].join("\n")
	})
	.join("\n")}
  ${
		enableFogOfWar
			? // Inline a minimal manifest with the SSR matches
				`window.__reactRouterManifest = ${JSON.stringify(
					getPartialManifest(manifest, router2),
					null,
					2,
				)};`
			: ""
	}
  window.__reactRouterRouteModules = {${matches.map((match, index) => `${JSON.stringify(match.route.id)}:route${index}`).join(",")}};

import(${JSON.stringify(manifest.entry.module)});`
		return React8.createElement(
			React8.Fragment,
			null,
			React8.createElement("script", {
				...scriptProps,
				suppressHydrationWarning: true,
				dangerouslySetInnerHTML: { __html: contextScript },
				type: void 0,
			}),
			React8.createElement("script", {
				...scriptProps,
				suppressHydrationWarning: true,
				dangerouslySetInnerHTML: { __html: routeModulesScript },
				type: "module",
				async: true,
			}),
		)
	}, [])
	const preloads =
		isHydrated || isRSCRouterContext
			? []
			: dedupe(
					manifest.entry.imports.concat(
						getModuleLinkHrefs(matches, manifest, {
							includeHydrateFallback: true,
						}),
					),
				)
	const sri = typeof manifest.sri === "object" ? manifest.sri : {}
	warnOnce(
		!isRSCRouterContext,
		"The <Scripts /> element is a no-op when using RSC and can be safely removed.",
	)
	return isHydrated || isRSCRouterContext
		? null
		: React8.createElement(
				React8.Fragment,
				null,
				typeof manifest.sri === "object"
					? React8.createElement("script", {
							...scriptProps,
							"rr-importmap": "",
							type: "importmap",
							suppressHydrationWarning: true,
							dangerouslySetInnerHTML: {
								__html: JSON.stringify({
									integrity: sri,
								}),
							},
						})
					: null,
				!enableFogOfWar
					? React8.createElement("link", {
							rel: "modulepreload",
							href: manifest.url,
							crossOrigin: scriptProps.crossOrigin,
							integrity: sri[manifest.url],
							nonce: scriptProps.nonce,
							suppressHydrationWarning: true,
						})
					: null,
				React8.createElement("link", {
					rel: "modulepreload",
					href: manifest.entry.module,
					crossOrigin: scriptProps.crossOrigin,
					integrity: sri[manifest.entry.module],
					nonce: scriptProps.nonce,
					suppressHydrationWarning: true,
				}),
				preloads.map(path =>
					React8.createElement("link", {
						key: path,
						rel: "modulepreload",
						href: path,
						crossOrigin: scriptProps.crossOrigin,
						integrity: sri[path],
						nonce: scriptProps.nonce,
						suppressHydrationWarning: true,
					}),
				),
				initialScripts,
			)
}
function dedupe(array) {
	return [...new Set(array)]
}
function mergeRefs(...refs) {
	return value => {
		refs.forEach(ref => {
			if (typeof ref === "function") {
				ref(value)
			} else if (ref != null) {
				ref.current = value
			}
		})
	}
}
var RemixErrorBoundary = class extends React9.Component {
	constructor(props) {
		super(props)
		this.state = { error: props.error || null, location: props.location }
	}
	static getDerivedStateFromError(error) {
		return { error }
	}
	static getDerivedStateFromProps(props, state) {
		if (state.location !== props.location) {
			return { error: props.error || null, location: props.location }
		}
		return { error: props.error || state.error, location: state.location }
	}
	render() {
		if (this.state.error) {
			return React9.createElement(RemixRootDefaultErrorBoundary, {
				error: this.state.error,
				isOutsideRemixApp: true,
			})
		} else {
			return this.props.children
		}
	}
}
function RemixRootDefaultErrorBoundary({ error, isOutsideRemixApp }) {
	console.error(error)
	const heyDeveloper = React9.createElement("script", {
		dangerouslySetInnerHTML: {
			__html: `
        console.log(
          "💿 Hey developer 👋. You can provide a way better UX than this when your app throws errors. Check out https://reactrouter.com/how-to/error-boundary for more information."
        );
      `,
		},
	})
	if (isRouteErrorResponse(error)) {
		return React9.createElement(
			BoundaryShell,
			{ title: "Unhandled Thrown Response!" },
			React9.createElement(
				"h1",
				{ style: { fontSize: "24px" } },
				error.status,
				" ",
				error.statusText,
			),
			ENABLE_DEV_WARNINGS ? heyDeveloper : null,
		)
	}
	let errorInstance
	if (error instanceof Error) {
		errorInstance = error
	} else {
		const errorString =
			error == null
				? "Unknown Error"
				: typeof error === "object" && "toString" in error
					? error.toString()
					: JSON.stringify(error)
		errorInstance = new Error(errorString)
	}
	return React9.createElement(
		BoundaryShell,
		{
			title: "Application Error!",
			isOutsideRemixApp,
		},
		React9.createElement("h1", { style: { fontSize: "24px" } }, "Application Error"),
		React9.createElement(
			"pre",
			{
				style: {
					padding: "2rem",
					background: "hsla(10, 50%, 50%, 0.1)",
					color: "red",
					overflow: "auto",
				},
			},
			errorInstance.stack,
		),
		heyDeveloper,
	)
}
function BoundaryShell({ title, renderScripts, isOutsideRemixApp, children }) {
	var _a
	const { routeModules } = useFrameworkContext()
	if (((_a = routeModules.root) == null ? void 0 : _a.Layout) && !isOutsideRemixApp) {
		return children
	}
	return React9.createElement(
		"html",
		{ lang: "en" },
		React9.createElement(
			"head",
			null,
			React9.createElement("meta", { charSet: "utf-8" }),
			React9.createElement("meta", {
				name: "viewport",
				content: "width=device-width,initial-scale=1,viewport-fit=cover",
			}),
			React9.createElement("title", null, title),
		),
		React9.createElement(
			"body",
			null,
			React9.createElement(
				"main",
				{ style: { fontFamily: "system-ui, sans-serif", padding: "2rem" } },
				children,
				renderScripts ? React9.createElement(Scripts, null) : null,
			),
		),
	)
}
var isBrowser2 =
	typeof window !== "undefined" &&
	typeof window.document !== "undefined" &&
	typeof window.document.createElement !== "undefined"
try {
	if (isBrowser2) {
		window.__reactRouterVersion = "7.15.0" // @ts-expect-error
	}
} catch (e) {}
function createBrowserRouter(routes, opts) {
	return createRouter({
		basename: opts == null ? void 0 : opts.basename,
		getContext: opts == null ? void 0 : opts.getContext,
		future: opts == null ? void 0 : opts.future,
		history: createBrowserHistory({
			window: opts == null ? void 0 : opts.window,
		}),
		hydrationData: (opts == null ? void 0 : opts.hydrationData) || parseHydrationData(),
		routes,
		mapRouteProperties,
		hydrationRouteProperties,
		dataStrategy: opts == null ? void 0 : opts.dataStrategy,
		patchRoutesOnNavigation: opts == null ? void 0 : opts.patchRoutesOnNavigation,
		window: opts == null ? void 0 : opts.window,
		instrumentations: opts == null ? void 0 : opts.instrumentations,
	}).initialize()
}
function createHashRouter(routes, opts) {
	return createRouter({
		basename: opts == null ? void 0 : opts.basename,
		getContext: opts == null ? void 0 : opts.getContext,
		future: opts == null ? void 0 : opts.future,
		history: createHashHistory({ window: opts == null ? void 0 : opts.window }),
		hydrationData: (opts == null ? void 0 : opts.hydrationData) || parseHydrationData(),
		routes,
		mapRouteProperties,
		hydrationRouteProperties,
		dataStrategy: opts == null ? void 0 : opts.dataStrategy,
		patchRoutesOnNavigation: opts == null ? void 0 : opts.patchRoutesOnNavigation,
		window: opts == null ? void 0 : opts.window,
		instrumentations: opts == null ? void 0 : opts.instrumentations,
	}).initialize()
}
function parseHydrationData() {
	let state = window == null ? void 0 : window.__staticRouterHydrationData
	if (state && state.errors) {
		state = {
			...state,
			errors: deserializeErrors(state.errors),
		}
	}
	return state
}
function deserializeErrors(errors) {
	if (!errors) return null
	const entries = Object.entries(errors)
	const serialized = {}
	for (const [key, val] of entries) {
		if (val && val.__type === "RouteErrorResponse") {
			serialized[key] = new ErrorResponseImpl(
				val.status,
				val.statusText,
				val.data,
				val.internal === true,
			)
		} else if (val && val.__type === "Error") {
			if (val.__subType) {
				const ErrorConstructor = window[val.__subType]
				if (typeof ErrorConstructor === "function") {
					try {
						const error = new ErrorConstructor(val.message)
						error.stack = ""
						serialized[key] = error
					} catch (e) {}
				}
			}
			if (serialized[key] == null) {
				const error = new Error(val.message)
				error.stack = ""
				serialized[key] = error
			}
		} else {
			serialized[key] = val
		}
	}
	return serialized
}
function BrowserRouter({ basename, children, useTransitions, window: window2 }) {
	const historyRef = React10.useRef()
	if (historyRef.current == null) {
		historyRef.current = createBrowserHistory({
			window: window2,
			v5Compat: true,
		})
	}
	const history = historyRef.current
	const [state, setStateImpl] = React10.useState({
		action: history.action,
		location: history.location,
	})
	const setState = React10.useCallback(
		newState => {
			if (useTransitions === false) {
				setStateImpl(newState)
			} else {
				React10.startTransition(() => setStateImpl(newState))
			}
		},
		[useTransitions],
	)
	React10.useLayoutEffect(() => history.listen(setState), [history, setState])
	return React10.createElement(Router, {
		basename,
		children,
		location: state.location,
		navigationType: state.action,
		navigator: history,
		useTransitions,
	})
}
function HashRouter({ basename, children, useTransitions, window: window2 }) {
	const historyRef = React10.useRef()
	if (historyRef.current == null) {
		historyRef.current = createHashHistory({ window: window2, v5Compat: true })
	}
	const history = historyRef.current
	const [state, setStateImpl] = React10.useState({
		action: history.action,
		location: history.location,
	})
	const setState = React10.useCallback(
		newState => {
			if (useTransitions === false) {
				setStateImpl(newState)
			} else {
				React10.startTransition(() => setStateImpl(newState))
			}
		},
		[useTransitions],
	)
	React10.useLayoutEffect(() => history.listen(setState), [history, setState])
	return React10.createElement(Router, {
		basename,
		children,
		location: state.location,
		navigationType: state.action,
		navigator: history,
		useTransitions,
	})
}
function HistoryRouter({ basename, children, history, useTransitions }) {
	const [state, setStateImpl] = React10.useState({
		action: history.action,
		location: history.location,
	})
	const setState = React10.useCallback(
		newState => {
			if (useTransitions === false) {
				setStateImpl(newState)
			} else {
				React10.startTransition(() => setStateImpl(newState))
			}
		},
		[useTransitions],
	)
	React10.useLayoutEffect(() => history.listen(setState), [history, setState])
	return React10.createElement(Router, {
		basename,
		children,
		location: state.location,
		navigationType: state.action,
		navigator: history,
		useTransitions,
	})
}
HistoryRouter.displayName = "unstable_HistoryRouter"
var ABSOLUTE_URL_REGEX2 = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i
var Link = React10.forwardRef(function LinkWithRef(
	{
		onClick,
		discover = "render",
		prefetch = "none",
		relative,
		reloadDocument,
		replace: replace2,
		mask,
		state,
		target,
		to,
		preventScrollReset,
		viewTransition,
		defaultShouldRevalidate,
		...rest
	},
	forwardedRef,
) {
	const { basename, navigator, useTransitions } = React10.useContext(NavigationContext)
	const isAbsolute = typeof to === "string" && ABSOLUTE_URL_REGEX2.test(to)
	const parsed = parseToInfo(to, basename)
	to = parsed.to
	const href2 = useHref(to, { relative })
	const location2 = useLocation()
	let maskedHref = null
	if (mask) {
		const resolved = resolveTo(mask, [], location2.mask ? location2.mask.pathname : "/", true)
		if (basename !== "/") {
			resolved.pathname =
				resolved.pathname === "/" ? basename : joinPaths([basename, resolved.pathname])
		}
		maskedHref = navigator.createHref(resolved)
	}
	const [shouldPrefetch, prefetchRef, prefetchHandlers] = usePrefetchBehavior(prefetch, rest)
	const internalOnClick = useLinkClickHandler(to, {
		replace: replace2,
		mask,
		state,
		target,
		preventScrollReset,
		relative,
		viewTransition,
		defaultShouldRevalidate,
		useTransitions,
	})
	function handleClick(event) {
		if (onClick) onClick(event)
		if (!event.defaultPrevented) {
			internalOnClick(event)
		}
	}
	const isSpaLink = !(parsed.isExternal || reloadDocument)
	const link =
		// eslint-disable-next-line jsx-a11y/anchor-has-content
		React10.createElement("a", {
			...rest,
			...prefetchHandlers,
			href: (isSpaLink ? maskedHref : void 0) || parsed.absoluteURL || href2,
			onClick: isSpaLink ? handleClick : onClick,
			ref: mergeRefs(forwardedRef, prefetchRef),
			target,
			"data-discover": !isAbsolute && discover === "render" ? "true" : void 0,
		})
	return shouldPrefetch && !isAbsolute
		? React10.createElement(
				React10.Fragment,
				null,
				link,
				React10.createElement(PrefetchPageLinks, { page: href2 }),
			)
		: link
})
Link.displayName = "Link"
var NavLink = React10.forwardRef(function NavLinkWithRef(
	{
		"aria-current": ariaCurrentProp = "page",
		caseSensitive = false,
		className: classNameProp = "",
		end = false,
		style: styleProp,
		to,
		viewTransition,
		children,
		...rest
	},
	ref,
) {
	const path = useResolvedPath(to, { relative: rest.relative })
	const location2 = useLocation()
	const routerState = React10.useContext(DataRouterStateContext)
	const { navigator, basename } = React10.useContext(NavigationContext)
	const isTransitioning =
		routerState != null && // Conditional usage is OK here because the usage of a data router is static
		// eslint-disable-next-line react-hooks/rules-of-hooks
		useViewTransitionState(path) &&
		viewTransition === true
	let toPathname = navigator.encodeLocation
		? navigator.encodeLocation(path).pathname
		: path.pathname
	let locationPathname = location2.pathname
	let nextLocationPathname =
		routerState && routerState.navigation && routerState.navigation.location
			? routerState.navigation.location.pathname
			: null
	if (!caseSensitive) {
		locationPathname = locationPathname.toLowerCase()
		nextLocationPathname = nextLocationPathname ? nextLocationPathname.toLowerCase() : null
		toPathname = toPathname.toLowerCase()
	}
	if (nextLocationPathname && basename) {
		nextLocationPathname = stripBasename(nextLocationPathname, basename) || nextLocationPathname
	}
	const endSlashPosition =
		toPathname !== "/" && toPathname.endsWith("/") ? toPathname.length - 1 : toPathname.length
	const isActive =
		locationPathname === toPathname ||
		(!end &&
			locationPathname.startsWith(toPathname) &&
			locationPathname.charAt(endSlashPosition) === "/")
	const isPending =
		nextLocationPathname != null &&
		(nextLocationPathname === toPathname ||
			(!end &&
				nextLocationPathname.startsWith(toPathname) &&
				nextLocationPathname.charAt(toPathname.length) === "/"))
	const renderProps = {
		isActive,
		isPending,
		isTransitioning,
	}
	const ariaCurrent = isActive ? ariaCurrentProp : void 0
	let className
	if (typeof classNameProp === "function") {
		className = classNameProp(renderProps)
	} else {
		className = [
			classNameProp,
			isActive ? "active" : null,
			isPending ? "pending" : null,
			isTransitioning ? "transitioning" : null,
		]
			.filter(Boolean)
			.join(" ")
	}
	const style = typeof styleProp === "function" ? styleProp(renderProps) : styleProp
	return React10.createElement(
		Link,
		{
			...rest,
			"aria-current": ariaCurrent,
			className,
			ref,
			style,
			to,
			viewTransition,
		},
		typeof children === "function" ? children(renderProps) : children,
	)
})
NavLink.displayName = "NavLink"
var Form = React10.forwardRef(
	(
		{
			discover = "render",
			fetcherKey,
			navigate,
			reloadDocument,
			replace: replace2,
			state,
			method = defaultMethod,
			action,
			onSubmit,
			relative,
			preventScrollReset,
			viewTransition,
			defaultShouldRevalidate,
			...props
		},
		forwardedRef,
	) => {
		const { useTransitions } = React10.useContext(NavigationContext)
		const submit = useSubmit()
		const formAction = useFormAction(action, { relative })
		const formMethod = method.toLowerCase() === "get" ? "get" : "post"
		const isAbsolute = typeof action === "string" && ABSOLUTE_URL_REGEX2.test(action)
		const submitHandler = event => {
			onSubmit && onSubmit(event)
			if (event.defaultPrevented) return
			event.preventDefault()
			const submitter = event.nativeEvent.submitter
			const submitMethod =
				(submitter == null ? void 0 : submitter.getAttribute("formmethod")) || method
			const doSubmit = () =>
				submit(submitter || event.currentTarget, {
					fetcherKey,
					method: submitMethod,
					navigate,
					replace: replace2,
					state,
					relative,
					preventScrollReset,
					viewTransition,
					defaultShouldRevalidate,
				})
			if (useTransitions && navigate !== false) {
				React10.startTransition(() => doSubmit())
			} else {
				doSubmit()
			}
		}
		return React10.createElement("form", {
			ref: forwardedRef,
			method: formMethod,
			action: formAction,
			onSubmit: reloadDocument ? onSubmit : submitHandler,
			...props,
			"data-discover": !isAbsolute && discover === "render" ? "true" : void 0,
		})
	},
)
Form.displayName = "Form"
function ScrollRestoration({ getKey, storageKey, ...props }) {
	const remixContext = React10.useContext(FrameworkContext)
	const { basename } = React10.useContext(NavigationContext)
	const location2 = useLocation()
	const matches = useMatches()
	useScrollRestoration({ getKey, storageKey })
	const ssrKey = React10.useMemo(
		() => {
			if (!remixContext || !getKey) return null
			const userKey = getScrollRestorationKey(location2, matches, basename, getKey)
			return userKey !== location2.key ? userKey : null
		},
		// Nah, we only need this the first time for the SSR render
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[],
	)
	if (!remixContext || remixContext.isSpaMode) {
		return null
	}
	const restoreScroll = ((storageKey2, restoreKey) => {
		if (!window.history.state || !window.history.state.key) {
			const key = Math.random().toString(32).slice(2)
			window.history.replaceState({ key }, "")
		}
		try {
			const positions = JSON.parse(sessionStorage.getItem(storageKey2) || "{}")
			const storedY = positions[restoreKey || window.history.state.key]
			if (typeof storedY === "number") {
				window.scrollTo(0, storedY)
			}
		} catch (error) {
			console.error(error)
			sessionStorage.removeItem(storageKey2)
		}
	}).toString()
	return React10.createElement("script", {
		...props,
		suppressHydrationWarning: true,
		dangerouslySetInnerHTML: {
			__html: `(${restoreScroll})(${escapeHtml(
				JSON.stringify(storageKey || SCROLL_RESTORATION_STORAGE_KEY),
			)}, ${escapeHtml(JSON.stringify(ssrKey))})`,
		},
	})
}
ScrollRestoration.displayName = "ScrollRestoration"
function getDataRouterConsoleError2(hookName) {
	return `${hookName} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`
}
function useDataRouterContext3(hookName) {
	const ctx = React10.useContext(DataRouterContext)
	invariant(ctx, getDataRouterConsoleError2(hookName))
	return ctx
}
function useDataRouterState2(hookName) {
	const state = React10.useContext(DataRouterStateContext)
	invariant(state, getDataRouterConsoleError2(hookName))
	return state
}
function useLinkClickHandler(
	to,
	{
		target,
		replace: replaceProp,
		mask,
		state,
		preventScrollReset,
		relative,
		viewTransition,
		defaultShouldRevalidate,
		useTransitions,
	} = {},
) {
	const navigate = useNavigate()
	const location2 = useLocation()
	const path = useResolvedPath(to, { relative })
	return React10.useCallback(
		event => {
			if (shouldProcessLinkClick(event, target)) {
				event.preventDefault()
				const replace2 =
					replaceProp !== void 0 ? replaceProp : createPath(location2) === createPath(path)
				const doNavigate = () =>
					navigate(to, {
						replace: replace2,
						mask,
						state,
						preventScrollReset,
						relative,
						viewTransition,
						defaultShouldRevalidate,
					})
				if (useTransitions) {
					React10.startTransition(() => doNavigate())
				} else {
					doNavigate()
				}
			}
		},
		[
			location2,
			navigate,
			path,
			replaceProp,
			mask,
			state,
			target,
			to,
			preventScrollReset,
			relative,
			viewTransition,
			defaultShouldRevalidate,
			useTransitions,
		],
	)
}
function useSearchParams(defaultInit) {
	warning(
		typeof URLSearchParams !== "undefined",
		`You cannot use the \`useSearchParams\` hook in a browser that does not support the URLSearchParams API. If you need to support Internet Explorer 11, we recommend you load a polyfill such as https://github.com/ungap/url-search-params.`,
	)
	const defaultSearchParamsRef = React10.useRef(createSearchParams(defaultInit))
	const hasSetSearchParamsRef = React10.useRef(false)
	const location2 = useLocation()
	const searchParams = React10.useMemo(
		() =>
			// Only merge in the defaults if we haven't yet called setSearchParams.
			// Once we call that we want those to take precedence, otherwise you can't
			// remove a param with setSearchParams({}) if it has an initial value
			getSearchParamsForLocation(
				location2.search,
				hasSetSearchParamsRef.current ? null : defaultSearchParamsRef.current,
			),
		[location2.search],
	)
	const navigate = useNavigate()
	const setSearchParams = React10.useCallback(
		(nextInit, navigateOptions) => {
			const newSearchParams = createSearchParams(
				typeof nextInit === "function" ? nextInit(new URLSearchParams(searchParams)) : nextInit,
			)
			hasSetSearchParamsRef.current = true
			navigate("?" + newSearchParams, navigateOptions)
		},
		[navigate, searchParams],
	)
	return [searchParams, setSearchParams]
}
var fetcherId = 0
var getUniqueFetcherId = () => `__${String(++fetcherId)}__`
function useSubmit() {
	const { router: router2 } = useDataRouterContext3(
		"useSubmit",
		/* UseSubmit */
	)
	const { basename } = React10.useContext(NavigationContext)
	const currentRouteId = useRouteId()
	const routerFetch = router2.fetch
	const routerNavigate = router2.navigate
	return React10.useCallback(
		async (target, options = {}) => {
			const { action, method, encType, formData, body } = getFormSubmissionInfo(target, basename)
			if (options.navigate === false) {
				const key = options.fetcherKey || getUniqueFetcherId()
				await routerFetch(key, currentRouteId, options.action || action, {
					defaultShouldRevalidate: options.defaultShouldRevalidate,
					preventScrollReset: options.preventScrollReset,
					formData,
					body,
					formMethod: options.method || method,
					formEncType: options.encType || encType,
					flushSync: options.flushSync,
				})
			} else {
				await routerNavigate(options.action || action, {
					defaultShouldRevalidate: options.defaultShouldRevalidate,
					preventScrollReset: options.preventScrollReset,
					formData,
					body,
					formMethod: options.method || method,
					formEncType: options.encType || encType,
					replace: options.replace,
					state: options.state,
					fromRouteId: currentRouteId,
					flushSync: options.flushSync,
					viewTransition: options.viewTransition,
				})
			}
		},
		[routerFetch, routerNavigate, basename, currentRouteId],
	)
}
function useFormAction(action, { relative } = {}) {
	const { basename } = React10.useContext(NavigationContext)
	const routeContext = React10.useContext(RouteContext)
	invariant(routeContext, "useFormAction must be used inside a RouteContext")
	const [match] = routeContext.matches.slice(-1)
	const path = { ...useResolvedPath(action ? action : ".", { relative }) }
	const location2 = useLocation()
	if (action == null) {
		path.search = location2.search
		const params = new URLSearchParams(path.search)
		const indexValues = params.getAll("index")
		const hasNakedIndexParam = indexValues.some(v => v === "")
		if (hasNakedIndexParam) {
			params.delete("index")
			indexValues.filter(v => v).forEach(v => params.append("index", v))
			const qs = params.toString()
			path.search = qs ? `?${qs}` : ""
		}
	}
	if ((!action || action === ".") && match.route.index) {
		path.search = path.search ? path.search.replace(/^\?/, "?index&") : "?index"
	}
	if (basename !== "/") {
		path.pathname = path.pathname === "/" ? basename : joinPaths([basename, path.pathname])
	}
	return createPath(path)
}
function useFetcher({ key } = {}) {
	var _a
	const { router: router2 } = useDataRouterContext3(
		"useFetcher",
		/* UseFetcher */
	)
	const state = useDataRouterState2(
		"useFetcher",
		/* UseFetcher */
	)
	const fetcherData = React10.useContext(FetchersContext)
	const route = React10.useContext(RouteContext)
	const routeId = (_a = route.matches[route.matches.length - 1]) == null ? void 0 : _a.route.id
	invariant(fetcherData, `useFetcher must be used inside a FetchersContext`)
	invariant(route, `useFetcher must be used inside a RouteContext`)
	invariant(routeId != null, `useFetcher can only be used on routes that contain a unique "id"`)
	const defaultKey = React10.useId()
	const [fetcherKey, setFetcherKey] = React10.useState(key || defaultKey)
	if (key && key !== fetcherKey) {
		setFetcherKey(key)
	}
	const { deleteFetcher, getFetcher, resetFetcher, fetch: routerFetch } = router2
	React10.useEffect(() => {
		getFetcher(fetcherKey)
		return () => deleteFetcher(fetcherKey)
	}, [deleteFetcher, getFetcher, fetcherKey])
	const load = React10.useCallback(
		async (href2, opts) => {
			invariant(routeId, "No routeId available for fetcher.load()")
			await routerFetch(fetcherKey, routeId, href2, opts)
		},
		[fetcherKey, routeId, routerFetch],
	)
	const submitImpl = useSubmit()
	const submit = React10.useCallback(
		async (target, opts) => {
			await submitImpl(target, {
				...opts,
				navigate: false,
				fetcherKey,
			})
		},
		[fetcherKey, submitImpl],
	)
	const reset = React10.useCallback(
		opts => resetFetcher(fetcherKey, opts),
		[resetFetcher, fetcherKey],
	)
	const FetcherForm = React10.useMemo(() => {
		const FetcherForm2 = React10.forwardRef((props, ref) => {
			return React10.createElement(Form, {
				...props,
				navigate: false,
				fetcherKey,
				ref,
			})
		})
		FetcherForm2.displayName = "fetcher.Form"
		return FetcherForm2
	}, [fetcherKey])
	const fetcher = state.fetchers.get(fetcherKey) || IDLE_FETCHER
	const data2 = fetcherData.get(fetcherKey)
	const fetcherWithComponents = React10.useMemo(
		() => ({
			Form: FetcherForm,
			submit,
			load,
			reset,
			...fetcher,
			data: data2,
		}),
		[FetcherForm, submit, load, reset, fetcher, data2],
	)
	return fetcherWithComponents
}
function useFetchers() {
	const state = useDataRouterState2(
		"useFetchers",
		/* UseFetchers */
	)
	return Array.from(state.fetchers.entries()).map(([key, fetcher]) => ({
		...fetcher,
		key,
	}))
}
var SCROLL_RESTORATION_STORAGE_KEY = "react-router-scroll-positions"
var savedScrollPositions = {}
function getScrollRestorationKey(location2, matches, basename, getKey) {
	let key = null
	if (getKey) {
		if (basename !== "/") {
			key = getKey(
				{
					...location2,
					pathname: stripBasename(location2.pathname, basename) || location2.pathname,
				},
				matches,
			)
		} else {
			key = getKey(location2, matches)
		}
	}
	if (key == null) {
		key = location2.key
	}
	return key
}
function useScrollRestoration({ getKey, storageKey } = {}) {
	const { router: router2 } = useDataRouterContext3(
		"useScrollRestoration",
		/* UseScrollRestoration */
	)
	const { restoreScrollPosition, preventScrollReset } = useDataRouterState2(
		"useScrollRestoration",
		/* UseScrollRestoration */
	)
	const { basename } = React10.useContext(NavigationContext)
	const location2 = useLocation()
	const matches = useMatches()
	const navigation = useNavigation()
	React10.useEffect(() => {
		window.history.scrollRestoration = "manual"
		return () => {
			window.history.scrollRestoration = "auto"
		}
	}, [])
	usePageHide(
		React10.useCallback(() => {
			if (navigation.state === "idle") {
				const key = getScrollRestorationKey(location2, matches, basename, getKey)
				savedScrollPositions[key] = window.scrollY
			}
			try {
				sessionStorage.setItem(
					storageKey || SCROLL_RESTORATION_STORAGE_KEY,
					JSON.stringify(savedScrollPositions),
				)
			} catch (error) {
				warning(
					false,
					`Failed to save scroll positions in sessionStorage, <ScrollRestoration /> will not work properly (${error}).`,
				)
			}
			window.history.scrollRestoration = "auto"
		}, [navigation.state, getKey, basename, location2, matches, storageKey]),
	)
	if (typeof document !== "undefined") {
		React10.useLayoutEffect(() => {
			try {
				const sessionPositions = sessionStorage.getItem(
					storageKey || SCROLL_RESTORATION_STORAGE_KEY,
				)
				if (sessionPositions) {
					savedScrollPositions = JSON.parse(sessionPositions)
				}
			} catch (e) {}
		}, [storageKey])
		React10.useLayoutEffect(() => {
			const disableScrollRestoration =
				router2 == null
					? void 0
					: router2.enableScrollRestoration(
							savedScrollPositions,
							() => window.scrollY,
							getKey
								? (location22, matches2) =>
										getScrollRestorationKey(location22, matches2, basename, getKey)
								: void 0,
						)
			return () => disableScrollRestoration && disableScrollRestoration()
		}, [router2, basename, getKey])
		React10.useLayoutEffect(() => {
			if (restoreScrollPosition === false) {
				return
			}
			if (typeof restoreScrollPosition === "number") {
				window.scrollTo(0, restoreScrollPosition)
				return
			}
			try {
				if (location2.hash) {
					const el = document.getElementById(decodeURIComponent(location2.hash.slice(1)))
					if (el) {
						el.scrollIntoView()
						return
					}
				}
			} catch {
				warning(
					false,
					`"${location2.hash.slice(
						1,
					)}" is not a decodable element ID. The view will not scroll to it.`,
				)
			}
			if (preventScrollReset === true) {
				return
			}
			window.scrollTo(0, 0)
		}, [location2, restoreScrollPosition, preventScrollReset])
	}
}
function useBeforeUnload(callback, options) {
	const { capture } = options || {}
	React10.useEffect(() => {
		const opts = capture != null ? { capture } : void 0
		window.addEventListener("beforeunload", callback, opts)
		return () => {
			window.removeEventListener("beforeunload", callback, opts)
		}
	}, [callback, capture])
}
function usePageHide(callback, options) {
	const { capture } = options || {}
	React10.useEffect(() => {
		const opts = capture != null ? { capture } : void 0
		window.addEventListener("pagehide", callback, opts)
		return () => {
			window.removeEventListener("pagehide", callback, opts)
		}
	}, [callback, capture])
}
function usePrompt({ when, message }) {
	const blocker = useBlocker(when)
	React10.useEffect(() => {
		if (blocker.state === "blocked") {
			const proceed = window.confirm(message)
			if (proceed) {
				setTimeout(blocker.proceed, 0)
			} else {
				blocker.reset()
			}
		}
	}, [blocker, message])
	React10.useEffect(() => {
		if (blocker.state === "blocked" && !when) {
			blocker.reset()
		}
	}, [blocker, when])
}
function useViewTransitionState(to, { relative } = {}) {
	const vtContext = React10.useContext(ViewTransitionContext)
	invariant(
		vtContext != null,
		"`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?",
	)
	const { basename } = useDataRouterContext3(
		"useViewTransitionState",
		/* useViewTransitionState */
	)
	const path = useResolvedPath(to, { relative })
	if (!vtContext.isTransitioning) {
		return false
	}
	const currentPath =
		stripBasename(vtContext.currentLocation.pathname, basename) ||
		vtContext.currentLocation.pathname
	const nextPath =
		stripBasename(vtContext.nextLocation.pathname, basename) || vtContext.nextLocation.pathname
	return matchPath(path.pathname, nextPath) != null || matchPath(path.pathname, currentPath) != null
}
function StaticRouter({ basename, children, location: locationProp = "/" }) {
	if (typeof locationProp === "string") {
		locationProp = parsePath(locationProp)
	}
	const action = "POP"
	const location2 = {
		pathname: locationProp.pathname || "/",
		search: locationProp.search || "",
		hash: locationProp.hash || "",
		state: locationProp.state != null ? locationProp.state : null,
		key: locationProp.key || "default",
		mask: void 0,
	}
	const staticNavigator = getStatelessNavigator()
	return React11.createElement(Router, {
		basename,
		children,
		location: location2,
		navigationType: action,
		navigator: staticNavigator,
		static: true,
		useTransitions: false,
	})
}
function StaticRouterProvider({ context, router: router2, hydrate: hydrate2 = true, nonce }) {
	invariant(router2 && context, "You must provide `router` and `context` to <StaticRouterProvider>")
	const dataRouterContext = {
		router: router2,
		navigator: getStatelessNavigator(),
		static: true,
		staticContext: context,
		basename: context.basename || "/",
	}
	const fetchersContext = /* @__PURE__ */ new Map()
	let hydrateScript = ""
	if (hydrate2 !== false) {
		const data2 = {
			loaderData: context.loaderData,
			actionData: context.actionData,
			errors: serializeErrors(context.errors),
		}
		const json = escapeHtml(JSON.stringify(JSON.stringify(data2)))
		hydrateScript = `window.__staticRouterHydrationData = JSON.parse(${json});`
	}
	const { state } = dataRouterContext.router
	return React11.createElement(
		React11.Fragment,
		null,
		React11.createElement(
			DataRouterContext.Provider,
			{ value: dataRouterContext },
			React11.createElement(
				DataRouterStateContext.Provider,
				{ value: state },
				React11.createElement(
					FetchersContext.Provider,
					{ value: fetchersContext },
					React11.createElement(
						ViewTransitionContext.Provider,
						{ value: { isTransitioning: false } },
						React11.createElement(
							Router,
							{
								basename: dataRouterContext.basename,
								location: state.location,
								navigationType: state.historyAction,
								navigator: dataRouterContext.navigator,
								static: dataRouterContext.static,
								useTransitions: false,
							},
							React11.createElement(DataRoutes2, {
								manifest: router2.manifest,
								routes: router2.routes,
								future: router2.future,
								state,
								isStatic: true,
							}),
						),
					),
				),
			),
		),
		hydrateScript
			? React11.createElement("script", {
					suppressHydrationWarning: true,
					nonce,
					dangerouslySetInnerHTML: { __html: hydrateScript },
				})
			: null,
	)
}
function serializeErrors(errors) {
	if (!errors) return null
	const entries = Object.entries(errors)
	const serialized = {}
	for (const [key, val] of entries) {
		if (isRouteErrorResponse(val)) {
			serialized[key] = { ...val, __type: "RouteErrorResponse" }
		} else if (val instanceof Error) {
			serialized[key] = {
				message: val.message,
				__type: "Error",
				// If this is a subclass (i.e., ReferenceError), send up the type so we
				// can re-create the same type during hydration.
				...(val.name !== "Error"
					? {
							__subType: val.name,
						}
					: {}),
			}
		} else {
			serialized[key] = val
		}
	}
	return serialized
}
function getStatelessNavigator() {
	return {
		createHref,
		encodeLocation,
		push(to) {
			throw new Error(
				`You cannot use navigator.push() on the server because it is a stateless environment. This error was probably triggered when you did a \`navigate(${JSON.stringify(to)})\` somewhere in your app.`,
			)
		},
		replace(to) {
			throw new Error(
				`You cannot use navigator.replace() on the server because it is a stateless environment. This error was probably triggered when you did a \`navigate(${JSON.stringify(to)}, { replace: true })\` somewhere in your app.`,
			)
		},
		go(delta) {
			throw new Error(
				`You cannot use navigator.go() on the server because it is a stateless environment. This error was probably triggered when you did a \`navigate(${delta})\` somewhere in your app.`,
			)
		},
		back() {
			throw new Error(
				`You cannot use navigator.back() on the server because it is a stateless environment.`,
			)
		},
		forward() {
			throw new Error(
				`You cannot use navigator.forward() on the server because it is a stateless environment.`,
			)
		},
	}
}
function createStaticHandler2(routes, opts) {
	return createStaticHandler(routes, {
		...opts,
		mapRouteProperties,
	})
}
function createStaticRouter(routes, context, opts = {}) {
	const manifest = {}
	const dataRoutes = convertRoutesToDataRoutes(routes, mapRouteProperties, void 0, manifest)
	const matches = context.matches.map(match => {
		const route = manifest[match.route.id] || match.route
		return {
			...match,
			route,
		}
	})
	const msg = method =>
		`You cannot use router.${method}() on the server because it is a stateless environment`
	return {
		get basename() {
			return context.basename
		},
		get future() {
			return {
				v8_middleware: false,
				v8_passThroughRequests: false,
				...(opts == null ? void 0 : opts.future),
			}
		},
		get state() {
			return {
				historyAction: "POP",
				location: context.location,
				matches,
				loaderData: context.loaderData,
				actionData: context.actionData,
				errors: context.errors,
				initialized: true,
				renderFallback: false,
				navigation: IDLE_NAVIGATION,
				restoreScrollPosition: null,
				preventScrollReset: false,
				revalidation: "idle",
				fetchers: /* @__PURE__ */ new Map(),
				blockers: /* @__PURE__ */ new Map(),
			}
		},
		get routes() {
			return dataRoutes
		},
		get branches() {
			return opts.branches
		},
		get manifest() {
			return manifest
		},
		get window() {
			return void 0
		},
		initialize() {
			throw msg("initialize")
		},
		subscribe() {
			throw msg("subscribe")
		},
		enableScrollRestoration() {
			throw msg("enableScrollRestoration")
		},
		navigate() {
			throw msg("navigate")
		},
		fetch() {
			throw msg("fetch")
		},
		revalidate() {
			throw msg("revalidate")
		},
		createHref,
		encodeLocation,
		getFetcher() {
			return IDLE_FETCHER
		},
		deleteFetcher() {
			throw msg("deleteFetcher")
		},
		resetFetcher() {
			throw msg("resetFetcher")
		},
		dispose() {
			throw msg("dispose")
		},
		getBlocker() {
			return IDLE_BLOCKER
		},
		deleteBlocker() {
			throw msg("deleteBlocker")
		},
		patchRoutes() {
			throw msg("patchRoutes")
		},
		_internalFetchControllers: /* @__PURE__ */ new Map(),
		_internalSetRoutes() {
			throw msg("_internalSetRoutes")
		},
		_internalSetStateDoNotUseOrYouWillBreakYourApp() {
			throw msg("_internalSetStateDoNotUseOrYouWillBreakYourApp")
		},
	}
}
function createHref(to) {
	return typeof to === "string" ? to : createPath(to)
}
function encodeLocation(to) {
	let href2 = typeof to === "string" ? to : createPath(to)
	href2 = href2.replace(/ $/, "%20")
	const encoded = ABSOLUTE_URL_REGEX3.test(href2)
		? new URL(href2)
		: new URL(href2, "http://localhost")
	return {
		pathname: encoded.pathname,
		search: encoded.search,
		hash: encoded.hash,
	}
}
var ABSOLUTE_URL_REGEX3 = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i

// node_modules/react-router/dist/development/chunk-RMD3H4O3.mjs
var React12 = __toESM(require_react(), 1)
var React22 = __toESM(require_react(), 1)
var import_cookie = __toESM(require_dist(), 1)
var import_set_cookie_parser = __toESM(require_set_cookie(), 1)
var React42 = __toESM(require_react(), 1)
var import_react = __toESM(require_react(), 1)
function ServerRouter({ context, url, nonce }) {
	if (typeof url === "string") {
		url = new URL(url)
	}
	const { manifest, routeModules, criticalCss, serverHandoffString } = context
	const routes = createServerRoutes(
		manifest.routes,
		routeModules,
		context.future,
		context.isSpaMode,
	)
	context.staticHandlerContext.loaderData = {
		...context.staticHandlerContext.loaderData,
	}
	for (const match of context.staticHandlerContext.matches) {
		const routeId = match.route.id
		const route = routeModules[routeId]
		const manifestRoute = context.manifest.routes[routeId]
		if (
			route &&
			manifestRoute &&
			shouldHydrateRouteLoader(
				routeId,
				route.clientLoader,
				manifestRoute.hasLoader,
				context.isSpaMode,
			) &&
			(route.HydrateFallback || !manifestRoute.hasLoader)
		) {
			delete context.staticHandlerContext.loaderData[routeId]
		}
	}
	const router2 = createStaticRouter(routes, context.staticHandlerContext, {
		branches: context.branches,
	})
	return React12.createElement(
		React12.Fragment,
		null,
		React12.createElement(
			FrameworkContext.Provider,
			{
				value: {
					manifest,
					routeModules,
					criticalCss,
					serverHandoffString,
					future: context.future,
					ssr: context.ssr,
					isSpaMode: context.isSpaMode,
					routeDiscovery: context.routeDiscovery,
					serializeError: context.serializeError,
					renderMeta: context.renderMeta,
				},
			},
			React12.createElement(
				RemixErrorBoundary,
				{ location: router2.state.location },
				React12.createElement(StaticRouterProvider, {
					router: router2,
					context: context.staticHandlerContext,
					hydrate: false,
				}),
			),
		),
		context.serverHandoffStream
			? React12.createElement(
					React12.Suspense,
					null,
					React12.createElement(StreamTransfer, {
						context,
						identifier: 0,
						reader: context.serverHandoffStream.getReader(),
						textDecoder: new TextDecoder(),
						nonce,
					}),
				)
			: null,
	)
}
function createRoutesStub(routes, _context) {
	return function RoutesTestStub({ initialEntries, initialIndex, hydrationData, future }) {
		const routerRef = React22.useRef()
		const frameworkContextRef = React22.useRef()
		if (routerRef.current == null) {
			frameworkContextRef.current = {
				future: {
					v8_passThroughRequests:
						(future == null ? void 0 : future.v8_passThroughRequests) === true,
					v8_middleware: (future == null ? void 0 : future.v8_middleware) === true,
					unstable_trailingSlashAwareDataRequests:
						(future == null ? void 0 : future.unstable_trailingSlashAwareDataRequests) === true,
				},
				manifest: {
					routes: {},
					entry: { imports: [], module: "" },
					url: "",
					version: "",
				},
				routeModules: {},
				ssr: false,
				isSpaMode: false,
				routeDiscovery: { mode: "lazy", manifestPath: "/__manifest" },
			}
			const patched = processRoutes(
				// @ts-expect-error `StubRouteObject` is stricter about `loader`/`action`
				// types compared to `RouteObject`
				convertRoutesToDataRoutes(routes, r => r),
				_context !== void 0
					? _context
					: (future == null ? void 0 : future.v8_middleware)
						? new RouterContextProvider()
						: {},
				frameworkContextRef.current.manifest,
				frameworkContextRef.current.routeModules,
			)
			routerRef.current = createMemoryRouter(patched, {
				initialEntries,
				initialIndex,
				hydrationData,
			})
		}
		return React22.createElement(
			FrameworkContext.Provider,
			{ value: frameworkContextRef.current },
			React22.createElement(RouterProvider, { router: routerRef.current }),
		)
	}
}
function processRoutes(routes, context, manifest, routeModules, parentId) {
	return routes.map(route => {
		if (!route.id) {
			throw new Error("Expected a route.id in react-router processRoutes() function")
		}
		const newRoute = {
			id: route.id,
			path: route.path,
			index: route.index,
			Component: route.Component ? withComponentProps(route.Component) : void 0,
			HydrateFallback: route.HydrateFallback
				? withHydrateFallbackProps(route.HydrateFallback)
				: void 0,
			ErrorBoundary: route.ErrorBoundary ? withErrorBoundaryProps(route.ErrorBoundary) : void 0,
			action: route.action ? args => route.action({ ...args, context }) : void 0,
			loader: route.loader ? args => route.loader({ ...args, context }) : void 0,
			middleware: route.middleware
				? route.middleware.map(
						mw =>
							(...args) =>
								mw({ ...args[0], context }, args[1]),
					)
				: void 0,
			handle: route.handle,
			shouldRevalidate: route.shouldRevalidate,
		}
		const entryRoute = {
			id: route.id,
			path: route.path,
			index: route.index,
			parentId,
			hasAction: route.action != null,
			hasLoader: route.loader != null,
			// When testing routes, you should be stubbing loader/action/middleware,
			// not trying to re-implement the full loader/clientLoader/SSR/hydration
			// flow. That is better tested via E2E tests.
			hasClientAction: false,
			hasClientLoader: false,
			hasClientMiddleware: false,
			hasErrorBoundary: route.ErrorBoundary != null,
			// any need for these?
			module: "build/stub-path-to-module.js",
			clientActionModule: void 0,
			clientLoaderModule: void 0,
			clientMiddlewareModule: void 0,
			hydrateFallbackModule: void 0,
		}
		manifest.routes[newRoute.id] = entryRoute
		routeModules[route.id] = {
			default: newRoute.Component || Outlet,
			ErrorBoundary: newRoute.ErrorBoundary || void 0,
			handle: route.handle,
			links: route.links,
			meta: route.meta,
			shouldRevalidate: route.shouldRevalidate,
		}
		if (route.children) {
			newRoute.children = processRoutes(
				route.children,
				context,
				manifest,
				routeModules,
				newRoute.id,
			)
		}
		return newRoute
	})
}
var encoder = new TextEncoder()
var sign = async (value, secret) => {
	const data2 = encoder.encode(value)
	const key = await createKey2(secret, ["sign"])
	const signature = await crypto.subtle.sign("HMAC", key, data2)
	const hash = btoa(String.fromCharCode(...new Uint8Array(signature))).replace(/=+$/, "")
	return value + "." + hash
}
var unsign = async (cookie, secret) => {
	const index = cookie.lastIndexOf(".")
	const value = cookie.slice(0, index)
	const hash = cookie.slice(index + 1)
	const data2 = encoder.encode(value)
	const key = await createKey2(secret, ["verify"])
	try {
		const signature = byteStringToUint8Array(atob(hash))
		const valid = await crypto.subtle.verify("HMAC", key, signature, data2)
		return valid ? value : false
	} catch (error) {
		return false
	}
}
var createKey2 = async (secret, usages) =>
	crypto.subtle.importKey(
		"raw",
		encoder.encode(secret),
		{ name: "HMAC", hash: "SHA-256" },
		false,
		usages,
	)
function byteStringToUint8Array(byteString) {
	const array = new Uint8Array(byteString.length)
	for (let i = 0; i < byteString.length; i++) {
		array[i] = byteString.charCodeAt(i)
	}
	return array
}
var createCookie = (name, cookieOptions = {}) => {
	const { secrets = [], ...options } = {
		path: "/",
		sameSite: "lax",
		...cookieOptions,
	}
	warnOnceAboutExpiresCookie(name, options.expires)
	return {
		get name() {
			return name
		},
		get isSigned() {
			return secrets.length > 0
		},
		get expires() {
			return typeof options.maxAge !== "undefined"
				? new Date(Date.now() + options.maxAge * 1e3)
				: options.expires
		},
		async parse(cookieHeader, parseOptions) {
			if (!cookieHeader) return null
			const cookies = (0, import_cookie.parse)(cookieHeader, {
				...options,
				...parseOptions,
			})
			if (name in cookies) {
				const value = cookies[name]
				if (typeof value === "string" && value !== "") {
					const decoded = await decodeCookieValue(value, secrets)
					return decoded
				} else {
					return ""
				}
			} else {
				return null
			}
		},
		async serialize(value, serializeOptions) {
			return (0, import_cookie.serialize)(
				name,
				value === "" ? "" : await encodeCookieValue(value, secrets),
				{
					...options,
					...serializeOptions,
				},
			)
		},
	}
}
var isCookie = object => {
	return (
		object != null &&
		typeof object.name === "string" &&
		typeof object.isSigned === "boolean" &&
		typeof object.parse === "function" &&
		typeof object.serialize === "function"
	)
}
async function encodeCookieValue(value, secrets) {
	let encoded = encodeData(value)
	if (secrets.length > 0) {
		encoded = await sign(encoded, secrets[0])
	}
	return encoded
}
async function decodeCookieValue(value, secrets) {
	if (secrets.length > 0) {
		for (const secret of secrets) {
			const unsignedValue = await unsign(value, secret)
			if (unsignedValue !== false) {
				return decodeData(unsignedValue)
			}
		}
		return null
	}
	return decodeData(value)
}
function encodeData(value) {
	return btoa(myUnescape(encodeURIComponent(JSON.stringify(value))))
}
function decodeData(value) {
	try {
		return JSON.parse(decodeURIComponent(myEscape(atob(value))))
	} catch (error) {
		return {}
	}
}
function myEscape(value) {
	const str = value.toString()
	let result = ""
	let index = 0
	let chr, code
	while (index < str.length) {
		chr = str.charAt(index++)
		if (/[\w*+\-./@]/.exec(chr)) {
			result += chr
		} else {
			code = chr.charCodeAt(0)
			if (code < 256) {
				result += "%" + hex(code, 2)
			} else {
				result += "%u" + hex(code, 4).toUpperCase()
			}
		}
	}
	return result
}
function hex(code, length) {
	let result = code.toString(16)
	while (result.length < length) result = "0" + result
	return result
}
function myUnescape(value) {
	const str = value.toString()
	let result = ""
	let index = 0
	let chr, part
	while (index < str.length) {
		chr = str.charAt(index++)
		if (chr === "%") {
			if (str.charAt(index) === "u") {
				part = str.slice(index + 1, index + 5)
				if (/^[\da-f]{4}$/i.exec(part)) {
					result += String.fromCharCode(parseInt(part, 16))
					index += 5
					continue
				}
			} else {
				part = str.slice(index, index + 2)
				if (/^[\da-f]{2}$/i.exec(part)) {
					result += String.fromCharCode(parseInt(part, 16))
					index += 2
					continue
				}
			}
		}
		result += chr
	}
	return result
}
function warnOnceAboutExpiresCookie(name, expires) {
	warnOnce(
		!expires,
		`The "${name}" cookie has an "expires" property set. This will cause the expires value to not be updated when the session is committed. Instead, you should set the expires value when serializing the cookie. You can use \`commitSession(session, { expires })\` if using a session storage object, or \`cookie.serialize("value", { expires })\` if you're using the cookie directly.`,
	)
}
function createEntryRouteModules(manifest) {
	return Object.keys(manifest).reduce((memo2, routeId) => {
		const route = manifest[routeId]
		if (route) {
			memo2[routeId] = route.module
		}
		return memo2
	}, {})
}
var ServerMode = (ServerMode2 => {
	ServerMode2["Development"] = "development"
	ServerMode2["Production"] = "production"
	ServerMode2["Test"] = "test"
	return ServerMode2
})(ServerMode || {})
function isServerMode(value) {
	return value === "development" || value === "production" || value === "test"
}
function sanitizeError(error, serverMode) {
	if (error instanceof Error && serverMode !== "development") {
		const sanitized = new Error("Unexpected Server Error")
		sanitized.stack = void 0
		return sanitized
	}
	return error
}
function sanitizeErrors(errors, serverMode) {
	return Object.entries(errors).reduce((acc, [routeId, error]) => {
		return Object.assign(acc, { [routeId]: sanitizeError(error, serverMode) })
	}, {})
}
function serializeError(error, serverMode) {
	const sanitized = sanitizeError(error, serverMode)
	return {
		message: sanitized.message,
		stack: sanitized.stack,
	}
}
function serializeErrors2(errors, serverMode) {
	if (!errors) return null
	const entries = Object.entries(errors)
	const serialized = {}
	for (const [key, val] of entries) {
		if (isRouteErrorResponse(val)) {
			serialized[key] = { ...val, __type: "RouteErrorResponse" }
		} else if (val instanceof Error) {
			const sanitized = sanitizeError(val, serverMode)
			serialized[key] = {
				message: sanitized.message,
				stack: sanitized.stack,
				__type: "Error",
				// If this is a subclass (i.e., ReferenceError), send up the type so we
				// can re-create the same type during hydration.  This will only apply
				// in dev mode since all production errors are sanitized to normal
				// Error instances
				...(sanitized.name !== "Error"
					? {
							__subType: sanitized.name,
						}
					: {}),
			}
		} else {
			serialized[key] = val
		}
	}
	return serialized
}
function invariant3(value, message) {
	if (value === false || value === null || typeof value === "undefined") {
		console.error(
			"The following error is a bug in React Router; please open an issue! https://github.com/remix-run/react-router/issues/new/choose",
		)
		throw new Error(message)
	}
}
function matchServerRoutes(manifest, dataRoutes, branches, pathname, basename) {
	const matches = matchRoutesImpl(dataRoutes, pathname, basename ?? "/", false, branches)
	if (!matches) return null
	return matches.map(match => {
		const route = manifest[match.route.id]
		invariant3(route, `Route with id "${match.route.id}" not found in manifest.`)
		return {
			params: match.params,
			pathname: match.pathname,
			route,
		}
	})
}
async function callRouteHandler(handler, args, future) {
	const result = await handler({
		request: future.v8_passThroughRequests
			? args.request
			: stripRoutesParam(stripIndexParam2(args.request)),
		url: args.url,
		params: args.params,
		context: args.context,
		pattern: args.pattern,
	})
	if (
		isDataWithResponseInit(result) &&
		result.init &&
		result.init.status &&
		isRedirectStatusCode(result.init.status)
	) {
		throw new Response(null, result.init)
	}
	return result
}
function stripIndexParam2(request) {
	const url = new URL(request.url)
	const indexValues = url.searchParams.getAll("index")
	url.searchParams.delete("index")
	const indexValuesToKeep = []
	for (const indexValue of indexValues) {
		if (indexValue) {
			indexValuesToKeep.push(indexValue)
		}
	}
	for (const toKeep of indexValuesToKeep) {
		url.searchParams.append("index", toKeep)
	}
	const init = {
		method: request.method,
		body: request.body,
		headers: request.headers,
		signal: request.signal,
	}
	if (init.body) {
		init.duplex = "half"
	}
	return new Request(url.href, init)
}
function stripRoutesParam(request) {
	const url = new URL(request.url)
	url.searchParams.delete("_routes")
	const init = {
		method: request.method,
		body: request.body,
		headers: request.headers,
		signal: request.signal,
	}
	if (init.body) {
		init.duplex = "half"
	}
	return new Request(url.href, init)
}
var globalDevServerHooksKey = "__reactRouterDevServerHooks"
function setDevServerHooks(devServerHooks) {
	globalThis[globalDevServerHooksKey] = devServerHooks
}
function getDevServerHooks() {
	return globalThis[globalDevServerHooksKey]
}
function getBuildTimeHeader(request, headerName) {
	if (typeof process !== "undefined") {
		try {
			if (
				Object.hasOwn(process.env, "IS_RR_BUILD_REQUEST") &&
				process.env.IS_RR_BUILD_REQUEST === "yes"
			) {
				return request.headers.get(headerName)
			}
		} catch (e) {}
	}
	return null
}
function groupRoutesByParentId2(manifest) {
	const routes = {}
	Object.values(manifest).forEach(route => {
		if (route) {
			const parentId = route.parentId || ""
			if (!routes[parentId]) {
				routes[parentId] = []
			}
			routes[parentId].push(route)
		}
	})
	return routes
}
function createStaticHandlerDataRoutes(
	manifest,
	future,
	parentId = "",
	routesByParentId = groupRoutesByParentId2(manifest),
) {
	return (routesByParentId[parentId] || []).map(route => {
		const commonRoute = {
			// Always include root due to default boundaries
			hasErrorBoundary: route.id === "root" || route.module.ErrorBoundary != null,
			id: route.id,
			path: route.path,
			middleware: route.module.middleware,
			// Need to use RR's version in the param typed here to permit the optional
			// context even though we know it'll always be provided in remix
			loader: route.module.loader
				? async args => {
						const preRenderedData = getBuildTimeHeader(
							args.request,
							"X-React-Router-Prerender-Data",
						)
						if (preRenderedData != null) {
							const encoded = preRenderedData ? decodeURI(preRenderedData) : preRenderedData
							invariant3(encoded, "Missing prerendered data for route")
							const uint8array = new TextEncoder().encode(encoded)
							const stream = new ReadableStream({
								start(controller) {
									controller.enqueue(uint8array)
									controller.close()
								},
							})
							const decoded = await decodeViaTurboStream(stream, global)
							const data2 = decoded.value
							if (data2 && SingleFetchRedirectSymbol in data2) {
								const result = data2[SingleFetchRedirectSymbol]
								const init = { status: result.status }
								if (result.reload) {
									throw redirectDocument(result.redirect, init)
								} else if (result.replace) {
									throw replace(result.redirect, init)
								} else {
									throw redirect(result.redirect, init)
								}
							} else {
								invariant3(data2 && route.id in data2, "Unable to decode prerendered data")
								const result = data2[route.id]
								invariant3("data" in result, "Unable to process prerendered data")
								return result.data
							}
						}
						const val = await callRouteHandler(route.module.loader, args, future)
						return val
					}
				: void 0,
			action: route.module.action
				? args => callRouteHandler(route.module.action, args, future)
				: void 0,
			handle: route.module.handle,
		}
		return route.index
			? {
					index: true,
					...commonRoute,
				}
			: {
					caseSensitive: route.caseSensitive,
					children: createStaticHandlerDataRoutes(manifest, future, route.id, routesByParentId),
					...commonRoute,
				}
	})
}
function createServerHandoffString(serverHandoff) {
	return escapeHtml(JSON.stringify(serverHandoff))
}
function getDocumentHeaders(context, build) {
	return getDocumentHeadersImpl(context, m => {
		const route = build.routes[m.route.id]
		invariant3(route, `Route with id "${m.route.id}" not found in build`)
		return route.module.headers
	})
}
function getDocumentHeadersImpl(context, getRouteHeadersFn, _defaultHeaders) {
	const boundaryIdx = context.errors
		? context.matches.findIndex(m => context.errors[m.route.id])
		: -1
	const matches = boundaryIdx >= 0 ? context.matches.slice(0, boundaryIdx + 1) : context.matches
	let errorHeaders
	if (boundaryIdx >= 0) {
		const { actionHeaders, actionData, loaderHeaders, loaderData } = context
		context.matches.slice(boundaryIdx).some(match => {
			const id = match.route.id
			if (actionHeaders[id] && (!actionData || !Object.hasOwn(actionData, id))) {
				errorHeaders = actionHeaders[id]
			} else if (loaderHeaders[id] && !Object.hasOwn(loaderData, id)) {
				errorHeaders = loaderHeaders[id]
			}
			return errorHeaders != null
		})
	}
	const defaultHeaders = new Headers(_defaultHeaders)
	return matches.reduce((parentHeaders, match, idx) => {
		const { id } = match.route
		const loaderHeaders = context.loaderHeaders[id] || new Headers()
		const actionHeaders = context.actionHeaders[id] || new Headers()
		const includeErrorHeaders = errorHeaders != null && idx === matches.length - 1
		const includeErrorCookies =
			includeErrorHeaders && errorHeaders !== loaderHeaders && errorHeaders !== actionHeaders
		const headersFn = getRouteHeadersFn(match)
		if (headersFn == null) {
			const headers2 = new Headers(parentHeaders)
			if (includeErrorCookies) {
				prependCookies(errorHeaders, headers2)
			}
			prependCookies(actionHeaders, headers2)
			prependCookies(loaderHeaders, headers2)
			return headers2
		}
		const headers = new Headers(
			typeof headersFn === "function"
				? headersFn({
						loaderHeaders,
						parentHeaders,
						actionHeaders,
						errorHeaders: includeErrorHeaders ? errorHeaders : void 0,
					})
				: headersFn,
		)
		if (includeErrorCookies) {
			prependCookies(errorHeaders, headers)
		}
		prependCookies(actionHeaders, headers)
		prependCookies(loaderHeaders, headers)
		prependCookies(parentHeaders, headers)
		return headers
	}, new Headers(defaultHeaders))
}
function prependCookies(parentHeaders, childHeaders) {
	const parentSetCookieString = parentHeaders.get("Set-Cookie")
	if (parentSetCookieString) {
		const cookies = (0, import_set_cookie_parser.splitCookiesString)(parentSetCookieString)
		const childCookies = new Set(childHeaders.getSetCookie())
		cookies.forEach(cookie => {
			if (!childCookies.has(cookie)) {
				childHeaders.append("Set-Cookie", cookie)
			}
		})
	}
}
function throwIfPotentialCSRFAttack(headers, allowedActionOrigins) {
	const originHeader = headers.get("origin")
	let originDomain = null
	try {
		originDomain =
			typeof originHeader === "string" && originHeader !== "null"
				? new URL(originHeader).host
				: originHeader
	} catch {
		throw new Error(`\`origin\` header is not a valid URL. Aborting the action.`)
	}
	const host = parseHostHeader(headers)
	if (originDomain && (!host || originDomain !== host.value)) {
		if (!isAllowedOrigin(originDomain, allowedActionOrigins)) {
			if (host) {
				throw new Error(
					`${host.type} header does not match \`origin\` header from a forwarded action request. Aborting the action.`,
				)
			} else {
				throw new Error(
					"`x-forwarded-host` or `host` headers are not provided. One of these is needed to compare the `origin` header from a forwarded action request. Aborting the action.",
				)
			}
		}
	}
}
function matchWildcardDomain(domain, pattern) {
	const domainParts = domain.split(".")
	const patternParts = pattern.split(".")
	if (patternParts.length < 1) {
		return false
	}
	if (domainParts.length < patternParts.length) {
		return false
	}
	while (patternParts.length) {
		const patternPart = patternParts.pop()
		const domainPart = domainParts.pop()
		switch (patternPart) {
			case "": {
				return false
			}
			case "*": {
				if (domainPart) {
					continue
				} else {
					return false
				}
			}
			case "**": {
				if (patternParts.length > 0) {
					return false
				}
				return domainPart !== void 0
			}
			case void 0:
			default: {
				if (domainPart !== patternPart) {
					return false
				}
			}
		}
	}
	return domainParts.length === 0
}
function isAllowedOrigin(originDomain, allowedActionOrigins = []) {
	return allowedActionOrigins.some(
		allowedOrigin =>
			allowedOrigin &&
			(allowedOrigin === originDomain || matchWildcardDomain(originDomain, allowedOrigin)),
	)
}
function parseHostHeader(headers) {
	var _a
	const forwardedHostHeader = headers.get("x-forwarded-host")
	const forwardedHostValue =
		(_a = forwardedHostHeader == null ? void 0 : forwardedHostHeader.split(",")[0]) == null
			? void 0
			: _a.trim()
	const hostHeader = headers.get("host")
	return forwardedHostValue
		? {
				type: "x-forwarded-host",
				value: forwardedHostValue,
			}
		: hostHeader
			? {
					type: "host",
					value: hostHeader,
				}
			: void 0
}
function getNormalizedPath(request, basename, future) {
	basename = basename || "/"
	const url = new URL(request.url)
	let pathname = url.pathname
	if (future == null ? void 0 : future.unstable_trailingSlashAwareDataRequests) {
		if (pathname.endsWith("/_.data")) {
			pathname = pathname.replace(/_\.data$/, "")
		} else {
			pathname = pathname.replace(/\.data$/, "")
		}
	} else {
		if (stripBasename(pathname, basename) === "/_root.data") {
			pathname = basename
		} else if (pathname.endsWith(".data")) {
			pathname = pathname.replace(/\.data$/, "")
		}
		if (stripBasename(pathname, basename) !== "/" && pathname.endsWith("/")) {
			pathname = pathname.slice(0, -1)
		}
	}
	const searchParams = new URLSearchParams(url.search)
	searchParams.delete("_routes")
	let search = searchParams.toString()
	if (search) {
		search = `?${search}`
	}
	return {
		pathname,
		search,
		// No hashes on the server
		hash: "",
	}
}
var SERVER_NO_BODY_STATUS_CODES = /* @__PURE__ */ new Set([...NO_BODY_STATUS_CODES, 304])
async function singleFetchAction(
	build,
	serverMode,
	staticHandler,
	request,
	handlerUrl,
	loadContext,
	handleError,
) {
	try {
		try {
			throwIfPotentialCSRFAttack(
				request.headers,
				Array.isArray(build.allowedActionOrigins) ? build.allowedActionOrigins : [],
			)
		} catch (e) {
			return handleQueryError(new Error("Bad Request"), 400)
		}
		const handlerRequest = build.future.v8_passThroughRequests
			? request
			: new Request(handlerUrl, {
					method: request.method,
					body: request.body,
					headers: request.headers,
					signal: request.signal,
					...(request.body ? { duplex: "half" } : void 0),
				})
		const result = await staticHandler.query(handlerRequest, {
			requestContext: loadContext,
			skipLoaderErrorBubbling: true,
			skipRevalidation: true,
			generateMiddlewareResponse: build.future.v8_middleware
				? async query => {
						try {
							const innerResult = await query(handlerRequest)
							return handleQueryResult(innerResult)
						} catch (error) {
							return handleQueryError(error)
						}
					}
				: void 0,
			normalizePath: r => getNormalizedPath(r, build.basename, build.future),
		})
		return handleQueryResult(result)
	} catch (error) {
		return handleQueryError(error)
	}
	function handleQueryResult(result) {
		return isResponse(result) ? result : staticContextToResponse(result)
	}
	function handleQueryError(error, status = 500) {
		handleError(error)
		return generateSingleFetchResponse(request, build, serverMode, {
			result: { error },
			headers: new Headers(),
			status,
		})
	}
	function staticContextToResponse(context) {
		const headers = getDocumentHeaders(context, build)
		if (isRedirectStatusCode(context.statusCode) && headers.has("Location")) {
			return new Response(null, { status: context.statusCode, headers })
		}
		if (context.errors) {
			Object.values(context.errors).forEach(err => {
				if (!isRouteErrorResponse(err) || err.error) {
					handleError(err)
				}
			})
			context.errors = sanitizeErrors(context.errors, serverMode)
		}
		let singleFetchResult
		if (context.errors) {
			singleFetchResult = { error: Object.values(context.errors)[0] }
		} else {
			singleFetchResult = {
				data: Object.values(context.actionData || {})[0],
			}
		}
		return generateSingleFetchResponse(request, build, serverMode, {
			result: singleFetchResult,
			headers,
			status: context.statusCode,
		})
	}
}
async function singleFetchLoaders(
	build,
	serverMode,
	staticHandler,
	request,
	handlerUrl,
	loadContext,
	handleError,
) {
	const routesParam = new URL(request.url).searchParams.get("_routes")
	const loadRouteIds = routesParam ? new Set(routesParam.split(",")) : null
	try {
		const handlerRequest = build.future.v8_passThroughRequests
			? request
			: new Request(handlerUrl, {
					headers: request.headers,
					signal: request.signal,
				})
		const result = await staticHandler.query(handlerRequest, {
			requestContext: loadContext,
			filterMatchesToLoad: m => !loadRouteIds || loadRouteIds.has(m.route.id),
			skipLoaderErrorBubbling: true,
			generateMiddlewareResponse: build.future.v8_middleware
				? async query => {
						try {
							const innerResult = await query(handlerRequest)
							return handleQueryResult(innerResult)
						} catch (error) {
							return handleQueryError(error)
						}
					}
				: void 0,
			normalizePath: r => getNormalizedPath(r, build.basename, build.future),
		})
		return handleQueryResult(result)
	} catch (error) {
		return handleQueryError(error)
	}
	function handleQueryResult(result) {
		return isResponse(result) ? result : staticContextToResponse(result)
	}
	function handleQueryError(error) {
		handleError(error)
		return generateSingleFetchResponse(request, build, serverMode, {
			result: { error },
			headers: new Headers(),
			status: 500,
		})
	}
	function staticContextToResponse(context) {
		const headers = getDocumentHeaders(context, build)
		if (isRedirectStatusCode(context.statusCode) && headers.has("Location")) {
			return new Response(null, { status: context.statusCode, headers })
		}
		if (context.errors) {
			Object.values(context.errors).forEach(err => {
				if (!isRouteErrorResponse(err) || err.error) {
					handleError(err)
				}
			})
			context.errors = sanitizeErrors(context.errors, serverMode)
		}
		const results = {}
		const loadedMatches = new Set(
			context.matches
				.filter(m => (loadRouteIds ? loadRouteIds.has(m.route.id) : m.route.loader != null))
				.map(m => m.route.id),
		)
		if (context.errors) {
			for (const [id, error] of Object.entries(context.errors)) {
				results[id] = { error }
			}
		}
		for (const [id, data2] of Object.entries(context.loaderData)) {
			if (!(id in results) && loadedMatches.has(id)) {
				results[id] = { data: data2 }
			}
		}
		return generateSingleFetchResponse(request, build, serverMode, {
			result: results,
			headers,
			status: context.statusCode,
		})
	}
}
function generateSingleFetchResponse(request, build, serverMode, { result, headers, status }) {
	const resultHeaders = new Headers(headers)
	resultHeaders.set("X-Remix-Response", "yes")
	if (SERVER_NO_BODY_STATUS_CODES.has(status)) {
		return new Response(null, { status, headers: resultHeaders })
	}
	resultHeaders.set("Content-Type", "text/x-script")
	resultHeaders.delete("Content-Length")
	return new Response(
		encodeViaTurboStream(result, request.signal, build.entry.module.streamTimeout, serverMode),
		{
			status: status || 200,
			headers: resultHeaders,
		},
	)
}
function generateSingleFetchRedirectResponse(redirectResponse, request, build, serverMode) {
	const redirect2 = getSingleFetchRedirect(
		redirectResponse.status,
		redirectResponse.headers,
		build.basename,
	)
	const headers = new Headers(redirectResponse.headers)
	headers.delete("Location")
	headers.set("Content-Type", "text/x-script")
	return generateSingleFetchResponse(request, build, serverMode, {
		result: request.method === "GET" ? { [SingleFetchRedirectSymbol]: redirect2 } : redirect2,
		headers,
		status: SINGLE_FETCH_REDIRECT_STATUS,
	})
}
function getSingleFetchRedirect(status, headers, basename) {
	let redirect2 = headers.get("Location")
	if (basename) {
		redirect2 = stripBasename(redirect2, basename) || redirect2
	}
	return {
		redirect: redirect2,
		status,
		revalidate:
			// Technically X-Remix-Revalidate isn't needed here - that was an implementation
			// detail of ?_data requests as our way to tell the front end to revalidate when
			// we didn't have a response body to include that information in.
			// With single fetch, we tell the front end via this revalidate boolean field.
			// However, we're respecting it for now because it may be something folks have
			// used in their own responses
			// TODO(v3): Consider removing or making this official public API
			headers.has("X-Remix-Revalidate") || headers.has("Set-Cookie"),
		reload: headers.has("X-Remix-Reload-Document"),
		replace: headers.has("X-Remix-Replace"),
	}
}
function encodeViaTurboStream(data2, requestSignal, streamTimeout, serverMode) {
	const controller = new AbortController()
	const timeoutId = setTimeout(
		() => {
			controller.abort(new Error("Server Timeout"))
			cleanupCallbacks()
		},
		typeof streamTimeout === "number" ? streamTimeout : 4950,
	)
	const abortControllerOnRequestAbort = () => {
		controller.abort(requestSignal.reason)
		cleanupCallbacks()
	}
	requestSignal.addEventListener("abort", abortControllerOnRequestAbort)
	const cleanupCallbacks = () => {
		clearTimeout(timeoutId)
		requestSignal.removeEventListener("abort", abortControllerOnRequestAbort)
	}
	return encode(data2, {
		signal: controller.signal,
		onComplete: cleanupCallbacks,
		plugins: [
			value => {
				if (value instanceof Error) {
					const { name, message, stack } =
						serverMode === "production" ? sanitizeError(value, serverMode) : value
					return ["SanitizedError", name, message, stack]
				}
				if (value instanceof ErrorResponseImpl) {
					const { data: data3, status, statusText } = value
					return ["ErrorResponse", data3, status, statusText]
				}
				if (value && typeof value === "object" && SingleFetchRedirectSymbol in value) {
					return ["SingleFetchRedirect", value[SingleFetchRedirectSymbol]]
				}
			},
		],
		postPlugins: [
			value => {
				if (!value) return
				if (typeof value !== "object") return
				return ["SingleFetchClassInstance", Object.fromEntries(Object.entries(value))]
			},
			() => ["SingleFetchFallback"],
		],
	})
}
function derive(build, mode) {
	const dataRoutes = createStaticHandlerDataRoutes(build.routes, build.future)
	const serverMode = isServerMode(mode) ? mode : "production"
	const staticHandler = createStaticHandler(dataRoutes, {
		basename: build.basename,
		instrumentations: build.entry.module.instrumentations,
		future: build.future,
	})
	const errorHandler =
		build.entry.module.handleError ||
		((error, { request }) => {
			if (serverMode !== "test" && !request.signal.aborted) {
				console.error(
					// @ts-expect-error This is "private" from users but intended for internal use
					isRouteErrorResponse(error) && error.error ? error.error : error,
				)
			}
		})
	let requestHandler = async (request, initialContext) => {
		var _a, _b, _c
		const params = {}
		let loadContext
		const handleError = error => {
			var _a2, _b2
			if (mode === "development") {
				;(_b2 = (_a2 = getDevServerHooks()) == null ? void 0 : _a2.processRequestError) == null
					? void 0
					: _b2.call(_a2, error)
			}
			errorHandler(error, {
				context: loadContext,
				params,
				request,
			})
		}
		if (build.future.v8_middleware) {
			if (initialContext && !(initialContext instanceof RouterContextProvider)) {
				const error = new Error(
					"Invalid `context` value provided to `handleRequest`. When middleware is enabled you must return an instance of `RouterContextProvider` from your `getLoadContext` function.",
				)
				handleError(error)
				return returnLastResortErrorResponse(error, serverMode)
			}
			loadContext = initialContext || new RouterContextProvider()
		} else {
			loadContext = initialContext || {}
		}
		const requestUrl = new URL(request.url)
		const normalizedPathname = getNormalizedPath(request, build.basename, build.future).pathname
		let isSpaMode = getBuildTimeHeader(request, "X-React-Router-SPA-Mode") === "yes"
		if (!build.ssr) {
			let decodedPath = decodeURI(normalizedPathname)
			if (build.basename && build.basename !== "/") {
				const strippedPath = stripBasename(decodedPath, build.basename)
				if (strippedPath == null) {
					errorHandler(
						new ErrorResponseImpl(
							404,
							"Not Found",
							`Refusing to prerender the \`${decodedPath}\` path because it does not start with the basename \`${build.basename}\``,
						),
						{
							context: loadContext,
							params,
							request,
						},
					)
					return new Response("Not Found", {
						status: 404,
						statusText: "Not Found",
					})
				}
				decodedPath = strippedPath
			}
			if (build.prerender.length === 0) {
				isSpaMode = true
			} else if (
				!build.prerender.includes(decodedPath) &&
				!build.prerender.includes(decodedPath + "/")
			) {
				if (requestUrl.pathname.endsWith(".data")) {
					errorHandler(
						new ErrorResponseImpl(
							404,
							"Not Found",
							`Refusing to SSR the path \`${decodedPath}\` because \`ssr:false\` is set and the path is not included in the \`prerender\` config, so in production the path will be a 404.`,
						),
						{
							context: loadContext,
							params,
							request,
						},
					)
					return new Response("Not Found", {
						status: 404,
						statusText: "Not Found",
					})
				} else {
					isSpaMode = true
				}
			}
		}
		const manifestUrl = getManifestPath(build.routeDiscovery.manifestPath, build.basename)
		if (requestUrl.pathname === manifestUrl) {
			try {
				const res = await handleManifestRequest(
					build,
					staticHandler.dataRoutes,
					staticHandler._internalRouteBranches,
					requestUrl,
				)
				return res
			} catch (e) {
				handleError(e)
				return new Response("Unknown Server Error", { status: 500 })
			}
		}
		const matches = matchServerRoutes(
			build.routes,
			staticHandler.dataRoutes,
			staticHandler._internalRouteBranches,
			normalizedPathname,
			build.basename,
		)
		if (matches && matches.length > 0) {
			Object.assign(params, matches[0].params)
		}
		let response
		if (requestUrl.pathname.endsWith(".data")) {
			response = await handleSingleFetchRequest(
				serverMode,
				build,
				staticHandler,
				request,
				normalizedPathname,
				loadContext,
				handleError,
			)
			if (isRedirectResponse(response)) {
				response = generateSingleFetchRedirectResponse(response, request, build, serverMode)
			}
			if (build.entry.module.handleDataRequest) {
				response = await build.entry.module.handleDataRequest(response, {
					context: loadContext,
					params: matches ? matches[0].params : {},
					request,
				})
				if (isRedirectResponse(response)) {
					response = generateSingleFetchRedirectResponse(response, request, build, serverMode)
				}
			}
		} else if (
			!isSpaMode &&
			matches &&
			matches[matches.length - 1].route.module.default == null &&
			matches[matches.length - 1].route.module.ErrorBoundary == null
		) {
			response = await handleResourceRequest(
				serverMode,
				build,
				staticHandler,
				matches.slice(-1)[0].route.id,
				request,
				loadContext,
				handleError,
			)
		} else {
			const { pathname } = requestUrl
			let criticalCss = void 0
			if (build.unstable_getCriticalCss) {
				criticalCss = await build.unstable_getCriticalCss({ pathname })
			} else if (
				mode === "development" &&
				((_a = getDevServerHooks()) == null ? void 0 : _a.getCriticalCss)
			) {
				criticalCss = await ((_c =
					(_b = getDevServerHooks()) == null ? void 0 : _b.getCriticalCss) == null
					? void 0
					: _c.call(_b, pathname))
			}
			response = await handleDocumentRequest(
				serverMode,
				build,
				staticHandler,
				request,
				loadContext,
				handleError,
				isSpaMode,
				criticalCss,
			)
		}
		if (request.method === "HEAD") {
			return new Response(null, {
				headers: response.headers,
				status: response.status,
				statusText: response.statusText,
			})
		}
		return response
	}
	if (build.entry.module.instrumentations) {
		requestHandler = instrumentHandler(
			requestHandler,
			build.entry.module.instrumentations.map(i => i.handler).filter(Boolean),
		)
	}
	return {
		serverMode,
		staticHandler,
		errorHandler,
		requestHandler,
	}
}
var createRequestHandler = (build, mode) => {
	let _build
	let serverMode
	let staticHandler
	let errorHandler
	let _requestHandler
	return async function requestHandler(request, initialContext) {
		_build = typeof build === "function" ? await build() : build
		if (typeof build === "function") {
			const derived = derive(_build, mode)
			serverMode = derived.serverMode
			staticHandler = derived.staticHandler
			errorHandler = derived.errorHandler
			_requestHandler = derived.requestHandler
		} else if (!serverMode || !staticHandler || !errorHandler || !_requestHandler) {
			const derived = derive(_build, mode)
			serverMode = derived.serverMode
			staticHandler = derived.staticHandler
			errorHandler = derived.errorHandler
			_requestHandler = derived.requestHandler
		}
		return _requestHandler(request, initialContext)
	}
}
async function handleManifestRequest(build, dataRoutes, branches, url) {
	if (build.assets.version !== url.searchParams.get("version")) {
		return new Response(null, {
			status: 204,
			headers: {
				"X-Remix-Reload-Document": "true",
			},
		})
	}
	if (url.toString().length > URL_LIMIT) {
		return new Response(null, {
			statusText: "Bad Request",
			status: 400,
		})
	}
	const patches = {}
	if (url.searchParams.has("paths")) {
		const paths = /* @__PURE__ */ new Set()
		const pathParam = url.searchParams.get("paths") || ""
		const requestedPaths = pathParam.split(",").filter(Boolean)
		requestedPaths.forEach(path => {
			if (!path.startsWith("/")) {
				path = `/${path}`
			}
			const segments = path.split("/").slice(1)
			segments.forEach((_, i) => {
				const partialPath = segments.slice(0, i + 1).join("/")
				paths.add(`/${partialPath}`)
			})
		})
		for (const path of paths) {
			const matches = matchServerRoutes(build.routes, dataRoutes, branches, path, build.basename)
			if (matches) {
				for (const match of matches) {
					const routeId = match.route.id
					const route = build.assets.routes[routeId]
					if (route) {
						patches[routeId] = route
					}
				}
			}
		}
		return Response.json(patches, {
			headers: {
				"Cache-Control": "public, max-age=31536000, immutable",
			},
		})
	}
	return new Response("Invalid Request", { status: 400 })
}
async function handleSingleFetchRequest(
	serverMode,
	build,
	staticHandler,
	request,
	normalizedPath,
	loadContext,
	handleError,
) {
	const handlerUrl = new URL(request.url)
	handlerUrl.pathname = normalizedPath
	const response =
		request.method !== "GET"
			? await singleFetchAction(
					build,
					serverMode,
					staticHandler,
					request,
					handlerUrl,
					loadContext,
					handleError,
				)
			: await singleFetchLoaders(
					build,
					serverMode,
					staticHandler,
					request,
					handlerUrl,
					loadContext,
					handleError,
				)
	return response
}
async function handleDocumentRequest(
	serverMode,
	build,
	staticHandler,
	request,
	loadContext,
	handleError,
	isSpaMode,
	criticalCss,
) {
	try {
		if (request.method === "POST") {
			try {
				throwIfPotentialCSRFAttack(
					request.headers,
					Array.isArray(build.allowedActionOrigins) ? build.allowedActionOrigins : [],
				)
			} catch (e) {
				handleError(e)
				return new Response("Bad Request", { status: 400 })
			}
		}
		let result = await staticHandler.query(request, {
			requestContext: loadContext,
			generateMiddlewareResponse: build.future.v8_middleware
				? async query => {
						try {
							let innerResult = await query(request)
							if (!isResponse(innerResult)) {
								innerResult = await renderHtml(innerResult, isSpaMode)
							}
							return innerResult
						} catch (error) {
							handleError(error)
							return new Response(null, { status: 500 })
						}
					}
				: void 0,
			normalizePath: r => getNormalizedPath(r, build.basename, build.future),
		})
		if (!isResponse(result)) {
			result = await renderHtml(result, isSpaMode)
		}
		return result
	} catch (error) {
		handleError(error)
		return new Response(null, { status: 500 })
	}
	async function renderHtml(context, isSpaMode2) {
		const headers = getDocumentHeaders(context, build)
		if (SERVER_NO_BODY_STATUS_CODES.has(context.statusCode)) {
			return new Response(null, { status: context.statusCode, headers })
		}
		if (context.errors) {
			Object.values(context.errors).forEach(err => {
				if (!isRouteErrorResponse(err) || err.error) {
					handleError(err)
				}
			})
			context.errors = sanitizeErrors(context.errors, serverMode)
		}
		const state = {
			loaderData: context.loaderData,
			actionData: context.actionData,
			errors: serializeErrors2(context.errors, serverMode),
		}
		const baseServerHandoff = {
			basename: build.basename,
			future: build.future,
			routeDiscovery: build.routeDiscovery,
			ssr: build.ssr,
			isSpaMode: isSpaMode2,
		}
		let entryContext = {
			manifest: build.assets,
			branches: staticHandler._internalRouteBranches,
			routeModules: createEntryRouteModules(build.routes),
			staticHandlerContext: context,
			criticalCss,
			serverHandoffString: createServerHandoffString({
				...baseServerHandoff,
				criticalCss,
			}),
			serverHandoffStream: encodeViaTurboStream(
				state,
				request.signal,
				build.entry.module.streamTimeout,
				serverMode,
			),
			renderMeta: {},
			future: build.future,
			ssr: build.ssr,
			routeDiscovery: build.routeDiscovery,
			isSpaMode: isSpaMode2,
			serializeError: err => serializeError(err, serverMode),
		}
		const handleDocumentRequestFunction = build.entry.module.default
		try {
			return await handleDocumentRequestFunction(
				request,
				context.statusCode,
				headers,
				entryContext,
				loadContext,
			)
		} catch (error) {
			handleError(error)
			let errorForSecondRender = error
			if (isResponse(error)) {
				try {
					const data2 = await unwrapResponse(error)
					errorForSecondRender = new ErrorResponseImpl(error.status, error.statusText, data2)
				} catch (e) {}
			}
			context = getStaticContextFromError(staticHandler.dataRoutes, context, errorForSecondRender)
			if (context.errors) {
				context.errors = sanitizeErrors(context.errors, serverMode)
			}
			const state2 = {
				loaderData: context.loaderData,
				actionData: context.actionData,
				errors: serializeErrors2(context.errors, serverMode),
			}
			entryContext = {
				...entryContext,
				staticHandlerContext: context,
				serverHandoffString: createServerHandoffString(baseServerHandoff),
				serverHandoffStream: encodeViaTurboStream(
					state2,
					request.signal,
					build.entry.module.streamTimeout,
					serverMode,
				),
				renderMeta: {},
			}
			try {
				return await handleDocumentRequestFunction(
					request,
					context.statusCode,
					headers,
					entryContext,
					loadContext,
				)
			} catch (error2) {
				handleError(error2)
				return returnLastResortErrorResponse(error2, serverMode)
			}
		}
	}
}
async function handleResourceRequest(
	serverMode,
	build,
	staticHandler,
	routeId,
	request,
	loadContext,
	handleError,
) {
	try {
		const result = await staticHandler.queryRoute(request, {
			routeId,
			requestContext: loadContext,
			generateMiddlewareResponse: build.future.v8_middleware
				? async queryRoute => {
						try {
							const innerResult = await queryRoute(request)
							return handleQueryRouteResult(innerResult)
						} catch (error) {
							return handleQueryRouteError(error)
						}
					}
				: void 0,
			normalizePath: r => getNormalizedPath(r, build.basename, build.future),
		})
		return handleQueryRouteResult(result)
	} catch (error) {
		return handleQueryRouteError(error)
	}
	function handleQueryRouteResult(result) {
		if (isResponse(result)) {
			return result
		}
		if (typeof result === "string") {
			return new Response(result)
		}
		return Response.json(result)
	}
	function handleQueryRouteError(error) {
		if (isResponse(error)) {
			return error
		}
		if (isRouteErrorResponse(error)) {
			handleError(error)
			return errorResponseToJson(error, serverMode)
		}
		if (error instanceof Error && error.message === "Expected a response from queryRoute") {
			const newError = new Error("Expected a Response to be returned from resource route handler")
			handleError(newError)
			return returnLastResortErrorResponse(newError, serverMode)
		}
		handleError(error)
		return returnLastResortErrorResponse(error, serverMode)
	}
}
function errorResponseToJson(errorResponse, serverMode) {
	return Response.json(
		serializeError(
			// @ts-expect-error This is "private" from users but intended for internal use
			errorResponse.error || new Error("Unexpected Server Error"),
			serverMode,
		),
		{
			status: errorResponse.status,
			statusText: errorResponse.statusText,
		},
	)
}
function returnLastResortErrorResponse(error, serverMode) {
	let message = "Unexpected Server Error"
	if (serverMode !== "production") {
		message += `

${String(error)}`
	}
	return new Response(message, {
		status: 500,
		headers: {
			"Content-Type": "text/plain",
		},
	})
}
function unwrapResponse(response) {
	const contentType = response.headers.get("Content-Type")
	return contentType && /\bapplication\/json\b/.test(contentType)
		? response.body == null
			? null
			: response.json()
		: response.text()
}
function flash(name) {
	return `__flash_${name}__`
}
var createSession = (initialData = {}, id = "") => {
	const map = new Map(Object.entries(initialData))
	return {
		get id() {
			return id
		},
		get data() {
			return Object.fromEntries(map)
		},
		has(name) {
			return map.has(name) || map.has(flash(name))
		},
		get(name) {
			if (map.has(name)) return map.get(name)
			const flashName = flash(name)
			if (map.has(flashName)) {
				const value = map.get(flashName)
				map.delete(flashName)
				return value
			}
			return void 0
		},
		set(name, value) {
			map.set(name, value)
		},
		flash(name, value) {
			map.set(flash(name), value)
		},
		unset(name) {
			map.delete(name)
		},
	}
}
var isSession = object => {
	return (
		object != null &&
		typeof object.id === "string" &&
		typeof object.data !== "undefined" &&
		typeof object.has === "function" &&
		typeof object.get === "function" &&
		typeof object.set === "function" &&
		typeof object.flash === "function" &&
		typeof object.unset === "function"
	)
}
function createSessionStorage({ cookie: cookieArg, createData, readData, updateData, deleteData }) {
	const cookie = isCookie(cookieArg)
		? cookieArg
		: createCookie((cookieArg == null ? void 0 : cookieArg.name) || "__session", cookieArg)
	warnOnceAboutSigningSessionCookie(cookie)
	return {
		async getSession(cookieHeader, options) {
			const id = cookieHeader && (await cookie.parse(cookieHeader, options))
			const data2 = id && (await readData(id))
			return createSession(data2 || {}, id || "")
		},
		async commitSession(session, options) {
			let { id, data: data2 } = session
			const expires =
				(options == null ? void 0 : options.maxAge) != null
					? new Date(Date.now() + options.maxAge * 1e3)
					: (options == null ? void 0 : options.expires) != null
						? options.expires
						: cookie.expires
			if (id) {
				await updateData(id, data2, expires)
			} else {
				id = await createData(data2, expires)
			}
			return cookie.serialize(id, options)
		},
		async destroySession(session, options) {
			await deleteData(session.id)
			return cookie.serialize("", {
				...options,
				maxAge: void 0,
				expires: /* @__PURE__ */ new Date(0),
			})
		},
	}
}
function warnOnceAboutSigningSessionCookie(cookie) {
	warnOnce(
		cookie.isSigned,
		`The "${cookie.name}" cookie is not signed, but session cookies should be signed to prevent tampering on the client before they are sent back to the server. See https://reactrouter.com/explanation/sessions-and-cookies#signing-cookies for more information.`,
	)
}
function createCookieSessionStorage({ cookie: cookieArg } = {}) {
	const cookie = isCookie(cookieArg)
		? cookieArg
		: createCookie((cookieArg == null ? void 0 : cookieArg.name) || "__session", cookieArg)
	warnOnceAboutSigningSessionCookie(cookie)
	return {
		async getSession(cookieHeader, options) {
			return createSession((cookieHeader && (await cookie.parse(cookieHeader, options))) || {})
		},
		async commitSession(session, options) {
			const serializedCookie = await cookie.serialize(session.data, options)
			if (serializedCookie.length > 4096) {
				throw new Error(
					"Cookie length will exceed browser maximum. Length: " + serializedCookie.length,
				)
			}
			return serializedCookie
		},
		async destroySession(_session, options) {
			return cookie.serialize("", {
				...options,
				maxAge: void 0,
				expires: /* @__PURE__ */ new Date(0),
			})
		},
	}
}
function createMemorySessionStorage({ cookie } = {}) {
	const map = /* @__PURE__ */ new Map()
	return createSessionStorage({
		cookie,
		async createData(data2, expires) {
			const id = Math.random().toString(36).substring(2, 10)
			map.set(id, { data: data2, expires })
			return id
		},
		async readData(id) {
			if (map.has(id)) {
				const { data: data2, expires } = map.get(id)
				if (!expires || expires > /* @__PURE__ */ new Date()) {
					return data2
				}
				if (expires) map.delete(id)
			}
			return null
		},
		async updateData(id, data2, expires) {
			map.set(id, { data: data2, expires })
		},
		async deleteData(id) {
			map.delete(id)
		},
	})
}
function href(path, ...args) {
	const params = args[0]
	let result = trimTrailingSplat(path).replace(
		/\/:([\w-]+)(\?)?/g,
		// same regex as in .\router\utils.ts: compilePath().
		(_, param, questionMark) => {
			const isRequired = questionMark === void 0
			const value = params == null ? void 0 : params[param]
			if (isRequired && value === void 0) {
				throw new Error(`Path '${path}' requires param '${param}' but it was not provided`)
			}
			return value === void 0 ? "" : "/" + value
		},
	)
	if (path.endsWith("*")) {
		const value = params == null ? void 0 : params["*"]
		if (value !== void 0) {
			result += "/" + value
		}
	}
	return result || "/"
}
function trimTrailingSplat(path) {
	let i = path.length - 1
	const char = path[i]
	if (char !== "*" && char !== "/") return path
	i--
	for (; i >= 0; i--) {
		if (path[i] !== "/") break
	}
	return path.slice(0, i + 1)
}
var encoder2 = new TextEncoder()
var trailer = "</body></html>"
function injectRSCPayload(rscStream) {
	const decoder = new TextDecoder()
	let resolveFlightDataPromise
	const flightDataPromise = new Promise(resolve => (resolveFlightDataPromise = resolve))
	let startedRSC = false
	const buffered = []
	let timeout = null
	function flushBufferedChunks(controller) {
		for (const chunk of buffered) {
			let buf = decoder.decode(chunk, { stream: true })
			if (buf.endsWith(trailer)) {
				buf = buf.slice(0, -trailer.length)
			}
			controller.enqueue(encoder2.encode(buf))
		}
		buffered.length = 0
		timeout = null
	}
	return new TransformStream({
		transform(chunk, controller) {
			buffered.push(chunk)
			if (timeout) {
				return
			}
			timeout = setTimeout(async () => {
				flushBufferedChunks(controller)
				if (!startedRSC) {
					startedRSC = true
					writeRSCStream(rscStream, controller)
						.catch(err => controller.error(err))
						.then(resolveFlightDataPromise)
				}
			}, 0)
		},
		async flush(controller) {
			await flightDataPromise
			if (timeout) {
				clearTimeout(timeout)
				flushBufferedChunks(controller)
			}
			controller.enqueue(encoder2.encode("</body></html>"))
		},
	})
}
async function writeRSCStream(rscStream, controller) {
	const decoder = new TextDecoder("utf-8", { fatal: true })
	const reader = rscStream.getReader()
	try {
		let read
		while ((read = await reader.read()) && !read.done) {
			const chunk = read.value
			try {
				writeChunk(JSON.stringify(decoder.decode(chunk, { stream: true })), controller)
			} catch (err) {
				const base64 = JSON.stringify(btoa(String.fromCodePoint(...chunk)))
				writeChunk(`Uint8Array.from(atob(${base64}), m => m.codePointAt(0))`, controller)
			}
		}
	} finally {
		reader.releaseLock()
	}
	const remaining = decoder.decode()
	if (remaining.length) {
		writeChunk(JSON.stringify(remaining), controller)
	}
}
function writeChunk(chunk, controller) {
	controller.enqueue(
		encoder2.encode(`<script>${escapeScript(`(self.__FLIGHT_DATA||=[]).push(${chunk})`)}</script>`),
	)
}
function escapeScript(script) {
	return script.replace(/<!--/g, "<\\!--").replace(/<\/(script)/gi, "</\\$1")
}
var RSCRouterGlobalErrorBoundary = class extends import_react.default.Component {
	constructor(props) {
		super(props)
		this.state = { error: null, location: props.location }
	}
	static getDerivedStateFromError(error) {
		return { error }
	}
	static getDerivedStateFromProps(props, state) {
		if (state.location !== props.location) {
			return { error: null, location: props.location }
		}
		return { error: state.error, location: state.location }
	}
	render() {
		if (this.state.error) {
			return import_react.default.createElement(RSCDefaultRootErrorBoundaryImpl, {
				error: this.state.error,
				renderAppShell: true,
			})
		} else {
			return this.props.children
		}
	}
}
function ErrorWrapper({ renderAppShell, title, children }) {
	if (!renderAppShell) {
		return children
	}
	return import_react.default.createElement(
		"html",
		{ lang: "en" },
		import_react.default.createElement(
			"head",
			null,
			import_react.default.createElement("meta", { charSet: "utf-8" }),
			import_react.default.createElement("meta", {
				name: "viewport",
				content: "width=device-width,initial-scale=1,viewport-fit=cover",
			}),
			import_react.default.createElement("title", null, title),
		),
		import_react.default.createElement(
			"body",
			null,
			import_react.default.createElement(
				"main",
				{ style: { fontFamily: "system-ui, sans-serif", padding: "2rem" } },
				children,
			),
		),
	)
}
function RSCDefaultRootErrorBoundaryImpl({ error, renderAppShell }) {
	console.error(error)
	const heyDeveloper = import_react.default.createElement("script", {
		dangerouslySetInnerHTML: {
			__html: `
        console.log(
          "💿 Hey developer 👋. You can provide a way better UX than this when your app throws errors. Check out https://reactrouter.com/how-to/error-boundary for more information."
        );
      `,
		},
	})
	if (isRouteErrorResponse(error)) {
		return import_react.default.createElement(
			ErrorWrapper,
			{
				renderAppShell,
				title: "Unhandled Thrown Response!",
			},
			import_react.default.createElement(
				"h1",
				{ style: { fontSize: "24px" } },
				error.status,
				" ",
				error.statusText,
			),
			ENABLE_DEV_WARNINGS ? heyDeveloper : null,
		)
	}
	let errorInstance
	if (error instanceof Error) {
		errorInstance = error
	} else {
		const errorString =
			error == null
				? "Unknown Error"
				: typeof error === "object" && "toString" in error
					? error.toString()
					: JSON.stringify(error)
		errorInstance = new Error(errorString)
	}
	return import_react.default.createElement(
		ErrorWrapper,
		{ renderAppShell, title: "Application Error!" },
		import_react.default.createElement("h1", { style: { fontSize: "24px" } }, "Application Error"),
		import_react.default.createElement(
			"pre",
			{
				style: {
					padding: "2rem",
					background: "hsla(10, 50%, 50%, 0.1)",
					color: "red",
					overflow: "auto",
				},
			},
			errorInstance.stack,
		),
		heyDeveloper,
	)
}
function RSCDefaultRootErrorBoundary({ hasRootLayout }) {
	const error = useRouteError()
	if (hasRootLayout === void 0) {
		throw new Error("Missing 'hasRootLayout' prop")
	}
	return import_react.default.createElement(RSCDefaultRootErrorBoundaryImpl, {
		renderAppShell: !hasRootLayout,
		error,
	})
}
function createRSCRouteModules(payload) {
	const routeModules = {}
	for (const match of payload.matches) {
		populateRSCRouteModules(routeModules, match)
	}
	return routeModules
}
function populateRSCRouteModules(routeModules, matches) {
	matches = Array.isArray(matches) ? matches : [matches]
	for (const match of matches) {
		routeModules[match.id] = {
			links: match.links,
			meta: match.meta,
			default: noopComponent,
		}
	}
}
var noopComponent = () => null
var defaultManifestPath = "/__manifest"
var REACT_USE = "use"
var useImpl = React42[REACT_USE]
function useSafe(promise) {
	if (useImpl) {
		return useImpl(promise)
	}
	throw new Error("React Router v7 requires React 19+ for RSC features.")
}
async function routeRSCServerRequest({
	request,
	serverResponse,
	createFromReadableStream,
	renderHTML,
	hydrate: hydrate2 = true,
}) {
	const url = new URL(request.url)
	const isDataRequest = isReactServerRequest(url)
	const respondWithRSCPayload =
		isDataRequest || isManifestRequest(url) || request.headers.has("rsc-action-id")
	if (respondWithRSCPayload || serverResponse.headers.get("React-Router-Resource") === "true") {
		return serverResponse
	}
	if (!serverResponse.body) {
		throw new Error("Missing body in server response")
	}
	const detectRedirectResponse = serverResponse.clone()
	let serverResponseB = null
	if (hydrate2) {
		serverResponseB = serverResponse.clone()
	}
	const body = serverResponse.body
	let buffer
	let streamControllers = []
	const createStream = () => {
		if (!buffer) {
			buffer = []
			return body.pipeThrough(
				new TransformStream({
					transform(chunk, controller) {
						buffer.push(chunk)
						controller.enqueue(chunk)
						streamControllers.forEach(c => c.enqueue(chunk))
					},
					flush() {
						streamControllers.forEach(c => c.close())
						streamControllers = []
					},
				}),
			)
		}
		return new ReadableStream({
			start(controller) {
				buffer.forEach(chunk => controller.enqueue(chunk))
				streamControllers.push(controller)
			},
		})
	}
	let deepestRenderedBoundaryId = null
	const getPayload = () => {
		const payloadPromise = Promise.resolve(createFromReadableStream(createStream()))
		return Object.defineProperties(payloadPromise, {
			_deepestRenderedBoundaryId: {
				get() {
					return deepestRenderedBoundaryId
				},
				set(boundaryId) {
					deepestRenderedBoundaryId = boundaryId
				},
			},
			formState: {
				get() {
					return payloadPromise.then(payload =>
						payload.type === "render" ? payload.formState : void 0,
					)
				},
			},
		})
	}
	let renderRedirect
	let renderError
	try {
		if (!detectRedirectResponse.body) {
			throw new Error("Failed to clone server response")
		}
		const payload = await createFromReadableStream(detectRedirectResponse.body)
		if (serverResponse.status === SINGLE_FETCH_REDIRECT_STATUS && payload.type === "redirect") {
			const headers2 = new Headers(serverResponse.headers)
			headers2.delete("Content-Encoding")
			headers2.delete("Content-Length")
			headers2.delete("Content-Type")
			headers2.delete("X-Remix-Response")
			headers2.set("Location", payload.location)
			return new Response((serverResponseB == null ? void 0 : serverResponseB.body) || "", {
				headers: headers2,
				status: payload.status,
				statusText: serverResponse.statusText,
			})
		}
		const reactHeaders = new Headers()
		let status = serverResponse.status
		let statusText = serverResponse.statusText
		const html = await renderHTML(getPayload, {
			onError(error) {
				if (
					typeof error === "object" &&
					error &&
					"digest" in error &&
					typeof error.digest === "string"
				) {
					renderRedirect = decodeRedirectErrorDigest(error.digest)
					if (renderRedirect) {
						return error.digest
					}
					const routeErrorResponse = decodeRouteErrorResponseDigest(error.digest)
					if (routeErrorResponse) {
						renderError = routeErrorResponse
						status = routeErrorResponse.status
						statusText = routeErrorResponse.statusText
						return error.digest
					}
				}
			},
			onHeaders(headers2) {
				for (const [key, value] of headers2) {
					reactHeaders.append(key, value)
				}
			},
		})
		const headers = new Headers(reactHeaders)
		for (const [key, value] of serverResponse.headers) {
			headers.append(key, value)
		}
		headers.set("Content-Type", "text/html; charset=utf-8")
		if (renderRedirect) {
			headers.set("Location", renderRedirect.location)
			return new Response(html, {
				status: renderRedirect.status,
				headers,
			})
		}
		const redirectTransform = new TransformStream({
			flush(controller) {
				if (renderRedirect) {
					controller.enqueue(
						new TextEncoder().encode(
							`<meta http-equiv="refresh" content="0;url=${escapeHtml(renderRedirect.location)}"/>`,
						),
					)
				}
			},
		})
		if (!hydrate2) {
			return new Response(html.pipeThrough(redirectTransform), {
				status,
				statusText,
				headers,
			})
		}
		if (!(serverResponseB == null ? void 0 : serverResponseB.body)) {
			throw new Error("Failed to clone server response")
		}
		const body2 = html
			.pipeThrough(injectRSCPayload(serverResponseB.body))
			.pipeThrough(redirectTransform)
		return new Response(body2, {
			status,
			statusText,
			headers,
		})
	} catch (reason) {
		if (reason instanceof Response) {
			return reason
		}
		if (renderRedirect) {
			return new Response(`Redirect: ${renderRedirect.location}`, {
				status: renderRedirect.status,
				headers: {
					Location: renderRedirect.location,
				},
			})
		}
		try {
			reason = renderError ?? reason
			let [status, statusText] = isRouteErrorResponse(reason)
				? [reason.status, reason.statusText]
				: [500, ""]
			let retryRedirect
			const reactHeaders = new Headers()
			const html = await renderHTML(
				() => {
					const decoded = Promise.resolve(createFromReadableStream(createStream()))
					const payloadPromise = decoded.then(payload =>
						Object.assign(payload, {
							status,
							errors: deepestRenderedBoundaryId
								? {
										[deepestRenderedBoundaryId]: reason,
									}
								: {},
						}),
					)
					return Object.defineProperties(payloadPromise, {
						_deepestRenderedBoundaryId: {
							get() {
								return deepestRenderedBoundaryId
							},
							set(boundaryId) {
								deepestRenderedBoundaryId = boundaryId
							},
						},
						formState: {
							get() {
								return payloadPromise.then(payload =>
									payload.type === "render" ? payload.formState : void 0,
								)
							},
						},
					})
				},
				{
					onError(error) {
						if (
							typeof error === "object" &&
							error &&
							"digest" in error &&
							typeof error.digest === "string"
						) {
							retryRedirect = decodeRedirectErrorDigest(error.digest)
							if (retryRedirect) {
								return error.digest
							}
							const routeErrorResponse = decodeRouteErrorResponseDigest(error.digest)
							if (routeErrorResponse) {
								status = routeErrorResponse.status
								statusText = routeErrorResponse.statusText
								return error.digest
							}
						}
					},
					onHeaders(headers2) {
						for (const [key, value] of headers2) {
							reactHeaders.append(key, value)
						}
					},
				},
			)
			const headers = new Headers(reactHeaders)
			for (const [key, value] of serverResponse.headers) {
				headers.append(key, value)
			}
			headers.set("Content-Type", "text/html; charset=utf-8")
			if (retryRedirect) {
				headers.set("Location", retryRedirect.location)
				return new Response(html, {
					status: retryRedirect.status,
					headers,
				})
			}
			const retryRedirectTransform = new TransformStream({
				flush(controller) {
					if (retryRedirect) {
						controller.enqueue(
							new TextEncoder().encode(
								`<meta http-equiv="refresh" content="0;url=${escapeHtml(retryRedirect.location)}"/>`,
							),
						)
					}
				},
			})
			if (!hydrate2) {
				return new Response(html.pipeThrough(retryRedirectTransform), {
					status,
					statusText,
					headers,
				})
			}
			if (!(serverResponseB == null ? void 0 : serverResponseB.body)) {
				throw new Error("Failed to clone server response")
			}
			const body2 = html
				.pipeThrough(injectRSCPayload(serverResponseB.body))
				.pipeThrough(retryRedirectTransform)
			return new Response(body2, {
				status,
				statusText,
				headers,
			})
		} catch {}
		throw reason
	}
}
function RSCStaticRouter({ getPayload }) {
	const decoded = getPayload()
	const payload = useSafe(decoded)
	if (payload.type === "redirect") {
		throw new Response(null, {
			status: payload.status,
			headers: {
				Location: payload.location,
			},
		})
	}
	if (payload.type !== "render") return null
	const patchedLoaderData = { ...payload.loaderData }
	for (const match of payload.matches) {
		if (
			shouldHydrateRouteLoader(match.id, match.clientLoader, match.hasLoader, false) &&
			(match.hydrateFallbackElement || !match.hasLoader)
		) {
			delete patchedLoaderData[match.id]
		}
	}
	const context = {
		get _deepestRenderedBoundaryId() {
			return decoded._deepestRenderedBoundaryId ?? null
		},
		set _deepestRenderedBoundaryId(boundaryId) {
			decoded._deepestRenderedBoundaryId = boundaryId
		},
		actionData: payload.actionData,
		actionHeaders: {},
		basename: payload.basename,
		errors: payload.errors,
		loaderData: patchedLoaderData,
		loaderHeaders: {},
		location: payload.location,
		statusCode: 200,
		matches: payload.matches.map(match => ({
			params: match.params,
			pathname: match.pathname,
			pathnameBase: match.pathnameBase,
			route: {
				id: match.id,
				action: match.hasAction || !!match.clientAction,
				handle: match.handle,
				hasErrorBoundary: match.hasErrorBoundary,
				loader: match.hasLoader || !!match.clientLoader,
				index: match.index,
				path: match.path,
				shouldRevalidate: match.shouldRevalidate,
			},
		})),
	}
	const router2 = createStaticRouter(
		payload.matches.reduceRight((previous, match) => {
			const route = {
				id: match.id,
				action: match.hasAction || !!match.clientAction,
				element: match.element,
				errorElement: match.errorElement,
				handle: match.handle,
				hasErrorBoundary: !!match.errorElement,
				hydrateFallbackElement: match.hydrateFallbackElement,
				index: match.index,
				loader: match.hasLoader || !!match.clientLoader,
				path: match.path,
				shouldRevalidate: match.shouldRevalidate,
			}
			if (previous.length > 0) {
				route.children = previous
			}
			return [route]
		}, []),
		context,
	)
	const frameworkContext = {
		future: {
			// These flags have no runtime impact so can always be false.  If we add
			// flags that drive runtime behavior they'll need to be proxied through.
			v8_middleware: false,
			unstable_trailingSlashAwareDataRequests: true,
			// always on for RSC
			v8_passThroughRequests: true,
			// always on for RSC
		},
		isSpaMode: false,
		ssr: true,
		criticalCss: "",
		manifest: {
			routes: {},
			version: "1",
			url: "",
			entry: {
				module: "",
				imports: [],
			},
		},
		routeDiscovery:
			payload.routeDiscovery.mode === "initial"
				? { mode: "initial", manifestPath: defaultManifestPath }
				: {
						mode: "lazy",
						manifestPath: payload.routeDiscovery.manifestPath || defaultManifestPath,
					},
		routeModules: createRSCRouteModules(payload),
	}
	return React42.createElement(
		RSCRouterContext.Provider,
		{ value: true },
		React42.createElement(
			RSCRouterGlobalErrorBoundary,
			{ location: payload.location },
			React42.createElement(
				FrameworkContext.Provider,
				{ value: frameworkContext },
				React42.createElement(StaticRouterProvider, {
					context,
					router: router2,
					hydrate: false,
					nonce: payload.nonce,
				}),
			),
		),
	)
}
function isReactServerRequest(url) {
	return url.pathname.endsWith(".rsc")
}
function isManifestRequest(url) {
	return url.pathname.endsWith(".manifest")
}
function deserializeErrors2(errors) {
	if (!errors) return null
	const entries = Object.entries(errors)
	const serialized = {}
	for (const [key, val] of entries) {
		if (val && val.__type === "RouteErrorResponse") {
			serialized[key] = new ErrorResponseImpl(
				val.status,
				val.statusText,
				val.data,
				val.internal === true,
			)
		} else if (val && val.__type === "Error") {
			if (val.__subType) {
				const ErrorConstructor = window[val.__subType]
				if (typeof ErrorConstructor === "function") {
					try {
						const error = new ErrorConstructor(val.message)
						error.stack = val.stack
						serialized[key] = error
					} catch (e) {}
				}
			}
			if (serialized[key] == null) {
				const error = new Error(val.message)
				error.stack = val.stack
				serialized[key] = error
			}
		} else {
			serialized[key] = val
		}
	}
	return serialized
}
function getHydrationData({
	state,
	routes,
	getRouteInfo,
	location: location2,
	basename,
	isSpaMode,
}) {
	const hydrationData = {
		...state,
		loaderData: { ...state.loaderData },
	}
	const initialMatches = matchRoutes(routes, location2, basename)
	if (initialMatches) {
		for (const match of initialMatches) {
			const routeId = match.route.id
			const routeInfo = getRouteInfo(routeId)
			if (
				shouldHydrateRouteLoader(routeId, routeInfo.clientLoader, routeInfo.hasLoader, isSpaMode) &&
				(routeInfo.hasHydrateFallback || !routeInfo.hasLoader)
			) {
				delete hydrationData.loaderData[routeId]
			} else if (!routeInfo.hasLoader) {
				hydrationData.loaderData[routeId] = null
			}
		}
	}
	return hydrationData
}

// node_modules/react-router/dist/development/dom-export.mjs
var React13 = __toESM(require_react(), 1)
var ReactDOM = __toESM(require_react_dom(), 1)
var React23 = __toESM(require_react(), 1)
var React33 = __toESM(require_react(), 1)
var ReactDOM2 = __toESM(require_react_dom(), 1)
function RouterProvider2(props) {
	return React13.createElement(RouterProvider, {
		flushSync: ReactDOM.flushSync,
		...props,
	})
}
var ssrInfo = null
var router = null
function initSsrInfo() {
	if (
		!ssrInfo &&
		window.__reactRouterContext &&
		window.__reactRouterManifest &&
		window.__reactRouterRouteModules
	) {
		if (window.__reactRouterManifest.sri === true) {
			const importMap = document.querySelector("script[rr-importmap]")
			if (importMap == null ? void 0 : importMap.textContent) {
				try {
					window.__reactRouterManifest.sri = JSON.parse(importMap.textContent).integrity
				} catch (err) {
					console.error("Failed to parse import map", err)
				}
			}
		}
		ssrInfo = {
			context: window.__reactRouterContext,
			manifest: window.__reactRouterManifest,
			routeModules: window.__reactRouterRouteModules,
			stateDecodingPromise: void 0,
			router: void 0,
			routerInitialized: false,
		}
	}
}
function createHydratedRouter({ getContext, instrumentations }) {
	var _a, _b
	initSsrInfo()
	if (!ssrInfo) {
		throw new Error(
			"You must be using the SSR features of React Router in order to skip passing a `router` prop to `<RouterProvider>`",
		)
	}
	const localSsrInfo = ssrInfo
	if (!ssrInfo.stateDecodingPromise) {
		const stream = ssrInfo.context.stream
		invariant(stream, "No stream found for single fetch decoding")
		ssrInfo.context.stream = void 0
		ssrInfo.stateDecodingPromise = decodeViaTurboStream(stream, window)
			.then(value => {
				ssrInfo.context.state = value.value
				localSsrInfo.stateDecodingPromise.value = true
			})
			.catch(e => {
				localSsrInfo.stateDecodingPromise.error = e
			})
	}
	if (ssrInfo.stateDecodingPromise.error) {
		throw ssrInfo.stateDecodingPromise.error
	}
	if (!ssrInfo.stateDecodingPromise.value) {
		throw ssrInfo.stateDecodingPromise
	}
	const routes = createClientRoutes(
		ssrInfo.manifest.routes,
		ssrInfo.routeModules,
		ssrInfo.context.state,
		ssrInfo.context.ssr,
		ssrInfo.context.isSpaMode,
	)
	let hydrationData = void 0
	if (ssrInfo.context.isSpaMode) {
		const { loaderData } = ssrInfo.context.state
		if (
			((_a = ssrInfo.manifest.routes.root) == null ? void 0 : _a.hasLoader) &&
			loaderData &&
			"root" in loaderData
		) {
			hydrationData = {
				loaderData: {
					root: loaderData.root,
				},
			}
		}
	} else {
		hydrationData = getHydrationData({
			state: ssrInfo.context.state,
			routes,
			getRouteInfo: routeId => {
				var _a2, _b2, _c
				return {
					clientLoader: (_a2 = ssrInfo.routeModules[routeId]) == null ? void 0 : _a2.clientLoader,
					hasLoader:
						((_b2 = ssrInfo.manifest.routes[routeId]) == null ? void 0 : _b2.hasLoader) === true,
					hasHydrateFallback:
						((_c = ssrInfo.routeModules[routeId]) == null ? void 0 : _c.HydrateFallback) != null,
				}
			},
			location: window.location,
			basename: (_b = window.__reactRouterContext) == null ? void 0 : _b.basename,
			isSpaMode: ssrInfo.context.isSpaMode,
		})
		if (hydrationData && hydrationData.errors) {
			hydrationData.errors = deserializeErrors2(hydrationData.errors)
		}
	}
	if (window.history.state && window.history.state.masked) {
		window.history.replaceState({ ...window.history.state, masked: void 0 }, "")
	}
	const router2 = createRouter({
		routes,
		history: createBrowserHistory(),
		basename: ssrInfo.context.basename,
		getContext,
		hydrationData,
		hydrationRouteProperties,
		instrumentations,
		mapRouteProperties,
		future: {
			v8_passThroughRequests: ssrInfo.context.future.v8_passThroughRequests,
		},
		dataStrategy: getTurboStreamSingleFetchDataStrategy(
			() => router2,
			ssrInfo.manifest,
			ssrInfo.routeModules,
			ssrInfo.context.ssr,
			ssrInfo.context.basename,
			ssrInfo.context.future.unstable_trailingSlashAwareDataRequests,
		),
		patchRoutesOnNavigation: getPatchRoutesOnNavigationFunction(
			() => router2,
			ssrInfo.manifest,
			ssrInfo.routeModules,
			ssrInfo.context.ssr,
			ssrInfo.context.routeDiscovery,
			ssrInfo.context.isSpaMode,
			ssrInfo.context.basename,
		),
	})
	ssrInfo.router = router2
	if (router2.state.initialized) {
		ssrInfo.routerInitialized = true
		router2.initialize()
	}
	router2.createRoutesForHMR =
		/* spacer so ts-ignore does not affect the right hand of the assignment */
		createClientRoutesWithHMRRevalidationOptOut
	window.__reactRouterDataRouter = router2
	return router2
}
function HydratedRouter(props) {
	if (!router) {
		router = createHydratedRouter({
			getContext: props.getContext,
			instrumentations: props.instrumentations,
		})
	}
	const [criticalCss, setCriticalCss] = React23.useState(
		true ? (ssrInfo == null ? void 0 : ssrInfo.context.criticalCss) : void 0,
	)
	React23.useEffect(() => {
		if (true) {
			setCriticalCss(void 0)
		}
	}, [])
	React23.useEffect(() => {
		if (criticalCss === void 0) {
			document
				.querySelectorAll(`[${CRITICAL_CSS_DATA_ATTRIBUTE}]`)
				.forEach(element => element.remove())
		}
	}, [criticalCss])
	const [location2, setLocation] = React23.useState(router.state.location)
	React23.useLayoutEffect(() => {
		if (ssrInfo && ssrInfo.router && !ssrInfo.routerInitialized) {
			ssrInfo.routerInitialized = true
			ssrInfo.router.initialize()
		}
	}, [])
	React23.useLayoutEffect(() => {
		if (ssrInfo && ssrInfo.router) {
			return ssrInfo.router.subscribe(newState => {
				if (newState.location !== location2) {
					setLocation(newState.location)
				}
			})
		}
	}, [location2])
	invariant(ssrInfo, "ssrInfo unavailable for HydratedRouter")
	useFogOFWarDiscovery(
		router,
		ssrInfo.manifest,
		ssrInfo.routeModules,
		ssrInfo.context.ssr,
		ssrInfo.context.routeDiscovery,
		ssrInfo.context.isSpaMode,
	)
	return (
		// This fragment is important to ensure we match the <ServerRouter> JSX
		// structure so that useId values hydrate correctly
		React23.createElement(
			React23.Fragment,
			null,
			React23.createElement(
				FrameworkContext.Provider,
				{
					value: {
						manifest: ssrInfo.manifest,
						routeModules: ssrInfo.routeModules,
						future: ssrInfo.context.future,
						criticalCss,
						ssr: ssrInfo.context.ssr,
						isSpaMode: ssrInfo.context.isSpaMode,
						routeDiscovery: ssrInfo.context.routeDiscovery,
					},
				},
				React23.createElement(
					RemixErrorBoundary,
					{ location: location2 },
					React23.createElement(RouterProvider2, {
						router,
						useTransitions: props.useTransitions,
						onError: props.onError,
					}),
				),
			),
			React23.createElement(React23.Fragment, null),
		)
	)
}
var renderedRoutesContext = createContext4()
export {
	Await,
	BrowserRouter,
	Form,
	HashRouter,
	HydratedRouter,
	IDLE_BLOCKER,
	IDLE_FETCHER,
	IDLE_NAVIGATION,
	Link,
	Links,
	MemoryRouter,
	Meta,
	NavLink,
	Navigate,
	Action as NavigationType,
	Outlet,
	PrefetchPageLinks,
	Route,
	Router,
	RouterContextProvider,
	RouterProvider2 as RouterProvider,
	Routes,
	Scripts,
	ScrollRestoration,
	ServerRouter,
	StaticRouter,
	StaticRouterProvider,
	AwaitContextProvider as UNSAFE_AwaitContextProvider,
	DataRouterContext as UNSAFE_DataRouterContext,
	DataRouterStateContext as UNSAFE_DataRouterStateContext,
	ErrorResponseImpl as UNSAFE_ErrorResponseImpl,
	FetchersContext as UNSAFE_FetchersContext,
	FrameworkContext as UNSAFE_FrameworkContext,
	LocationContext as UNSAFE_LocationContext,
	NavigationContext as UNSAFE_NavigationContext,
	RSCDefaultRootErrorBoundary as UNSAFE_RSCDefaultRootErrorBoundary,
	RemixErrorBoundary as UNSAFE_RemixErrorBoundary,
	RouteContext as UNSAFE_RouteContext,
	ServerMode as UNSAFE_ServerMode,
	SingleFetchRedirectSymbol as UNSAFE_SingleFetchRedirectSymbol,
	ViewTransitionContext as UNSAFE_ViewTransitionContext,
	WithComponentProps as UNSAFE_WithComponentProps,
	WithErrorBoundaryProps as UNSAFE_WithErrorBoundaryProps,
	WithHydrateFallbackProps as UNSAFE_WithHydrateFallbackProps,
	createBrowserHistory as UNSAFE_createBrowserHistory,
	createClientRoutes as UNSAFE_createClientRoutes,
	createClientRoutesWithHMRRevalidationOptOut as UNSAFE_createClientRoutesWithHMRRevalidationOptOut,
	createHashHistory as UNSAFE_createHashHistory,
	createMemoryHistory as UNSAFE_createMemoryHistory,
	createRouter as UNSAFE_createRouter,
	decodeViaTurboStream as UNSAFE_decodeViaTurboStream,
	deserializeErrors2 as UNSAFE_deserializeErrors,
	getHydrationData as UNSAFE_getHydrationData,
	getPatchRoutesOnNavigationFunction as UNSAFE_getPatchRoutesOnNavigationFunction,
	getTurboStreamSingleFetchDataStrategy as UNSAFE_getTurboStreamSingleFetchDataStrategy,
	hydrationRouteProperties as UNSAFE_hydrationRouteProperties,
	invariant as UNSAFE_invariant,
	mapRouteProperties as UNSAFE_mapRouteProperties,
	shouldHydrateRouteLoader as UNSAFE_shouldHydrateRouteLoader,
	useFogOFWarDiscovery as UNSAFE_useFogOFWarDiscovery,
	useScrollRestoration as UNSAFE_useScrollRestoration,
	withComponentProps as UNSAFE_withComponentProps,
	withErrorBoundaryProps as UNSAFE_withErrorBoundaryProps,
	withHydrateFallbackProps as UNSAFE_withHydrateFallbackProps,
	createBrowserRouter,
	createContext4 as createContext,
	createCookie,
	createCookieSessionStorage,
	createHashRouter,
	createMemoryRouter,
	createMemorySessionStorage,
	createPath,
	createRequestHandler,
	createRoutesFromChildren,
	createRoutesFromElements,
	createRoutesStub,
	createSearchParams,
	createSession,
	createSessionStorage,
	createStaticHandler2 as createStaticHandler,
	createStaticRouter,
	data,
	generatePath,
	href,
	isCookie,
	isRouteErrorResponse,
	isSession,
	matchPath,
	matchRoutes,
	parsePath,
	redirect,
	redirectDocument,
	renderMatches,
	replace,
	resolvePath,
	HistoryRouter as unstable_HistoryRouter,
	RSCStaticRouter as unstable_RSCStaticRouter,
	routeRSCServerRequest as unstable_routeRSCServerRequest,
	setDevServerHooks as unstable_setDevServerHooks,
	usePrompt as unstable_usePrompt,
	useRoute as unstable_useRoute,
	useActionData,
	useAsyncError,
	useAsyncValue,
	useBeforeUnload,
	useBlocker,
	useFetcher,
	useFetchers,
	useFormAction,
	useHref,
	useInRouterContext,
	useLinkClickHandler,
	useLoaderData,
	useLocation,
	useMatch,
	useMatches,
	useNavigate,
	useNavigation,
	useNavigationType,
	useOutlet,
	useOutletContext,
	useParams,
	useResolvedPath,
	useRevalidator,
	useRouteError,
	useRouteLoaderData,
	useRoutes,
	useSearchParams,
	useSubmit,
	useViewTransitionState,
}
/*! Bundled license information:

react-router/dist/development/chunk-5KNZJZUH.mjs:
  (**
   * react-router v7.15.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

react-router/dist/development/chunk-RMD3H4O3.mjs:
  (**
   * react-router v7.15.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

react-router/dist/development/dom-export.mjs:
  (**
   * react-router v7.15.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

react-router/dist/development/index.mjs:
  (**
   * react-router v7.15.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

react-router-dom/dist/index.mjs:
  (**
   * react-router-dom v7.15.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)
*/
//# sourceMappingURL=react-router-dom.js.map
