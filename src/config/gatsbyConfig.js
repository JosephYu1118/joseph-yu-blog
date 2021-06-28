module.exports = {
  author: 'Joseph Yu',
  pathPrefix: '/joseph-yu-blog',
  siteUrl: 'http://localhost:8000',
  siteTitle: 'Joseph Yu Blog',
  siteDescription: 'Logbook of a front-end developer',
  postsForArchivePage: 3,
  defaultLanguage: 'en',
  contact: {
    github: 'https://github.com/JosephYu1118/joseph-yu-blog',
    twitter: 'https://twitter.com/yojosephwow',
    facebook: 'https://www.facebook.com/josephyu1118',
    instagram: 'https://instagram.com/yojosephwow',
    cakeResume: 'https://www.cakeresume.com/s--QamBGNEVLMlq96uE6Hi5hA--/josephyu',
  },
  contactFormUrl: process.env.CONTACT_FORM_ENDPOINT || 'https://getform.io/f/09a3066f-c638-40db-ad59-05e4ed71e451',
  pages: {
    home: '/',
    blog: 'blog',
    tags: 'tags',
    contact: 'contact',
  },
};
