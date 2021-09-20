
 
module.exports = {
  reactStrictMode: true,
  webpack5: true,
  images:{
    domains: [ 'images.unsplash.com', 'i.imgur.com', ]
  },
  env: {
    NEXTAUTH_URL: "http://localhost:5000",
    API_ROOT: "http://localhost:8080",
  }
}
