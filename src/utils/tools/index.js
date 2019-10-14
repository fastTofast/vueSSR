import $http from './http'
import CosAuth from './cos-auth'
export function setCookie (name, value, Days = 0) {
  const exp = new Date()
  if (Days) {
    if (Days === Infinity) {
      document.cookie = `${name}=${escape(
        value
      )};expires=Fri, 31 Dec 9999 23:59:59 GMT;path=/`
    } else {
      exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000)
      document.cookie = `${name}=${escape(
        value
      )};expires=${exp.toGMTString()};path=/`
    }
  } else {
    document.cookie = `${name}=${escape(value)};path=/`
  }
}
export function getCookie (name) {
  const reg = new RegExp(`(^| )${name}=([^;]*)(;|$)`)
  const arr = document.cookie.match(reg)
  if (arr) {
    return unescape(arr[2])
  }
  return null
}
export function delCookie (name) {
  const exp = new Date('1992-01-01')
  const cval = getCookie(name)
  if (cval != null) {
    document.cookie = `${name}=${cval};expires=${exp.toGMTString()};path=/`
  }
}
export function download (url, name = '', isAjax) {
  url = decodeURIComponent(url)
  let ajaxDownload = (newUrl, newName) => {
    $http.prototype.cusConfig = { returnAll: true }
    $http(newUrl, {
      method: 'get',
      withCredentials: false
    }).then(response => {
      response = JSON.stringify(response, '', 2)
      var datastr = `data:text/json;charset=utf-8,${response}`
      var downloadAnchorNode = document.createElement('a')
      downloadAnchorNode.setAttribute('href', datastr)
      downloadAnchorNode.setAttribute('download', newName)
      downloadAnchorNode.click()
      downloadAnchorNode.remove()
    })
  }
  let downloadRef = (newUrl) => {
    let alink = document.createElement('a')
    alink.download = name
    alink.href = newUrl
    alink.style.display = 'none'
    document.body.appendChild(alink)
    alink.click()
    document.body.removeChild(alink)
  }
  if (isAjax) {
    let arr = url.split('.').reverse()
    // if (arr[0] === 'json' || arr[0] === 'txt') {
    ajaxDownload(url, arr[1] + '.' + arr[0])
    // } else {
    //   downloadRef(url)
    // }
  } else {
    downloadRef(url)
  }
}
// 空判断
export function isEmpty (val) {
  if (typeof (val) === 'string' && (!val || !val.trim())) {
    return true
  } else if (val === null || val === undefined) {
    return true
  } else {
    return false
  }
}
export async function getAuth (options) {
  let authInfo = await $http.post('/user/authentication', options)
  console.log(authInfo)
  return {
    XCosSecurityToken: authInfo.credentials.sessionToken,
    Authorization: CosAuth({
      SecretId: authInfo.credentials.tmpSecretId,
      SecretKey: authInfo.credentials.tmpSecretKey,
      Method: options.method,
      Pathname: options.pathname
    })
  }
}
