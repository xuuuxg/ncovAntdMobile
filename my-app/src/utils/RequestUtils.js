const fetchPost = (url, data) => {
    return fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
  }

const fetchGet = (url, data) => {
    let newUrl = ''
    if (data) {
      const paramsArray = []
      Object.keys(data).forEach(key => paramsArray.push(`${key}=${data[key]}`))
      if (url.search(/\?/) === -1) {
        newUrl = `${url}?${paramsArray.join('&')}`
      } else {
        newUrl = `${url}&${paramsArray.join('&')}`
      }
    }
    return fetch(`${newUrl}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
      },
    })
  }

  const fetchRequest = (options) => {
     
    const {url, method, data} = options
    switch (method) {
      case 'get':
        return fetchGet(url, data)
      case 'post':
        return fetchPost(url, data)
      default:
        return fetchGet(url, data)
    }
  };
  
  export default function request(options) {
    return fetchRequest(options)
      .then((response) => response.json())
      .then((response) => {
        return Promise.resolve({
          ...response
        })
      }).catch((error) => {
        console.log(error)
      })
  }