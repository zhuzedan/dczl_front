export function apiLogin(userInfo) {
  return new Promise((resolve, reject) => {
    const data = {
      token: '001',
      user: {
        name: 'VIXX',
        head: 'static/images/gd.jpg'
      }
    }
    resolve(data)
  })
}