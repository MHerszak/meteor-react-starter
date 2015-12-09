# meteor-react-starter
This is a meteor and react project inspired by [Telescopeapp.org] and its underlying [architecture].
## Theme
The current theme relies on [izzilab:material-ui] and can be customized using objects. You will find the documentation here: [React material-ui]
Example:

```javascript
let BlueTheme =
{
    spacing: Spacing,
    fontFamily: 'Roboto, sans-serif',
    palette: {
        primary1Color: Colors.blue200,
        primary2Color: Colors.blue400,
        primary3Color: Colors.lightBlack,
        accent1Color: Colors.pinkA200,
        accent2Color: Colors.grey100,
        accent3Color: Colors.grey500,
        textColor: Colors.darkBlack,
        alternateTextColor: Colors.white,
        canvasColor: Colors.white,
        borderColor: Colors.grey300,
        disabledColor: ColorManipulator.fade(Colors.darkBlack, 0.3),
    },
};
```
Check out the [ThemeManager].

## Help is needed
I am aiming to build in these packages, such as email, search, share, settings, tags, users, api, newsletters, posts
## Packages
Packages are further described here.
### posts
Will be used to create content and entries.
### email
This is a simple server side email send on, e.g. user registers account.
### search
A search customizable based on what ever collections are available.
### share
This package is solely for social sharing for 'this' particular content.
### settings
This package will only be usable to an admin of this site. It will help to maintain users, site content, themes, newsletter and email setup etc.
### tags
This package will come in handy when this projects has a content creation package such as posts.
### users (currently in progress)
This will largely be a permissions package for users.
### newsletters
A package to help with newsletters. It'll be possible to build your own newsletter campaign or use existing services such as [mailchimp.com].
## Base2Industries
My name is Michel Herszak. I am a freelance web developer from Canada. I specialize in Meteor with React projects, and I like to build using Microservices. You can get in touch with me on Twitter: [@MHerszak], online at [Base2Industries] or by email at michel.herszak@gmail.com.

[Base2Industries]: <http://Base2Industries.com>
[@MHerszak]: <http://twitter.com/MHerszak>
[architecture]: <https://telescope.readme.io/docs/architecture>
[Telescopeapp.org]: <http://www.telescopeapp.org/>
[izzilab:material-ui]: <https://atmospherejs.com/izzilab/material-ui>
[React material-ui]: <http://www.material-ui.com/#/>
[mailchimp.com]: <http://mailchimp.com/>
[ThemeManager]: <https://github.com/callemall/material-ui/blob/master/src/styles/theme-manager.js>