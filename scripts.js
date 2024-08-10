/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {"/":"/","deepl":"https://deepl.com/","reddit":"https://reddit.com/","maps":"https://maps.google.com/"}
const engine = "google"
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/{query}",
  duckduckgo: "https://duckduckgo.com/?q={query}",
  ecosia: "https://www.ecosia.org/search?q={query}",
  google: "https://www.google.com/search?q={query}",
  startpage: "https://www.startpage.com/search?q={query}",
  youtube: "https://www.youtube.com/results?q={query}",
}

const isWebUrl = value => {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const getTargetUrl = value => {
  if (isWebUrl(value)) return value
  if (lookup[value]) return lookup[value]
  const url = engineUrls[engine] ?? engine
  return url.replace("{query}", value)
}

const search = () => {
  const value = searchInput.value
  const targetUrl = getTargetUrl(value)
  window.open(targetUrl, "_self")
}

searchInput.onkeyup = event => event.key === "Enter" && search()
searchButton.onclick = search

/**
 * inject bookmarks into html
 */

const bookmarks = [{"id":"n7Us0iCPL52YQBoe","label":"DevTools","bookmarks":[{"id":"92o2uGWBxWSjGq1g","label":"Github","url":"https://github.com/"},{"id":"z68jQ8gOjJffYB69","label":"WebDev","url":"https://app.100xdevs.com/courses/3"},{"id":"ZDTVT1gHpxKYSXom","label":"TypingPractice","url":"https://www.keybr.com/"},{"id":"FenqFGLdlFVGNpNb","label":"DSA","url":"https://www.youtube.com/playlist?list=PLDzeHZWIZsTryvtXdMr6rPh4IDexB5NIA"}]},{"id":"IZBYYLc5l2dbp5eW","label":"Leisure","bookmarks":[{"id":"bWX8PMS4mYFXElZI","label":"YouTube","url":"https://www.youtube.com/"},{"id":"crrDBFBhpJW2Z6ad","label":"Chess","url":"https://www.chess.com/home"},{"id":"ZJ1H1qepw9m08iEC","label":"Twitter","url":"https://x.com/home"},{"id":"bG4244gtanPTBd7R","label":"Discord","url":"https://discord.com/channels/@me"}]},{"id":"Jmq4kcvcwPjcp1RF","label":"CP","bookmarks":[{"id":"kNicCUbbnbAfHoZf","label":"CodeForces","url":"https://codeforces.com/"},{"id":"9Um6YSPiXIlrQrpE","label":"CodeChef","url":"https://www.codechef.com/contests"},{"id":"Dq6LIQr2KhNk9ax4","label":"AtCoders","url":"https://atcoder.jp/"},{"id":"QsP6rBwYyMOmnZ3l","label":"LeetCode","url":"https://leetcode.com/"}]},{"id":"GYjPy697UKXat1Ar","label":"Misc","bookmarks":[{"id":"ytIqVi0LEvdhyveH","label":"ChatGpt","url":"https://chatgpt.com/"},{"id":"yyfjmYYC7LMYQhTy","label":"TLE-Sheet","url":"https://www.tle-eliminators.com/cp-sheet"},{"id":"wYfY5Hs09yn9qxP2","label":"NPTEL","url":"https://swayam.gov.in/mycourses"}]}]

const createGroupContainer = () => {
  const container = document.createElement("div")
  container.className = "bookmark-group"
  return container
}

const createGroupTitle = title => {
  const h2 = document.createElement("h2")
  h2.innerHTML = title
  return h2
}

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.href = url
  a.innerHTML = label
  li.append(a)
  return li
}

const createBookmarkList = bookmarks => {
  const ul = document.createElement("ul")
  bookmarks.map(createBookmark).forEach(li => ul.append(li))
  return ul
}

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer()
  const title = createGroupTitle(label)
  const bookmarkList = createBookmarkList(bookmarks)
  container.append(title)
  container.append(bookmarkList)
  return container
}

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks")
  bookmarksContainer.append()
  bookmarks.map(createGroup).forEach(group => bookmarksContainer.append(group))
}

injectBookmarks()
